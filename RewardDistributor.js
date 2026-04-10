/**
 * 链上奖励分发工具 - 原创
 * 功能：按权重分红、批量发放、记录保存
 */
class RewardDistributor {
  constructor() {
    this.records = [];
  }

  // 按权重分配奖励
  distribute(totalReward, users) {
    const totalWeight = users.reduce((sum, u) => sum + u.weight, 0);
    const result = users.map(user => {
      const reward = (user.weight / totalWeight) * totalReward;
      return { address: user.address, reward: parseFloat(reward.toFixed(6)) };
    });
    this.records.push({ time: Date.now(), totalReward, distributions: result });
    return result;
  }

  // 固定金额分发
  fixedDistribute(amount, addresses) {
    const result = addresses.map(addr => ({ address: addr, amount }));
    this.records.push({ time: Date.now(), type: "fixed", distributions: result });
    return result;
  }

  // 获取分发记录
  getHistory() {
    return this.records;
  }
}

module.exports = RewardDistributor;
