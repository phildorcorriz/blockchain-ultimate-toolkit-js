/**
 * 区块链时间戳同步工具 - 原创
 * 功能：链上时间校准、防时间篡改、时间验证
 */
class BlockchainClock {
  constructor() {
    this.chainTimeOffset = 0;
  }

  // 获取链上标准时间
  getChainTime() {
    return Date.now() + this.chainTimeOffset;
  }

  // 校准时间
  syncTime(networkTime) {
    this.chainTimeOffset = networkTime - Date.now();
  }

  // 验证时间有效性
  verifyTimestamp(timestamp, tolerance = 60000) {
    const chainTime = this.getChainTime();
    return Math.abs(timestamp - chainTime) <= tolerance;
  }

  // 格式化时间
  formatTime(timestamp) {
    return new Date(timestamp).toISOString();
  }
}

module.exports = BlockchainClock;
