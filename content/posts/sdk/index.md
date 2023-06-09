---
title: "打造 SDK"
date: 2020-12-01T15:09:04+08:00
draft: false
categories: [标准化]
tags: []
---
 
🔔 转载自 [如何打造一款标准的 JS-SDK](https://zhuanlan.zhihu.com/p/272614462)

<img src="/posts/sdk/imgs/sdk-1.jpg" width="400" style="float: right; margin-left: 16px;" />

SDK（Software Development Kit，软件开发工具包），一般都是一些软件工程师为特定的软件包、软件框架、硬件平台、操作系统等建立应用软件的开发工具的集合。简单讲， **面向开发者，针对特定领域的软件包** ，基于它，开发人员可以快速构建自己的应用 App 。

***注：比较规范的 SDK 一般都会包含若干的 API 、开发工具集和说明文档。**

<!--more-->

本文主要介绍如何基于 JavaScript 来开发的 SDK ，鉴于 JS 语言本身的特性，基于它封装的 SDK 更多常见于 UI 组件库、统计分析、Web 服务接口封装、前端稳定性和性能监控等场景。

## 设计原则

**如何设计 SDK ？** 更多取决于其应用场景和最终用途。比如，实现一个给网页调用的 SDK 与用于服务端的 SDK 就有明显的差异，但综们之间存在着一些共通的原则：
- 最小可用性原则，即用最少的代码，如无必要勿增实体；
- 最少依赖性原则，即最低限度的外部依赖，如无必要勿增依赖。

进一步阐述，即我们打造的 SDK 要符合以下的要求。

__1. 满足功能需求__

SDK 一般都是偏向于某个领域，所以，同时在设计和实现的时候明确职责和边界很重要，同时还应该足够精简，专注领域的业务。

__2. 足够稳定__

- 绝不能导致宿主应用崩溃（最基础、最严格的要求）；
- 较好的性能，比如 SDK 体积应尽量小，运行速度尽量快；
- 可测试，保障每一次变更；
- 向后兼容，不轻易出现 Breakchange 。

__3. 少依赖，易扩展__

- 最小程度的第三方依赖，尽可能自行实现，确实无法避免则最小化引入；
- 插件化，最大限度支持扩展；
- Hook 机制，满足个性化诉求。

## 如何实现

下面我们将通过剖析岳鹰前端监控 SDK 的设计过程，来看看上述的设计原则是如何应用到实际的开发过程中的。

### 明职责，定边界

岳鹰前端监控 SDK 是前端稳定性和性能监控的 SDK，主要面向前端 H5 领域。因此，稍加分析即可得出以下结论：

>- 前端领域，稳定性方面主要的关注点：
>	- JS 异常；
>  	- 资源加载异常；
>  	- API 请求异常；
>  	- 白屏异常；
>- 性能方面，核心的关注点：
>  	- 白屏时间；
>  	- 可交互时间（TTI）；
>  	- 首屏时间；
>  	- FP/FMP/FCP 等。

上述监控内容实际上都相对独立，因此我们可以把 Ta 们横向划分为如下几大部分：

<img src="imgs/sdk-2.jpg" width="500" />

明确了 SDK 的边界以及各部分的职责，结合前端监控的特性，我们可以开始设计 SDK 的整体框架了。

### 筑框架，夯基础

__1. 确定 SDK 的引用形式__

前端模块有多种表现形式：

```
- ES Module
- CommonJS
- AMD/CMD/UMD
```

而在引用方面大体分为：CDN 和 NPM 两种分发方式，即无论我们实现的是哪种形式的模块，最终都是通过这两种方式提供给用户引用。

```js
  import wpkReporter from 'wpkReporter'

  // CommonJS
  const wpkReporter = require('wpkReporter')

  // AMD requireJS 引用
  require.config({
      paths: {
          'wpk': 'https://g.alicdn.com/woodpeckerx/jssdk/wpkReporter.js',
      }
  })
  require(['wpk', 'test'], function(wpk) {
      // do your business
  })
```

有点烦琐，但事实上今时今日的前端工程领域，已有很多利器可以帮助我们达到目的。比如， webpack 通过简单的配置就可以构建出一个 UMD 的 bundule，可以自动适配所有形式的模块：

```js
  module.exports = {
      output: {
          filename: '[name].js',
          path: `${__dirname}/dist`,
          globalObject: 'this',
          library: '[name]',
          libraryTarget: 'umd'
      }
  }
```

__2. 确定 SDK 的版本管理机制__

现有较成熟的版本管理机制当属 **语义化版本号** ，表现形式为 `{主版本}.{次版本}.{补丁版本}` ，简单易记好管理。

- 一般重大的变更才会触发主版本号的更替，而且很可能新旧版本不兼容；
- 次版本主要对应新特性或者较大的调整，因此也有可能出现 breakchange ；
- 其他小的优化或 bugfix 就基本都是在补丁版本号体现。

所有 NPM 模块都遵循语义化版本规范，因此结合第一点，我们可以将 SDK 初始化为一个 NPM 模块，结合 webpack 的能力就可以实现基础的版本管理及模块构建。

__3. 确定 SDK 的基础接口__

**接口是 SDK 和用户沟通的桥梁，每一个接口对应着一个独立的 SDK 功能，并且有明确的输入和输出。**

我们可以先来看看岳鹰前端监控 SDK 的核心接口有哪些？

```js
wpk.report(logData)
wpk.reportJSError(error)
wpk.reportAPIError(apiData)
// 配置变更
wpk.setConfig(data)
// SDK 诊断
wpk.diagnose()
// 添加插件
wpk.addPlugin(plugin)
```

总结一下接口的设计原则，大致如下：
- 职责单一，一个接口只做一件事情；
- 命名简单清晰，参数尽量少但可扩展；
- 参数尽可能使用 Object 封装；
- 做好参数校验和逻辑保护。

> 好的接口命名就是最好的注释，一看即明白其用处。

### 领域分析，模块划分

确定边界的时候，我们已经清楚划分了 SDK 的几个关键部分：全局异常、API 异常、页面性能和白屏， **每一块都对应一个专业的领域** ，因此对应到 SDK 也是每一个独立的模块。

实际上监控 SDK 通常也会内置对页面就是的监控，以方便用户对异常的影响面做出评估。除了这些核心的偏领域的模块，SDK 还需要更基础的与领域无关的模块，包括：

```
- SDK 内核：
  - 构造方法
  - 插件机制
  - 与下游的交互
  - 上报队列机制
  - 不同环境和管理等等
- 工具库
```

我们来看一下岳鹰前端监控 SDK 最后的整体模块划分：

<img src="imgs/sdk-3.jpg" width="600" />

SDK 底层提供基础的能力，包括上面提到的内核、插件机制的实现、工具类库以及暴露给用户的基础 API 。

可以看到，我们前面提到的所有模块都 **以插件的形式存在** ，即各个领域的功能都各自松散的做实现，这样使得底层能力更具有通用性，同时扩展能力也更强，用户甚至也可以封装自己的插件。

Biz 部分更多是对于不同宿主环境的多入口适配，当前支持浏览器 、Weex 以及 NodeJS 。

### 测试覆盖，线上无忧

SDK 是一个基础服务，相对于前台业务而言可能更底层些。其影响面跟应用的范围是正比的关系，更多的用户意味着更大的责任。所以 SDK 的质量保障也是很重要的一个环节。
岳鹰前端监控 SDK 的质量保障策略很简单，只有两条：
- 核心接口 100% 的单元测试覆盖率；
- 发布卡点：再小的版本发布也需要走集成测试回归。

事实上，除了核心接口，工具类库的所有功能我们都实现了 100% 的单元测试覆盖，我们采用的前端测试工具是轻量好用的 Jest 。

```js
  test('isError: real error', function () {
      var err = new Error('this is an error')
      expect(util.isError(err)).toBeTruthy()
  })
```

### 细节打磨，极致体验

快捷引入：
- 极尽所能提高用户引用的效率；
- 一行代码，快速引入，享用监控全家桶功能。

```html
<script>
  !(function(c,i,e,b){var h=i.createElement("script");var f=i.getElementsByTagName("script")[0];h.type="text/javascript";h.crossorigin=true;h.onload=function(){c[b]||(c[b]=new c.wpkReporter({bid:"dta_1_203933078"}));c[b].installAll()};f.parentNode.insertBefore(h,f);h.src=e})(window,document,"https://g.alicdn.com/woodpeckerx/jssdk/wpkReporter.js","__wpk");
</script>
```

动态采样：
- 即通过云端下发数据采样率的方式，控制客户端上报数据的频率；
- 更好的保护监控下游。

自我诊断：
- 除了接口，SDK 整体对用户而言就是一个黑盒，因此用户在遇到问题时很容易蒙圈 （如：为啥没有上报数据）；
- SDK 可以提供一个自我诊断的接口，快速排除基础问题。比如，SDK 是否已正常初始化、关键参数是否正常设置等。

增加调试模式，输出更详细的过程日志，方便定位问题。

渐进式的指引文档：
- 图文并茂，循序渐进；
- 入门，一步步引导用户初识 SDK，领略概貌，学会基本的使用；
- 进阶，安利 SDK 的深度用法，帮助用户更好的使用 SDK 。

## 结语

实际在 SDK 的设计和开发过程中，要处理的问题还远不止本文所述的内容，比如 NPM 模块开发时本地如何引用，构建的 bundle 大小如何调优等等。不过还是希望阅完此文，对你有所启发。
