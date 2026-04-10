/**
 * 区块链数据备份工具 - 原创
 * 功能：链数据导出、快照生成、数据恢复
 */
const fs = require('fs');
const path = require('path');

class BlockchainBackup {
  constructor(backupDir = "./chain-backup") {
    this.backupDir = backupDir;
    if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);
  }

  // 创建链快照
  createSnapshot(chainData, name) {
    const filename = `snapshot-${name}-${Date.now()}.json`;
    const filepath = path.join(this.backupDir, filename);
    fs.writeFileSync(filepath, JSON.stringify(chainData, null, 2));
    return { filepath, size: fs.statSync(filepath).size };
  }

  // 恢复链数据
  restoreSnapshot(filepath) {
    if (!fs.existsSync(filepath)) return null;
    const data = fs.readFileSync(filepath, 'utf8');
    return JSON.parse(data);
  }

  // 获取所有备份
  listBackups() {
    return fs.readdirSync(this.backupDir).filter(f => f.endsWith('.json'));
  }
}

module.exports = BlockchainBackup;
