import React, {useEffect} from "react";

import {
  Container, DataStaxLogo, 
  AstraDBLogo, HeaderRight
} from './styles';
import {mainHeaderTranslations} from '../../utils/translations.utils';

import {useLanguageContext} from '../../contexts/language.context';
import {useConnectionContext} from '../../contexts/connection.context';
import {useDatabaseContext} from '../../contexts/database.context';

import Button from "../button";
import Select from "../select";

interface MainHeaderProps {}

const MainHeader: React.FC<MainHeaderProps> = () => {
  const {language} = useLanguageContext();
  const {setScreen, setDbToken, appToken} = useConnectionContext();
  const {
    currDatabase, databases, 
    fetchDatabases, setDatabase
  } = useDatabaseContext();

  useEffect(() => {
    if (currDatabase.length < 1) return;
    fetchDatabases!(currDatabase);
    setScreen!(1);
  }, [currDatabase]);

  return (
    <Container>
      <a href="https://www.datastax.com/" target="_blank" rel="noreferrer">
        <DataStaxLogo />
        <AstraDBLogo />
      </a>
      <HeaderRight>
        <Select 
          options={databases}
          val={currDatabase}
          setVal={setDatabase!}
        />
        <Button
          variant={2}
          text={mainHeaderTranslations.createDB[language]}
          onPress={() => setDbToken!(appToken)}
          disabled={false}
          unfilled
          tiny
        />
      </HeaderRight>
    </Container>
  );
};

export default MainHeader;
