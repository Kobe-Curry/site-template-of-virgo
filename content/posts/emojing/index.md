---
title: "Emojing"
date: 2022-11-15T17:16:49+08:00
draft: false
categories: [玩具]
tags: []
card: false
---

Emoji（えもじ 绘文字），就是表情符号，来自日语词汇“絵文字”（假名为“えもじ”，读音即 emoji）。最早是由栗穰崇于 1999 年创作，并在日本网络及手机用户中流行。自苹果公司发布的 ios5 输入法中加入 emoji 后，这种表情符号开始席卷全球，现已被大多数计算机系统所兼容的 Unicode 编码采纳，得以普遍运用。 

[💡 loveminimal/emojing: Emojing - GitHub](https://github.com/loveminimal/emojing)

<!--more-->

现代浏览器对 Emoji 的支持越来越广泛，并且 Emoji 也很有趣！

> 先前一直使用 [emoji 表情符号大全](https://emoji6.com/emojiall/) ，本来布局很紧凑，某天打开就变大了…… 这就很🤕，自己撰一个，以便使用。

这里，我们实现一个简单的复制 Emoji 的页面 🎉 ➭ [Emojing](https://ovirgo.com/emojing) 。

## 用法

它本身就是一个工具页，你可以很方便地使用它 [Emojing](https://ovirgo.com/emojing) 。

配置 `config.js` ：

```js
export default {
	en: false
}
```

默认为中文界面，如果你想设置为英文，设置 `en: true` 即可。

## 预览

<img alt="picture 1" src="imgs/7889eaa42310aaa33fac026c8bf69960970aa7c628f21b361f8ec38e8aab8373.png" width="" />  

## 记录

我们用到了插件 [clipboard.js](https://clipboardjs.com/) 和 [Toastify](https://apvarun.github.io/toastify-js/#) ，并参考完善了 [emoji 表情大全_武恩赐的博客](https://blog.csdn.net/qq_38428356/article/details/114651515) 的 emoji 表情集合。
