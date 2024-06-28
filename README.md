# Freedomswaps

This repository provides smart contracts like [Freedomswaps](https://polygonscan.com/address/0xA70f5023801F06A6a4C04695E794cf6e2ecCb34F) to simplify the provisioning of interfaces for decentralized exchanges.  

Thanks to [brightinventions.pl](https://brightinventions.pl/blog/single-swap-on-uniswap-v3-with-3-common-mistakes).  


## Deno API
### Usage Example 
```ts 
import { FreedomSwaps } from "./freedom-swaps-deno-api.ts"

const tokenIn = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270" // Matic on Polygon POS
const tokenOut = "0x099471B71c9D8b0C6b616eE9A7C645e22cA9cfF7" // Freiheit on Polygon POS
const amountIn = 1
const poolFee = 10000
const slippage = 30

const freedomSwaps = await FreedomSwaps.getInstance()
await freedomSwaps.swap(tokenIn, tokenOut, amountIn, poolFee, slippage)
```

### Execute Usage Example
```sh
git clone https://github.com/moniquebaumann/freedomswaps.git
cd freedomswaps/deno
deno run --allow-all usage-example.ts <your provider url> <your pk of an experimental testwallet>
```

## About us
We are [Friends of Satoshi](https://github.com/moniquebaumann/friends-of-satoshi).  

Chancellor on brink of second bailout for banks.  

![chancellor-on-brink-of-second-bailout-for-banks](https://github.com/moniquebaumann/freedom-cash-bot/assets/160405077/a8fd8989-a8d1-4a9d-9dc1-bd0f24196773)

![chancellor-on-brink-of-second-bailout-for-banks-starter](https://github.com/moniquebaumann/freedom-cash-bot/assets/160405077/1ed00195-9738-45bf-a807-4dff034947ff)  

We are [free](https://polygonscan.com/token/0xb841a4f979f9510760ecf60512e038656e68f459).  
