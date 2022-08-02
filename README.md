# ![AlgoStack.js](assets/algostack-badge.svg)


Everything you need to interact with the **Algorand** blockchain, all bundled together to make your life easier. **All modules are optional**, so you can make sure the compiled code is as small as possible.

## Table of Contents

- [📦 What's in there](#whats-bundled-in-the-stack)
- [⚡ Getting Started](#getting-started)
- [🔐 Connecting a wallet](/doc/client.md)
- [❌ Common issues](/doc/issues.md)


## What's bundled in the stack?
- [js-algorand-sdk](https://github.com/algorand/js-algorand-sdk)
- [myalgo-connect](https://github.com/randlabs/myalgo-connect)
- [walletconnect/client](https://github.com/WalletConnect/walletconnect-monorepo)
- [algorand-walletconnect-qrcode-modal](https://github.com/algorand/walletconnect-monorepo)




## ⚡ Getting Started

First, import the main package, and all modules you need. Then initiate your AlgoStack with the desired options and modules.

```ts
const algostack = new AlgoStack(options: OptionsProps, modules: PlugableModules)
```

Example: 

```js
import AlgoStack from 'algostack';
import Client from 'algostack/client';
import Txns from 'algostack/txns';
import Query from 'algostack/query';

const algostack = new AlgoStack(
  {
    convertCase: 'camelcase',
    apiUrl: 'https://testnet-api.algonode.cloud',
    indexerUrl: 'https://testnet-idx.algonode.cloud', 
  }, 
  { Client, Txns, Query }
  // ^ Same as... 
  // { 
  //   Client: Client, 
  //   Txns: Txns, 
  //   Query: Query,
  // }
);
```


### ⚙️ Options
```ts
interface OptionsProps {
  // Indexer and Node urls used to interact with the blockchain
  indexerUrl?: string, // default: 'https://mainnet-idx.algonode.cloud'
  apiUrl?: string, // default: 'https://mainnet-api.algonode.cloud'
  apiPort?: number,
  apiToken?: string,
  
  // The case to use for variables names. 
  // They'll be automatically converted when interacting with the blockchain.
  convertCase?: 'kebabcase' | 'snakecase' | 'camelcase' | 'none', // default: 'none'

  // Persist wallet connections, even after refreshing
  // Only available in browsers
  persistConnection?: boolean // default: true,
  storageNamespace?: string // default: 'algostack',
}
```


### 🔌 Plugable Modules

```ts
interface PlugableModules {
  // Connect to Algorand using popular wallets
  // Currently available: MyAglo, Pera Wallet
  Client?: ClientModule,
  
  // Create, sign, send transactions and wait for confirmation 
  Txns?: TxnsModule,

  // Get data from the blockchain
  // Currently using the indexers only
  Query?: QueryModule,
} 
```