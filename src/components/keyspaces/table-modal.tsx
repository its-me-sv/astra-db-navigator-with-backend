import React, {useState, useEffect, useRef} from 'react';

import {
  ModalWrapper, ModalContainer,
  ModalTitle, ModalCloseButton, HrLine,
  ModalSubtitle, ModalSubFields,
  ModalDeleteButton, ModalSubTextsContainer,
  ModalSubItemsContainer, ModalItem, ModalItemCloseButton,
  SubFieldItems, SubFieldsSep
} from './styles';
import {EmptyContent} from '../../pages/keyspace/styles';
import {dummyColumns, dummyIndices, dummyPars, dummyClstrs} from '../../utils/dummy-data';
import {ColumnSchema, IndexSchema, NewColumn, ClusterSchema} from '../../utils/types';
import {general, tableModalTranslations} from '../../utils/translations.utils';

import {useLanguageContext} from '../../contexts/language.context';
import {useTableContext} from '../../contexts/table.context';
import {useDeleteContext} from '../../contexts/delete.context';

import Button from '../button';
import IndexModal from './index-modal';
import ColumnModal from "./column-modal";

interface TableModalProps {
  tableName: string;
  ls: (val: boolean) => void;
  onClose: () => void;
  types: Array<string>;
}

const TableModal: React.FC<TableModalProps> = ({tableName, onClose, ls, types}) => {
  const {language} = useLanguageContext();
  const {removeTable, setLoading, decCol} = useTableContext();
  const {setText, deleteCb} = useDeleteContext();

  const [columns, setColumns] = useState<Array<ColumnSchema>>([]);
  const [indices, setIndices] = useState<Array<IndexSchema>>([]);
  const [pars, setPars] = useState<Array<string>>([]);
  const [clstrs, setClstrs] = useState<Array<ClusterSchema>>([]);
  const [showIndex, setShowIndex] = useState<boolean>(false);
  const [showColumn, setShowColumn] = useState<boolean>(false);
  const newColRef = useRef<NewColumn>({name: '', typeDefinition: "ascii"});

  const hideShowIndex = () => setShowIndex(false);
  const hideColumnModal = () => setShowColumn(false);

  const deleteTable = () => {
    deleteCb!.current = () => {
      setLoading!(true);
      setTimeout(() => {
        removeTable!(tableName);
        setText!('');
        onClose();
        setLoading!(false);
      }, 500);
    };
    setText!(`${general.delete[language]} ${general.table[language].toLowerCase()} ${tableName}?`);
  };

  const addIndex = (idxName: string, colName: string) => {
    const newIndex: IndexSchema = {
      name: idxName,
      kind: "CUSTOM",
      options: [colName]
    };
    setIndices([...indices, newIndex]);
  };

  const removeIndex = (idxName: string) => {
    deleteCb!.current = () => {
      ls!(true);
      setTimeout(() => {
        setIndices(indices.filter(({ name }) => name !== idxName));
        setText!('');
        ls!(false);
      }, 500);
    };
    setText!(`${general.delete[language]} ${general.index[language].toLowerCase()} ${idxName}?`);
  };

  const removeColumn = (colName: string) => {
    deleteCb!.current = () => {
      ls!(true);
      setTimeout(() => {
        setColumns(columns.filter(({name}) => name !== colName));
        decCol!(tableName);
        setText!('');
        ls!(false);
      }, 500);
    };
    setText!(`${general.delete[language]} ${general.column[language].toLowerCase()} ${colName}?`);
  };

  const addColumn = () => {
    const newCol: ColumnSchema = {
      name: newColRef.current.name,
      type: newColRef.current.typeDefinition,
      static: false
    };
    setColumns([...columns, newCol]);
  };

  useEffect(() => {
    if (tableName.length < 1) return;
    ls!(true);
    setTimeout(() => {
      setColumns(dummyColumns);
      setIndices(dummyIndices);
      setPars(dummyPars);
      setClstrs(dummyClstrs);
      ls!(false);
    }, 500);
  }, [tableName, ls]);

  const clusExp: string = clstrs
    .map((val) => `${val.column}(${val.order})`)
    .join(", ");

  return (
    <ModalWrapper>
      {showIndex && (
        <IndexModal
          onClose={hideShowIndex}
          columns={columns}
          indices={indices}
          table={tableName}
          addIdx={addIndex}
          ls={ls!}
        />
      )}
      {showColumn && (
        <ColumnModal
          onClose={hideColumnModal}
          types={types}
          newCol={newColRef}
          ls={ls!}
          ac={addColumn}
        />
      )}
      <ModalContainer>
        <ModalCloseButton onClick={onClose}>X</ModalCloseButton>
        <ModalTitle>{tableName}</ModalTitle>
        <ModalSubFields>
          <ModalSubtitle>{general.columns[language]}</ModalSubtitle>
          <Button
            variant={2}
            text={general.newCol[language]}
            disabled={false}
            onPress={() => setShowColumn(true)}
            medium
          />
        </ModalSubFields>
        <HrLine />
        {columns.length === 0 && (
          <EmptyContent>{general.noData[language]}</EmptyContent>
        )}
        <ModalSubItemsContainer>
          {columns.map((val) => (
            <ModalItem key={val.name}>
              <div>
                <span>{val.name}</span>
                {!pars.includes(val.name) && !clstrs.map(({column}) => column).includes(val.name) && (
                  <ModalItemCloseButton
                    title={tableModalTranslations.delCol[language]}
                    onClick={() => removeColumn(val.name)}
                  >
                    🗑️
                  </ModalItemCloseButton>
                )}
              </div>
              <HrLine />
              <span>
                {general.type[language]}: {val.type}
              </span>
              <span>
                {general.static[language]}: {"" + val.static}
              </span>
            </ModalItem>
          ))}
        </ModalSubItemsContainer>
        <ModalSubFields>
          <ModalSubtitle>{general.priKey[language]}</ModalSubtitle>
        </ModalSubFields>
        <HrLine />
        <ModalSubTextsContainer>
          <SubFieldsSep>
            <span>{general.parKey[language]}:</span>
            {pars.length === 0 && <span>-</span>}
            <SubFieldItems>
              {pars.map((val) => (
                <ModalItem key={val}>
                  <div>
                    <span>{val}</span>
                  </div>
                </ModalItem>
              ))}
            </SubFieldItems>
          </SubFieldsSep>
          <SubFieldsSep>
            <span>{general.cluKey[language]}:</span>
            {clstrs.length === 0 && <span>-</span>}
            <SubFieldItems>
              {clstrs.map((val) => (
                <ModalItem key={val.column}>
                  <div>
                    <span>{val.column}</span>
                  </div>
                </ModalItem>
              ))}
            </SubFieldItems>
          </SubFieldsSep>
        </ModalSubTextsContainer>
        <ModalSubFields>
          <ModalSubtitle>
            {tableModalTranslations.tblOpt[language]}
          </ModalSubtitle>
        </ModalSubFields>
        <HrLine />
        <ModalSubTextsContainer>
          <span>{tableModalTranslations.dTtl[language]}: 0</span>
          <span>
            {tableModalTranslations.cluExp[language]}: {clusExp || "-"}
          </span>
        </ModalSubTextsContainer>
        <ModalSubFields>
          <ModalSubtitle>{general.idx[language]}</ModalSubtitle>
          <Button
            variant={2}
            text={general.newIdx[language]}
            disabled={false}
            onPress={() => setShowIndex(true)}
            medium
          />
        </ModalSubFields>
        <HrLine />
        {indices.length === 0 && (
          <EmptyContent>{general.noData[language]}</EmptyContent>
        )}
        <ModalSubItemsContainer>
          {indices.map((val) => (
            <ModalItem key={val.name}>
              <div>
                <span>{val.name}</span>
                <ModalItemCloseButton
                  title={tableModalTranslations.delIdx[language]}
                  onClick={() => removeIndex(val.name)}
                >
                  🗑️
                </ModalItemCloseButton>
              </div>
              <HrLine />
              <span>
                {general.knd[language]}: {val.kind}
              </span>
              <span>
                {general.ops[language]}: {val.options.join(", ")}
              </span>
            </ModalItem>
          ))}
        </ModalSubItemsContainer>
        <ModalDeleteButton>
          <Button
            variant={3}
            text={tableModalTranslations.delTbl[language]}
            disabled={false}
            onPress={deleteTable}
            tiny
          />
        </ModalDeleteButton>
      </ModalContainer>
    </ModalWrapper>
  );
};

export default TableModal;
