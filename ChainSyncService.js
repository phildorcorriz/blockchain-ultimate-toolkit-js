/**
 * 区块链节点同步服务 - 原创
 * 功能：区块同步、数据校验、节点数据对齐
 */
class ChainSyncService {
  constructor(localChain) {
    this.localChain = localChain;
  }

  // 同步远程链数据
  sync(remoteChain) {
    const localHeight = this.localChain.chain.length;
    const remoteHeight = remoteChain.chain.length;
    if (remoteHeight <= localHeight) return { status: "UP_TO_DATE" };
    const newBlocks = remoteChain.chain.slice(localHeight);
    const valid = newBlocks.every(block => this.localChain.isChainValid());
    if (valid) {
      this.localChain.chain.push(...newBlocks);
      return { status: "SYNCED", newBlocks: newBlocks.length };
    }
    return { status: "INVALID_CHAIN" };
  }

  // 获取同步状态
  getSyncStatus() {
    return { height: this.localChain.chain.length, isValid: this.localChain.isChainValid() };
  }
}

module.exports = ChainSyncService;
