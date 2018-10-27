# Swarm 基本介绍

![swarm](../resources/swarm.png)

## 节点

- `manager 节点`

  在集群中至少一个。对于高可用的生产环境的集群来说，需要多个。对于多个 `manager` 节点，使用 `Raft 一致协议` 。此协议要求有奇数个节点，形成组称之为 `共识小组（consensus group）`。`共识小组` 之间的通讯是同步的。`manager` 是管理 Swarm 以及 Swarm 的状态。这些状态包括诸如多少节点，每个节点的属性比如名称、IP等。`manager` 的每个成员都有这些状态的完整副本，以 `key-value` 的形式存储。

- `worker 节点`

    实际运行容器的节点。`work 节点` 间通过一个称之为 `控制平面（control plane）` 的进行通讯，使用的是 `gossip 协议` 。此协议是异步的。`worker 节点` 通讯的数据包括服务发现以及路由的一些信息。`worker 节点` 只会被动接受来自于 `manager 节点` 分配的任务。

## Stacks, services, and tasks

