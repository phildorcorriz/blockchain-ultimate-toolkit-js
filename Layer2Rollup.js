/**
 * Layer2 Rollup 聚合工具 - 原创
 * 功能：交易聚合、默克尔根生成、数据上链
 */
class Layer2Rollup {
  constructor() {
    this.batchTransactions = [];
    this.rollupBatches = [];
  }

  // 添加交易到批次
  addToBatch(tx) {
    this.batchTransactions.push(tx);
  }

  // 生成默克尔根
  generateMerkleRoot(transactions) {
    const crypto = require('crypto');
    let hashes = transactions.map(tx =>
      crypto.createHash('sha256').update(JSON.stringify(tx)).digest('hex')
    );
    while (hashes.length > 1) {
      const temp = [];
      for (let i = 0; i < hashes.length; i += 2) {
        const left = hashes[i];
        const right = hashes[i + 1] || left;
        temp.push(crypto.createHash('sha256').update(left + right).digest('hex'));
      }
      hashes = temp;
    }
    return hashes[0];
  }

  // 创建Rollup批次
  createRollupBatch() {
    const root = this.generateMerkleRoot(this.batchTransactions);
    const batch = {
      batchId: `ROLLUP-${Math.random().toString(36).slice(2)}`,
      txCount: this.batchTransactions.length,
      merkleRoot: root,
      timestamp: Date.now()
    };
    this.rollupBatches.push(batch);
    this.batchTransactions = [];
    return batch;
  }
}

module.exports = Layer2Rollup;
