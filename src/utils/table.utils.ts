import {TableSchema, ColumnSchema, ClusterSchema} from './types';

export const addColumn = (tables: Array<TableSchema>, tblName: string): Array<TableSchema> => {
  const newTables: Array<TableSchema> = [];
  for (let table of tables) {
    if (table.name !== tblName) 
      newTables.push(table);
    else
      newTables.push({name: tblName, columns: (table.columns||0) + 1});
  }
  return newTables;
};

export const removeColumn = (tables: Array<TableSchema>, tblName: string): Array<TableSchema> => {
  const newTables: Array<TableSchema> = [];
  for (let table of tables) {
    if (table.name !== tblName) 
      newTables.push(table);
    else
      newTables.push({name: tblName, columns: (table.columns||0) - 1});
  }
  return newTables;
};

export const getRequestBody = (
  tblNameRef: React.MutableRefObject<HTMLInputElement>, 
  columns: Array<ColumnSchema>, 
  pars: Array<string>,
  clstrs: Array<ClusterSchema>, 
  ttlRef: React.MutableRefObject<HTMLInputElement>
): any => {
  return ({
    name: tblNameRef.current.value,
    columnDefinitions: columns.map(
      ({name, type: typeDefinition, static: stat }) => ({
        name,
        typeDefinition,
        static: stat,
      })
    ),
    primaryKey: {
      partitionKey: pars,
      clusteringKey: clstrs.map(({column}) => column),
    },
    tableOptions: {
      defaultTimeToLive: Number(ttlRef.current.value),
      clusteringExpression: clstrs
    },
  });
};
