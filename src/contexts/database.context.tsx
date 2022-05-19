import React, {createContext, ReactNode, useContext, useState} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import {extractDatabases} from '../utils/extractors.utils';

import {useConnectionContext} from './connection.context';

interface DatabaseContextInterface {
  databases: Array<string>;
  currDatabase: string;
  loading: boolean;
  setCurrDatabase?: (val: string) => void;
  setLoading?: (val: boolean) => void;
  fetchDatabases?: (tkn: string) => void;
  resetState?: () => void;
  setDatabase?: (val: string) => void;
  addNewDb?: (val: string) => void;
}

const defaultState: DatabaseContextInterface = {
  databases: [],
  currDatabase: "",
  loading: false,
};

export const DatabaseContext = createContext<DatabaseContextInterface>(defaultState);

export const useDatabaseContext = () => useContext(DatabaseContext);

export const DatabaseContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const {setAppToken, setScreen, setDbToken} = useConnectionContext();

  const [databases, setDatabases] = useState<Array<string>>(defaultState.databases);
  const [currDatabase, setCurrDatabase] = useState<string>(defaultState.currDatabase);
  const [loading, setLoading] = useState<boolean>(defaultState.loading);

  const fetchDatabases = (tkn: string) => {
    if (tkn.length < 1) return;
    setLoading(true);
    axios.post(`/.netlify/functions/fetch-databases`, {tkn})
    .then(({data}) => {
      const retrievedDatabases: Array<string> = extractDatabases(data);
      if (retrievedDatabases.length > 0) {
        setDatabases(retrievedDatabases);
        currDatabase.length < 1 && setCurrDatabase(retrievedDatabases[0]);
        setAppToken!(tkn);
        setScreen!(1);
      } else {
        setDbToken!(tkn);
      }
      setLoading(false);
    })
    .catch((err) => {
      toast.error(err.response.data);
      setLoading(false);
    });
  };

  const resetState = () => {
    setDatabases([]);
    setCurrDatabase('');
    setLoading(false);
  };

  const setDatabase = (dbName: string) => {
    setCurrDatabase(dbName);
    setScreen!(1);
  };

  const addNewDb = (dbName: string) => {
    if (dbName.length < 1) return;
    setDatabases([...databases, dbName]);
  };

  return (
    <DatabaseContext.Provider
      value={{
        databases, currDatabase, loading,
        setLoading, fetchDatabases,
        resetState, setDatabase, addNewDb
      }}
    >{children}</DatabaseContext.Provider>
  );
};
