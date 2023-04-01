---
title: "Scroll Bar"
date: 2021-03-09T11:06:13+08:00
draft: false
categories: [JavaScript]
tags: []
---

🔔 参考 https://www.cnblogs.com/wjw1014/p/13564175.html

<!--more-->

## 简介

浏览器的默认滚动条往往都不怎么好看…… 让我们对它来做一些调整吧！

假如我们页面的页面是这样的：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>滚动条样式</title>
	</head>
	<body>
		<div id="div__scroll-bar">...</div>
		<div>...</div>
	</body>
</html>
```

## 修改某个元素的滚动条

```css
/* 设置一个元素的宽高（以使其内容滚动） */
#div__scroll-bar {
	width: 300px;
	height: 200px;
	border: 1px solid red;

	overflow: scroll;
}

/* 滚动条整体部分（width 纵向滚动条  height 横向滚动条） */
#div__scroll-bar::-webkit-scrollbar {
	width: 10px;
	height: 10px;
}
/* 滚动条的轨道（里面装有 Thumb） */
#div__scroll-bar::-webkit-scrollbar-track {
	background-color: #afa;
}
/* 内层轨道，滚动条中间部分（除去两侧用于微调的 button 和交汇区） */
#div__scroll-bar::-webkit-scrollbar-track-piece {
	background-color: #f00;
}
/* 滚动条里面的小方块 */
#div__scroll-bar::-webkit-scrollbar-thumb {
	background-color: pink;
	border-radius: 10%;
	-webkit-box-shadow: inset 0 0 5px #880d0d;
}

#div__scroll-bar::-webkit-scrollbar-thumb:hover {
	background: #333;
}
/* 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置 */
#div__scroll-bar::-webkit-scrollbar-button {
	background-color: rgb(22, 182, 27);
	/* display: none; */
}
/* 边角，即两个滚动条的交汇处 */
#div__scroll-bar::-webkit-scrollbar-corner {
	background: #179a16;
}
```

## 修改浏览器默认滚动条样式

```css
/* 整个滚动条 */
::-webkit-scrollbar {
width: 5px;
height: 5px;
}

/* 滚动条有滑块的轨道部分 */
::-webkit-scrollbar-track-piece {
background-color: transparent;
border-radius: 5px;
}

/* 滚动条滑块(竖向:vertical 横向:horizontal) */
::-webkit-scrollbar-thumb {
cursor: pointer;
background-color:#bbb;
border-radius: 5px;
}

/* 滚动条滑块hover */
::-webkit-scrollbar-thumb:hover {
background-color: #999;
}

/* 同时有垂直和水平滚动条时交汇的部分 */
::-webkit-scrollbar-corner {
display: block;    /* 修复交汇时出现的白块 */
}
```

## 总结

| 参数                              | 说明                                                 |
|-----------------------------------|----------------------------------------------------|
| `::-webkit-scrollbar`             | 滚动条整体部分                                       |
| `::-webkit-scrollbar-track`       | 滚动条的轨道                                         |
| `::-webkit-scrollbar-thumb`       | 滚动条里面的小方块                                   |
| `::-webkit-scrollbar-button`      | 滚动条的轨道的两端微调按钮                           |
| `::-webkit-scrollbar-track-piece` | 内层轨道，滚动条中间部分                              |
| `::-webkit-scrollbar-corner`      | 边角，即两个滚动条的交汇处                            |
| `::-webkit-resizer`               | 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件 |
