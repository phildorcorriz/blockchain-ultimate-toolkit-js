/**
 * 委托权益证明共识算法 - 原创
 * 功能：节点投票、出块节点选举、轮流出块
 */
class DPOSConsensus {
  constructor() {
    this.candidates = [];
    this.validators = [];
    this.votes = new Map();
    this.validatorCount = 5;
  }

  // 注册节点候选人
  registerCandidate(nodeAddress) {
    if (!this.candidates.includes(nodeAddress)) {
      this.candidates.push(nodeAddress);
    }
  }

  // 投票
  vote(voterAddress, candidateAddress, weight = 1) {
    this.votes.set(candidateAddress, (this.votes.get(candidateAddress) || 0) + weight);
  }

  // 选举出块节点
  electValidators() {
    const sorted = Array.from(this.votes.entries()).sort((a, b) => b[1] - a[1]);
    this.validators = sorted.slice(0, this.validatorCount).map(item => item[0]);
    return this.validators;
  }

  // 轮流出块
  getNextValidator() {
    const validator = this.validators.shift();
    this.validators.push(validator);
    return validator;
  }
}

module.exports = DPOSConsensus;
