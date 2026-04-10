/**
 * 区块链开放API服务 - 原创
 * 功能：API接口封装、数据查询、请求限流
 */
class BlockchainAPI {
  constructor(chain) {
    this.chain = chain;
    this.rateLimit = new Map();
    this.maxRequests = 100;
  }

  // 限流检查
  checkRateLimit(ip) {
    const count = this.rateLimit.get(ip) || 0;
    if (count >= this.maxRequests) return false;
    this.rateLimit.set(ip, count + 1);
    return true;
  }

  // 获取区块高度
  getBlockHeight() {
    return this.chain.chain.length - 1;
  }

  // 获取指定区块
  getBlock(index) {
    return this.chain.chain[index] || null;
  }

  // 获取交易详情
  getTransaction(txId) {
    for (const block of this.chain.chain) {
      const tx = block.transactions.find(t => t.txId === txId);
      if (tx) return tx;
    }
    return null;
  }
}

module.exports = BlockchainAPI;
