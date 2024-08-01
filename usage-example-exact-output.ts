// import { FreedomSwaps } from "https://deno.land/x/freedomswaps/mod.ts"
import { FreedomSwaps } from "./mod.ts"

const tokenIn = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270" // Matic on Polygon POS
const tokenOut = "0xb841a4f979f9510760ecf60512e038656e68f459" // Geld on Polygon POS
const amountOut = BigInt(1 * 10**18) // assuming 18 decimals 
const poolFee = 10000
const slippage = 9
const providerURL = Deno.args[0]
const pkTestWallet = Deno.args[1]

if (providerURL === undefined || pkTestWallet === undefined) {
    throw new Error("parameter missing")
}

const freedomSwaps = await FreedomSwaps.getInstance(providerURL)

await freedomSwaps.swapExactOutput(tokenIn, tokenOut, amountOut, poolFee, slippage, pkTestWallet)

