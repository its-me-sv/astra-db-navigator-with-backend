import {RegionSchema, CloudProviders, KeyspaceSchema} from "./types";

export const extractDatabases = (reqBody: any): Array<string> => {
  const databases: Array<string> = [];
  for (let database of reqBody)
    databases.push(`${database.id}/${database.info.region}/${database.info.name}`);
  return databases;
};

export const extractRegions = (reqBody: any): RegionSchema => {
  const regions: RegionSchema = {AWS: [], GCP: []};
  for (let region of reqBody) {
    if (region.cloudProvider === "AZURE") continue;
    regions[region.cloudProvider as CloudProviders].push({
      name: region.name,
      displayName: region.displayName
    });
  }
  return regions;
};

export const extractKeyspaces = (reqBody: any): Array<KeyspaceSchema> => {
  const keyspaces: Array<KeyspaceSchema> = [];
  for (let keyspace of reqBody) 
    keyspaces.push({name: keyspace.name, dataCenters: keyspace?.datacenters?.length || '-'});
  return keyspaces;
};
