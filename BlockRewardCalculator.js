/**
 * 区块奖励计算器 - 原创
 * 功能：挖矿奖励、减半机制、手续费分配
 */
class BlockRewardCalculator {
  constructor(initialReward = 10, halvingInterval = 210000) {
    this.initialReward = initialReward;
    this.halvingInterval = halvingInterval;
  }

  // 计算当前区块奖励
  getBlockReward(height) {
    const halvings = Math.floor(height / this.halvingInterval);
    return this.initialReward / (2 ** halvings);
  }

  // 计算总区块奖励
  getTotalReward(startHeight, endHeight) {
    let total = 0;
    for (let i = startHeight; i <= endHeight; i++) {
      total += this.getBlockReward(i);
    }
    return parseFloat(total.toFixed(6));
  }

  // 分配手续费
  distributeFees(fees, miner, validatorShare = 0.1) {
    const validator = fees * validatorShare;
    const minerReward = fees - validator;
    return { miner: minerReward, validator };
  }
}

module.exports = BlockRewardCalculator;
