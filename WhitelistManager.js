/**
 * 链上白名单管理工具 - 原创
 * 功能：白名单添加/删除/校验/批量导入
 */
class WhitelistManager {
  constructor() {
    this.whitelist = new Set();
  }

  // 添加单个地址
  addAddress(address) {
    this.whitelist.add(address.toLowerCase());
  }

  // 批量添加
  batchAdd(addresses) {
    addresses.forEach(addr => this.whitelist.add(addr.toLowerCase()));
    return { added: addresses.length };
  }

  // 检查是否在白名单
  isWhitelisted(address) {
    return this.whitelist.has(address.toLowerCase());
  }

  // 移除地址
  removeAddress(address) {
    return this.whitelist.delete(address.toLowerCase());
  }

  // 获取白名单总数
  getCount() {
    return this.whitelist.size;
  }
}

module.exports = WhitelistManager;
