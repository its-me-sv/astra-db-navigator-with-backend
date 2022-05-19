export const extractDatabases = (reqBody: any): Array<string> => {
  const databases: Array<string> = [];
  for (let database of reqBody)
    databases.push(`${database.id}/${database.info.name}`);
  return databases;
};