import { FreedomSwaps } from "https://deno.land/x/freedomswaps/mod.ts"

// Deno.args[0] // e.g. "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270" // Matic on Polygon POS
// Deno.args[1] // e.g. "0x099471B71c9D8b0C6b616eE9A7C645e22cA9cfF7" // Freiheit on Polygon POS
// Deno.args[2] // e.g. 1
// Deno.args[3] // e.g. 10000
// Deno.args[4] // e.g. 9
// Deno.args[5] // e.g. https://polygon-mainnet.g.alchemy.com/v2/...
// Deno.args[6] // e.g. <experiment with small amounts / wallets>

await FreedomSwaps.swapStatic() 