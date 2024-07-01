import { FreedomSwaps } from "https://deno.land/x/freedomswaps/mod.ts"

const tokenIn = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270" // Matic on Polygon POS
const tokenOut = "0x099471B71c9D8b0C6b616eE9A7C645e22cA9cfF7" // Freiheit on Polygon POS
const amountIn = 1
const poolFee = 10000
const slippage = 9
const providerURL = Deno.args[0]
const pkTestWallet = Deno.args[1]

if (providerURL === undefined || pkTestWallet === undefined) {
    throw new Error("parameter missing")
}

const freedomSwaps = await FreedomSwaps.getInstance(providerURL)
await freedomSwaps.swap(tokenIn, tokenOut, amountIn, poolFee, slippage, pkTestWallet)