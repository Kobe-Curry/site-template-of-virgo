---
title: "React"
date: 2022-09-19T17:30:59+08:00
draft: false
categories: [JavaScript]
tags: []
card: false
---

[📔 官方文档]([https://](https://react.docschina.org/docs/getting-started.html))

> 具体安装及引入细节，请直接参考官方文档。

React 是一个用于构建用户界面的 JavaScript 库，你可以用它给简单的 HTML 页面增加一点交互，也可以开始一个完全由 React 驱动的复杂应用。

`> 对的，它只是一个 UI 库而已 ！！！`

<!--more-->

简单的就不说了，直接来看一下 React 团队推荐的创建 SPA （单页面，Single Page App）的工具链 - [Create React App](https://react.docschina.org/docs/create-a-new-react-app.html#create-react-app) 。

要创建项目，请执行：

```
npx create-react-app my-app
cd my-app
npm start
```

Create React App 不会处理后端逻辑或操纵数据库；它只是创建一个前端构建流水线（build pipeline），所以你可以使用它来配合任何你想使用的后端。它在内部使用 Babel 和 webpack，但你无需了解它们的任何细节。当然，关于它，你肯定想了解更多，请参考 [用户指南]([https://](https://facebook.github.io/create-react-app/)) 。

如果你倾向于从头开始打造你自己的 JavaScript 工具链，可以 [查看这个指南](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658)，它重新创建了一些 Create React App 的功能。

## 核心概念

老规矩，上 `"Hello World"` 😂

```jsx
// <div id="root"></div>

const element = <h1>Hello, world!</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

它将在页面上展示一个 “Hello, world!” 的标题。不要着急，马上你就明白它的工作原理了！

### JSX 简介

再观察一下上面的例子，这是什么？

```
const element = <h1>Hello, world!</h1>;
```

`> 怎么把 DOM 元素直接赋给了一个变量 ❓`

这个有趣的标签语法既不是字符串也不是 HTML。它被称为 JSX，是一个 JavaScript 的语法扩展。

JSX 可以生成 React “元素”，它其实一个表达式，在编译（通过 Babel）之后，会被转为普通 JavaScript 函数（`React.createElement()`）调用，并且对其取值后得到 JavaScript 对象。

JSX 的语法格式十分简单！上 🌰

```jsx
const name = 'Josh Perez';
const element = (
	<h1>
		Hello, {name}
	</h1>
);

const element = <img src={user.avatarUrl}></img>;
```

**在 JSX 语法中，你可以在大括号内放置任何有效的 JavaScript 表达式。** 

只需要注意：
- 尽量将内容包裹在括号中，以避免多行书写时遇到自动插入分号陷阱；
- 在属性中嵌入 JavaScript 表达式时，不要在大括号外面加上引号；
- 使用 camelCase（小驼峰命名）来定义属性的名称，而不使用 HTML 属性名称的命名约定。

OK，这就是 JSX ，再来一个例子看看它的具体转译过程！

```jsx
// 我们用 JSX 是这样写的
const element = (
	<h1 className="greeting">
		Hello, world!
	</h1>
);

// 被 Babel 转译为 React.crateElement() 调用
const element = React.createElement(
	'h1',
	{className: 'greeting'},
	'Hello, world!'
);

// React.createElement() 会预先进行一些检查，实际上创建了如下对象，
// 这些对象被称为 “React 元素”，
// React 通过读取这些对象，然后使用它们来构建 DOM 以及保持随时更新
// 注意：这是简化过的结构
const element = {
	type: 'h1',
	props: {
		className: 'greeting',
		children: 'Hello, world!'
	}
};
```

是的，JSX 就是这么简单 ❗

### 元素渲染

在上一节中，我们已经多次提到了 *-React “元素”* ，它究竟是什么呢？

元素描述了你在屏幕上想看到的内容。如 `element` 就是一个 React 元素：

```
const element = <h1>Hello, world</h1>;
```

与浏览器的 DOM 元素不同，React 元素是创建开销极小的普通对象（详见上节）。React DOM 会负责更新 DOM 来与 React 元素保持一致。

`> 那 React DOM 到底是如何渲染 React 元素为 DOM 的呢 ❓`

只需要把它们传入 `ReactDOM.render()` 就可以了（该元素会被自动渲染到根 DOM 节点中）！

需要注意的是， **React 元素是不可变对象！** 一旦被创建，你就无法更改它的子元素或者属性。

如何更新 UI 呢？

根据我们已有的知识，更新 UI 唯一的方式是创建一个全新的元素，并将其传入 `ReactDOM.render()`。React DOM 会将元素和它的子元素与它们之前的状态进行比较，并只会进行必要的更新来使 DOM 达到预期的状态。

```jsx
function tick() {
	const element = (
		<div>
			<h1>Hello, world!</h1>
			<h2>It is {new Date().toLocaleTimeString()}.</h2>
		</div>
	);
	ReactDOM.render(element, document.getElementById('root'));
}

// 每秒都创建一个新元素，并传入 ReactDOM.render()
setInterval(tick, 1000);
```

当然，在实践中，我们并不会那么蠢，大多数 React 应用只会调用一次 `ReactDOM.render()`，后续我们将学习如何封装一个有状态的组件。

### 组件 & Props

> 组件允许你将 UI 拆分为独立可复用的代码片段，并对每个片段进行独立构思。

组件，从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素。

在 React 中，有两种组件形式：函数组件和类组件，如下：

```jsx
// 函数组件
function Welcome(props) {
  	return <h1>Hello, {props.name}</h1>;
}

// 类组件
class Welcome extends React.Component {
	render() {
		return <h1>Hello, {this.props.name}</h1>;
	}
}
```

上述两个组件在 React 里是等效的。 **它们返回的都是 React 元素哦！**

*=在实际应用中，函数式组件明显更受欢迎，也更符合直觉，再加上现在有了 Hook，所以你懂得 ……* 

例如，这段代码会在页面上渲染 “Hello, Sara”：

```jsx
function Welcome(props) {
	return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
	element,
	document.getElementById('root')
);
```

让我们来回顾一下这个例子中发生了什么：
- 我们调用 `ReactDOM.render()` 函数，并传入 `<Welcome name="Sara" />` 作为参数；
- React 调用 Welcome 组件，并将 `{name: 'Sara'}` 作为 `props` 传入；
- Welcome 组件将 `<h1>Hello, Sara</h1>` 元素作为返回值；
- React DOM 将 DOM 高效地更新为 `<h1>Hello, Sara</h1>`。

**注意： 组件名称必须以大写字母开头 ！！！**（React 会将以小写字母开头的组件视为原生 DOM 标签）

组件可以在其输出中引用其他组件（*-组件组合*）。有时候，将组件拆分为更小的组件也是很不错的选择（*-组件提取*）。

**所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。**

*=其实，props 很简单，就把它理解为一个只读的函数入参就行了！函数，你足够了解的，对吧？* 

Props 是不可变的，但应用程序的 UI 是动态的，并会伴随着时间的推移而变化，emm... 😟

放心！在下一章节中，我们将介绍一种新的概念，称之为 “state”。在不违反上述规则的情况下，state 允许 React 组件随用户操作、网络响应或者其他变化而动态更改输出内容。

### State & 生命周期

在元素渲染章节中，我们只了解了一种更新 UI 界面的方法，通过调用 `ReactDOM.render()` 来修改我们想要渲染的元素。

我们也说了，那种方法有点蠢 🤣！ 在本章节中，我们将学习如何封装真正可复用的组件。

**State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件。**

下面，让我们看一个完整的 Clock 组件（`请留意注释内容`）：

```jsx
class Clock extends React.Component {
	// 构造函数 - 用来初始化的
	constructor(props) {
		// 将 props 传递到父类的构造函数中 ❓
		// Class 组件应该始终使用 props 参数来调用父类的构造函数
		super(props);
		// 在构造函数中为 this.state 赋初值
		this.state = { data: new Date() };

		// 将生命周期方法添加到 Class 中
		// ^ 组件挂载
		componentDidMount() {
			// 尽管 this.props 和 this.state 是 React 本身设置的，且都拥有特殊的含义，
			// 但是其实你可以向 class 中随意添加不参与数据流（比如计时器 ID）的额外字段
			this.timerID = setInterval(() => this.tick(), 1000 );
		}
		// ^ 组件卸载
		componentWillUnmount() {
			clearInterval(this.timerID);
		}

		tick() {
			// 使用 this.setState() 来时刻更新组件 state
			this.setState({
				date: new Date()
			});
		}

		render() {
			return (
				<div>
					<h1>Hello, world!</h1>
					<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
				</div>
			);
		}
	}
}

ReactDOM.render(
	<Clock />,
	document.getElementById('root')
);
```

让我们来快速概括一下发生了什么和这些方法的调用顺序：
1. 当 `<Clock />` 被传给 `ReactDOM.render()` 的时候，React 会调用 `Clock` 组件的构造函数。因为 `Clock` 需要显示当前的时间，所以它会用一个包含当前时间的对象来初始化 `this.state` 。我们会在之后更新 `state` ；
2. 之后 React 会调用组件的 `render()` 方法。这就是 React 确定该在页面上展示什么的方式。然后 React 更新 DOM 来匹配 `Clock` 渲染的输出；
3. 当 `Clock` 的输出被插入到 DOM 中后，React 就会调用 `ComponentDidMount()` 生命周期方法。在这个方法中，`Clock` 组件向浏览器请求设置一个计时器来每秒调用一次组件的 `tick()` 方法；
4. 浏览器每秒都会调用一次 `tick()` 方法。 在这方法之中，Clock 组件会通过调用 `setState()` 来计划进行一次 UI 更新。得益于 `setState()` 的调用，React 能够知道 `state` 已经改变了，然后会重新调用 `render()` 方法来确定页面上该显示什么。这一次，`render()` 方法中的 `this.state.date` 就不一样了，如此以来就会渲染输出更新过的时间。React 也会相应的更新 DOM；
5. 一旦 Clock 组件从 DOM 中被移除，React 就会调用 `componentWillUnmount()` 生命周期方法，这样计时器就停止了。

**是的！State 就是一个组件的核心！！！** 下面我们来看一下，如何正确的使用它！

```jsx
// 🅰️ 不要直接修改 State，应该使用 setState()
// 构造函数是唯一可以给 this.state 赋值的地方：
this.state.comment = 'Hello';	// ❌
this.setState({comment: 'Hello'});	// ✔️

// 🅱️ State 的更新可能是异步的，不要依赖他们的值来更新下一个状态
this.setState({
  counter: this.state.counter + this.props.increment,
});	// 可能 ❌
// 要解决这个问题，可以让 setState() 接收一个函数而不是一个对象，
// 这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));	// ✔️
```

**数据是向下流动的！**

不管是父组件或是子组件都无法知道某个组件是有状态的还是无状态的，并且它们也并不关心它是函数组件还是 class 组件。这就是为什么称 state 为局部的或是封装的的原因。除了拥有并设置了它的组件，其他组件都无法访问。

组件可以选择把它的 state 作为 props 向下传递到它的子组件中。

### 事件处理

React 元素的事件处理和 DOM 元素的很相似，但是有一点语法上的不同：
- React 事件的命名采用小驼峰式（camelCase），而不是纯小写；
- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串；
- 在 React 中另一个不同点是你不能通过返回 `false` 的方式阻止默认行为，你必须显式的使用 `preventDefault` 。

```jsx
function ActionLink() {
	function handleClick(e) {
		// 在这里，e 是一个合成事件，React 根据 W3C 规范来定义这些合成事件
		e.preventDefault();	// 显式的使用 ✔️
		console.log('The link was clicked.');
	}

	return (
		<a href="#" onClick={handleClick}>	// 注意，大括号外不要加引号
			Click me
		</a>
	);
}
```

另外，当你使用 ES6 class 语法定义一个组件的时候，通常的做法是将事件处理函数声明为 class 中的方法。如下：

```jsx
class Toggle extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isToggleOn: true};

		// 为了在回调中使用 `this`，这个绑定是必不可少的，否则
		// 当你调用 onClick={this.handleClick} 这个事件函数回调的时候，
		// `this` 的值为 `undefined` ，会报错
		this.handleClick = this.handleClick.bind(this);

		// bind 太麻烦 ？试试下面这个等效写法 - class fields 语法
		// Create React App 默认启用此语法
		// 此语法确保 `handleClick` 内的 `this` 已被绑定
		// 注意：这是 *实验性* 语法
		// handleClick = () => {
		// 	console.log('this is:', this);
		// }

	}

	handleClick() {
		this.setState(state => ({
			isToggleOn: !state.isToggleOn
		}));
	}

	render() {
		return (
		<button onClick={this.handleClick}>
			{this.state.isToggleOn ? 'ON' : 'OFF'}
		</button>
		);
	}
}

ReactDOM.render(
	<Toggle />,
	document.getElementById('root')
);
```

你必须谨慎对待 JSX 回调函数中的 `this`，在 JavaScript 中，class 的方法默认不会绑定 `this`。如果你忘记绑定 `this.handleClick` 并把它传入了 `onClick`，当你调用这个函数的时候 `this` 的值为 `undefined`。

这并不是 React 特有的行为，这其实与 JavaScript 函数工作原理有关。

*=emm... this 可以说是 JavaScript 永远的痛了，好在应用起来并不算太难！* 

在事件处理中，除了 `this` 的绑定之外，还有一个需要注意的地方 - 向事件处理程序传递参数。

在循环中，通常我们会为事件处理函数传递额外的参数。例如，若 id 是你要删除那一行的 ID，以下两种方式都可以向事件处理函数传递参数：

```jsx
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

上述两种方式是等价的，分别通过箭头函数和 Function.prototype.bind 来实现。

在这两种情况下，**React 的事件对象 `e` 会被作为第二个参数传递。** 如果通过箭头函数的方式，事件对象必须显式的进行传递，而通过 `bind` 的方式，事件对象以及更多的参数将会被隐式的进行传递。

### 条件渲染

这里，就不多讲了，只要记住 JSX 最终会被转成一个 JavaScript 对象，条件渲染也就是 `if` 或者条件运算符那点事了。

在极少数情况下，你可能希望能隐藏组件，即使它已经被其他组件渲染。若要完成此操作，你可以让 `render` 方法直接返回 `null`，而不进行任何渲染。在组件的 `render` 方法中返回 `null` 并不会影响组件的生命周期。

想要了解更多，直接阅读 [条件渲染](https://react.docschina.org/docs/conditional-rendering.html) 。

### 列表 & Key

同上，略！

唯一需要注意的是 `key` ，它是什么？

key 帮助 React 识别哪些元素改变了，比如被添加或删除。因此你应当给数组中的每一个元素赋予一个确定的标识。

**元素的 key 只有放在就近的数组上下文中才有意义。**

*=所谓列表，就是利用一些迭代数据，组装出可用子元素集合，然后把它们放在应该放的父元素中就可以了。* 

详见 [列表 & Key](https://react.docschina.org/docs/lists-and-keys.html) 。

### 表单

主要是弄清楚 “受控组件” 和 “非受控组件” 的概念，就可以喽。详见 [表单](https://react.docschina.org/docs/forms.html) 。

### 状态提升

*=抽象和共享，永远不变的真理！*

> 通常，多个组件需要反映相同的变化数据，这时我们建议将共享状态提升到最近的共同父组件中去。

在 React 应用中，任何可变数据应当只有一个相对应的唯一“数据源”。通常，state 都是首先添加到需要渲染数据的组件中去。然后，如果其他组件也需要这个 state，那么你可以将它提升至这些组件的最近共同父组件中。你应当依靠自上而下的数据流，而不是尝试在不同组件间同步 state。

更多详见 [状态提升](https://react.docschina.org/docs/lifting-state-up.html)。

### 组合 vs 继承

详见 [组合 vs 继承 – React - react.docschina.org](https://react.docschina.org/docs/composition-vs-inheritance.html)。

### React 哲学

> 我们认为，React 是用 JavaScript 构建快速响应的大型 Web 应用程序的首选方式。

*=emm... Vue：我才是，Angular：你们都是弟弟！*

OK，上心法 ❤️。

**第一步：将设计好的 UI 划分为组件层级**

**第二步：用 React 创建一个静态版本**

**第三步：确定 UI state 的 *-最小（且完整）表示***

通过问自己以下三个问题，你可以逐个检查相应数据是否属于 state：
- 该数据是否是由父组件通过 props 传递而来的？如果是，那它应该不是 state。
- 该数据是否随时间的推移而保持不变？如果是，那它应该也不是 state。
- 你能否根据其他 state 或 props 计算出该数据的值？如果是，那它也不是 state。

**第四步：确定 state 放置的位置**

**第五步：添加反向数据流**

*=基础的核心概念并不多（毕竟就是一个 UI 库嘛），但其思想非常好，官方文档也相当 OK ，可以不定期地多看几遍。*

## HOOK

*=不着急，先过几遍再说这个，很简单的！* 

## 相关技术栈

当然，你可以选择从零开始，但更好的选择是使用官方提供的脚架 - Create React App 。

### 样式

React 对样式如何定义并没有明确态度；如果存在疑惑，比较好的方式是和平时一样，在一个单独的 `*.css` 文件定义你的样式，并且通过 `className` 指定它们。

**React 并没有原生提供 CSS 封装方案！！！** 

React 本身的设计原则决定了其不会提供原生的 CSS 封装方案，或者说 CSS 封装并不是 React 框架本身的关注点。因此 ，React 社区从很早的时候就开始寻找相关替代办法。

```__几种技术路线
- CSS 模块化（CSS Modules）

这种做法非常类似 Angular 与 Vue 对样式的封装方案，其核心是以 CSS 文件模块为单元，将模块内的选择器附上特殊的哈希字符串，以实现样式的局部作用域。对于大多数 React 项目来说，这种方案已经足够用了。

- 基于共识的人工维护的方法论，如 BEM

这种方法的缺点是会为团队带来很大的挑战，对于全局和局部规划选择器的命名，团队对于这种方法需要有共识，即使熟练使用的情况下，在使用中依然有着较高的思维负担和维护成本。

- Shadow DOM

借助 direflow.io 等工具，我们可以将 React 组件输出为 Web Component，借助 Shadow DOM 实现组件的 CSS 样式封装。这是一种解决办法，不过基本很少有项目选择这样做。

- CSS-in-JS

```

*_1. SCSS*

好吧，相信你的项目是由 Create React App (CRA) 生成的，如果你想使用 SCSS ，只需要安装 `dart-sass` 库即可，像下面这样：

```
npm i sass --save-dev
```

感谢 `node-sass` 退出历史舞台，但感谢作者的贡献 😅！

OK，安装之后，就可以把 `*.scss` 文件作为一个模块引入了，如：

```
import example from './example.scss';
```

*_2. CSS in JS*

> 注意此功能并不是 React 的一部分，而是由第三方库提供。

“CSS-in-JS” 是指一种模式，其中 CSS 由 JavaScript 生成而不是在外部文件中定义。在 [此处](https://github.com/MicheleBertoli/css-in-js) 阅读 CSS-in-JS 库之间的对比。

*=CSS in JS 的本质就是写行内样式 style ❓❗* 

```react
const style = {
	'color': 'red',
	'fontSize': '46px'
};

const clickHandler = () => alert('hi'); 

ReactDOM.render(
	<h1 style={style} onclick={clickHandler}>
		Hello, world!
	</h1>,
	document.getElementById('example')
);
```

当然，大项目，这样直接写是非常不明智的，好在有懒人包 🥳！

目前比较流行的两个解决方案是 [styled-components](https://styled-components.com/) 和 [Emotion](https://emotion.sh/docs/introduction) 。

相关参考：
- [CSS-in-JS：一个充满争议的技术方案 - 知乎 - zhuanlan.zhihu.com](https://zhuanlan.zhihu.com/p/165089496)

*_3. CSS Modules* 🏆（首推）

> 这种做法非常类似 Angular 与 Vue 对样式的封装方案，其核心是以 CSS 文件模块为单元，将模块内的选择器附上特殊的哈希字符串，以实现样式的局部作用域。对于大多数 React 项目来说，这种方案已经足够用了。

由于一般的脚手架都默认集成了 CSS Modules，比如 React 官方的脚手架：create-react-app，已经将 CSS Modules 集成进来了，我们可以直接使用。

**如何使用呢？**

详见 [在 React 中使用 CSS Modules](https://www.jianshu.com/p/694f9c14ab35)。

### 路由

*=Hmmm... 页面路由，大大的有用！*

- [react-router-dom 使用指南（最新 V6.0.1） - 知乎 - zhuanlan.zhihu.com](https://zhuanlan.zhihu.com/p/431389907)
- [Introduction · React Router 中文手册 - uprogrammer.cn](https://uprogrammer.cn/react-router-cn/index.html)