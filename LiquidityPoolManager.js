/**
 * 流动池管理工具 - 原创
 * 功能：流动池创建、资金管理、无常损失计算
 */
class LiquidityPoolManager {
  constructor() {
    this.pools = new Map();
  }

  // 创建流动池
  createPool(poolId, tokenA, tokenB, initialA, initialB) {
    const k = initialA * initialB;
    this.pools.set(poolId, { tokenA, tokenB, reserveA: initialA, reserveB: initialB, k });
  }

  // 计算无常损失
  calculateImpermanentLoss(priceRatioChange) {
    const sqrt = Math.sqrt(priceRatioChange);
    const il = 2 * sqrt / (1 + priceRatioChange) - 1;
    return parseFloat((il * 100).toFixed(4));
  }

  // 移除流动性
  removeLiquidity(poolId, percentage) {
    const pool = this.pools.get(poolId);
    if (!pool) return null;
    const removeA = pool.reserveA * percentage / 100;
    const removeB = pool.reserveB * percentage / 100;
    pool.reserveA -= removeA;
    pool.reserveB -= removeB;
    pool.k = pool.reserveA * pool.reserveB;
    return { removeA, removeB };
  }
}

module.exports = LiquidityPoolManager;
