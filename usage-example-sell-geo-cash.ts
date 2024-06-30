
import { FreedomSwaps } from "./mod.ts"
// import { FreedomSwaps } from "https://deno.land/x/freedomswaps@v1.4.0/mod.ts"

// const tokenIn = "0x099471B71c9D8b0C6b616eE9A7C645e22cA9cfF7" // Freiheit on Polygon POS
// const tokenIn = "0x0715184614ca1e90eafdf7a4d7fe33b046b47c02" // Friede on Polygon POS
const tokenIn = "0xb841a4f979f9510760ecf60512e038656e68f459" // Geo Cash on Polygon POS
const tokenOut = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270" // Matic on Polygon POS
const amountIn = 360
const poolFee = 10000
const slippage = 3
const providerURL = Deno.args[0]
const pkTestWallet = Deno.args[1]

if (providerURL === undefined || pkTestWallet === undefined) {
    throw new Error("parameter missing")
}
const freedomSwaps = await FreedomSwaps.getInstance(providerURL)
await freedomSwaps.swap(tokenIn, tokenOut, amountIn, poolFee, slippage, pkTestWallet)

// if you want to unwrap the wMatic to Matic, you can call:
await freedomSwaps.unwrap(pkTestWallet)