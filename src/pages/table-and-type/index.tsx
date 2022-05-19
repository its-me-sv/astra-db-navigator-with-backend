import React, {useState, useEffect} from "react";

import {
  KeyspaceContainer, Seperator, SeperatorTitle,
  ContentContainer, ItemHolder, ItemName, Info,
  HrLine, ItemSubfield
} from './styles';
import {EmptyContent} from '../keyspace/styles';
import {keyspacesTranslations, general} from '../../utils/translations.utils';
import {TableSchema, TypeSchema} from '../../utils/types';

import {useLanguageContext} from '../../contexts/language.context';
import {useKeyspaceContext} from '../../contexts/keyspace.context';
import {useTableContext} from '../../contexts/table.context';
import {useTypeContext} from '../../contexts/type.context';

import BlockLoader from '../../components/block-loader';
import Button from '../../components/button';
import SearchField from '../../components/search-field';
import TableModal from '../../components/keyspaces/table-modal';
import TypeModal from "../../components/keyspaces/type-modal";
import NewTableModal from '../../components/keyspaces/new-table-modal';
import NewTypeModal from '../../components/keyspaces/new-type-modal';

interface TableAndTypePageProps {}

const TableAndTypePage: React.FC<TableAndTypePageProps> = () => {
  const {language} = useLanguageContext();
  const {currKeyspace} = useKeyspaceContext();
  const {setTable, tables, fetchTables} = useTableContext();
  const {types, fetchTypes} = useTypeContext();

  const [currTable, setCurrTable] = useState<string>('');
  const [currType, setCurrType] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [tableKeyword, setTableKeyword] = useState<string>('');
  const [typeKeyword, setTypeKeyword] = useState<string>('');
  const [newTable, setNewTable] = useState<boolean>(false);
  const [newType, setNewType] = useState<boolean>(false);

  const applyTableFilter = (val: string) => setTableKeyword(val);
  const applyTypeFilter = (val: string) => setTypeKeyword(val);
  const closeTableModal = () => setCurrTable('');
  const closeTypeModal = () => setCurrType('');
  const closeNewTableModal = () => setNewTable(false);
  const closeNewTypeModal = () => setNewType(false);

  useEffect(() => {
    if (currKeyspace === null) return;
    if (currKeyspace?.name.length < 1) return;
    setLoading(true);
    setTimeout(() => {
      fetchTables!(currKeyspace.name);
      fetchTypes!(currKeyspace.name);
      setLoading(false);
    }, 500);
  }, [currKeyspace]);

  const filteredTables: Array<TableSchema> = tables
  ?.filter(({name}) => name.toLocaleLowerCase().includes(tableKeyword.toLocaleLowerCase()));
  const filteredTypes: Array<TypeSchema> = types
  ?.filter(({name}) => name.toLocaleLowerCase().includes(typeKeyword.toLocaleLowerCase()));

  return (
    <KeyspaceContainer>
      {loading && <BlockLoader />}
      {currTable.length > 0 && (
        <TableModal
          tableName={currTable}
          onClose={closeTableModal}
          ls={setLoading}
          types={types.map(({ name }) => name)}
        />
      )}
      {currType.length > 0 && (
        <TypeModal
          typeName={currType}
          ls={setLoading}
          onClose={closeTypeModal}
        />
      )}
      {newTable && <NewTableModal onClose={closeNewTableModal} />}
      {newType && <NewTypeModal onClose={closeNewTypeModal} />}
      <Seperator>
        <SeperatorTitle>{keyspacesTranslations.hd1[language]}</SeperatorTitle>
        <SearchField
          cb={applyTableFilter}
          placeholder={keyspacesTranslations.tableSearchPlaceholder[language]}
          live
        />
        {filteredTables.length === 0 && (
          <EmptyContent>{general.noData[language]}</EmptyContent>
        )}
        <ContentContainer>
          {filteredTables.map((val, idx) => (
            <ItemHolder key={idx} onClick={() => setTable!(val.name)}>
              <ItemName>
                {val.name}
                <Info
                  onClick={(event) => {
                    event.stopPropagation();
                    setCurrTable(val.name);
                  }}
                  title={keyspacesTranslations.tblInf[language]}
                />
              </ItemName>
              <HrLine />
              <ItemSubfield>
                {keyspacesTranslations.col[language]}: {val.columns}
              </ItemSubfield>
            </ItemHolder>
          ))}
          <Button
            variant={2}
            text={keyspacesTranslations.newTable[language]}
            onPress={() => setNewTable(true)}
            disabled={false}
          />
        </ContentContainer>
      </Seperator>
      <Seperator>
        <SeperatorTitle>{keyspacesTranslations.hd2[language]}</SeperatorTitle>
        <SearchField
          cb={applyTypeFilter}
          placeholder={keyspacesTranslations.typeSearchPlaceholder[language]}
          live
        />
        {filteredTypes.length === 0 && (
          <EmptyContent>{general.noData[language]}</EmptyContent>
        )}
        <ContentContainer>
          {filteredTypes.map((val, idx) => (
            <ItemHolder key={idx} onClick={() => setCurrType(val.name)}>
              <ItemName>{val.name}</ItemName>
              <HrLine />
              <ItemSubfield>
                {keyspacesTranslations.field[language]}: {val.fields}
              </ItemSubfield>
            </ItemHolder>
          ))}
          <Button
            variant={2}
            text={keyspacesTranslations.newType[language]}
            onPress={() => setNewType(true)}
            disabled={false}
          />
        </ContentContainer>
      </Seperator>
    </KeyspaceContainer>
  );
};

export default TableAndTypePage;
