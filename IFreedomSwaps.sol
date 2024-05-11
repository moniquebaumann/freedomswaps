// SPDX-License-Identifier: GNU AFFERO GENERAL external LICENSE Version 3

// We fund freedom.
// We stop state criminals.
// We make crypto cypherpunk again.
// We love Geo Caching with Geo Cash.
// We foster Freedom, Justice and Peace.
// We foster sustainable liquidity infrastructures.
// We combine Crypto Education with Geo Caching.
// We separate money from state criminals like religion has been separated from state.
// We foster ever emerging architectures of freedom by rewarding those who help themselves and others to be free.

pragma solidity 0.8.19;
interface IFreedomSwaps {
    function swapExactInputSingle(address tokenIn, address tokenOut, address payable recipient, uint256 amountIn, uint24 poolFee, uint24 slippage) external returns (uint256 amountOut);
    function swapBaseCurrency(address tokenIn, address tokenOut, address payable recipient, uint24 poolFee, uint24 slippage) external payable returns (uint256 amountOut);
    function getAmountOutMin(uint256 amountIn, uint256 price, uint256 slippage) external pure returns(uint256);
    function getPrice(address token0, address token1, uint24 poolFee) external view returns(uint256);
    function getSqrtPriceX96FromPool(address token0, address token1, uint24 fee) external view returns(uint256);
    function getAmount0(uint256 liquidity, uint256 sqrtPriceX96) external  pure returns(uint256);
    function getAmount1(uint256 liquidity, uint256 sqrtPriceX96) external pure returns(uint256);
    function getPriceFromAmounts(uint256 t0Decimals, uint256 t1Decimals, address t0, uint256 amount0, uint256 amount1, address asset) external pure returns(uint256);
    function getLiquidityFromPool(address token0, address token1, uint24 fee) external view returns(uint256);
}
