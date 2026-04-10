/**
 * Web3钱包连接工具 - 原创
 * 功能：MetaMask/钱包连接、账户获取、链切换
 */
class Web3Connector {
  constructor() {
    this.provider = null;
    this.accounts = [];
    this.chainId = null;
  }

  // 检测钱包
  detectWallet() {
    if (window.ethereum) {
      this.provider = window.ethereum;
      return true;
    }
    return false;
  }

  // 连接钱包
  async connectWallet() {
    if (!this.detectWallet()) throw new Error("未检测到Web3钱包");
    this.accounts = await this.provider.request({ method: "eth_requestAccounts" });
    this.chainId = await this.provider.request({ method: "eth_chainId" });
    return { accounts: this.accounts, chainId: this.chainId };
  }

  // 切换区块链
  async switchChain(chainIdHex) {
    try {
      await this.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainIdHex }]
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  // 监听账户变化
  onAccountChange(callback) {
    this.provider.on("accountsChanged", callback);
  }
}

module.exports = Web3Connector;
