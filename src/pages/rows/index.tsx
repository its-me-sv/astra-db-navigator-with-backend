import React, {useEffect} from "react";

import {RowsContainer} from './styles';

import {useTableContext} from '../../contexts/table.context';
import {useRowsContext} from '../../contexts/rows.context';

import FilterArea from '../../components/filter-area';
import RowsArea from '../../components/rows-area';

interface RowsPageProps {}

const RowsPage: React.FC<RowsPageProps> = () => {
  const {currTable} = useTableContext();
  const {fetchColumns, resetState} = useRowsContext();

  useEffect(() => {
    if (!currTable || currTable.name.length < 1) return;
    fetchColumns!(currTable.name);
  }, [currTable]);

  useEffect(() => {
    return () => resetState!();
  }, []);

  return (
    <RowsContainer>
      <FilterArea />
      <RowsArea />
    </RowsContainer>
  );
};

export default RowsPage;
