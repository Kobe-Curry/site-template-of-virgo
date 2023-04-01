---
title: 'Work'
date: 2020-09-29T12:10:47+08:00
draft: false
categories: [_Misc]
tags: []
---

开发环境 Jenkins 的 Git Branches 和项目名称对照表及其说明和备忘。

<!--more-->

## 备忘

公司 ERP
- http://192.168.4.223:34567/ERP/Login.aspx
- liuzengxi / 123456

## 相关账号地址

**开发 Jenkins:**

*=好吧，这玩意儿基本上已经废弃了……* 

-   http://192.168.51.218:6024/
-   user: admin pswd: admin

**生产 Jenkins：**

-   http://jenkinsiyin.oa.com/
-   liuzengxi/liuzengxi@i-yin.com.cn（账号/密码）

*如果访问不了在 hosts 文件中增加 `192.168.51.223 jenkinsiyin.oa.com`

**Git：**

-   http://new-git.oa.com/

## ELK

（测试）

192.168.51.223 添加到 hosts
http://kibana-test.i-yin.com.cn

（生产）

__esignsys.i-yin.com.cn 对应的 ELK:__

http://kibana.i-yin.com.cn/app/kibana#/discover?_g=()&_a=(columns:!(_source),index:fde18b30-5d4b-11ec-bf49-b71ea1532d69,interval:auto,query:(language:lucene,query:''),sort:!('@timestamp',desc))

USER/PSWD: saas / Abcd@2019

## 相关部署环境

> 最新 [共享部署石墨文档](https://shimo.im/sheets/rp3OVVl4wWtNYdAm/0VVcl)

## 新疆税局

工作时间：10:00-13:30 15:30-19:30

> 该项目为独立项目，兼容 IE8 兼容模式，原生 html+css+js 😱

Git 仓库：http://new-git.oa.com/zhizhi/xinjiangshuiwu.git 

## 签章系统

> 签章系统的私有化部署项目较多，以不同分支进行管理。

对外演示：

- 管理后台 http://esignsys.i-yin.com.cn/sign-sys-admin/#/login
- 应用前台 http://esignsys.i-yin.com.cn/sign-sys/#/login

~~以下是签章系统环境，每套都是独立的，不要再混了~~  
~~- 10.9.2.29 sign.oa.com（标准版）~~  
~~- 10.9.2.28（北京五矿）~~  
~~- xjbdc.i-yin.com.cn（不动产外网环境）~~  
~~- 192.168.49.224（招银外网环境）~~  
~~- 192.168.51.251（新钢项目）~~  
~~招银理财外网地址： http://121.201.40.131:8810/sign-sys/#/login~~

| Jenkins 的 Git Branches     | 项目名称             | 是否需要本地构建 | 说明 |
| --------------------------- | -------------------- | ---------------- | ---- |
| `sign-sys-front`            | 签章系统前端         | ✔                |  http://new-git.oa.com/liangqiang/sign-system.git     |
| `sign-sys-front-admin`      | 签章系统后台管理系统 | ✔                |    http://new-git.oa.com/liangqiang/sign-system-admin.git    |
| `iyin-sign-front-operation` | 签章系统运营平台 | ✔                |    http://new-git.oa.com/zhizhi/sign-system-operation.git   |
| `sign-sys-demos` | 签署演示 |                 | http://new-git.oa.com/zhizhi/sign-sys-demos.git |

## SAAS 生产运维系统

| Jenkins 的 Git Branches | 项目名称             | 是否需要本地构建 | 说明 |
| ----------------------- | -------------------- | ---------------- | ---- |
| `Saas-front-develop`    | 生产运维系统前端代码 | ✘                |    http://new-git.oa.com/SaasPlatform/front/saas.git   |

## 云签

| Jenkins 的 Git Branches  | 项目名称         | 是否需要本地构建 | 说明 |
| ------------------------ | ---------------- | ---------------- | ---- |
| `cloud-sign-admin-front` | 云签后台管理前端 | ✔                |  http://new-git.oa.com/liangqiang/cloud-sign-admin-front.git      |
| `cloud-sign-front`       | 云签前端         | ✔                |  http://new-git.oa.com/liangqiang/cloud-sign-front.git     |

## 合同平台

| Jenkins 的 Git Branches        | 项目名称            | 是否需要本地构建 | 说明 |
| ------------------------------ | ------------------- | ---------------- | ---- |
| `contract_web_front`           | 合同平台前端        | ✘                |  http://new-git.oa.com/tanggz/contract.git     |
| `contract-platform-admin-font` | 合同平台 admin 项目 | ✘                |  http://new-git.oa.com/liangqiang/contract-platform-admin-font.git     |
| `contract-small1` | 合同平台小程序 |                 | http://new-git.oa.com/tanggz/contract_small1.git     |
| `contract-ukey-localsign` | 合同平台本地签 |                 | http://new-git.oa.com/loveminimal/contract-ukey-localsign.git     |
| `contract-sign-sys-demos` | 合同签署演示 |                 | http://new-git.oa.com/loveminimal/sign-sys-demos.git     |

## 官网项目

| Jenkins 的 Git Branches | 项目名称       | 是否需要本地构建 | 说明                   |
| ----------------------- | -------------- | ---------------- | ---------------------- |
| `ay-mobile`             | 安印官网移动端 | ✘                | http://new-git.oa.com/hongjin/ay-mobile.git |
| `new-iyin-website`             | 安印新官网 |                 |  http://new-git.oa.com/frontend/iyin/new-iyin-website.git  |
| `evidence`             | 存证 |                 |   http://new-git.oa.com/tanggz/evidence.git  |
| `sign-verify`             | 验签 |                |   http://new-git.oa.com/hongjin/sign-verify.git  |
| `iyin-demo`             |  |                |    http://new-git.oa.com/liangqiang/iyin-demo.git  |
