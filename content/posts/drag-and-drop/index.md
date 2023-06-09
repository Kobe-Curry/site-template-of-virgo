---
title: 'Drag and Drop'
date: 2020-11-10T09:33:57+08:00
draft: false
categories: [JavaScript]
tags: []
---

_拖放_ 是一种常见的特性，即抓取对象以后拖到另一个位置。在 HTML5 中，拖放是标准的一部分，任何元素都能够拖放。

`*注：Internet Explorer 9+, Firefox, Opera, Chrome, 和 Safari 支持拖动。`

<!--more-->

## 示例[1]

```html
<div id="drop-box" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
<img
    id="drag-ele"
    src="./images/drap.png"
    draggable="true"
    ondragstart="drag(event)"
    width="200"
    height="160"
/>
```

```js
function allowDrop(e) {
    e.preventDefault();
}

function drag(e) {
    e.dataTransfer.setData('Text', e.target.id);
}

function drop(e) {
    e.preventDefault();

    var data = e.dataTransfer.getData('Text');
    e.target.appendChild(document.getElementById(data));
}
```

它看上去也许有些复杂，不过我们可以分别研究拖放事件的不同部分。

## 拖放

为了方便后文描述，我们称被拖元素为“小拖”，放置到的目标元素为“小盒” : )

_1. 设置元素为可拖放_

首先，为了使元素可拖动，需要把“小拖”的 `draggable` 属性设置为 `true` ，如下：

```html
<img draggable="true" / >
```

_2. 设置拖动的触发事件_

然后，规定当元素被拖动的时候，会发生什么。

在上面的例子中， `ondragstart` 属性调用了一个函数 `drag(event)` ，它规定了被拖动的数据。

如何设置这些数据呢？ `dataTransfer.setData()` ，我们用它来设置被拖数据的数据类型和值，如下：

```js
function drag(e) {
    e.dataTransfer.setData('Text', e.target.id);
}
```

其中， `Text` 是一个 DOMString ，表示要添加到“小拖”中的拖动数据的类型，值是“小拖”的 id 。

> IE 浏览器中 `e.originalEvent.dataTransfer.setData` 可能会产生以下报错：
>
> -   意外地调用了方法或属性访问；
> -   参数无效。
>
> 为什么？如何解决呢？原来 `setData(key, value)` 的 `key` 在 IE 中只能设置为 `Text` 或 `text` 等指定的可选类型（Chrome 中无此限制）， `value` 最好使用 `JSON.stringfy()` 序列化一下。

<div class="oh-essay">
IE 不死，天下不安。
</div>

_3. 设置“小盒”可被放置_

`ondragover` 事件规定在何处放置“小拖”的数据。

默认情况下，无法将数据/元素放置到其他元素中。如果需要设置允许放置，必须阻止对于元素的默认处理方式，如通过调用 `ondragover` 事件的 `event.preventDefault()` 方法。

```js
event.preventDefault();
```

_4. 进行放置_

当放置“小拖”时，会发生 `drop` 事件。在上面的例子中， `ondrop` 属性调用了一个函数 `drop(event)` ，如下：

```js
function drop(e) {
    // 调用 `preventDefault()` 来避免浏览器对数据的默认处理
    // `drop` 事件的默认行为是以链接形式打开
    e.preventDefault();

    // 通过 `dataTransfer.getData('Text')` 方法获得“小拖”设置的数据
    // 该方法将返回在 `setData()` 方法中设置的相同类型的任何数据
    var data = e.dataTransfer.getData('Text');
    // 这里 `data` 就是前面设置的 `e.target.id`
    e.target.appendChild(document.getElementById(data));
}
```


[1]: https://www.runoob.com/try/try.php?filename=tryhtml5_draganddrop
