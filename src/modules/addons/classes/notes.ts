import BaseRunner from './_base.js';
import { Payload } from '../../query/index.js';
import { B64Decoder } from '../../../helpers/encoding.js';

export default class DecodeNotes extends BaseRunner {
  constructor (data: Payload) {
    super(data, ['transaction', 'transactions'], 'note', {});
  }

  async transactions(txns: Payload) {
    if (!Array.isArray(txns)) return
    for (let i=0; i<txns.length; i++) {
      const txn = txns[i];
      await this.transaction(txn)
    }
  }
  
  async transaction(txn: Payload) {
    if (!txn.note) return;
    const note = new B64Decoder(txn.note);
    this.save(txn, note);
  }
}