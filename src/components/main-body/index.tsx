import React from "react";

import {useConnectionContext} from '../../contexts/connection.context';
import {useDeleteContext} from '../../contexts/delete.context';

import KeyspacePage from "../../pages/keyspace";
import TableAndTypePage from "../../pages/table-and-type";
import RowsPage from "../../pages/rows";

import Location from '../location';
import DeleteModal from "../delete-modal";

interface MainBodyProps {}

const MainBody: React.FC<MainBodyProps> = () => {
  const {screen} = useConnectionContext();
  const {text} = useDeleteContext();

  return (
    <div>
      <Location />
      {screen === 1 && <KeyspacePage />}
      {screen === 2 && <TableAndTypePage />}
      {screen === 3 && <RowsPage />}
      {text.length > 1 && <DeleteModal />}
    </div>
  );
};

export default MainBody;
