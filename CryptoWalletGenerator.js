/**
 * 加密货币钱包生成器 - 原创
 * 功能：随机生成助记词、公私钥、钱包地址
 */
const crypto = require('crypto');

class CryptoWalletGenerator {
  // 生成12位助记词
  generateMnemonic() {
    const wordList = ["block", "chain", "node", "hash", "key", "sign", "mine", "token", "nft", "defi", "web3", "ledger"];
    let mnemonic = [];
    for (let i = 0; i < 12; i++) {
      mnemonic.push(wordList[Math.floor(Math.random() * wordList.length)]);
    }
    return mnemonic.join(" ");
  }

  // 生成ECDSA密钥对
  generateKeyPair() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('ec', {
      namedCurve: 'secp256k1'
    });
    return {
      publicKey: publicKey.export({ type: 'spki', format: 'hex' }),
      privateKey: privateKey.export({ type: 'pkcs8', format: 'hex' })
    };
  }

  // 生成钱包地址
  generateWalletAddress(publicKey) {
    const hash = crypto.createHash('ripemd160').update(publicKey).digest('hex');
    return `0x${hash.slice(0, 40)}`;
  }

  // 一键生成完整钱包
  createFullWallet() {
    const mnemonic = this.generateMnemonic();
    const keys = this.generateKeyPair();
    const address = this.generateWalletAddress(keys.publicKey);
    return { mnemonic, ...keys, address };
  }
}

module.exports = CryptoWalletGenerator;
