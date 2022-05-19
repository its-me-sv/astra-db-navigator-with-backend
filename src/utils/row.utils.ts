import {RowType} from "./types";

export const getRandomString = ():string => Math.random().toString(36).substring(2, 14);

export const getDummyRows = (columns: Array<string>, pageSize: number): Array<RowType> => {
  const rows: Array<RowType> = [];
  for (let i = 0; i < pageSize; i += 1) {
    const row: RowType = {};
    for (let column of columns)
      row[column] = Array(42).fill(getRandomString()).join('');
    rows.push(row);
  }
  return rows;
};

export const getFilteredRows = (rows: Array<RowType>, keyword: string): Array<RowType> => {
  const filteredRows: Array<RowType> = [];
  for (let row of rows) {
    if (Object.values(row).join(' ').toLowerCase().includes(keyword.toLowerCase()))
      filteredRows.push(row);
  }
  return filteredRows;
};
