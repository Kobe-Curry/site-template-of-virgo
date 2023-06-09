---
title: '模块化编程'
date: 2020-12-11T10:52:19+08:00
draft: false
categories: [JavaScript]
tags: []
---

i.e. Modular Programming

> 每一个领域的内容，都要有先问一下 -- 是什么？为什么？做什么？怎么做？
>
> -   是什么？简述概念；  
> -   为什么？历史发展，出现的原因，优缺点；  
> -   做什么？主要应用场景；  
> -   怎么做？具体使用方法步骤。

<!--more-->

## 简介

**模块化编程** （模块化程序设计），是指在进行程序设计时将一个大程序按照功能划分为若干小程序模块，每个小程序模块完成一个确定的功能，并在这些模块之间建立必要的联系，通过模块的互相协作完成整个功能的程序设计方法。

*=大程序 → （功能）小程序模块（ → 子过程） → 模块联系、协作*

随着程序规模的扩大，无论是项目本身（编写、扩展、测试、维护），还是经济上的考虑（效率、收支），分工协作都是不可避免的。

在模块化的过程中可能会产生什么问题呢？ **命名冲突**，本质在于作用域。

*=实际项目中，模块化开发几乎不会是一个人开发所有模块，那就很难避免命名冲突（小甲和小乙都使用了同一个变量名、函数名），项目越大，越难控制。* 

下面我们就以 JavaScript 为例来看一下其模块化的发展。

*=为什么选用 JavaScript 呢？因为 JavaScript 最初的设计是没有模块化考虑的，而是随着其应用场景和范围的变化，逐渐通过各种方式实现了模块化，如此，我们可以看一下其模块化的全貌和历程。* 

## JavaScript 的模块化 [1]

1991 年 8 月 6 日 （农历六月廿六），世界上第一个网页诞生。世界上的第一个网页是这样的 http://info.cern.ch/ ，只用来作为文本的展示和极其简单的交互。

<img src="imgs/mp-1.jpg" />

`> 万维网的发明者，互联网之父蒂姆·伯纳斯·李`

检查一下网页源码的话，你会发现，它只是纯 HTML 文本，没有 CSS ，更没有 JavaScript 。

*=哈坤·利于 1994 年在芝加哥的一次会议上第一次展示了 CSS 的建议；JavaScript 是 1995 年由 Netscape 公司的 Brendan Eich，在网景导航者浏览器上首次设计实现而成。* 

随着网页越来越像桌面程序，需要一个团队分工协作、进度管理、单元测试等等……开发者不得不使用软件工程的方法，管理网页的业务逻辑。JavaScript 的模块化编程，已经成为一个迫切的需求。

前面我们已经知道，JavaScript 最初设计的时候就没有考虑到模块化，那么我们要怎么实现它的模块化呢？

模块化编程是将一个大程序按照功能划分为若干小程序模块，那么，我们我们首先要解决的就是 **划分模块** 。

### 原始划分

我们可以认为模块就是实现特定功能的一组方法（以及记录状态），只要把不同函数简单地放在一起，就算是一个模块。

```js
// 这就是一个模块
function m1() {
    /* ... */
}
function m2() {
    /* ... */
}
// ...
```

上面的代码中，函数 `m1()` 和 `m2()` ，组成一个模块，使用的时候，直接调用就行了。这样做有以下缺点：

```
- 污染了全局变量，无法保证不与其他模块发生变量名冲突；
- 模块成员之间看不出直接关系。
```

*=看，模块化其实就是相反的两个方面： ‘拆分’（隔离、解决冲突）和‘组合’（依赖、导出引入）。* 

### 对象划分

为了解决上面的缺点，可以把模块写成一个对象，所有的模块成员都放到这个对象里面。

```js
var module1 = new Object({
    _count: 0,
    m1: function () {
        /* ... */
    },
    m2: function () {
        /* ... */
    },
});
```

上边的函数 `m1()` 和 `m2()` ，都封装在 `module1` 对象里（现在它们有关系了，都属于一个对象嘛），使用的时候，就是调用这个对象的属性，如 `module1.m1()` 。但是，这样的写法会暴露所有模块成员，内部状态可以被外部改写，如 `module1._count = 5` 。

*=很显然，这样的封装是不安全的。* 

### 立即执行函数划分

如何不暴露私有成员的目的，自然是做到外界不能直接访问原始对象内部，只能访问我们想让他访问的对象。使用“立即执行函数（Immediately-Invoked Function Expression, IIFE）”，可以砍到不暴露私有成员的目的。

```js
var module1 = (function () {
    var _count = 0;
    var m1 = function () {
        /* ... */
    };
    var m2 = function () {
        /* ... */
    };

    // 这个就是我们想让外界访问到的对象了
    return {
        m1: m1,
        m2: m2,
    };
})();
```

如此，在 `{ m1: m1, m2: m2 }` 中根本没有 `_count` 变量，外界自然是访问不到的喽。

至此，我们解决了 JavaScript 中如何模块化的问题 -- 使用 IIFE 来实现模块分离（避免命名冲突、封装不够等问题）。

### 模块依赖

我们在前面已经讲述了 **如何分离模块的问题** ，那么，另一个问题也就随之而来了 -- 假如在一个程序中，模块 A 调用了 B ，B 又调用了 C、D ，我们如何处理 **模块之间的依赖关系** 呢？

什么是依赖？聚焦在模块本身无非就是两点：

1. 如何导入一个模块？
2. 如何导出模块中你想暴露的？

我们来了解一下比较成熟的模块实现方式，如 CommonJS、AMD、CMD、UMD 和 ES Module 等。后续的章节中，我们重点来认识一下 CommonJS 和 ES Module 两种模块规范，其他在实际项目中已经应用不多。

## CommonJS[2]

在 Node 环境中，一个 `.js` 文件就称之为一个模块（module），它们遵循 CommonJS 模块规范。

我们来看一个具体的例子，假如我们遵循 CommonJS 规范编写 `hello.js` 文件，如下：

```js
// hello.js 文件就是名为 hello 的模块
var s = 'Hello';

function greet(name) {
    console.log(s + ', ' + name + '!');
}

// 导出模块
// 把函数 greet 作为模块的输出暴露出去
module.exports = greet;
```

在同一目录下，再来编写 `main.js` 文件，来调用 `hello` 模块的 `greet` 函数，如下：

```js
// 引入模块
// 使用 Node 提供的 `require` 函数引入模块 `hello`
var greet = require('./hello');

var s = 'Michael';
greet(s); // → Hello, Michael!
```

综上可知，CommonJS 规范，使用

-   `module.exports` 暴露模块，如 `module.exports = variable` ，其中 `variable` 可以是任意对象、函数、数组等；
-   `require` 函数导入模块，如 `var ref = require('module_name)` ，引入的对象具体是什么，取决于所引入模块输出的对象。

*=‘输出’ 决定 ‘引入’！* 

### CommonJS 模块原理

我们知道，JavaScript 语言本身并没有一种模块机制来保证不同模块可以使用相同的变量名。

**那么，NodeJS 是如何实现这一点的呢？**

*_1. 模块隔离*

其实要实现“模块”这个功能，并不需要语法层面的支持，NodeJS 也没有增加任何新的 JavaScript 语法。实现“模块”功能的奥妙就在于 JavaScript 是一种函数式编程语言， **它运行闭包！闭包！闭包！** ，如我们上面说到是 IIFE 。我们只需要把一段 JavaScript 代码用一个函数包装起来，这段代码的所有“全局”变量就变成了函数内部的局部变量。

*=看，我们使用函数的作用域作了隔离，如此，就避免了不同模块内部变量、函数名的命名冲突。* 

```__思考：闭包为什么可以做作用域隔离呢？
答案：内存机制决定的。看，内存才是最本质的。
```

下面，我们来看看 NodeJS 具体为我们做了什么？

我们编写的 `hello.js` 代码是这样的：

```js
var name = 'world';

console.log('Hello, ' + name + '!');
```

NodeJS 加载了 `hello.js` 之后，把代码包装了一下，变成了这样执行 ↓ ：

```js
(function () {
    // 读取 hello.js 代码
    var name = 'world';

    console.log('Hello, ' + name + '!');
    // hello.js 代码读取结束
})();
```

如此， `name` 就变成了函数内部的局部变量，如果 NodeJS 继续加载其他模块，这些模块中定义的 `name` 也互不干扰。

*_2. 模块输出*

NodeJS 利用 JavaScript 的函数式编程特性 -- 闭包，轻松实现了模块的隔离。

**但是，模块的输出 `module.exports` 是怎么实现的呢？**

这个也容易，原来 NodeJS 先准备了一个对象 `module` ，如下：

```js
// NodeJS 准备一个 module 对象
var module = {
    id: 'hello',
    exports: {},
};

var load = function (module) {
    // 读取的 hello.js 代码
    function greet(name) {
        console.log('Hello, ' + name + '!');
    }

    module.exports = greet;
    // hello.js 代码读取结束

    return module.exports;
};

var exported = load(module);
// 保存 module
save(module, exported);
```

可见，变量 `module` 是 NodeJS 在加载 `.js` 文件之前准备的一个变量，并将其传入加载函数，我们在 `hello.js` 中可以直接使用变量 `module` 原因就在于它实际上是加载函数的一个参数。

通过把参数 `module` 传递给 `load()` 函数， `hello.js` 就顺利地把一个变量传递给了 Node 执行环境，Node 会把 `module` 变量保存到某个地方。

由于 Node 保存了所有导入的 `module` ，当我们用 `require()` 获取模块时，Node 找到对应的 `module` ，把这个 `module` 的 `exports` 属性返回，如此，另一个模块就拿到了模块的输出。

*=通俗来说，就是 Node 加载模块时，在其可访问的环境（作用域）内挂载了一个 `module` 对象，如此该模块输出的 ‘对象’（变量、函数、对象等） 就可以赋给 `module` 对象的 `exports` 属性（即 `module.exports`）。* 

### module.exports VS exports

我们只需要知道， `module.exports` 是 NodeJS 为我们准备的用于模块输入的唯一真正的对象， `exports` 不过是对 `module.exports` 的引用罢了。这也就决定了，如下使用方式的对错：

```js
module.exports = { desc: '一个引用类型对象' }; // ✔
module.exports.var1 = variable; // ✔
exports.var1 = variable; // ✔ 并有改变 `exports` 的引用
exports = { desc: '一个引用类型对象' }; // ✘ 已改变了 `exports` 的引用
// 你改变了 `exports` 的指向，它就不再指向 `module.exports` 了，
// 自然也就不是模块的输出对象了，
// 记住，模块的输出对象只有一个
```

\***注：强烈建议只使用 `module.exports` 方式来输出模块变量！**

## ES Module[3]

在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS（Node 服务器端） 和 AMD （浏览器端）两种。

有一个好消息，ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

### ES Module VS CommonJS

ES Module 模块的设计思想是尽量的 **静态化** ，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东东。比如，CommonJS 模块输出的就是 `module.exports` 对象，输入时必须查找对象属性。

*=有了 ES6 静态加载，使得静态分析成为可能，就能进一步拓宽 JavaScript 的语法，比如引入宏（macro）和类型系统（type system）。* 

```
❓ 想一想，为什么 CommonJS 和 AMD 只有在运行时才能确定模块的依赖关系及输入输出变量呢？

✔️ 因为它们本质上都是“立即执行函数”（IIFE），不执行自然无法得到！
```

```js
let { stat, exists, readfile } = require('fs');

// 等同于
let _fs = require('fs'); // 引入了整个 `fs` 模块的整个输出对象
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```

上面代码的实质是整体加载 `fs` 模块（即加载 `fs` 模块的整个输出对象 `module.exports` ），生成一个对象 `_fs` ，然后再从这个对象上读取 3 个方法。

这种加载称为 **运行时加载** ，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

*=所谓“静态化”，没那么玄乎，不过就是在运行之前，编译阶段就可以确定的一些东东。* 

与 CommonJS 模块输出的是 `module.exports` 对象不同的时，ES Module 模块输出的并不是对象，而是 **通过 `export` 命令显式指定输出的代码，再通过 `import` 命令输入** 。如下：

```js
// ES Module
import { stat, exists, readFile } from 'fs';
```

其实质是从 `fs` 模块加载 3 个方法， **其他方法不加载** ，即它无法引用 ES Module 模块本身（因为它不是对象），这种加载称为 **编译时加载** （或静态加载）。

### export

ES Module 模块功能主要由两个命令构成： `export` 和 `import` ：

-   `export` 命令用于规定模块的对外接口；
-   `import` 命令用于输入其他模块提供的功能。

`export、import` 命令可以出现在模块的任何位置，只要处于模块顶层就可以，因为处在代码块中，就没法做静态优化了。

\***注： `export` 命令显式指定输出的代码，对，是代码！代码！代码！**

*=其实，看一下基本的编译原理，就很容易理解这个地方了，`export` 输出的其实是一个动态外链。* 

```js
export var year = 1990; // ✔

// or
var year = 1990;
export { year }; // ✔
// 还可以用别名输出
export { year as yearAlias1 }; // ✔
export { year as yearAlias2 }; // ✔
```

如上， `export` 导出的都是 `var year = 1990` 这行代码，而不是 `year` 这个变量。

如果，你像在下面这样使用，就会报错了，如：

```js
export 1                        // ✘

var m = 1
export m                        // ✘
```

想一下，为会什么会报错呢？因为它们 **不是有意义的代码** 呗！ `1` 只是一个字面量，引用它明显没有什么意义，同样 `m` 中存的也是 `1` 。

同理，对于函数而言，也是一样的，如下：

```js
export function f() {}          // ✔
// or
function f() {}
export { f }                    // ✔
export { f as fn }              // ✔
export f                        // ✘
```

**`export` 语句输出的接口，与其对应的值是动态绑定关系。** 即通过该接口，可以取到模块内部实时的值。这一点与 CommonJS 规范完全不同，CommonJS 模块输出的是值的缓存，不存在动态更新。

```js
export var foo = 'bar';
setTimeout(() => (foo = 'baz'), 500);
```

上面代码输出变量 `foo` ，值为 `bar` ，500 毫秒后变成 `baz` 。

### import

前面我们讲了输出 `export` ，这个章节我们来认识一下输入 `import` 。

`import` 命令接受一对大括号，里面指定要从其他模块导入的变量名，该变量名必须与被导入模块对象接口（输出的大括号是的变量啦）名称相同。其用法实例如下：

```js
import { year } from './profile.js'; // ✔
import { year as yearAlias } from './profile.js'; // ✔

import 'loadsh'; // ✔ 只是执行 loadsh 模块，不输入任何值
```

除了指定加载某个输出值，还可以使用 **整体加载** ，即用星号（ `*` ）指定一个对象，所有输出值都加载在这个对象上面。

```js
import * as circle from './circle';

circle.area(4); // 调用 circle 的 area() 方法计算面积
circle.circumference(14); // 调用 circle 的 circumference() 方法计算周长
```

### export default

前面说过，使用 `import` 命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到 `export default` 命令，为模块指定默认输出。

\*注： 使用 `export default` 输出的代码，用 `import` 命令引入时，不使用大括号。

```js
// export-default.js ///
// 匿名函数
export default function() {}      // ✔
// 具名函数
export default function foo() {}  // ✔
// or
function foo() {}
export default foo                // ✔

// import-default.js ///
import baz from './exort-default' // ✔ `baz` 可以是任何自定义的变量名
```

但是，对于使用 `export` 命令时，就不能省略大括号，如下：

```js
// export.js ///
export function foo() {}          // ✔
function foo() {}
export { foo }                    // ✔

// import.js ///
import { foo } from './export.js' // ✔
import foo form './export.js'     // ✘

```

**本质上， `export default` 就是输出一个叫做 `default` 的变量或方法，然后系统允许你为它取任意名字。**

```js
// export.js ///
function add(x, y) {
    return x + y;
}

export { add as default }; // ✔
// 等同于
// export default add           // ✔

// import.js ///
import { default as foo } from './export.js'; // ✔
// 等同于
// import foo from './export.js'             // ✔
```

同样，因为 `export default` 命令其实只是输出一个叫做 `default` 的变量，所以它后面不能跟变量声明语句。

```js
export var a = 1                // ✔

var a = 1
export default a                // ✔

export default var a = 1        // ✘
```

### export 与 import 的复合写法

如果在一个模块之中，先输入后输出同一个模块， `import` 语句可以与 `export` 语句写在一起。

```js
export { foo, bar } from 'my_module';

// 等价于
import { foo, bar } from 'my_module';
export { foo, bar };
```

上面代码中， `export` 和 `import` 语句可以结合在一起，写成一行。

但需要注意的是，写成一行以后， `foo` 和 `bar` 实际上 **并没有被导入当前模块，只是相当于对外转发** 了这两个接口，导致当前模块不能直接使用 `foo` 和 `bar` 。

模块的接口改名和整体输出，也可以采用这种写法。

```js
// 接口改名
export { foo as myFoo } from 'my_module';

// 整体输出
export * from 'my_module';
export * as ns from "mod";

// 默认接口的写法
export { default } from 'foo';

// 具名接口改为默认接口的写法
export { es6 as default } from './someModule';
// 等同于
import { es6 } from './someModule';
export default es6;

// 默认接口也可以改名为具名接口
export { default as es6 } from './someModule';
```

### import()

前面介绍过， `import` 命令会被 JavaScript 引擎静态分析，先于模块内的其他语句执行。

这样的设计，固然有利于编译器提高效率，但也导致无法在运行时加载。在语法上，条件加载就不可能实现。如果 `import` 命令要取代 Node 的 `require` 方法，就形成了一个障碍。

```js
// 报错
if (x === 2) {
    import MyModule from './myModule'; // ✘ `import` 命令不支持动态加载
}
```

ES2020 提案引入了 `import()` 函数，支持动态加载模块。

```
import(specifier)               // `specifier` 指定所要加载的模块的位置
```

`import()` 函数和 `import` 命令接受的参数相同，区别在于 `import()` 可以动态加载，且与所加载的模块并没有静态链接关系， **返回一个 Promise 对象** 。

`import()` 函数类似于 Node 的 `require` 方法，区别在于 `import()` 是异步加载，而 `require` 是同步加载。

```js
if (condition) {
    import('moduleA').then(/* ... */); // ✔
} else {
    import('moduleB').then(/* ... */); // ✔
}
```

\*注： `import()` 加载模块成功以后，这个模块会作为一个对象，当作 `then` 方法的参数。

## Webpack Module[4]

在模块化编程中，开发者将程序分解成离散功能块（Discrete Chunks of Funtionality），并称之为模块。

每个模块具有比完整程序更小的接触面，使得校验、调试、测试轻而易举。精心编写的模块提供了可靠的抽象和封装界限，使得应用程序中每个模块都具有条理清楚的设计和明确的目的。

NodeJS 从一开始就支持模块化编程，而 Web 浏览器对于模块化的支持却姗姗来迟。在 Web 存在多种支持 JavaScript 模块化的工具，如 AMD、CMD 等，这些工具各有优势和限制。

Webpack 基于从这些系统获得的经验教训，并将模块的概念应用于项目中的任何文件。

**什么是 Webpack 模块呢？**

Webpack 模块能够以各种方式表达模块之间的依赖关系，如：

-   ES2015 的 `import` 语句；
-   CommonJS 的 `require()` 语句；
-   AMD 的 `define` 和 `require` 语句；
-   CSS/SASS/LESS 文件中的 `@import` 语句；
-   样式 `url(...)` 或 HTML 文件 `<img src=...>` 中的图片链接。

_Webpack 是怎么做到这一点的呢？_ loader ！

Webpack 通过 loader 可以支持各种语言和预处理器编写模块。loader 描述了 webpack 如何处理非 JavaScript 的模块，并且在 bundle 中引入这些依赖。另外，webpack 社区已经为各种就行语言和语言处理器构建了 loader ，如： CoffeeScript、TypeScript、ESNext(Babel)、Sass、Less 等。

\*注：有关完整列表，请参考 [loader 列表](https://www.webpackjs.com/loaders) 或 [自己编写](https://www.webpackjs.com/api/loaders) 。

[4]: https://www.webpackjs.com/concepts/modules/

[3]: https://es6.ruanyifeng.com/#docs/module

[2]: https://www.liaoxuefeng.com/wiki/1022910821149312/1023027697415616

[1]: http://www.ruanyifeng.com/blog/2012/10/javascript_module.html
