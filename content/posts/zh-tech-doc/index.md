---
title: "中文技术文档"
date: 2021-07-19T15:18:02+08:00
draft: false
categories: [标准化]
tags: []
---

<img src="https://www.ruanyifeng.com/blogimg/asset/2016/bg2016101802.jpg" width="200" style="float: right; margin-left: 8px; " />

🔔 参考 [中文技术文档的写作规范](https://www.ruanyifeng.com/blog/2016/10/document_style_guide.html) ，及个人写作习惯。

<!--more-->

## 简介

本文旨在学习和思考如何形成良好统一的文档写作习惯，原则是做到简洁、易懂，便于检索。

## 文档结构

#+CAPTION: 文档结构

| 目录/文件 |            |                   | 必备/类型     | 说明                                     |
|             |              |                     | <c>             |                                            |
|-------------|--------------|---------------------|-----------------|--------------------------------------------|
| 简介        |              | Introduction        | 是/目录         | 提供对产品和文档本身的总体的、扼要的说明    |
| ----------- | ------------ | ------------------- | --------------- | ------------------------------------------ |
| 快速上手    |              | Getting Started     | 否/文件         | 如何最快速地使用产品                       |
| ----------- | ------------ | ------------------- | --------------- | ------------------------------------------ |
| 入门篇      |              | Basics              | 是/目录         | 又称“使用篇”，提供初级的使用教程            |
|             | - 环境准备   | - Prerequisite      | 是/文件         | 软件使用需要满足的前置条件                 |
|             | - 安装       | - Installation      | 否/文件         | 软件的安装方法                             |
|             | - 设置       | - Configuration     | 是/文件         | 软件的设置                                 |
| ----------- | ------------ | ------------------- | --------------- | ------------------------------------------ |
| 进阶篇      |              | Advanced            | 否/目录         | 又称“开发篇”，提供中高级的开发教程          |
| ----------- | ------------ | ------------------- | --------------- | ------------------------------------------ |
| API         |              | Reference           | 否/目录、文件    | 软件 API 的逐一介绍                        |
| ----------- | ------------ | ------------------- | --------------- | ------------------------------------------ |
| FAQ         |              |                     | 否/文件         | 常见问题解答                               |
| ----------- | ------------ | ------------------- | --------------- | ------------------------------------------ |
| 附录        |              | Appendix            | 否/目录         | 不属于教程本身，但对阅读教程有帮助的内容    |
|             | - 名词解释   | - Glossary          | 否/文件         |                                            |
|             | - 最佳实践   | - Recipes           | 否/文件         |                                            |
|             | - 故障处理   | - Troubleshooting   | 否/文件         |                                            |
|             | - 版本说明   | - ChangeLog         | 否/文件         |                                            |
|             | - 反馈方式   | - Feedback          | 否/文件         |                                            |

*两个真实范例，可参考 [Redux 手册](https://redux.js.org/introduction/getting-started) 和 [Atom 手册](http://flight-manual.atom.io/) 。
