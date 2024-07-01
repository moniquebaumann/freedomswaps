import { FreedomSwaps } from "https://deno.land/x/freedomswaps/mod.ts"

const tokenIn = Deno.args[0] // e.g. "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270" // Matic on Polygon POS
const tokenOut = Deno.args[1] // e.g. "0x099471B71c9D8b0C6b616eE9A7C645e22cA9cfF7" // Freiheit on Polygon POS
const amountIn = Deno.args[2] // e.g. 1
const poolFee = Deno.args[3] // e.g. 10000
const slippage = Deno.args[4] // e.g. 9
const providerURL = Deno.args[5] // e.g. https://polygon-mainnet.g.alchemy.com/v2/...
const pkTestWallet = Deno.args[6] // e.g. <experiment with small amounts / wallets>

await FreedomSwaps.swapStatic()