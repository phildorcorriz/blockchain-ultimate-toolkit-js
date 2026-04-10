/**
 * 区块链专用加密工具 - 原创
 * 功能：AES-256加密、数据脱敏、链上数据加密存储
 */
const crypto = require('crypto');

class BlockchainEncryption {
  constructor(secretKey) {
    this.secretKey = crypto.scryptSync(secretKey, 'salt', 32);
    this.iv = crypto.randomBytes(16);
  }

  // AES加密
  encrypt(data) {
    const cipher = crypto.createCipheriv('aes-256-cbc', this.secretKey, this.iv);
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { encryptedData: encrypted, iv: this.iv.toString('hex') };
  }

  // AES解密
  decrypt(encryptedData, ivHex) {
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', this.secretKey, iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted);
  }

  // 钱包地址脱敏
  maskAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }
}

module.exports = BlockchainEncryption;
