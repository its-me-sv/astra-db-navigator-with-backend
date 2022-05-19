export interface KeyspaceSchema {
  name: string;
  dataCenters?: number;
}

export interface TableSchema {
  name: string;
  columns?: number;
}

export interface TypeSchema {
  name: string;
  fields: number;
}

export interface ColumnSchema {
  name: string;
  type: string;
  static: boolean;
}

export interface IndexSchema {
  name: string;
  kind: string;
  options: Array<string>
}

export interface NewColumn {
  name: string;
  typeDefinition: string;
}

export interface ClusterSchema {
  column: string;
  order: "ASC" | "DESC";
}

export interface FieldSchema {
  name: string;
  type: string;
}

export interface ZoneSchema {
  displayName: string;
  name: string;
}

export type RegionSchema = {
  [key in CloudProviders]: Array<ZoneSchema>;
}


export type PrimaryKeyType = 'NONE' | 'PARTITION' | 'CLUSTERING';

export type OrdersType = "ASC" | "DESC";

export type CloudProviders = 'AWS' | 'GCP';

export type RowType = {
  [key:string]: any;
}
