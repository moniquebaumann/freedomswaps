import { getLogger, getProvider, FreedomSwapsCA, getContract, Matic } from "./helper.ts"

export class FreedomSwaps {

    private static instance: FreedomSwaps

    public static async getInstance(): Promise<FreedomSwaps> {
        if (FreedomSwaps.instance === undefined) {
            const logger = await getLogger()
            const provider = getProvider(logger)
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

    public async swap(tokenIn: string, tokenOut: string, amountIn: number, poolFee: number, slippage: number) {
        let tx
        const freedomSwapsContract = await getContract(FreedomSwapsCA, this.provider, "./freedom-swaps-abi.json")
        if (tokenIn === Matic) {
            this.logger.info(`swapping ${amountIn} of BaseCurrency ${tokenIn} to ${tokenOut} - poolFee: ${poolFee} slippage: ${slippage}`)
            tx = await freedomSwapsContract.swapBaseCurrency(tokenIn, tokenOut, poolFee, slippage, { value: BigInt(amountIn * 10 ** 18) })
        } else {
            const erc20Contract = await getContract(tokenIn, this.provider, "./freiheit-abi.json")
            // feel free to check for the allowance first via pull request
            tx = await erc20Contract.approve(FreedomSwapsCA, BigInt(amountIn * 10 ** 18))
            this.logger.info(`approval tx: https://polygonscan.com/tx/${tx.hash}`)
            await tx.wait()
            this.logger.info(`swapping ${amountIn} of ${tokenIn} to ${tokenOut} - poolFee: ${poolFee} slippage: ${slippage}`)
            tx = await freedomSwapsContract.swapExactInputSingle(tokenIn, tokenOut, BigInt(amountIn * 10 ** 18), poolFee, slippage)
        }
        this.logger.info(`tx: https://polygonscan.com/tx/${tx.hash}`)
        await tx.wait()
    }
}