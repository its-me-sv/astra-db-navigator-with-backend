import React from "react";

import {mainTranslations} from '../../utils/translations.utils';
import {ButtonWrapper, MainFooter as Container} from './styles';

import Languages from '../languages';
import Button from "../button";

import {useLanguageContext} from '../../contexts/language.context';
import {useConnectionContext} from '../../contexts/connection.context';
import {useDatabaseContext} from '../../contexts/database.context';
import {useKeyspaceContext} from '../../contexts/keyspace.context';
import {useTableContext} from '../../contexts/table.context';
import {useTypeContext} from '../../contexts/type.context';
import {useRowsContext} from '../../contexts/rows.context';

interface MainFooterProps {}

const MainFooter: React.FC<MainFooterProps> = () => {
  const {language} = useLanguageContext();
  const {resetConnection} = useConnectionContext();
  const {resetState: resetDBState} = useDatabaseContext();
  const {resetState: resetKeyspaceState} = useKeyspaceContext();
  const {resetState: resetTableState} = useTableContext();
  const {resetState: resetType} = useTypeContext();
  const {resetState: resetRows} = useRowsContext();

  const resetAllState = () => {
    resetConnection!();
    resetDBState!();
    resetKeyspaceState!();
    resetTableState!();
    resetType!();
    resetRows!();
  };

  return (
    <Container>
      <ButtonWrapper>
        <Button
          variant={3}
          text={mainTranslations.disconnectButton[language]}
          disabled={false}
          onPress={resetAllState}
          unfilled
          tiny
        />
      </ButtonWrapper>
      <a
        href="https://docs.datastax.com/en/astra/docs/db-glossary.html"
        target="_blank"
        rel="noreferrer"
      >
        📜 {mainTranslations.docs[language]}
      </a>
      <Languages />
    </Container>
  );
};

export default MainFooter;
