# Freedomswaps

🦕 module to simplify uniswap interactions by leveraging smart contracts like [LightSpeedSwaps](https://polygonscan.com/address/0xf97F48B7b985F2389Aa2540B53757Ee0A92886B7) fostering the adoption of decentralized exchanges.  

Thanks to [brightinventions.pl](https://brightinventions.pl/blog/single-swap-on-uniswap-v3-with-3-common-mistakes).  

## Usage Examples Via TypeScript

### Exact Input

```ts 

import { FreedomSwaps } from "https://deno.land/x/freedomswaps/mod.ts"

const tokenIn = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270" // Matic on Polygon POS
const tokenOut = "0x099471B71c9D8b0C6b616eE9A7C645e22cA9cfF7" // Freiheit on Polygon POS
const amountIn = BigInt(1000000000000000000) // assuming 18 decimals this would swap 1 Coin
const poolFee = 10000
const slippage = 30
const providerURL = Deno.args[0]
const pkTestWallet = Deno.args[1]

if (providerURL === undefined || pkTestWallet === undefined) {
    throw new Error("parameter missing")
}

const freedomSwaps = await FreedomSwaps.getInstance(providerURL)
await freedomSwaps.swap(tokenIn, tokenOut, amountIn, poolFee, slippage, pkTestWallet)

```

### Exact Output

```ts 
import { FreedomSwaps } from "https://deno.land/x/freedomswaps/mod.ts"

const tokenIn = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270" // Matic on Polygon POS
const tokenOut = "0xb841a4f979f9510760ecf60512e038656e68f459" // Geld on Polygon POS
const amountOut = BigInt(1296000 * 10**18) // assuming 18 decimals 
const poolFee = 10000
const slippage = 9
const providerURL = Deno.args[0]
const pkTestWallet = Deno.args[1]

if (providerURL === undefined || pkTestWallet === undefined) {
    throw new Error("parameter missing")
}

const freedomSwaps = await FreedomSwaps.getInstance(providerURL)

await freedomSwaps.swapExactOutput(tokenIn, tokenOut, amountOut, poolFee, slippage, pkTestWallet)

```

## Usage Example Static Via Terminal

### Exact Input

```sh 

# deno run --allow-net --allow-read --allow-write --allow-env https://deno.land/x/freedomswaps/usage-example-exact-input-static.ts <tokenIn> <tokenOut> <amountIn> <poolFee> <slippage> <providerURL> <privateKeyTestWallet>
deno run --allow-net --allow-read --allow-write --allow-env https://deno.land/x/freedomswaps/usage-example-exact-input-static.ts 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270 0x099471B71c9D8b0C6b616eE9A7C645e22cA9cfF7 1000000000000000000 10000 9 https://polygon-mainnet.g.alchemy.com/v2/... <your experimental pk>

```

### Exact Output
# deno run --allow-net --allow-read --allow-write --allow-env https://deno.land/x/freedomswaps/usage-example-exact-output-static.ts <tokenIn> <tokenOut> <amountOut> <poolFee> <slippage> <providerURL> <privateKeyTestWallet>
deno run --allow-net --allow-read --allow-write --allow-env https://deno.land/x/freedomswaps/usage-example-exact-output-static.ts 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270 0x099471B71c9D8b0C6b616eE9A7C645e22cA9cfF7 1000000000000000000 10000 9 https://polygon-mainnet.g.alchemy.com/v2/... <your experimental pk>


## About us
We are [Friends of Satoshi](https://github.com/moniquebaumann/friends-of-satoshi).  

Chancellor on brink of second bailout for banks.  

![chancellor-on-brink-of-second-bailout-for-banks](https://github.com/moniquebaumann/freedom-cash-bot/assets/160405077/a8fd8989-a8d1-4a9d-9dc1-bd0f24196773)

![chancellor-on-brink-of-second-bailout-for-banks-starter](https://github.com/moniquebaumann/freedom-cash-bot/assets/160405077/1ed00195-9738-45bf-a807-4dff034947ff)  

We are [free](https://polygonscan.com/token/0xb841a4f979f9510760ecf60512e038656e68f459).  
