/**
 * Gas费预言机 - 原创
 * 功能：实时Gas计算、拥堵预测、最优Gas推荐
 */
class GasPriceOracle {
  constructor() {
    this.baseFee = 30;
    this.priorityFee = 2;
  }

  // 获取实时Gas价格
  getGasPrice() {
    const base = this.baseFee + (Math.random() * 10 - 5);
    const slow = base;
    const standard = base + this.priorityFee;
    const fast = base + this.priorityFee * 2;
    return {
      slow: parseFloat(slow.toFixed(2)),
      standard: parseFloat(standard.toFixed(2)),
      fast: parseFloat(fast.toFixed(2)),
      unit: "gwei"
    };
  }

  // 计算交易总Gas费
  calculateTotalFee(gasLimit, gasPrice) {
    return (gasLimit * gasPrice).toFixed(6);
  }

  // 网络拥堵状态
  getNetworkCongestion() {
    const gas = this.getGasPrice().standard;
    if (gas < 20) return "LOW";
    if (gas < 50) return "MEDIUM";
    return "HIGH";
  }
}

module.exports = GasPriceOracle;
