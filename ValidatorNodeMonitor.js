/**
 * 区块链验证节点监控 - 原创
 * 功能：节点状态、出块率、在线率监控
 */
class ValidatorNodeMonitor {
  constructor() {
    this.nodes = new Map();
  }

  // 注册验证节点
  registerNode(nodeId, address) {
    this.nodes.set(nodeId, {
      address, status: "ONLINE", blocksProduced: 0,
      lastActive: Date.now(), uptime: 100
    });
  }

  // 更新节点状态
  updateNodeStatus(nodeId, status) {
    const node = this.nodes.get(nodeId);
    if (node) {
      node.status = status;
      node.lastActive = Date.now();
    }
  }

  // 统计节点出块率
  getNodeStats(nodeId) {
    const node = this.nodes.get(nodeId);
    if (!node) return null;
    const offlineTime = Date.now() - node.lastActive;
    node.uptime = offlineTime > 300000 ? 95 : 100;
    return node;
  }

  // 获取所有节点状态
  getAllNodes() {
    return Array.from(this.nodes.values());
  }
}

module.exports = ValidatorNodeMonitor;
