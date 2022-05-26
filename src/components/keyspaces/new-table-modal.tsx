import React, {useState, useRef, MutableRefObject} from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
  ModalWrapper, ModalContainer,
  ModalCloseButton, ModalTitle,
  ModalSubFields, ModalSubtitle,
  HrLine, ModalSubItemsContainer,
  ModalItem, ModalItemCloseButton,
  ModalDeleteButton, ModalSubTextsContainer,
  SubFieldsSep, SubFieldItems
} from './styles';
import {StyledInput} from '../input/styles';
import {EmptyContent} from '../../pages/keyspace/styles';
import {ColumnSchema, NewColumn, ClusterSchema, PrimaryKeyType} from '../../utils/types';
import {
  keyspacesTranslations, general, tableModalTranslations,
  newTableTranslations
} from '../../utils/translations.utils';
import {getAvailbaleColumns} from "../../utils/column.utils";
import {getRequestBody} from "../../utils/table.utils";

import {useLanguageContext} from '../../contexts/language.context';
import {useTableContext} from '../../contexts/table.context';
import {useTypeContext} from '../../contexts/type.context';
import {useDeleteContext} from '../../contexts/delete.context';
import {useConnectionContext} from "../../contexts/connection.context";
import {useDatabaseContext} from '../../contexts/database.context';
import {useKeyspaceContext} from '../../contexts/keyspace.context';

import Button from '../button';
import ColumnModal from "./column-modal";
import PrimaryKeyModal from './primary-key-modal';

interface NewTableModalProps {
 onClose: () => void;
}

const NewTableModal: React.FC<NewTableModalProps> = ({onClose}) => {
  const {language} = useLanguageContext();
  const {setLoading: ls, addTbl} = useTableContext();
  const {types} = useTypeContext();
  const {setText, deleteCb, secure} = useDeleteContext();
  const {appToken: tkn} = useConnectionContext();
  const {currDatabase} = useDatabaseContext();
  const {currKeyspace} = useKeyspaceContext();

  const [columns, setColumns] = useState<Array<ColumnSchema>>([]);
  const [showColumn, setShowColumn] = useState<boolean>(false);
  const [pars, setPars] = useState<Array<string>>([]);
  const [clstrs, setClstrs] = useState<Array<ClusterSchema>>([]);
  const [showPriKey, setShowPriKey] = useState<PrimaryKeyType>('NONE');
  const newColRef = useRef<NewColumn>({name: '', typeDefinition: "ascii", static: false});
  const tblNameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const ttlRef = useRef() as MutableRefObject<HTMLInputElement>;

  const hideColumnModal = () => setShowColumn(false);

  const addColumn = () => {
    const newCol: ColumnSchema = {
      name: newColRef.current.name,
      type: newColRef.current.typeDefinition,
      static: newColRef.current.static as boolean
    };
    setColumns([...columns, newCol]);
  };

  const removeColumn = (colName: string) => {
    secure!.current = "";
    deleteCb!.current = () => {
      setColumns(columns.filter(({name}) => name !== colName));
      setPars(pars.filter((name) => name !== colName));
      setClstrs(clstrs.filter(({column}) => column !== colName));
      setText!('');
    };
    setText!(`${general.delete[language]} ${general.column[language].toLowerCase()} ${colName}?`);
  };

  const addPar = (parName: string) => {
    if (parName.length < 1) return;
    setPars([...pars, parName]);
  };

  const remPar = (parName: string) => {
    secure!.current = "";
    deleteCb!.current = () => {
      setPars(pars.filter(name => name !== parName));
      setText!('');
    };
    setText!(`${general.delete[language]} partition key ${parName}?`);
  };

  const addClstr = (val: ClusterSchema) => {
    setClstrs([...clstrs, val]);
  };

  const remClstr = (clName: string) => {
    secure!.current = "";
    deleteCb!.current = () => {
      setClstrs(clstrs.filter(({column}) => column !== clName));
      setText!("");
    };
    setText!(`${general.delete[language]} clustering key ${clName}?`);
  };

  const createTable = () => {
    if (tblNameRef.current?.value.length < 1 ||
    columns.length < 1 ||
    pars.length < 1) return;
    if (tblNameRef.current?.value.search(/^[a-zA-Z0-9_]+$/) === -1) return;
    if (ttlRef.current?.value.length > 0 
        && !Number(ttlRef.current.value)) return;
    ls!(true);
    const reqBody = getRequestBody(tblNameRef, columns, pars, clstrs, ttlRef);
    axios
      .post(`/.netlify/functions/create-table`, {
        tkn,
        dbId: currDatabase.split("/")[0],
        dbRegion: currDatabase.split("/")[1],
        ksName: currKeyspace?.name,
        reqBody,
      })
      .then(({data}) => {
        ls!(false);
        toast.success(data);
        addTbl!(tblNameRef.current.value, columns.length);
        onClose();
      })
      .catch((err) => {
        ls!(false);
        toast.error(err.response.data);
      });
  };

  const clusExp: string = clstrs
    .map((val) => `${val.column}(${val.order})`)
    .join(", ");
  const availCols: Array<string> = getAvailbaleColumns(columns, pars, clstrs);

  return (
    <ModalWrapper>
      {showColumn && (
        <ColumnModal
          onClose={hideColumnModal}
          types={types.map(({ name }) => name)}
          newCol={newColRef}
          ls={ls!}
          ac={addColumn}
          fromNewTbl={true}
        />
      )}
      {showPriKey !== "NONE" && (
        <PrimaryKeyModal
          type={showPriKey}
          onClose={() => setShowPriKey("NONE")}
          parCb={addPar}
          cluCb={addClstr}
          columns={availCols}
        />
      )}
      <ModalContainer fromNew>
        <ModalCloseButton onClick={onClose}>X</ModalCloseButton>
        <ModalTitle>
          <StyledInput
            placeholder={keyspacesTranslations.tableSearchPlaceholder[language]}
            ref={tblNameRef}
          />
        </ModalTitle>
        <ModalSubFields>
          <ModalSubtitle>{general.columns[language]}</ModalSubtitle>
          <Button
            variant={2}
            text={newTableTranslations.addCol[language]}
            disabled={false}
            onPress={() => setShowColumn(true)}
            medium
          />
        </ModalSubFields>
        <HrLine />
        {columns.length === 0 && (
          <EmptyContent>{newTableTranslations.noCol[language]}</EmptyContent>
        )}
        <ModalSubItemsContainer>
          {columns.map((val) => (
            <ModalItem key={val.name}>
              <div>
                <span>{val.name}</span>
                <ModalItemCloseButton
                  title={tableModalTranslations.delCol[language]}
                  onClick={() => removeColumn(val.name)}
                >
                  🗑️
                </ModalItemCloseButton>
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
          <ModalSubFields withGap>
            <Button
              variant={5}
              text={newTableTranslations.addParKey[language]}
              disabled={columns.length === 0 || availCols.length === 0}
              onPress={() => setShowPriKey("PARTITION")}
              medium
            />
            <Button
              variant={4}
              text={newTableTranslations.addClsKey[language]}
              disabled={columns.length === 0 || availCols.length === 0}
              onPress={() => setShowPriKey("CLUSTERING")}
              medium
            />
          </ModalSubFields>
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
                    <ModalItemCloseButton
                      title={tableModalTranslations.delCol[language]}
                      onClick={() => remPar(val)}
                    >
                      🗑️
                    </ModalItemCloseButton>
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
                    <ModalItemCloseButton
                      title={tableModalTranslations.delCol[language]}
                      onClick={() => remClstr(val.column)}
                    >
                      🗑️
                    </ModalItemCloseButton>
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
          <SubFieldsSep>
            <span>{tableModalTranslations.dTtl[language]}:</span>
            <StyledInput
              ref={ttlRef}
              placeholder={newTableTranslations.ttl[language]}
              tiny
            />
          </SubFieldsSep>
          <span>
            {tableModalTranslations.cluExp[language]}: {clusExp || "-"}
          </span>
        </ModalSubTextsContainer>
        <ModalDeleteButton>
          <Button
            variant={2}
            text={newTableTranslations.crtTbl[language]}
            disabled={columns.length === 0 || pars.length === 0}
            onPress={createTable}
            medium
          />
        </ModalDeleteButton>
      </ModalContainer>
    </ModalWrapper>
  );
};

export default NewTableModal;
