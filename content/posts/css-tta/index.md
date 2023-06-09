---
title: 'CSS 中的动效'
date: 2020-10-19T10:47:01+08:00
draft: false
categories: [JavaScript]
tags: []
---

CSS 中的 `transform、transition` 和 `animation` ，简称 TTA。

<div class="oh-essay">
CSS 什么的这种逻辑性略弱、规则性很强的领域，边用边深入就好，不常用的记了也会忘。
</div>

<!--more-->

## 简介

`transform` 其实是描述元素的静态属性，一旦写到 style 里面，将会直接显示作用，本身不会呈现任何动画效果。

`transition` 和 `animation` 两者都能实现动画效果， `transfrom` 通常是配合这两者使用的。

那么， `transition` 和 `animation` 又有什么不同呢？

其主要区别在于：

1. 动画不需要事件触发，过渡需要；
2. 过渡只有一组（两个：开始-结束） 关键帧，动画可以设置多个。

## Transform 变换

`transform` 属性应用于元素的 2D 或 3D 转换，这个属性允许你将元素旋转，缩放，平移，倾斜（拉伸）等。

```
transform: none|transform-functions;
```

`transform-functions` 是什么呢？如下表：

#+CAPTION: 常用的变换函数值
| 值                      | 描述                             |
|-------------------------|----------------------------------|
| ...                     |                                  |
| `matrix(n,n,n,n,n,n)`   | 定义 2D 转换，使用六个值的矩阵    |
| `translate(x,y)`        | 定义 2D 转换                     |
| `scale(x[,y])`          | 定义 2D 缩放转换                 |
| `rotate(angle)`         | 定义 2D 旋转，在参数中规定角度    |
| `skew(x-angle,y-angle)` | 定义沿着 X 和 Y 轴的 2D 倾斜转换 |
| ...                     |                                  |

## Transition 过渡

`transition` 属性设置元素当过渡效果。

```
transition: property duration timing-function delay;
```

#+CAPTION: 过渡效果属性值
| 值                           | 描述                |
|------------------------------|-------------------|
| `transition-property`        | 指定 CSS 属性的名称 |
| `transition-duration`        | 指定过渡持续时间    |
| `transition-timing-function` | 指定过渡函数        |
| `transition-delay`           | 指定过渡延迟时间    |

\*注：应始终指定 `transition-duration` 属性，否则持续时间为 0 ， `transition` 不会有任何效果。

```css
.select {
	...
	width: 100px;
	transition: width 2s;
	...
}

.select:hover {
	width: 200px;
}
```

`transition` 的优点在于简单易用，但是它有几个在的局限：

-   需要事件触发，所以没法在网页加载时自动发生；
-   是一次性的，不能重复发生，除非一再触发；
-   只能定义开始状态和结束状态，不能定义中间状态；
-   一条规则只能定义一个属性的变化，不能涉及多个属性。

<div class="oh-essay">
自古有矛必有盾！
</div>

CSS Animation 就是为了解决这些问题而提出的。

## Animation 动画 [1]

CSS3 可以创建动画，它可以取代许多网页动画图像、Flash 动画和 JavaScript 实现效果。

那么，CSS3 动画是什么呢？

动画是使元素从一种样式逐渐变化为另一种样式的效果，你可以改变任意多的样式次数，且应该用百分比来规定变化发生的时间，或用关键词 `from` （0%）和 `to` （100%）。

```
animation: name duration timing-function delay iteration-count direction fill-mode play-state;
```

#+CAPTION: 动画属性表
| 值                          | 描述                                                                 |
|-----------------------------|----------------------------------------------------------------------|
| `animation-name`            | 指定关键帧动画的名称                                                 |
| `animation-duration`        | 指定动画播放所需时间                                                 |
| `animation-timing-function` | 指定动画播放方式                                                     |
| `animation delay`           | 指定动画开始时间                                                     |
| `animation-iteration-count` | 指定动画的播放次数，默认为 `1` ，若为 `infinite` ，则无限次循环播放     |
| `animation-direction`       | 指定动画的播放方向，默认为 `normal` ，若为 `alternate` ，则轮流反射播放 |
| `animation-fill-mode`       | 规定当动画不播放时（完成或有延迟未开始播放时），要应用到元素的样式      |
| ...                         |                                                                      |

<div class="oh-essay">
Hmm... 其实这种属性表是令人讨厌的，还是具体的例子看起来更加明了，另外，大多数情况下，你并不需要了解这么多属性。
</div>

\*注：必须定义动画的名称和动画的持续时间，如果省略持续时间，动画将无法运行。

还是来看个例子吧。

```css
.select {
	...
	animation: myanimation 5s;
	...
}

@keyframes myanimation {
	0%   {background: red;}
	25%  {background: yellow;}
	50%  {background: blue;}
	100% {background: green;}
}
```

_看！关键在于 =@keyframes= 可以让你定义指定的帧！_ 你只需要定义的个动画名称和持续时间，然后用 =@keyframes= 去按百分比指定帧效果就可以了。



[1]: https://www.lmonkey.com/t/RwykQXzBX
