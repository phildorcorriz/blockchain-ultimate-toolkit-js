/**
 * NFT市场交易工具 - 原创
 * 功能：挂单、购买、交易手续费、历史记录
 */
class NFTMarketplace {
  constructor(feeRate = 0.025) {
    this.feeRate = feeRate;
    this.listings = [];
    this.trades = [];
  }

  // NFT挂单
  listNFT(nftId, seller, price) {
    const listing = {
      listId: `LIST-${Math.random().toString(36).slice(2)}`,
      nftId, seller, price,
      status: "LISTED",
      time: Date.now()
    };
    this.listings.push(listing);
    return listing;
  }

  // 购买NFT
  buyNFT(listId, buyer) {
    const list = this.listings.find(l => l.listId === listId && l.status === "LISTED");
    if (!list) return false;
    const fee = list.price * this.feeRate;
    const sellerReceive = list.price - fee;
    list.status = "SOLD";
    this.trades.push({ ...list, buyer, fee, sellerReceive, tradeTime: Date.now() });
    return true;
  }

  // 获取交易历史
  getTradeHistory() {
    return this.trades;
  }
}

module.exports = NFTMarketplace;
