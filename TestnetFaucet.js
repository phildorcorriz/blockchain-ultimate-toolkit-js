/**
 * 测试网水龙头工具 - 原创
 * 功能：测试币领取、冷却时间、每日限额
 */
class TestnetFaucet {
  constructor(amountPerClaim = 10, cooldownHours = 24) {
    this.amount = amountPerClaim;
    this.cooldown = cooldownHours * 60 * 60 * 1000;
    this.claims = new Map();
  }

  // 领取测试币
  claim(address) {
    const lastClaim = this.claims.get(address) || 0;
    const now = Date.now();
    if (now - lastClaim < this.cooldown) {
      return { success: false, message: "仍在冷却中" };
    }
    this.claims.set(address, now);
    return {
      success: true,
      amount: this.amount,
      nextClaim: new Date(now + this.cooldown).toISOString()
    };
  }

  // 检查可领取状态
  canClaim(address) {
    const lastClaim = this.claims.get(address) || 0;
    return Date.now() - lastClaim >= this.cooldown;
  }
}

module.exports = TestnetFaucet;
