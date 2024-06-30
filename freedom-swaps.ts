import { freedomSwapsABI, freiheitsABI, wMaticABI, getLogger, getProvider, FreedomSwapsCA, getContract, Matic, getAddressFromPK } from "./mod.ts"

export class FreedomSwaps {

    private static instance: FreedomSwaps

    public static async getInstance(providerURL: string): Promise<FreedomSwaps> {
        if (FreedomSwaps.instance === undefined) {
            const logger = await getLogger()
            const provider = getProvider(logger, providerURL)
            FreedomSwaps.instance = new FreedomSwaps(logger, provider)
        }
        return FreedomSwaps.instance
    }

    private logger
    private provider

    private constructor(logger: any, provider: any) {
        this.logger = logger
        this.provider = provider
    }

    public async swap(tokenIn: string, tokenOut: string, amountIn: number, poolFee: number, slippage: number, pkTestWallet: string) {
        let tx
        const erc20Contract = await getContract(tokenIn, freiheitsABI, this.provider, pkTestWallet)
        const decimals = Number(await erc20Contract.decimals())
        const freedomSwapsContract = await getContract(FreedomSwapsCA, freedomSwapsABI, this.provider, pkTestWallet)
        if (tokenIn === Matic) {
            this.logger.info(`swapping ${amountIn} of BaseCurrency ${tokenIn} to ${tokenOut} - poolFee: ${poolFee} slippage: ${slippage}`)
            tx = await freedomSwapsContract.swapBaseCurrency(tokenIn, tokenOut, poolFee, slippage, { value: BigInt(amountIn * 10 ** decimals) })
        } else {
            const address = getAddressFromPK(pkTestWallet, this.provider)
            const allowance = await erc20Contract.allowance(address, FreedomSwapsCA)
            this.logger.info(`the allowance from ${address} for ${FreedomSwapsCA} is: ${allowance}`)
            if (allowance < BigInt(amountIn * 10 ** decimals)) {
                tx = await erc20Contract.approve(FreedomSwapsCA, BigInt(360 * amountIn * 10 ** decimals))
                this.logger.info(`approval tx: https://polygonscan.com/tx/${tx.hash}`)
                await tx.wait()
            }
            this.logger.info(`swapping ${amountIn} of ${tokenIn} to ${tokenOut} - poolFee: ${poolFee} slippage: ${slippage}`)
            tx = await freedomSwapsContract.swapExactInputSingle(tokenIn, tokenOut, BigInt(amountIn * 10 ** decimals), poolFee, slippage)
        }
        this.logger.info(`swap tx: https://polygonscan.com/tx/${tx.hash}`)
        await tx.wait()
    }
    
    public async unwrap(pkTestWallet: string) {
        const address = getAddressFromPK(pkTestWallet, this.provider)
        const wmaticContract = await getContract(Matic, wMaticABI, this.provider, pkTestWallet)
        const wMaticBalance = await wmaticContract.balanceOf(address)
        const tx = await wmaticContract.withdraw(wMaticBalance)
        this.logger.info(`unwrap tx: https://polygonscan.com/tx/${tx.hash}`)
        await tx.wait()
    }
}