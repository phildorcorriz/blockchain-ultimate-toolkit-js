/**
 * 区块链交易签名工具 - 原创
 * 功能：交易创建、私钥签名、签名验证
 */
const crypto = require('crypto');

class TransactionSigner {
  createTransaction(from, to, amount, data = {}) {
    return {
      txId: crypto.randomBytes(16).toString('hex'),
      from,
      to,
      amount,
      timestamp: Date.now(),
      data,
      signature: null
    };
  }

  // 交易签名
  signTransaction(transaction, privateKey) {
    const sign = crypto.createSign('SHA256');
    sign.write(JSON.stringify({ ...transaction, signature: null }));
    sign.end();
    transaction.signature = sign.sign(privateKey, 'hex');
    return transaction;
  }

  // 验证签名
  verifySignature(transaction, publicKey) {
    const verify = crypto.createVerify('SHA256');
    verify.write(JSON.stringify({ ...transaction, signature: null }));
    verify.end();
    return verify.verify(publicKey, transaction.signature, 'hex');
  }
}

module.exports = TransactionSigner;
