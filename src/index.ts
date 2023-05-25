import type { Configs } from './utils/options.js';
import type Client from './modules/client/index.js';
import type Txns from './modules/txns/index.js';
import type NFDs from './modules/nfds/index.js';
import type Cache from './modules/cache/index.js';
import type Query from './modules/query/index.js';
import type Medias from './modules/medias/index.js';
import type { LookupMethods, SearchMethods } from './modules/query/index.js';
import type { PlugableModules } from './types.js';
import merge from 'lodash/merge.js';
import defaultConfigs from './utils/options.js';

export type { Configs } from './utils/options.js';
export * from './types.js';
export * from './enums.js';


export default class AlgoStack {
  // Utils
  public configs: Configs;

  // Modules
  public client?: Client;
  public txns?: Txns;
  public query?: Query;
  public nfds?: NFDs;
  public medias?: Medias;
  public cache?: Cache;
  
  // Methods
  public lookup?: LookupMethods;
  public search?: SearchMethods;


  constructor (configs?: Configs, modules: PlugableModules = {}) {
    
    this.configs = merge(defaultConfigs, configs);

    // Add modules
    if (modules.cache && typeof window !== 'undefined') this.cache = modules.cache;

    if (modules.nfds) this.nfds = modules.nfds.init(this);
    if (modules.client) this.client = modules.client.init(this);
    if (modules.txns) this.txns = modules.txns.init(this);
    if (modules.medias) this.medias = modules.medias.init(this);
    if (modules.query) {
      this.query = modules.query.init(this);
      this.lookup = this.query.lookup;
      this.search = this.query.search;
    } 

    // init cache after every other modules
    if (this.cache) this.cache.init(this);

  }
}
