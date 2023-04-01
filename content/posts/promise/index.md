---
title: 'Promise'
date: 2022-02-08T17:18:18+08:00
draft: false
categories: [JavaScript]
tags: [Ajax]
---

*=这篇 Promise 仅是摘录使用，内容很散碎……*

[Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 是一个对象（可以用来绑定回调函数），它代表了一个异步操作的最终完成或者失败。因为大多数人仅仅是使用已创建的 Promise 实例对象，所以我们首先说明怎样使用 Promise，再说明如何创建 Promise 。

<!--more-->

## 使用 Promise[1]

**本质上 Promise 是一个函数返回的对象** ，我们可以在它上面绑定回调函数，如此就不需要在一开始就把回调函数作为参数传入给这个函数了。

*=看了后面的 🌰 ，就容易理解了。一定程度上避免了回调地狱 👻*

下面来看一个示例，假设现在有一个名为 `createAudioFileAsync()` 的函数，它接收一些配置和两个回调函数，然后异步地生成音频文件。一个回调函数在文件成功创建时被调用，另一个则在出现异常时被调用。

```js
// 成功时的回调函数
function successCallback(result) {
    console.log('音频文件创建成功：' + result);
}

// 失败的回调函数
function failureCallback(error) {
    console.log('音频文件创建失败：' + error);
}

createAudioFileAsync(audioSettings, successCallback, failureCallback);
```

更现代的函数会返回一个 Promise 对象，使得你可以将你的回调函数绑定在该 Promise 上。下面我们重写函数 `createAudioFileAsync()` 使其返回 Promise，如下：

```js
const promise = createAudioFileAsync(audioSettings);
promise.then(successCallback, failureCallback);

// OR 简写为
createAudioFileAsync(audioSettings).then(successCallback, failureCallback);
```

我们把这个称为 **异步函数调用** ，这种形式有若干优点，下面我们将会逐一讨论。

不同于“老式”的传入回调，在使用 Promise 时，会有 **以下约定** ：

-   在本轮 [事件循环](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop#%25E6%2589%25A7%25E8%25A1%258C%25E8%2587%25B3%25E5%25AE%258C%25E6%2588%2590) 运行完成之前，回调函数是不会被调用的；
-   即使异步操作已经完成（成功或失败），在这之后通过 `then()` 添加的回调函数也会被调用；
-   通过多次调用 `then()` 可以添加多个回调函数，它们会按照插入顺序进行执行。

Promise 很棒的一点就是 *_链式调用（chaining）* 。

### 链式调用

连续执行两个或者多个异步操作是一个常见的需求，在上一个操作执行成功之后，开始下一个的操作，并带着上一步操作所返回的结果。我们可以通过创造一个 *_Promise 链* 来实现这种需求。

**!!! `then()` 函数会返回一个和原来不同的新的 Promise 。**

```js
const promise = doSomething();
const promise2 = promise.then(successCallback, failureCallback);

// OR
const promise2 = doSomething().then(successCallback, failureCallback);
```

其中， `promise2` 不仅表示 `doSomething()` 函数的完成，也代表了你传入的 `successCallback` 或者 `failureCallback` 的完成，这两个函数也可以返回一个 Promise 对象，从而形成另一个异步操作，如此，在 promise2 上新增的回调函数会排上这个 Promise 对象的后面。

**基本上，第一个 Promise 都代表了链中另一个异步过程的完成。**

来看一下，过去要想做多重的异步操作，会导致经典的回调地狱，如下：

```js
doSomething(function(result) {
	doSomethingElse(result, function(newResult) {
		doThirdThing(newResult, function(finalResult) {
			console.log('Got the final result: ' finalResult);
		}, failureCallback);
	}, failureCallback);
}, failureCallback);
```

而现在，我们可以把回调绑定到返回的 Promise 上，形成一个 Promise 链，如下：

```js
doSomething().then(Function(result) {
	return doSomethingElse(result);
})
	.then(Function(newResult) {
		return doThirdThing(newResult);
	})
	.then(function(finalResult) {
		console.log('Got the final result: ' + finalResult);
	})
	.catch(failureCallback);

// 也可以用箭头函数来表示
doSomething()
	.then(result => doSomethingElse(result))
	.then(newResult => doThirdThing(newResult))
	.then(finalResult => {
		console.log(`Got the final result: ${finalResult}`);
	})
	.catch(failureCallback);
```

**!!! 注意：一定要有返回值 ，否则，callback 将无法获取上一个 Promise 的结果。**

then 里的参数是可选的， `catch(failurecallback)` 是 `then(null, failureCallback)` 的缩略形式。

有可能会在一个回调失败之后继续使用链式操作，如下：

```js
new Promise((resolve, reject) => {
    console.log('初始化');
    resolve();
})
    .then(() => {
        throw new Error('有哪里不对了');
        console.log('执行「这个」”');
    })
    .catch(() => {
        console.log('执行「那个」');
    })
    .then(() => {
        console.log('执行「这个」，无论前面发生了什么');
    });

// →
// 初始化
// 执行“那个”
// 执行“这个”，无论前面发生了什么
```

### 错误传递

在之前 的回调地狱示例中，我们有 3 次 `failureCallback` 的调用，而在 Promise 链中只有尾部的一次调用。

通常，一遇到异常抛出，浏览器会顺着 Promise 链寻找下一个 `onRejected` 失败回调函数或者由 `.catch()` 指定的回调函数。它和同步代码 `try...catch...` 的工作原理（执行过程）非常相似。

在 ES2017 标准的 [async/await](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function) 语法糖中，这种异步代码的对称性得到了极致的体现，如下：

```js
async function foo() {
    try {
        const result = await doSomething();
        const newResult = await doSomethingElse(result);
        const finalResult = await doThirdThing(newResult);
        console.log(`Got the final result: ${finalResult}`);
    } catch (error) {
        failureCallback(error);
    }
}
```

通过捕获所有的错误，甚至抛出异常和程序错误，Promise 解决了回调地狱的基本缺陷。这对于构建异步操作的基础功能而言是很有必要的。

当 Promise 被拒绝时，会有下文所述的两个事件（ `rejectionhandled` 、 `unhandledrejection` ）之一被派发到全局作用域（通常而言，就是 window ；如果是在 web worker 中使用，就是 Worker 或者其他 worker-based 接口）。

<div class="oh-essay">
此外暂时不深入，有兴趣的时候再了解。
</div>

### 在旧式回调 API 中创建 Promise

可以通过 Promise 的构造器从零开始创建 Promise 。这种方式（通过构造器的方式）应当只在封装旧 API 的时候用到。

理想状态下，所有的异步函数都已经返回 Promise 了，但有一些 API 仍然使用旧方式传入的成功（或失败）的回调。典型的例子就是 `setTimeout()` 函数。

```js
setTimeout(() => saySomething('10 seconds passed'), 10000);
```

**混用旧式回调和 Promise 可能会造成运行时序的问题** ，如果 `saySomething` 函数失败了，或者包含了编程错误，就没有办法捕获它了。

幸运地是，我们可以用 Promise 来封闭它。最好的做法是，将这些有问题的函数封闭起来，留在底层，并且永远不要再直接调用它们。

```js
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

wait(10000)
    .then(() => saySomething('10 seconds passed'))
    .catch(failureCallback);
```

通常，Promise 的构造器接收一个执行函数（executor），我们可以在这个执行函数里手动地 resolve 和 reject 一个 Promise 。既然 setTimeout 并不会真的执行失败，那么我们可以在这种情况下忽略 reject 。

[Promise.resolve()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve) 和 [Promise.reject()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject) 是手动创建一个已经 resolve 或者 reject 的 Promise 快捷方法，它们有时很有用。

*_关于 Promise.resolve()*

`Promise.resolve(value)` 方法返回一个以给定值解析后的 Promise 对象。如果这个值是一个 promise，那么将返回这个 promise ；如果这个值是 thenable （即带有 [then](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) 方法），返回的 promise 会“跟随”这个 thenable 的对象，采用它的最终形态；否则返回的 promise 将以此值完成。此函数将类 promise 对象的多层嵌套展平。

注意，不要在解析为自身的 thenable 上调用 Promise.resolve ，这将导致无限递归，因为它试图展平无限嵌套的 promise 。如下：

```js
let thenable = {
    then: (resolve, reject) => {
        resolve(thenable);
    },
};

Promise.resolve(thenable); // 这会造成一个死循环
```

我们看一些使用静态 Promise.resolve 方法的示例：

```js
// 1. resolve 一个字符串
Promise.resolve("Success").then(function(value) {
	console.log(value); // →  "Success"
}, function(value) {
	// 不会被调用
});

// 2. resolve 一个数组
var p = Promise.resolve([1, 2, 3]);
p.then(function(v) {
	console.log(v[0]);          // →  1
})

// 3. resolve 另一个 promise
var original = Promise.resolve(33);
var cast = Promise.resolve(original);
cast.then(function(value) {
	console.log('value: ' + value);
});
console.log('original === cast ? ' + (original === cast));
// → value: 33
// → original === cast ? true

// 4. resolve thenable 并抛出错误
var p1 = Promise.resolve({
	then: function(onFulfill, onReject) { onFulfill("fulfilled!"); }
});
console.log(p1 instanceof Promise); // → true，这是一个 Promise 对象

p1.then(function(v) {
	console.log(v);             // → "fulfilled!"
}, function(e) {
	// 不会被调用
});

// Thenable 在 callback 之前抛出异常
// Promise rejects
var thenable = { then: function(resolve) {
	throw new TypeError("Throwing");
	resolve("Resolving");
}};

var p2 = Promise.resolve(thenable);
p2.then(function(v) {
	// 不会被调用
}, Function(e) {
	console.log(e);             // TypeError: Throwing
});

// Thenable 在 callback 之后抛出异常
// Promise resolves
var thenable = { then: function(resolve) {
	resolve("Resolving");
	throw new TypeError("Throwing");
}};

var p3 = Promise.resolve(thenable);
p3.then(function(v) {
	console.log(v); // 输出"Resolving"
}, function(e) {
	// 不会被调用
});
```

### 时序

为了避免意外，即使是一个已经变成 resolve 状态的 Promise，传递给 `then()` 函数也总是会被异步调用：

```js
Promise.resolve().then(() => console.log(2));
console.log(1);
// → 1
// → 2
```

传递到 `then()` 中的函数被置入到一个微任务队列中，而不是立即执行，这意味着它是在 JavaScript 事件队列的所有运行时结束了，且事件队列被清空之后，才开始执行：

```js
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
wait().then(() => console.log(4));

Promise.resolve()
    .then(() => console.log(2))
    .then(() => console.log(3));

console.log(1);
// → 1, 2, 3, 4
```

<div class="oh-essay">
仔细观察你会发现，setTimeout 和 then 的执行时机是有区别的，什么区别呢？不妨去探索一下。
</div>

除了上述提到的这些，Promise 还有 `Promise.all() 、Promise.race()` 等方法，用时再查即可。我们已经对 Promise 的使用有了初步的了解，那么 Promise 到底是什么呢？

## Promise 是什么

Promise 对象用于表示一个异步操作的最终完成 （或失败）及其结果值。

一个 Promise 对象代表一个在这个 Promise **被创建出来时不一定已知的值** 。异步方法并不会立即返回最终的值，而是会返回一个 promise ，以便在未来某个时候把值交给使用者。

<div class="oh-essay">
可以把 Promise 理解为一个承载异步请求响应状态的容器。
</div>

异步操作都有那些状态呢？

-   pending 待定 - 初始状态，既没有兑现，也没有拒绝；
-   fulfilled 已兑现 - 意味着操作成功完成；
-   rejected 已拒绝 - 意味着操作失败。

这里需要注意的地方在于， `new Promise(executorFunc)` 中的参数函数 `excutorFunc` 只会在 Promise 创建的时候执行一次，并固定执行后的结果不再改变。

<div class="oh-essay">
其实，这里很容易理解，一个操作要么是在运行中，还没出结果；要么就是成功了，或者失败了。
</div>

<img src="imgs/4.jpg" width="800" />

我们可以用 `promise.then()、 promise.catch()` 和 `promise.finally()` 这些方法将进一步的操作与一个变为已敲定状态的 promise 关联起来。这些方法还会返回一个新生成的 promise 对象，这个对象可以被非强制性的用来做链式调用。

> 不要和惰性求值混淆： 有一些语言中有惰性求值和延时计算的特性，它们也被称为“promises”，例如 Scheme。JavaScript 中的 promise 代表的是已经正在发生的进程， 而且可以通过回调函数实现链式调用。 如果您想对一个表达式进行惰性求值，就考虑一下使用无参数的"箭头函数": `f = () =>表达式` 来创建惰性求值的表达式，使用 `f()` 求值。

**构造函数 Promise()**

创建一个新的 Promise 对象。该构造函数主要用于包装还没有添加 promise 支持的函数。

**Promise 原型**

`Promise` 对象是由关键字 `new` 及其构造函数来创建的。该构造函数会把一个叫做“处理器函数”（executor function）的函数作为它的参数。这个“处理器函数”接受两个函数 `resolve` 和 `reject` 作为其参数。当异步任务顺利完成且返回结果值时，会调用 `resolve` 函数；而当异步任务失败且返回失败原因（通常是一个错误对象）时，会调用 `reject` 函数。

```js
const myFirstPromise = new Promise((resolve, reject) => {
    // ？做一些异步操作，最终会调用两者之一：
    //     resolve(someValue);       // fulfilled
    // ？OR
    //     reject("failure reason"); // rejected
});
```

想要某个函数拥有 promise 功能，只需让其返回一个 promise 即可。

```js
// 示例 1
function myAsyncFunction(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
}

// 示例 2
let myFirstPromise = new Promise(function (resolve, reject) {
    // 当异步代码执行成功时，我们才会调用 resolve(...), 当异步代码失败时就会调用 reject(...)
    // 在本例中，我们使用 setTimeout(...) 来模拟异步代码，实际编码时可能是 XHR 请求或是 HTML5 的一些 API 方法。
    setTimeout(function () {
        resolve('成功！'); // 代码正常执行！
    }, 250);
});

myFirstPromise.then(function (successMessage) {
    // successMessage 的值是上面调用 resolve(...) 方法传入的值。
    // successMessage 参数不一定非要是字符串类型，这里只是举个例子
    console.log('Yay! ' + successMessage);
});
```

众所周知，JavaScript 也是一门面向对象的编程语言，只不过它是基于原型的。`Promise()` 本身是一个构造函数（可以作个不恰当的类比 - Promise 是一个类），其上包含一些静态方法（即类本身的静态方法，与实例无关），如： `Promise.all(iterable)、 Promise.allSettled(iterable)、 Promise.any(iterable)、 Promise.race(iterable)、 Promise.reject(reason)` 和 `Promise.resolve(value)` 等。

<img src="imgs/5.jpg" width="360" />

另外，如 `then()、 catch()` 和 `finally()` 等方法则是定义在 `Promise.prototype` 原型上的。

## TODO 延伸阅读

-   [并发模型与事件循环](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)
-   [继承与原型链](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

[1]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises
