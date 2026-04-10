/**
 * 代币质押挖矿系统 - 原创
 * 功能：质押、解押、收益计算、锁仓机制
 */
class TokenStaking {
  constructor(apr = 12) {
    this.apr = apr;
    this.stakes = new Map();
  }

  // 质押代币
  stake(userAddress, amount, lockDays = 30) {
    const lockUntil = Date.now() + lockDays * 24 * 60 * 60 * 1000;
    this.stakes.set(userAddress, {
      amount,
      stakeTime: Date.now(),
      lockUntil,
      claimedRewards: 0
    });
    return { success: true, lockUntil: new Date(lockUntil).toISOString() };
  }

  // 计算挖矿收益
  calculateReward(userAddress) {
    const stake = this.stakes.get(userAddress);
    if (!stake) return 0;
    const daysStaked = (Date.now() - stake.stakeTime) / (1000 * 60 * 60 * 24);
    return (stake.amount * this.apr / 100) * (daysStaked / 365);
  }

  // 解押代币
  unstake(userAddress) {
    const stake = this.stakes.get(userAddress);
    if (!stake) return { success: false, message: "无质押记录" };
    if (Date.now() < stake.lockUntil) return { success: false, message: "仍在锁仓期" };
    const reward = this.calculateReward(userAddress);
    this.stakes.delete(userAddress);
    return { success: true, unstakedAmount: stake.amount, reward };
  }
}

module.exports = TokenStaking;
