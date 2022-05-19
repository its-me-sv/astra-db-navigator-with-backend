import React from "react";

import {LocationContainer, LocationItem} from './styles';

import {useConnectionContext} from '../../contexts/connection.context';
import {useDatabaseContext} from '../../contexts/database.context';
import {useKeyspaceContext} from '../../contexts/keyspace.context';
import {useTableContext} from '../../contexts/table.context';

interface LocationProps {}

const Location: React.FC<LocationProps> = () => {
  const {screen} = useConnectionContext();
  const {currDatabase: database, setDatabase: setDb} = useDatabaseContext();
  const {currKeyspace, setKeyspace} = useKeyspaceContext();
  const {currTable, setTable} = useTableContext();

  return (
    <LocationContainer>
      <LocationItem 
        selected={screen === 1}
        onClick={() => {screen !== 1 && setDb!(database)}}
      >{database}</LocationItem>
      <span> / </span>
      {screen > 1 && (
        <LocationItem 
          selected={screen === 2}
          onClick={() => screen !== 2 && currKeyspace && setKeyspace!(currKeyspace?.name)}
        >{currKeyspace?.name}</LocationItem>
      )}
      {screen > 2 && (
        <>
          <span> / </span>
          <LocationItem 
            selected={screen === 3}
            onClick={() => screen !== 3 && currTable && setTable!(currTable?.name)}
          >{currTable?.name}</LocationItem>
          <span> / </span>
        </>
      )}
    </LocationContainer>
  );
};

export default Location;
