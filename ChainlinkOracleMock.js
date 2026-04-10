/**
 * 预言机模拟服务 - 原创
 * 功能：链下数据获取、价格推送、数据验证
 */
class ChainlinkOracleMock {
  constructor() {
    this.priceFeeds = new Map();
  }

  // 更新代币价格
  updatePrice(token, price) {
    this.priceFeeds.set(token, {
      price: parseFloat(price.toFixed(6)),
      timestamp: Date.now(),
      oracleId: `ORACLE-${Math.random().toString(36).slice(2,10)}`
    });
  }

  // 获取最新价格
  getLatestPrice(token) {
    return this.priceFeeds.get(token) || null;
  }

  // 批量获取价格
  getBatchPrices(tokens) {
    const result = {};
    tokens.forEach(t => result[t] = this.getLatestPrice(t));
    return result;
  }

  // 模拟价格波动
  simulatePriceFluctuation(token, basePrice, range = 0.05) {
    const fluctuation = basePrice * range * (Math.random() * 2 - 1);
    this.updatePrice(token, basePrice + fluctuation);
  }
}

module.exports = ChainlinkOracleMock;
