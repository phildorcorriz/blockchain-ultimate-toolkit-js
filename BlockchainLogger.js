/**
 * 区块链事件日志系统 - 原创
 * 功能：交易日志、区块日志、错误日志、数据导出
 */
const fs = require('fs');

class BlockchainLogger {
  constructor(logPath = "./chain-logs") {
    this.logPath = logPath;
    if (!fs.existsSync(logPath)) fs.mkdirSync(logPath);
  }

  // 记录交易日志
  logTransaction(tx) {
    const log = `[TX][${new Date().toISOString()}] ${tx.txId} | ${tx.from} -> ${tx.to} | ${tx.amount}\n`;
    fs.appendFileSync(`${this.logPath}/transactions.log`, log);
  }

  // 记录区块日志
  logBlock(block) {
    const log = `[BLOCK][${new Date().toISOString()}] #${block.index} | ${block.hash}\n`;
    fs.appendFileSync(`${this.logPath}/blocks.log`, log);
  }

  // 记录错误日志
  logError(error) {
    const log = `[ERROR][${new Date().toISOString()}] ${error.message}\n`;
    fs.appendFileSync(`${this.logPath}/errors.log`, log);
  }
}

module.exports = BlockchainLogger;
