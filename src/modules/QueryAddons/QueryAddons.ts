import AlgoStack from '../../index.js';
import Options from '../../utils/options.js';
import type NFDs from '../NFDs/index.js';
import type { Payload } from '../Query/index.js';
import addonsClasses from './addons/index.js';
import { Addon } from './enums.js';

//
// QUERY ADDONS class
// ----------------------------------------------
export default class Addons {
  protected options: Options;
  public nfds?: NFDs;
  constructor(forwarded: AlgoStack) {
    this.options = forwarded.options;
    this.nfds = forwarded.nfds;
  }



  /**
   * Check for addons
   * ==================================================
   */
  public async apply(data: Payload, addons: Addon[]) {
    for (let i=0; i<addons.length; i++) {
      if (!addonsClasses[addons[i]]) continue;
      const addon = new addonsClasses[addons[i]](data);
      await addon.run();
    }
    return data;
  }

  
}
