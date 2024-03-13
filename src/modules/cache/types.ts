import { TransactionMode } from "dexie";
import { PromiseResolver } from "../query";

export interface CacheConfigs {
  namespace?: string,
  // Custom Cache Stores
  // For custom query endpoints, 
  // ...or anything else you want to cache using the cache module
  // cache will be indexed using the params object
  stores?: (string|{ name: string, index: string })[],
  
  // Cache expiration 
  // Format: 1w, 1d, 1h, 1m, 1s, 1ms 
  // Works with custom stores too!
  expiration?: {
    default?: DurationString,
    [k:string]: DurationString,
  },
  
  // Auto prune the cache at X interval
  pruningInterval?: DurationString,

  // A list of stores to persist when pruning
  persist?: string[],
  
  // logs
  logExpiration?: boolean,
}

export type DurationString = string|'never';

export type CacheEntry = Record<string, any>;
export type CacheWhere = Record<string, any>; 
export type CacheFilter = (entry: CacheEntry) => boolean;
export interface CacheQuery {
  where?: CacheWhere,
  filter?: CacheFilter,
  limit?: number,
  orderBy?: string,
  order?: 'asc'|'ASC'|'desc'|'DESC',
  includeExpired?: boolean, 
}

export interface IdbTxn<T> {
  scope: TransactionMode,
  stores: string|string[],
  txn: () => Promise<T>,
  resolve: PromiseResolver,
}