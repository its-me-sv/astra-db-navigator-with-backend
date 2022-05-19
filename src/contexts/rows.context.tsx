import React, {createContext, ReactNode, useContext, useState} from "react";

import {dummyColumns} from '../utils/dummy-data';
import {RowType} from '../utils/types';
import {getDummyRows} from '../utils/row.utils';

import {useConnectionContext} from './connection.context';

interface RowsContextInterface {
  columns: Array<string>;
  resColumns: Array<string>;
  currColumn: string;
  pageSize: string;
  rows: Array<RowType>;
  page: string | null;
  fetchColumns?: (tblName: string) => void;
  fetchRows?: (fromFilter?: boolean) => void;
  setCurrColumn?: (val: string) => void;
  setPageSize?: (val: string) => void;
  addColumn?: () => void;
  removeColumn?: (colName: string) => void;
  resetState?: () => void;
  deleteRow?: (idx: number) => void;
}

const defaultState: RowsContextInterface = {
  columns: [],
  resColumns: [],
  currColumn: '',
  pageSize: '5',
  rows: [],
  page: ""
};

export const RowsContext = createContext<RowsContextInterface>(defaultState);

export const useRowsContext = () => useContext(RowsContext);

export const RowsContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const {setLoading} = useConnectionContext();

  const [columns, setColumns] = useState<Array<string>>(defaultState.columns);
  const [resColumns, setResColumns] = useState<Array<string>>(defaultState.resColumns);
  const [currColumn, setCurrColumn] = useState<string>(defaultState.currColumn);
  const [pageSize, setPageSize] = useState<string>(defaultState.pageSize);
  const [rows, setRows] = useState<Array<RowType>>(defaultState.rows);
  const [page, setPage] = useState<string | null>(defaultState.page);

  const fetchColumns = (tableName: string) => {
    if (tableName.length < 1) return;
    setLoading!(true);
    setTimeout(() => {
      const availColumns = dummyColumns.map(({ name }) => name);
      setColumns(availColumns);
      setCurrColumn(availColumns[0]);
      setLoading!(false);
    }, 500);
  };

  const addColumn = () => {
    if (columns.length < 1) return;
    setResColumns([...resColumns, currColumn]);
    const nc: Array<string> = columns.filter((val) => val !== currColumn);
    setColumns(nc);
    setCurrColumn(nc[0]);
  };

  const removeColumn = (colName: string) => {
    setResColumns(resColumns.filter((val) => val !== colName));
    setColumns([...columns, colName]);
  };

  const fetchRows = (fromFilter: boolean = false) => {
    if (page === null) return;
    setLoading!(true);
    setTimeout(() => {
      if (fromFilter) {
        console.log("filtering");
        setRows(getDummyRows(resColumns, +pageSize));
      }
      else {
        if (rows.length > 0) {
          console.log("pagination");
          setRows([...rows, ...getDummyRows(resColumns, +pageSize)]);
        }
        else {
          console.log("first fetch");
          setRows(getDummyRows(resColumns, +pageSize));
        }
      }
      setPage('');
      setLoading!(false);
    }, 500);
  };

  const deleteRow = (idx: number) => {
    setLoading!(true);
    setTimeout(() => {
      setRows(rows.filter((_, index) => index !== idx));
      setLoading!(false);
    }, 500);
  };

  const resetState = () => {
    setColumns(defaultState.columns);
    setResColumns(defaultState.resColumns);
    setCurrColumn(defaultState.currColumn);
    setPageSize(defaultState.pageSize);
    setRows(defaultState.rows);
    setPage(defaultState.page);
  };

  return (
    <RowsContext.Provider value={{
      columns, resColumns, currColumn, pageSize, 
      rows, page,
      fetchColumns, setCurrColumn, addColumn,
      removeColumn, setPageSize, fetchRows,
      resetState, deleteRow
    }}>{children}</RowsContext.Provider>
  );
};
