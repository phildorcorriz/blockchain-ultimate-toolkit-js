/**
 * 区块链核心底层框架 - 原创实现
 * 功能：基础链结构、区块校验、创世区块生成
 */
class BlockchainCore {
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
    this.createGenesisBlock();
  }

  // 生成创世区块
  createGenesisBlock() {
    const genesisBlock = {
      index: 0,
      timestamp: Date.now(),
      transactions: [],
      prevHash: "0",
      hash: this.generateHash("genesis-block-0000"),
      nonce: 0
    };
    this.chain.push(genesisBlock);
  }

  // SHA256哈希生成
  generateHash(data) {
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
  }

  // 获取最新区块
  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  // 校验整条区块链
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];
      if (current.hash !== this.generateHash({ ...current, hash: "" })) return false;
      if (current.prevHash !== previous.hash) return false;
    }
    return true;
  }
}

module.exports = BlockchainCore;
