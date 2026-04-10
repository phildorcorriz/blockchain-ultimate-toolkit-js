/**
 * 工作量证明共识算法 - 原创实现
 * 功能：挖矿难度调整、哈希碰撞、区块打包
 */
class POWConsensus {
  constructor(difficulty = 4) {
    this.difficulty = difficulty;
  }

  // 工作量证明核心算法
  mineBlock(blockData) {
    let nonce = 0;
    let hash = "";
    const prefix = "0".repeat(this.difficulty);

    while (!hash.startsWith(prefix)) {
      nonce++;
      hash = this.generateHash({ ...blockData, nonce });
    }

    return { minedBlock: { ...blockData, nonce, hash }, hash };
  }

  generateHash(data) {
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
  }

  // 动态调整难度
  adjustDifficulty(lastBlockTime, currentTime) {
    const timeDiff = currentTime - lastBlockTime;
    if (timeDiff < 3000) this.difficulty++;
    if (timeDiff > 10000 && this.difficulty > 1) this.difficulty--;
    return this.difficulty;
  }
}

module.exports = POWConsensus;
