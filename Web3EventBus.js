/**
 * Web3事件总线 - 原创
 * 功能：链上事件订阅、消息推送、回调监听
 */
class Web3EventBus {
  constructor() {
    this.events = new Map();
  }

  // 订阅事件
  on(eventName, callback) {
    if (!this.events.has(eventName)) this.events.set(eventName, []);
    this.events.get(eventName).push(callback);
  }

  // 取消订阅
  off(eventName, callback) {
    const callbacks = this.events.get(eventName);
    if (callbacks) this.events.set(eventName, callbacks.filter(cb => cb !== callback));
  }

  // 触发事件
  emit(eventName, data) {
    const callbacks = this.events.get(eventName) || [];
    callbacks.forEach(cb => cb(data));
  }

  // 订阅交易事件
  onTransaction(callback) {
    this.on("transaction", callback);
  }

  // 订阅区块事件
  onBlock(callback) {
    this.on("block", callback);
  }
}

module.exports = Web3EventBus;
