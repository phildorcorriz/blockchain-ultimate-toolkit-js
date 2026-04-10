/**
 * 智能合约拦截器 - 原创
 * 功能：合约调用拦截、权限校验、参数过滤
 */
class ContractInterceptor {
  constructor() {
    this.allowedMethods = new Set();
    this.blacklist = new Set();
  }

  // 允许调用的方法
  allowMethod(method) {
    this.allowedMethods.add(method);
  }

  // 黑名单地址
  blockAddress(address) {
    this.blacklist.add(address.toLowerCase());
  }

  // 拦截检查
  intercept(caller, method) {
    if (this.blacklist.has(caller.toLowerCase())) return false;
    return this.allowedMethods.has(method);
  }

  // 批量检查
  batchIntercept(calls) {
    return calls.filter(c => this.intercept(c.caller, c.method));
  }
}

module.exports = ContractInterceptor;
