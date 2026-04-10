/**
 * 链上数据分析工具 - 原创
 * 功能：交易统计、地址活跃度、大额交易监控
 */
class ChainDataAnalyzer {
  constructor(chainData) {
    this.chainData = chainData;
  }

  // 统计总交易数
  getTotalTransactions() {
    return this.chainData.reduce((sum, block) => sum + block.transactions.length, 0);
  }

  // 分析活跃地址
  getActiveAddresses(top = 10) {
    const addressCount = {};
    this.chainData.forEach(block => {
      block.transactions.forEach(tx => {
        addressCount[tx.from] = (addressCount[tx.from] || 0) + 1;
        addressCount[tx.to] = (addressCount[tx.to] || 0) + 1;
      });
    });
    return Object.entries(addressCount).sort((a, b) => b[1] - a[1]).slice(0, top);
  }

  // 监控大额交易
  monitorLargeTransactions(threshold = 1000) {
    const largeTxs = [];
    this.chainData.forEach(block => {
      block.transactions.forEach(tx => {
        if (tx.amount >= threshold) largeTxs.push(tx);
      });
    });
    return largeTxs;
  }
}

module.exports = ChainDataAnalyzer;
