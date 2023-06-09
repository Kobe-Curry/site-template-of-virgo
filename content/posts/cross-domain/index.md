---
title: 'Cross Domain'
date: 2020-11-03T09:15:07+08:00
draft: false
categories: [JavaScript]
tags: []
---

🔔 本文摘录自 [浏览器同源政策及其规避方法](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)

<!--more-->

## 什么是跨域

_跨域_ ，是指浏览器不能执行其他网站的脚本，它是浏览器的同源策略造成的，是浏览器对 JavaScript 实施的安全限制。

那么，什么是同源策略呢？

_同源策略_ 是由 Netscape 公司于 1995 年引入浏览器的，目前，所有浏览器都实行这个策略。

为什么需要同源策略呢？

同源策略的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据。

<div class="oh-essay">
每一件事物都有其产生的源头……
</div>

最初，它的含义是，A 网页设置的 Cookie ，B 网页不能打开，除非这两个网页“同源” -- _协议相同、域名相同、端口相同_ 。

<div class="oh-essay">
Cookie 往往用来保存用户的登录状态，所以“同源策略”是必需的，否则 Cookie 可以共享，互联网就毫无安全可言了。
</div>

随着互联网的发展，“同源策略”越来越严格。目前，如果非同源，共有三种行为受到限制：

1. Cookie、LocalStorage 和 IndexDB 无法读取；
2. DOM 无法获得；
3. AJAX 请求不能发送。

跨域的限制当然是有必要的，但实际应用过程中也常常需要在保证相对安全的情况下规避上述的三种限制。

<div class="oh-essay">
往往是这样，建立的束缚就是用来打挣脱的…… 在同源策略不允许跨域的那一刻，也就产生了需要跨域的需求。
</div>

## Cookie

_Cookie 是服务器写入浏览器的一小段信息_ ，只有同源网页才能共享。但是，如果两个网页的一级域名相同，只是二级域名不同，浏览器允许通过设置 =document.domain= 共享 Cookie 。

> \*注：Cookie 是服务器写入浏览器的信息哦！

举例来说，A 网页是 `http://w1.example.com/a.html` ，B 网页是 `http://w2.example.com/b.html` ，那么只要设置相同的 `document.domain` ，两个网页就可以共享 Cookie 。

```js
document.domain = 'example.com';
```

现在，A 网页通过脚本设置一个 Cookie ：

```js
document.cookie = 'test1=hello';
```

B 网页就可以读到这个 Cookie ：

```js
var allCookie = document.cookie;
```

\*_注：这种方法只适用于 Cookie 和 iframe 窗口_ ，LocalStorage 和 IndexDB 无法通过这种方法（要使用 PostMessage API）。

另外，服务器也可以在设置 Cookie 的时候，指定 Cookie 的所属域名为一级域名，比如 `.example.com` ：

```
Set-Cookie: key=value; domain=.example.com; path=/
```

如此，二级域名和三级域名不用做任何设置，都可以读取这个 Cookie 。

<div class="oh-essay">
旨在理解吧，已经是被时代淘汰了的东东了……
</div>

## iframe

如果两个网页不同源，就无法拿到对方的 DOM ，典型的例子是 `iframe` 窗口和 `window.open` 方法打开的窗口，它们与父窗口无法通信。

如果两个窗口一级域名相同，只是二级域名不同，那么设置 `document.domain` 属性，就可以规避同源策略，拿到 DOM 。

对于完全不同源的网站，目前有三种方法，可以解决跨域窗口的通信问题：

-   片段识别符（fragment identifier）；
-   window.name ；
-   跨文档通信 API （Cross-document messaging）。

### 片段识别符

_片段识别符_ （fragment identifier），是指 URL 的 `#` 号后面的部分，如 `http://example.com/x.html#fragment` 的 `#fragment` 。如果，只是改变片段识别符，页面不会重新刷新。

父窗口可以把信息，写入子窗口的片段识别符，如下：

```js
var src = originURL + '#' + data;
document.getElementById('myIFrame').src = src;
```

子窗口通过监听 `hashchange` 事件得到通知，如下：

```js
window.onhashchange = checkMessage;

function checkMessage() {
    var message = window.location.hash;
    // ...
}
```

同样的，子窗口也可以改变父窗口的片段标识符：

```js
parent.location.href = target + '#' + hash;
```

### window.name

浏览器窗口有 `window.name` 属性，它的最大特点是，无论是否同源，只要在同一个窗口里，前一个网页设置了这个属性，后一个网页就可以读取它。

来看一个具体的例子吧。

父窗口先打开一个子窗口，载入一个不同源的网页，该网页将信息写入 `window.name` 属性，如下：

```js
window.name = data;
```

接着，子窗口跳回一个与主窗口同域的网址：

```js
location = 'http://parent.url.com/xxx.html';
```

然后，主窗口就可以读取子窗口的 `window.name` 了：

```js
var data = document.getElementById('myFrame').contentWindow.name;
```

这种方法的优点是， `window.name` 容量很大，可以放置非常长的字符串；缺点是必须监听子窗口 `window.name` 属性的变化，影响网页性能。

<div class="oh-essay">
不强制兼容 IE 的话，实在不想碰这玩意儿...
</div>

### window.postMessage

片段识别符和 `window.name` 两种方法都属于破解，HTML5 为了解决这个问题，引入了一个全新的 API -- 跨文档通信 API （Cross-document messaging）。

<div class="oh-essay">
所谓破解，就是把公鸡的工作交给大鹅去做，虽然也能叫你起床，但总归不那么悦耳。
</div>

这个 API 为 `window` 对象新增了一个 `window.postMessage` 方法，允许跨窗口通信，不论这两个窗口是否同源。

父窗口 `http://aaa.com` 向子窗口 `http://bbb.com` 发消息，调用 `postMessage` 方法就可以了，如下：

```js
var popup = window.open('http://bbb.com', 'title');
popup.postMessage('Hello World!', 'http://bbb.com');
```

其中， `postMessage` 方法的：

-   第一个参数是具体的信息内容；
-   第二个参数是接收消息的窗口的源（origin），即“协议+域名+端口”，也可以设为 `*` ，表示不限制域名，向所有窗口发送。

子窗口向父窗口发送消息的写法类似：

```js
window.opener.postMessage('Nice to see you', 'http://aaa.com');
```

父窗口和子窗口都可以通过 `message` 事件，监听对方的消息：

```js
window.addEventListener(
    'message',
    function (e) {
        console.log(e.data);
    },
    false
);
```

> `message` 事件的事件对象 `event` ，提供了以下三个属性：
>
> -   `event.source` ：发送消息的窗口；
> -   `event.origin` ：消息发向的网址；
> -   `event.data` ：消息内容。

下面的例子是，子窗口通过 `event.source` 属性引用父窗口，然后发消息，如下：

```js
window.addEventListener('message', receiveMessage);

function receiveMessage(event) {
    event.source.postMessage('Nice to see you!', '*');
}
```

`event.origin` 属性可以过滤不是发给本窗口的消息：

```js
window.addEventListener('message', receiveMessage);

function receiveMessage(event) {
    if (event.origin !== 'http://aaa.com') return;
    if (event.data === 'Hello World') {
        event.source.postMessage('Hello', event.origin);
    } else {
        console.log(event.data);
    }
}
```

_通过 `window.postMessage` ，读写其他窗口的 LocalStorage 也成为了可能。_

<div class="oh-essay">
其实吧，只要是能序列化字符串的信息，都可以传递。
</div>

例如，主窗口写入 iframe 子窗口的 `localStorage` ：

```js
window.onmessage = function (e) {
    if (e.origin !== 'http://bbb.com') {
        return;
    }

    var payload = JSON.parse(e.data);
    localStorage.setItem(payload.key, JSON.stringfy(payload.data)); // ?? payload.data
};
```

其中，父窗口发送消息的代码如下：

```js
var win = document.getElementByTagName('iframe')[0].contentWindow;
var obj = { name: 'Jack' };

win.postMessage(JSON.stringfy({ key: 'storage', data: obj }), 'http://bbb.com');
```

<div class="oh-essay">
下面来个加强版的...
</div>

```js
// 加强版的父窗口发消息 ///
var win = doucment.getElementByTagName('iframe')[0].contentWindow;
var obj = { name: 'Jack' };
// 存入对象
win.postMessage(
    JSON.stringfy({ key: 'storage', method: 'set', data: obj }),
    'http://bbb.com'
);
// 读取对象
win.postMessage(JSON.stringfy({ key: 'storage', method: 'get' }), '*');

window.onmessage = function (e) {
    if (e.origin != 'http://aaa.com') return;
    console.log(JSON.parse(e.data).name); // → "Jack"
};
```

```js
// 加强版的子窗口接收消息 ///
window.onmessage = function (e) {
    if (e.origin !== 'http://bbb.com') return;
    var payload = JSON.parse(e.data);
    switch (payload.method) {
        case 'set':
            localStorage.setItem(payload.key, JSON.stringfy(payload.data));
            break;
        case 'get':
            var parent = window.parent;
            var data = localStorage.getItem(payload.key);
            parent.postMessage(data, 'http://aaa.com');
            break;
        case 'remove':
            localStorage.removeItem(payload.key);
            break;
    }
};
```

<div class="oh-essay">
从本质上来说，这几种方法都是利用浏览器的某些信息保留机制，把信息序列化为字符串，以参数形式在跨域窗口之间的传递。
</div>

## AJAX

浏览器的同源策略规定， _AJAX 请求只能发给同源的网址_ ，否则就报错。

除了架设服务器代理（浏览器请求同源服务器，再由后者请求外部服务），有三种方法规避这个限制： _JSONP、WebSocket、CORS_ 。

<div class="oh-essay">
这里架设的服务器是用来代理客户端的，是正向代理。
</div>

### JSONP

JSONP 是服务器与客户端跨源通信的常用方法。最大特点就是简单适用，老式浏览器全部支持，服务器改造非常小。

> 很简单，但缺点在于 JSONP 只支持 `GET` 请求。

_JSONP 的基本思想是什么？_

原来，网页通过添加一个 `<script>` 元素，向服务器请求 JSON 数据的做法是不受同源策略限制的；服务器收到请求后，将数据放在一个指定名字的回调函数里传回来。

<div class="oh-essay">
通过 `script` 标签的 `src` 属性值作为请求地址，666 。
</div>

首先，网页动态插入 `<script>` 元素，由它向跨源网址发出请求，如下：

```js
function addScriptTag(src) {
    var script = doucment.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.src = src;
    document.body.appendChild(script);
}

window.onload = function () {
    addScriptTag('http://example.com/jp?callback=foo');
};

function foo(data) {
    console.log('Your public IP address is: ' + data.ip);
}
```

上述代码通过动态添加 `<script>` 元素，向服务器 `example.com` 发出请求。

\*_注：该请求的查询字符串有一个 `callback` 参数，用来指定回调函数的名字，在对于 JSONP 是必需的。_

服务器收到这个请求后，会将数据放在回调函数的参数位置返回，如下：

```js
foo({
    ip: '8.8.8.8',
});
```

由于 `<script>` 元素请求的脚本，直接作为代码运行。这时，只要浏览器定义了 `foo` 函数，该函数就会立即调用。作为参数的 JSON 数据被视为 JavaScript 对象，而不是字符串，因此避免了使用 `JSON.parse` 的步骤。

### WebSocket

WebSocket 是一种通信协议，使用 `ws://` （非加密）和 `wss://` （加密）作为协议前缀。该协议 _不实行同源策略_ ，只要服务器支持，就可以通过它进行跨源通信。

来看个例子，下面是浏览器发出的 WebSocket 请求的头信息：

```
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: http://example.com
```

其中， `Origin` 表示该请求的请求源（origin），即发自哪个域名。

> \*_注：正是因为有了 `Origin` 这个字段，WebSocket 才没有实行同源策略，因为服务器可以根据这个字段，判断是否允许本次通信。_

如果该域名在白名单内，服务器就会做出如下响应：

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
Sec-WebSocket-Protocol: chat
```

### CORS

CORS （Cross-Origin Resource Sharing）是跨域资源分享的缩写，它是 W3C 标准，是 _跨源 AJAX 请求的根本解决办法_ 。相比 JSONP 只能发 `GET` 请求，CORS 允许任何类型的请求。

## CORS 详解

CORS 允许浏览器向跨源服务器，发出 `XMLHttpRequest` 请求，从而克服了 AJAX 只能同源使用的限制。接下来，我们来深入认识下 CORS 的内部机制。

CORS 需要浏览器和服务器同时支持， _整个 CORS 通信过程，都是浏览器自动完成_ ，不需要用户参与。

> 对于开发者来说，CORS 通信与同源的 AJAX 通信没有差别，代码完全一样。浏览器一旦发现 AJAX 请求资源，就会 _自动添加一些附加的头信息_ ，有时还会多出一次附加的请求，但用户不会有感觉。

<div class="oh-essay">
浏览器是个好宿主，直接帮你（用户）解决了。本质上讲，CORS 在浏览器端而言，就是浏览器对用户的 AJAX 请求的“封装代理”。
</div>

因此，实现 CORS 通信的关键是服务器，只要服务器实现了 CORS 接口，就可以跨源通信。

### 两种请求

浏览器将 CORS 请求分为两类： _简单请求_ （simple request）和 _非简单请求_ （not-so-simple request）。

只要同时满足以下两在条件，就属于简单请求，如下：

-   请求方法是以下三种之一： `HEAD、GET、POST` ；
-   HTTP 的头信息不超出以下几种字段：

```
- Accept
- Accept-Language
- Content-Language
- Last-Event-ID
- Content-Type
```

其中， `Content-Type` 只限于三个值 `application/x-www-form-urlencode、multipart/form-data、text/plain` 。

这是为了兼容表单，因为历史上表单一直可以发出跨域请求。AJAX 的跨域设计就是，只要表单可以发，AJAX 就可以直接发。

\*注：凡是不同时满足上面两个条件，就属于非简单请求，浏览器对这两种请求的处理，是不一样的。

### 简单请求

_1. 基本流程_

_对于简单请求，浏览器直接发出 CORS 请求，具体来说，就是在头信息中，增加一个 `Origin` 字段。_

如下面这个例子，浏览器发现这次跨源 AJAX 请求是简单请求，就自动在头信息中，添加一个 `Origin` 字段：

```
GET /cors HTTP/1.1
Origin: http://api.bob.com ←
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```

上面的头信息中， `Origin` 字段用来说明，本次请求来自哪个源（协议+域名+端口），服务器根据这个值决定是否同意这次请求。

_1.不在服务器许可范围内_

如果 `Origin` 指定的源不在许可范围内，服务器会返回一个正常的 HTTP 回应。浏览器发现这个回应的头信息没有包含 `Access-Control-Allow-Origin` 字段，就知道出错了，从面抛出一个错误，被 `XMLHttpRequest` 的 `onerror` 回调函数捕获。

\*_注：这种错误无法通过状态码识别，因为 HTTP 回应的状态码可能是 200 。_

_2.在服务器许可范围内_

如果 `Origin` 指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段，如下：

```
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: FooBar
Content-Type: text/html; charset=utf-8
```

上面的信息头中，有三个与 CORS 请求相关的字段，都以 `Access-Control-` 开头。

（1）Access-Control-Allow-Origin

该字段是 _必须_ 的，它的值要么是请求时 `Origin` 字段的值，要么是一个 `*` （表示接受任意域名的请求）。

（2）Access-Control-Allow-Credentials

该字段可选，它的值是一个布尔值，表示是否允许发送 Cookie 。

默认情况下，Cookie 不包括在 CORS 请求之中，设为 `true` ，即表示服务器明确许可 Cookie 可以包含在请求中，一起发给服务器。

\*注：其实，这个值也只能设为 `true` ，如果服务器不要浏览器发送 Cookie ，删除该字段即可。

（3）Access-Control-Expose-Headers

该字段可选，CORS 请求时， `XMLHttpRequest` 对象的 `getResponseHeader()` 方法只能拿到 6 个基本字段： `Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma` 。如果想拿到其他字段，就必须在 `Access-Control-Expose-Headers` 里面指定。如下面的例子中就指定了 `FooBar` ，如此便可以通过 `getResponseHeader('FooBar')` 来返回 `FooBar` 字段的值。

_2. withCredentials 属性_

上面说到，CORS 请求默认不发送 Cookie 和 HTTP 认证信息。如果要把 Cookie 发到服务器，一方面要服务器同意，指定 `Access-Control-Allow-Credentials` 字段：

```
Access-Control-Allow-Credentials: true
```

另一方面，开发者必须在 AJAX 请求中打开 `withCredentials` 属性，如下：

```js
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
```

否则，即使服务器同意发送 Cookie ，浏览器也不会发送。或者，服务器要求设置 Cookie ，浏览器也不会处理。

但是，如果省略 `withCredentials` 设置，有的浏览器还是会一起发送 Cookie 。这时，可以显式关闭 `withCredentials` ：

```js
xhr.withCredentials = false;
```

需要注意的是，如果要发送 Cookie ， `Access-Control-Allow-Origin` 就不能设为星号，必须指定的、与请求网页一致的域名。同时，Cookie 依然遵循同源政策，只有服务器域名设置的 Cookie 才会上传，其他域名的 Cookie 并不会上传，且（跨源）原网页代码中的 `document.cookie` 也无法读取服务器域名下的 Cookie 。

### 非简单请求

_1. 预检请求_

非简单请求是那种对服务器有特殊要求的请求，比如请求方法是 `PUT` 或 `DELETE` ，或者 `Content-Type` 字段的类型是 `application/json` 。

非简单请求的 CORS 请求，会在正式通信之前，增加一次 HTTP 查询请求，称为 _预检请求_ （prefight）。

浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些 HTTP 动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的 `XMLHttpRequest` 请求，否则就报错。

来看一段浏览器的 JavaScript 脚本。

```js
var url = 'http://api.alice.com/cors';
var xhr = new XMLHttpReuqest();
xhr.open('PUT', url, true);
xhr.setRequestHeader('X-Custom-Header', 'value');
xhr.send();
```

上面代码中，HTTP 请求的方法是 `PUT` ，并且发送一个自定义头信息 `X-Custom-Header` 。

浏览器发现，这是一个非简单请求，就自动发出一个“预检”请求，要求服务器确认可以这样请求。下面是这个“预检”请求的 HTTP 头信息：

```
OPTIONS /cors HTTP/1.1
Origin: http://api.bob.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```

“预检”请求用的请求方法是 `OPTIONS` ，表示这个请求是用来询问的。头信息里面，关键字段是 `Origin` ，表示请求来自哪个源。

除了 `Origin` 字段，“预检”请求的头信息包括两个特殊字段。

（1）Access-Control-Request-Method

该字段是必须的，用来列出浏览器的 CORS 请求会用到哪些 HTTP 方法，上例是 `PUT` 。

（2）Access-Control-Request-Headers

该字段是一个逗号分隔的字符串，指定浏览器 CORS 请求额外发送的头信息字段，上例是 `X-Custom-Header` 。

_2. 预检请求的回应_

服务器收到“预检”请求以后，检查了 `Origin、Access-Control-Request-Method` 和 `Access-Control-Request-Headers` 字段以后，确认允许跨源请求，就可以做出反应。

```
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Content-Type: text/html; charset=utf-8
Content-Encoding: gzip
Content-Length: 0
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain
```

上面的 HTTP 回应中，关键的是 `Access-Control-Allow-Origin` 字段，表示 `http://api.bob.com` 可以请求数据。该字段可也可以设为星号，表示同意任意跨源请求。

```
Access-Control-Allow-Origin: *
```

如果服务器否定了“预检”请求，会返回一个正常的 HTTP 回应，但是没有任何 CORS 相关的头信息字段。这时，浏览器就会认定，服务器不同意“预检”请求，因此触发一个错误，被 `XMLHttpRequest` 对象的 `onerror` 回调函数捕获，控制台会打印出如下的报错信息：

```
XMLHttpRequest cannot load http://api.alice.com.
Origin http://api.bob.com is not allowed by Access-Control-Allow-Origin.
```

服务器回应的其他 CORS 相关字段如下：

```
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 1728000
```

（1）Access-Control-Allow-Methods

该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。

\*注：返回的是所有支持的方法，而不单是浏览器请求的那个方法，这是为了避免多次“预检”请求。

（2）Access-Control-Allow-Headers

如果浏览器请求包括 `Access-Control-Request-Headers` 字段，则 `Access-Control-Allow-Headers` 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在“预检”中请求的字段。

（3）Access-Control-Allow-Credentials

该字段与简单请求时的含义相同。

（4）Access-Control-Max-Age

该字段可选，用来指定本次预检请求的有效期，单位为秒。上面结果中，有效期是 20 天（1728000 秒），即允许缓存该条回应 1728000 秒，在些期间，不用发出另一条预检请求。

_3. 浏览器的正常请求和回应_

一旦服务器通过了“预检”请求，以后每次浏览器正常的 CORS 请求，就都跟简单请求一样，会有一个 `Origin` 头信息字段。服务器的回应，也都会有一个 `Access-Control-Allow-Origin` 头信息字段。

下面是“预检”请求之后，浏览器的正常 CORS 请求：

```
PUT /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
X-Custom-Header: value
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```

上面头信息的 `Origin` 字段是浏览器自动添加的。

下面是服务器正常的回应：

```
Access-Control-Allow-Origin: http://api.bob.com
Content-Type: text/html; charset=utf-8
```

上面头信息中， `Access-Control-Allow-Origin` 字段是每次回应都必定包含的。
