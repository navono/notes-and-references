[Github地址](https://github.com/Microsoft/api-guidelines.git)
<!-- TOC -->

- [推荐相关阅读](#推荐相关阅读)
- [分类](#分类)
  - [错误（Errors）](#错误errors)
  - [故障（Faults）](#故障faults)
  - [延时（Latency）](#延时latency)
  - [完成时间（Time to complete）](#完成时间time-to-complete)
  - [Long runtime API faults](#long-runtime-api-faults)
- [客户端指南](#客户端指南)
  - [Ignore规则](#ignore规则)
  - [变量排序规则](#变量排序规则)
  - [静默失败（Silent fail）规则](#静默失败silent-fail规则)
- [一致性基础](#一致性基础)
  - [URL结构](#url结构)
  - [URL长度](#url长度)
  - [标准标识符（Canonical identifier）](#标准标识符canonical-identifier)
  - [支持的方法](#支持的方法)
  - [标准的请求头](#标准的请求头)
  - [标准的响应头](#标准的响应头)
  - [自定义头](#自定义头)
  - [指定特定的头作为查询参数](#指定特定的头作为查询参数)
  - [PII参数](#pii参数)
  - [响应格式](#响应格式)
  - [HTTP状态码](#http状态码)
  - [可选的客户端库](#可选的客户端库)
- [CORS](#cors)
  - [客户端指南](#客户端指南-1)
  - [服务端指南](#服务端指南)
- [集合](#集合)
  - [Item keys](#item-keys)
  - [序列化](#序列化)
  - [URL模式集合](#url模式集合)
  - [Big collections](#big-collections)
  - [Changing collections](#changing-collections)
  - [Sorting collections](#sorting-collections)
  - [过滤](#过滤)
  - [分页](#分页)
  - [复合的集合操作（Compound collection operations）](#复合的集合操作compound-collection-operations)
- [Delta查询（Delta queries）](#delta查询delta-queries)
  - [Delta链接](#delta链接)
  - [实体表现（Entity representation）](#实体表现entity-representation)
  - [获取一个delta链接](#获取一个delta链接)
  - [delta链接响应的内容](#delta链接响应的内容)
  - [使用delta链接](#使用delta链接)
- [JSON标准化](#json标准化)
- [版本](#版本)
- [耗时长的操作](#耗时长的操作)
- [通过 webhook 推送通知](#通过-webhook-推送通知)
- [不支持的请求](#不支持的请求)
- [命名原则](#命名原则)

<!-- /TOC -->
# 推荐相关阅读


# 分类
## 错误（Errors）
一般指的是从客户端传输给服务器端不正确的数据导致服务器端拒绝的错误。比如`参数错误`，`版本错误`，`无效授权`等等。返回码是`4xx`。

`错误` __不会__ 影响`整体API`的`可用性（availability）`。
Calls that fail due to rate limiting or quota failures MUST NOT count as faults. Calls that fail as the result of a service fast-failing requests (often for its own protection) do count as faults.

## 故障（Faults）
指的是在服务器端发生故障从而无法正常提供服务，返回码是`5xx`。

`故障` __会__ 影响`整体API`的`可用性（availability）`。

## 延时（Latency）
指的是一个`API调用`完成需要的时间，适用于`异步API`和`同步API`。

## 完成时间（Time to complete）
如果一个`API`在设计之初就清楚是一个耗时操作，那么应该监控其完成时间。

## Long runtime API faults
如果一个耗时长的API的底层发生了故障，那么这个操作是要可以回退的。

# 客户端指南
## Ignore规则
简单说就是服务器端返回了客户端无法识别的数据或字段时，客户端应该直接忽略这些数据和字段。

## 变量排序规则
客户端不应该依赖于从服务器端返回的`JSON`数据的顺序。但是可以和服务端商量好一个操作是否需要一组API支持，同时调用这组API的顺序如何。

## 静默失败（Silent fail）规则
对于服务器提供的可选功能，客户端必须要能够处理服务器忽略这个功能时的相应。

# 一致性基础
## URL结构
`URL`应该是容易理解且可读的，同时是构造良好的。

一个经常使用的模式就是将`URL`当做值使用，这就要求服务器端能够将`URL`当做值使用。例如：
> https://api.contoso.com/v1.0/items?url=https://resources.contoso.com/shoes/fancy

## URL长度
`HTTP 1.1`规范中没有规定`URL`的长度限制。但是通常来说，服务器端对此都会有一定的限制，如果超出的话，返回码就是`414(URI Too Long)`。

## 标准标识符（Canonical identifier）
## 支持的方法
## 标准的请求头
## 标准的响应头
## 自定义头
## 指定特定的头作为查询参数
## PII参数
## 响应格式
## HTTP状态码
## 可选的客户端库


# CORS
## 客户端指南
## 服务端指南


# 集合
## Item keys
## 序列化
## URL模式集合
## Big collections
## Changing collections
## Sorting collections
## 过滤
## 分页
## 复合的集合操作（Compound collection operations）



# Delta查询（Delta queries）
## Delta链接
## 实体表现（Entity representation）
## 获取一个delta链接
## delta链接响应的内容
## 使用delta链接


# JSON标准化


# 版本


# 耗时长的操作


# 通过 webhook 推送通知


# 不支持的请求


# 命名原则