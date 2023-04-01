---
title: "JSX"
date: 2022-05-09T12:58:20+08:00
draft: false
categories: [JavaScript]
tags: []
---

JSX <sup>[1]</sup> 是一个 JavaScript 的语法扩展（由 React 项目组发明并使用），它既不是字符串也不是 HTML。 **它本身是一个表达式** ，在编译（Babel）之后，会被转为普通 JavaScript 函数（ `React.createElement()` ）调用，并且对其取值后得到 JavaScript 对象。

<!--more-->

以下两种示例完全等效：

```js
const element = (
    <h1 className="greeting">
        Hello, world!
    </h1>
);

// === 完全等效于 ===

const element = React.createElement(
    'h1',
    {className: 'greeting'},
    'Hello, world!'
);

// 如果，你喜欢使用下边这种方式，那么，你就不需要 JSX
```

`React.createElement()` 会预先执行一些检查，但实际上它创建了一个这样的对象：

```js
// 注意：这是简化过的结构
const element = {
    type: 'h1',
    props: {
        className: 'greeting',
        children: 'Hello, world!'
    }
};
```

这些对象被称为 __“React 元素”__ ，它们描述了你希望在屏幕上看到的内容。React 通过读取这些对象，然后使用它们来构建 DOM 以及保持随时更新。


> 与浏览器的 DOM 元素不同，React 元素是创建开销极小的普通对象。React DOM 会负责更新 DOM 来与 React 元素保持一致。


## 其他

- https://www.jianshu.com/p/09a27fa55ce5


[1]: https://zh-hans.reactjs.org/docs/introducing-jsx.html
