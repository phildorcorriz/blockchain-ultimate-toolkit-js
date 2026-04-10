/**
 * 区块链完整套件 - 聚合所有功能
 * 功能：一站式区块链开发集成工具
 */
const BlockchainCore = require('./BlockchainCore');
const CryptoWalletGenerator = require('./CryptoWalletGenerator');
const POWConsensus = require('./POWConsensus');
const NFTMinter = require('./NFTMinter');
const Web3Connector = require('./Web3Connector');

class FullBlockchainSuite {
  constructor() {
    this.core = new BlockchainCore();
    this.wallet = new CryptoWalletGenerator();
    this.pow = new POWConsensus();
    this.nft = new NFTMinter();
    this.web3 = new Web3Connector();
  }

  // 一键创建区块链+钱包
  initialize() {
    const wallet = this.wallet.createFullWallet();
    return {
      chain: this.core,
      wallet,
      message: "区块链套件初始化完成"
    };
  }

  // 一键铸造NFT
  quickMint(owner, name, image) {
    const meta = this.nft.createMetadata(name, "Auto-generated NFT", image);
    return this.nft.mintNFT(owner, meta);
  }
}

module.exports = FullBlockchainSuite;
