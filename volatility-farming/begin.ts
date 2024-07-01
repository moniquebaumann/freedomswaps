import { VolatilityFarmer, getLogger } from "../mod.ts";

const sleepTime = Deno.args[0] // e.g. 9
const historyLength = Deno.args[1] // e.g. 360
const volatilityLevel = Deno.args[2] // e.g. 2
const providerURL = Deno.args[3]
const pkTestWallet = Deno.args[4]
const volatilityFarmer = await VolatilityFarmer.getInstance(historyLength, sleepTime, await getLogger(), providerURL)
volatilityFarmer.startTheParty(historyLength, volatilityLevel, pkTestWallet)
