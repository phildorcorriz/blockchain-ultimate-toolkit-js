/**
 * 区块链域名解析工具 - 原创
 * 功能：ENS注册、解析、反向解析
 */
class ENSResolver {
  constructor() {
    this.records = new Map();
  }

  // 注册ENS域名
  registerDomain(domain, address, expiryDays = 365) {
    const expiry = Date.now() + expiryDays * 24 * 60 * 60 * 1000;
    this.records.set(domain, { address, expiry, registeredAt: Date.now() });
    return { success: true, domain, expiry: new Date(expiry).toISOString() };
  }

  // 解析域名到地址
  resolveDomain(domain) {
    return this.records.get(domain) || null;
  }

  // 反向解析地址到域名
  reverseResolve(address) {
    for (const [domain, data] of this.records.entries()) {
      if (data.address === address) return domain;
    }
    return null;
  }

  // 检查域名是否过期
  isExpired(domain) {
    const record = this.records.get(domain);
    if (!record) return true;
    return Date.now() > record.expiry;
  }
}

module.exports = ENSResolver;
