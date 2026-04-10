/**
 * 代币空投工具 - 原创
 * 功能：批量空投、白名单校验、空投记录
 */
const crypto = require('crypto');

class TokenAirdrop {
  constructor() {
    this.whitelist = new Set();
    this.airdrops = [];
  }

  // 添加白名单
  addToWhitelist(addresses) {
    addresses.forEach(addr => this.whitelist.add(addr));
  }

  // 执行空投
  airdropToken(from, amountPerUser) {
    const successful = [];
    this.whitelist.forEach(address => {
      const record = {
        airdropId: `AIR-${crypto.randomBytes(8).toString('hex')}`,
        from, to: address, amount: amountPerUser,
        time: Date.now()
      };
      this.airdrops.push(record);
      successful.push(address);
    });
    return { total: successful.length, records: this.airdrops };
  }

  // 查询用户空投记录
  getUserAirdrop(address) {
    return this.airdrops.filter(a => a.to === address);
  }
}

module.exports = TokenAirdrop;
