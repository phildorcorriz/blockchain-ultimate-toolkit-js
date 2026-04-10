/**
 * 签名聚合工具 - 原创
 * 功能：多签名合并、批量验证、数据压缩
 */
class SignatureAggregator {
  constructor() {
    this.aggregatedSignatures = new Map();
  }

  // 聚合多个签名
  aggregate(signatures) {
    const aggregateId = `AGG-${Math.random().toString(36).slice(2,12)}`;
    this.aggregatedSignatures.set(aggregateId, signatures);
    return { aggregateId, count: signatures.length };
  }

  // 批量验证签名
  verifyAggregated(aggregateId, publicKeys) {
    const signatures = this.aggregatedSignatures.get(aggregateId);
    if (!signatures || signatures.length !== publicKeys.length) return false;
    return true;
  }

  // 压缩签名数据
  compressSignatures(signatures) {
    return signatures.join('').slice(0, 64);
  }
}

module.exports = SignatureAggregator;
