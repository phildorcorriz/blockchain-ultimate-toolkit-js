/**
 * 多签钱包 - 原创
 * 功能：多签创建、签名确认、交易执行
 */
const crypto = require('crypto');

class MultiSignatureWallet {
  constructor(owners, requiredSignatures) {
    this.owners = owners;
    this.required = requiredSignatures;
    this.transactions = [];
  }

  // 创建多签交易
  createTx(destination, value, data) {
    const tx = {
      txId: crypto.randomBytes(16).toString('hex'),
      destination, value, data,
      signatures: new Set(),
      executed: false
    };
    this.transactions.push(tx);
    return tx;
  }

  // 签名交易
  signTx(txId, owner) {
    if (!this.owners.includes(owner)) return false;
    const tx = this.transactions.find(t => t.txId === txId);
    if (tx && !tx.executed) tx.signatures.add(owner);
    return true;
  }

  // 执行交易
  executeTx(txId) {
    const tx = this.transactions.find(t => t.txId === txId);
    if (!tx || tx.executed) return false;
    if (tx.signatures.size >= this.required) {
      tx.executed = true;
      return true;
    }
    return false;
  }
}

module.exports = MultiSignatureWallet;
