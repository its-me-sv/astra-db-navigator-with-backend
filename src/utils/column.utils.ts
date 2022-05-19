import {collections, nonMapCollections} from './dummy-data';
import {ColumnSchema, ClusterSchema} from './types';

const allCollections: Array<string> = [...collections, ...nonMapCollections];

export const generateColumnTypeDefinition = (
  type: string, frozen: boolean, depth: number, 
  colTyp: string, key: string, value: string
):string => {
  if (!allCollections.includes(type)) return type;
  if (type === 'tuple') return `tuple<${colTyp}>`;
  let result = '';
  if (type === 'set') result = `set<${colTyp}>`;
  if (type === 'map') result = `map<${key}, ${value}>`;
  if (type === 'list') {
    result = `${colTyp}`;
    for (let i = 1; i <= depth; i += 1)
      result = `list<${result}>`;
  }
  if (frozen) result = `frozen<${result}>`;
  return result;
};

export const getAvailbaleColumns = (
  columns: Array<ColumnSchema>,
  partitions: Array<string>,
  clustering: Array<ClusterSchema>
):Array<string> => {
  const result: Array<string> = [];
  for (let {name} of columns) {
    if (partitions.findIndex(val => val === name) !== -1) continue;
    if (clustering.findIndex(({column}) => column === name) !== -1) continue;
    result.push(name);
  }
  return result;
};
