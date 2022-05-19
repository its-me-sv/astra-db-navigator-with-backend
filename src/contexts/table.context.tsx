import React, {createContext, ReactNode, useContext, useState} from 'react';

import {TableSchema} from '../utils/types';
import {dummyTables} from '../utils/dummy-data';
import {addColumn, removeColumn} from '../utils/table.utils';

import {useConnectionContext} from './connection.context';

interface TableContextInterface {
  tables: Array<TableSchema>;
  currTable: TableSchema | null;
  loading: boolean;
  setCurrTable?: (val: TableSchema | null) => void;
  setLoading?: (val: boolean) => void;
  fetchTables?: (val: string) => void;
  resetState?: () => void;
  setTable?: (val: string) => void;
  removeTable?: (val: string) => void;
  incCol?: (val: string) => void;
  decCol?: (val: string) => void;
  addTbl?: (name: string, columns: number) => void;
}

const defaultState: TableContextInterface = {
  tables: [],
  currTable: null,
  loading: false,
};

export const TableContext = createContext<TableContextInterface>(defaultState);

export const useTableContext = () => useContext(TableContext);

export const TableContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const {setScreen} = useConnectionContext();

  const [tables, setTables] = useState<Array<TableSchema>>(defaultState.tables);
  const [currTable, setCurrTable] = useState<TableSchema | null>(defaultState.currTable);
  const [loading, setLoading] = useState<boolean>(defaultState.loading);

  const fetchTables = (ksName: string) => {
    if (ksName.length < 1) return;
    setLoading(true);
    setTimeout(() => {
      setTables(dummyTables);
      setLoading(false);
    }, 500);
  };

  const setTable = (tblName: string) => {
    if (tblName.length < 1) return;
    setCurrTable({name: tblName});
    setScreen!(3);
  };

  const removeTable = (tblName: string) => {
    if (tblName.length < 1) return;
    setTables(tables.filter(({name}) => name !== tblName));
  };

  const addTbl = (name: string, columns: number) => {
    setTables([...tables, {name, columns}]);
  };

  const incCol = (tblName: string) => {
    if (tblName.length < 1) return;
    setTables(addColumn(tables, tblName));
  };

  const decCol = (tblName: string) => {
    if (tblName.length < 1) return;
    setTables(removeColumn(tables, tblName));
  };

  const resetState = () => {
    setTables([]);
    setCurrTable(null);
    setLoading(false);
  };

  return (
    <TableContext.Provider
      value={{
        tables, currTable, loading,
        setCurrTable, setLoading, fetchTables,
        resetState, setTable, removeTable,
        incCol, decCol, addTbl
      }}
    >{children}</TableContext.Provider>
  );
};
