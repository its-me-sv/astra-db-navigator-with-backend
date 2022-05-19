import React, {useState, useEffect} from "react";

import {
  DatabaseContainer,
  KeyspacesContainer,
  KeyspaceHolder, KeyspaceName,
  HrLine, KeyspaceDc, EmptyContent
} from "./styles";
import {databasesTranslations, general} from '../../utils/translations.utils';
import {KeyspaceSchema} from "../../utils/types";

import {useLanguageContext} from '../../contexts/language.context';
import {useDatabaseContext} from '../../contexts/database.context';
import {useKeyspaceContext} from '../../contexts/keyspace.context';

import SearchField from '../../components/search-field';
import BlockLoader from "../../components/block-loader";
import DatabaseModal from "../../components/keyspace-modal";
import Button from "../../components/button";

interface KeyspacePageProps {}

const KeyspacePage: React.FC<KeyspacePageProps> = () => {
  const {language} = useLanguageContext();
  const {currDatabase: dbName} = useDatabaseContext();
  const {keyspaces, fetchKeyspaces, setKeyspace} = useKeyspaceContext();

  const [keyword, setKeyword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const applyFilter = (val: string) => setKeyword(val);
  const viewModal = () => setShowModal(true);
  const hideModal = () => setShowModal(false);

  useEffect(() => {
    if (dbName.length < 1) return;
    hideModal();
    setLoading(true);
    setTimeout(() => {
      fetchKeyspaces!(dbName);
      setLoading(false);
    }, 500);
  }, [dbName]);

  const filteredKeyspaces: Array<KeyspaceSchema> = keyspaces?.filter(
    ({ name }) => name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
  );

  return (
    <DatabaseContainer>
      {loading && <BlockLoader />}
      {showModal && <DatabaseModal onClose={hideModal} ls={setLoading} />}
      <SearchField
        cb={applyFilter}
        placeholder={databasesTranslations.searchPlaceholder[language]}
        live
      />
      {filteredKeyspaces.length === 0 && (
        <EmptyContent>{general.noData[language]}</EmptyContent>
      )}
      <KeyspacesContainer>
        {filteredKeyspaces.map((val, idx) => (
          <KeyspaceHolder key={idx} onClick={() => setKeyspace!(val.name)}>
            <KeyspaceName>{val.name}</KeyspaceName>
            <HrLine />
            <KeyspaceDc>
              {databasesTranslations.dc[language]}: {val.dataCenters || "-"}
            </KeyspaceDc>
          </KeyspaceHolder>
        ))}
        <Button
          variant={2}
          text={databasesTranslations.new[language]}
          onPress={viewModal}
          disabled={false}
        />
      </KeyspacesContainer>
    </DatabaseContainer>
  );
};

export default KeyspacePage;
