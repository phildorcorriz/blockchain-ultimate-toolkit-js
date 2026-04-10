/**
 * 闪电贷模拟器 - 原创
 * 功能：闪电贷创建、借贷、归还、盈利计算
 */
class FlashLoanSimulator {
  constructor(feeRate = 0.0005) {
    this.feeRate = feeRate;
    this.loans = [];
  }

  // 创建闪电贷
  requestLoan(borrower, amount) {
    const fee = amount * this.feeRate;
    const loan = {
      loanId: `FLASH-${Math.random().toString(36).slice(2)}`,
      borrower, amount, fee,
      status: "ACTIVE",
      time: Date.now()
    };
    this.loans.push(loan);
    return loan;
  }

  // 归还闪电贷
  repayLoan(loanId, repayAmount) {
    const loan = this.loans.find(l => l.loanId === loanId);
    if (!loan) return false;
    const required = loan.amount + loan.fee;
    if (repayAmount >= required) {
      loan.status = "REPAID";
      loan.profit = repayAmount - required;
      return true;
    }
    return false;
  }
}

module.exports = FlashLoanSimulator;
