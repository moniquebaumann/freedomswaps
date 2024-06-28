import { FreedomSwaps } from "./freedom-swaps-deno-api.ts"

const tokenIn = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270" // Matic on Polygon POS
const tokenOut = "0x099471B71c9D8b0C6b616eE9A7C645e22cA9cfF7" // Freiheit on Polygon POS
const amountIn = 1
const poolFee = 10000
const slippage = 30

const freedomSwaps = await FreedomSwaps.getInstance()
await freedomSwaps.swap(tokenIn, tokenOut, amountIn, poolFee, slippage)