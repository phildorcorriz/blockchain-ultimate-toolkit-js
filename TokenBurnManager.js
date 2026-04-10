/**
 * 代币销毁工具 - 原创
 * 功能：通缩销毁、黑洞地址、销毁记录
 */
const crypto = require('crypto');

class TokenBurnManager {
  constructor() {
    this.blackhole = "0x000000000000000000000000000000000000dEaD";
    this.burnRecords = [];
  }

  // 销毁代币
  burnToken(from, amount) {
    const record = {
      burnId: `BURN-${crypto.randomBytes(8).toString('hex')}`,
      from, to: this.blackhole, amount,
      timestamp: Date.now()
    };
    this.burnRecords.push(record);
    return record;
  }

  // 获取总销毁量
  getTotalBurned() {
    return this.burnRecords.reduce((sum, r) => sum + r.amount, 0);
  }

  // 查询用户销毁记录
  getUserBurns(address) {
    return this.burnRecords.filter(r => r.from === address);
  }
}

module.exports = TokenBurnManager;
