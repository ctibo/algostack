
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
  
}

export type DurationString = string;
export type CacheEntry = Record<string, any>;