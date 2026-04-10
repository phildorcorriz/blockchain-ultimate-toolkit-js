/**
 * 去中心化交易所核心 - 原创
 * 功能：流动性添加、交易兑换、滑点计算
 */
class DEFIExchange {
  constructor() {
    this.pools = new Map();
  }

  // 创建交易对流动池
  createPool(tokenA, tokenB, reserveA, reserveB) {
    const k = reserveA * reserveB;
    this.pools.set(`${tokenA}-${tokenB}`, { reserveA, reserveB, k });
    return { pool: `${tokenA}-${tokenB}`, k };
  }

  // 计算兑换输出
  calculateSwapInput(tokenA, tokenB, amountIn) {
    const pool = this.pools.get(`${tokenA}-${tokenB}`);
    const amountInWithFee = amountIn * 0.997;
    const amountOut = (pool.reserveB * amountInWithFee) / (pool.reserveA + amountInWithFee);
    const slippage = (amountIn / pool.reserveA) * 100;
    return { amountOut: parseFloat(amountOut.toFixed(6)), slippage: parseFloat(slippage.toFixed(4)) };
  }

  // 添加流动性
  addLiquidity(tokenA, tokenB, amountA, amountB) {
    const key = `${tokenA}-${tokenB}`;
    const pool = this.pools.get(key);
    pool.reserveA += amountA;
    pool.reserveB += amountB;
    pool.k = pool.reserveA * pool.reserveB;
    return pool;
  }
}

module.exports = DEFIExchange;
