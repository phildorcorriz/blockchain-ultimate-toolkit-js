/**
 * DAO治理工具 - 原创
 * 功能：提案创建、投票、结果统计、提案执行
 */
class DAOGovernance {
  constructor() {
    this.proposals = [];
    this.votes = new Map();
  }

  // 创建治理提案
  createProposal(title, description, creator) {
    const proposal = {
      id: `PROP-${Math.random().toString(36).slice(2,10)}`,
      title, description, creator,
      forVotes: 0, againstVotes: 0,
      status: "ACTIVE",
      createTime: Date.now()
    };
    this.proposals.push(proposal);
    return proposal;
  }

  // 投票
  voteProposal(proposalId, voter, support) {
    const key = `${proposalId}-${voter}`;
    if (this.votes.has(key)) return false;
    this.votes.set(key, true);
    const prop = this.proposals.find(p => p.id === proposalId);
    support ? prop.forVotes++ : prop.againstVotes++;
    return true;
  }

  // 结束提案并统计结果
  finalizeProposal(proposalId) {
    const prop = this.proposals.find(p => p.id === proposalId);
    if (!prop) return null;
    prop.status = prop.forVotes > prop.againstVotes ? "PASSED" : "REJECTED";
    return prop;
  }
}

module.exports = DAOGovernance;
