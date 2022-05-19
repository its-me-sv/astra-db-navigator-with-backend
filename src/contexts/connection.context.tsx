import React, {createContext, ReactNode, useContext, useState} from 'react';

interface ConnectionContextInterface {
  appToken: string;
  keyspace: string;
  dbToken: string;
  table: string;
  screen: number;
  loading: boolean;
  resetConnection?: () => void;
  setLoading?: (val: boolean) => void;
  setScreen?: (val: number) => void;
  setAppToken?: (val: string) => void;
  setDbToken?: (val: string) => void;
}

const defaultState: ConnectionContextInterface = {
  appToken: '',
  keyspace: '',
  table: '',
  dbToken: '',
  screen: 0,
  loading: false
};

export const ConnectionContext = createContext<ConnectionContextInterface>(defaultState);

export const useConnectionContext = () => useContext(ConnectionContext);

export const ConnectionContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [appToken, setAppToken] = useState<string>(defaultState.appToken);
  const [keyspace, setKeyspace] = useState<string>(defaultState.keyspace);
  const [table, setTable] = useState<string>(defaultState.table);
  const [screen, setScreen] = useState<number>(defaultState.screen);
  const [loading, setLoading] = useState<boolean>(defaultState.loading);
  const [dbToken, setDbToken] = useState<string>(defaultState.dbToken);

  const resetConnection = () => {
    setLoading(true);
    setTimeout(() => {
      setAppToken("");
      setKeyspace("");
      setTable("");
      setScreen(0);
      setLoading(false);
    }, 500);
  };

  return (
    <ConnectionContext.Provider
      value={{
        appToken, loading, keyspace, table, screen,
        dbToken, resetConnection, setLoading,
        setScreen, setAppToken, setDbToken
      }}
    >{children}</ConnectionContext.Provider>
  );
};
