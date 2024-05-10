// SPDX-License-Identifier: GNU AFFERO GENERAL PUBLIC LICENSE Version 3

// credits to: 

// https://brightinventions.pl/blog/single-swap-on-uniswap-v3-with-3-common-mistakes 
// https://github.com/geo-logs/freiheit/blob/main/README.md 

pragma solidity 0.8.19;

import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.9.4/contracts/utils/math/Math.sol";
import "https://github.com/Uniswap/v3-core/blob/v1.0.0/contracts/libraries/FixedPoint96.sol";
import "https://github.com/Uniswap/v3-core/blob/v1.0.0/contracts/interfaces/IUniswapV3Pool.sol";
import "https://raw.githubusercontent.com/Uniswap/v3-periphery/main/contracts/interfaces/ISwapRouter.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.9.4/contracts/token/ERC20/ERC20.sol";
import "https://github.com/Uniswap/v3-core/blob/v1.0.0/contracts/interfaces/IUniswapV3Factory.sol";
import "https://raw.githubusercontent.com/Uniswap/solidity-lib/master/contracts/libraries/TransferHelper.sol";

contract FreedomSwaps {

    address private constant SWAP_ROUTER    = 0xE592427A0AEce92De3Edee1F18E0157C05861564;
    address private constant FACTORY        = 0x1F98431c8aD98523631AE4a59f267346ea31F984;
    
    ISwapRouter public immutable swapRouter;
    
    constructor() {
        swapRouter = ISwapRouter(SWAP_ROUTER);
    }

    function swapExactInputSingle(address tokenIn, address tokenOut, uint256 amountIn, uint24 poolFee, uint24 slippage) external returns (uint256 amountOut) {
        safeTransferWithApprove(tokenIn, amountIn, address(swapRouter));
        amountOut = swapRouter.exactInputSingle(ISwapRouter.ExactInputSingleParams({
                tokenIn: tokenIn,
                tokenOut: tokenOut,
                fee: poolFee,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: getAmountOutMin(amountIn, getPrice(tokenIn, tokenOut, poolFee), slippage),
                sqrtPriceLimitX96: 0
            }));
    }
    function swapBaseCurrency(address tokenIn, address tokenOut, uint24 poolFee, uint24 slippage) public payable  returns (uint256 amountOut) {
        ISwapRouter.ExactInputSingleParams memory params = 
            ISwapRouter.ExactInputSingleParams({
                tokenIn: tokenIn,
                tokenOut: tokenOut,
                fee: poolFee,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: msg.value,
                amountOutMinimum: getAmountOutMin(msg.value, getPrice(tokenIn, tokenOut, poolFee), slippage),
                sqrtPriceLimitX96: 0
            });
        amountOut = swapRouter.exactInputSingle{value: msg.value}(params);
    }
    function getAmountOutMin(uint256 amountIn, uint256 price, uint256 slippage) public pure returns(uint256) { 
        uint256 regularOutput = amountIn / price;
        if (slippage == 0) {
            return regularOutput;
        } else {
            return regularOutput - Math.mulDiv(regularOutput, slippage, 100);
        }
    }
    function getPrice(address token0, address token1, uint24 poolFee) public view returns(uint256) { 
        uint24 decimalsT0 = ERC20(token0).decimals();
        uint24 decimalsT1 = ERC20(token1).decimals();
        uint256 sqrtPriceX96 = getSqrtPriceX96FromPool(token0, token1, poolFee);
        uint256 liquidity = getLiquidityFromPool(token0, token1, poolFee);
        uint256 amount0 = getAmount0(liquidity, sqrtPriceX96);
        uint256 amount1 = getAmount1(liquidity, sqrtPriceX96);
        return getPriceFromAmounts(decimalsT0, decimalsT1, token0, amount0, amount1, token1);
    }
    function getSqrtPriceX96FromPool(address token0, address token1, uint24 fee) public view returns(uint256) {
        IUniswapV3Pool pool = IUniswapV3Pool(IUniswapV3Factory(FACTORY).getPool(token0, token1, fee));
        (uint160 sqrtPriceX96, , , , , , ) = pool.slot0();
        return sqrtPriceX96;
    }
    function getAmount0(uint256 liquidity, uint256 sqrtPriceX96) public  pure returns(uint256) {
        return Math.mulDiv(liquidity, FixedPoint96.Q96, sqrtPriceX96);
    }    
    function getAmount1(uint256 liquidity, uint256 sqrtPriceX96) public pure returns(uint256) {
        return Math.mulDiv(liquidity, sqrtPriceX96, FixedPoint96.Q96);
    }    
    function getPriceFromAmounts(uint256 t0Decimals, uint256 t1Decimals, address t0, uint256 amount0, uint256 amount1, address asset) public pure returns(uint256) {
        if (t0 == asset) {
            return Math.mulDiv(amount1, 10**t0Decimals, amount0);
        } else {
            return Math.mulDiv(amount0, 10**t1Decimals, amount1);
        }
    }
    function getLiquidityFromPool(address token0, address token1, uint24 fee) public view returns(uint256) {
        IUniswapV3Pool pool = IUniswapV3Pool(IUniswapV3Factory(FACTORY).getPool(token0, token1, fee));
        return pool.liquidity();
    }
    function safeTransferWithApprove(address tokenIn, uint256 amountIn, address router) internal {
        TransferHelper.safeTransferFrom(tokenIn, msg.sender, address(this), amountIn);
        TransferHelper.safeApprove(tokenIn, router, amountIn);
    }
}
