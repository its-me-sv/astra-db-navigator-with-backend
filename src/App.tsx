import React, {useEffect, useRef} from 'react';
import toast, {Toaster} from 'react-hot-toast';

import {useConnectionContext} from './contexts/connection.context';
import {useDatabaseContext} from './contexts/database.context';
import {useKeyspaceContext} from './contexts/keyspace.context';
import {useTableContext} from './contexts/table.context';
import {useTypeContext} from './contexts/type.context';

import BlockLoader from './components/block-loader';
import DatabaseModal from './components/database-modal';

import HomePage from './pages/home';
import MainPage from './pages/main';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const {loading, appToken, dbToken} = useConnectionContext();
  const {loading: databaseLoading} = useDatabaseContext();
  const {loading: keyspaceLoading} = useKeyspaceContext();
  const {loading: tableLoading} = useTableContext();
  const {loading: typeLoading} = useTypeContext();
  const prompted = useRef<boolean>(false);

  useEffect(() => {
    if (prompted.current) return;
    toast("This product is not part of the datastax cloud offering", {
      icon: "ℹ️",
      duration: 5000,
      position: "top-right"
    });
    prompted.current = true;
  }, []);
  
  return (
    <>
      <Toaster />
      {(loading || databaseLoading || keyspaceLoading || tableLoading || typeLoading) 
      && <BlockLoader />}
      {dbToken && <DatabaseModal />}
      {!(appToken.length > 0) ? <HomePage /> : <MainPage />}
    </>
  );
};

export default App;
