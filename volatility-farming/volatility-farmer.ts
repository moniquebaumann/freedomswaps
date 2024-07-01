// I buy and sell https://FreedomCash.org 

import { DecisionHelper, FreedomSwaps, Geld, Matic } from "../mod.ts"
import { sleep } from "https://deno.land/x/sleep@v1.3.0/mod.ts"
import { Logger } from 'https://deno.land/x/log@v1.1.1/mod.ts'

export class VolatilityFarmer {

    public static instance: VolatilityFarmer

    public static async getInstance(historyLength: number, sleepTime: number, logger: Logger, providerURL: string): Promise<VolatilityFarmer> {
        if (VolatilityFarmer.instance == undefined) {
            const decisionHelper = new DecisionHelper(historyLength, logger)
            const freedomSwaps = await FreedomSwaps.getInstance(providerURL)
            VolatilityFarmer.instance = new VolatilityFarmer(sleepTime, decisionHelper, logger, freedomSwaps)
        }
        return VolatilityFarmer.instance
    }

    private readonly freedomCashRocks = true
    private readonly poolFee = 10000
    private readonly slippage = 1
    private sleepTime
    private partyIsOn = false
    private roundIsActive = false
    private decisionHelper: DecisionHelper
    private logger: Logger
    private freedomSwaps: FreedomSwaps

    private constructor(sleepTime: number, dHelper: DecisionHelper, logger: Logger, freedomSwaps: FreedomSwaps) {
        this.sleepTime = sleepTime
        this.decisionHelper = dHelper
        this.logger = logger
        this.freedomSwaps = freedomSwaps
    }

    public async startTheParty(minHistoryLength: number, factor: number, pkTestWallet: string): Promise<void> {
        if (this.partyIsOn === true) { throw Error("The Party Has Already Been Started") }
        this.partyIsOn = true
        this.logger.info(`\n\nsleepTime: ${this.sleepTime} \nminHistoryLength: ${minHistoryLength}`)
        while (this.freedomCashRocks && !this.roundIsActive) { // protecting against too low sleepTime value
            this.roundIsActive = true
            this.logger.info("\n\n*************************** Pulses Of Freedom ***************************")
            const price = await this.getPrice(Matic, Geld, pkTestWallet)
            // const price = await this.getPrice(Geld, Matic, pkTestWallet)
            this.decisionHelper.addToPriceHistory(price)
            const investmentDecision = this.decisionHelper.getInvestmentDecision(minHistoryLength, factor)
            if (investmentDecision == "buy") {
                await this.buy(pkTestWallet)
            } else if (investmentDecision == "sell") {
                await this.sell(pkTestWallet)
            }
            await sleep(this.sleepTime) // time to sleep in peace and harmony
            this.roundIsActive = false
        }
    }

    protected async getPrice(tokenContractAddress1: string, tokenContractAddress2: string, pkTestWallet: string): Promise<number> {
        // return Math.round((Math.random() * (81 - 9) + 9))
        return this.freedomSwaps.getPrice(tokenContractAddress1, tokenContractAddress2, this.poolFee, pkTestWallet)
    }

    protected async buy(pkTestWallet: string): Promise<void> {
        const amountIn = 1
        await this.freedomSwaps.swap(Matic, Geld, amountIn, this.poolFee, this.slippage, pkTestWallet)
    }
    
    protected async sell(pkTestWallet: string): Promise<void> {
        const amountIn = 360
        this.logger.warning(`amount to be sold: ${amountIn}`)
        await this.freedomSwaps.swap(Geld, Matic, amountIn, this.poolFee, this.slippage, pkTestWallet)
    }
}
