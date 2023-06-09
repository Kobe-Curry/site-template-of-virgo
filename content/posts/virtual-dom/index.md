---
title: "Virtual Dom"
date: 2020-12-02T10:33:28+08:00
draft: false
categories: [JavaScript]
tags: []
---

Before learning Virtual DOM, lets take a look at DOM.

<!--more-->

## What, exactly, is the DOM?[1]

The Document Object Model, or the "DOM", is an interface to web pages. It is essentially an API to the page, allowing programs to read an manipulate the page's content, structure, and styles. Let'w break this down.

### How is a web page built?

How a browser goes from a source HTML document to displaying a styled and interactive page in the viewport is called the *"Critical Rendering Path"*. Although this process can be broken down into several steps, as I cover in my article on [Understanding the Critical Rendering Path](https://bitsofco.de/understanding-the-critical-rendering-path/), these steps can be roughy grouped into two stages.

The first stage involves the browser parsing the document to determine what will ultimately be rendered on the page, and the second stage involves the browser performing the render.

<img src="imgs/vdom-1.png" width="660" height="" />

The result of the first stage is what is called a *"render tree"*.

The render tree is a representation of the HTML elements that will be rendered on the page and their related styles. In order to build this tree, the browser needs two things:
1. The *CSSOM*, a representation of the styles associated with elements;
2. The *DOM*, a representation of the elements.

### How is the DOM created?

<img src="imgs/vdom-2.png" width="300" style="float: right; margin-left: 8px;" />

And what does it look like?

The DOM is an object-based representation of the source HTML document. It has some differences, as we will see below, but it is essentially an attempt to convert the structure and content of the HTML document into an object model that can be used by various programs.

The object structure of the DOM is represented by what is called a *"node tree"*. It is so called because it can be thought of as a tree with a single parent stem that branches out into several child branches, each which may have leaves. In this case, the parent "stem" is the root =<html>= element, the child "branches" are the nested elements, and the "leaves" are the content within the elements.

Let's take this HTML document as an example:

```html
<!doctype html>
<html lang="en">
<head>
	<title>My first web page</title>
</head>
<body>
	<h1>Hello, world!</h1>
	<p>How are you?</p>
</body>
</html>
```

This document can be represented as the above node tree.

### What the DOM is not

In the example I gabe above, it seems like the DOM is a 1-to-1 mapping of the source HTML document or what you see your DevTools. However, as I mentioned, there are differences. In order to fully understand what the DOM *is*, we need to look at what it is *not*.

*1.The DOM is not your source HTML*

Although the DOM is created from the source HTML document, it is not always exactly the same. There are two instances in which the DOm can be different from the source HTML.

(1) When the HTML is not valid

The DOM is an interface for *valid* HTML documents. During the process of creating the DOM, the browser may correct some invalidities in the HTML code. Like this:

```html
<!doctype html>
<html>
Hello, world!
</html>
```

<img src="imgs/vdom-3.png" width="200" style="float: right; margin-left: 8px;" />

The document is missing a `<head>` and `<body>` element, which is a requirement for valid HTML. If we look at the resulting DOM tree, we will see that this has been corrected:

(2) When the DOM is modified by JavaScript

Beside being an interface to viewing the content of an HTML document, the DOM can alse modified, making it a living resource.

We can, for example, crate additional nodes to the DOM using JavaScript.

```js
var newParagraph = document.crateElement('p')
var paragraphContent = document.createTextNode('I\'m new!')

newParagraph.appendChild(paragraphContent)
document.body.appendChild(newParagraph)
```

This will update the DOM, but of course not our HTML document.

*2.The DOM is not what you see in the browser (i.e., the render tree)*

What you see in the browser viewport is the render tree which, as I mentioned, is a combination of the DOM and the CSSOM.

What really separates the *DOM* from the *render tree*, is that the latter only consists of what will eventually be painted on the screen.

Becuase the render tree is only concerned with what is rendered, it excludes elements that are visually hidden. For example, elements that have =display: none= styles associated to them.

```html
<!doctype html>
<html lang="en">
<head></head>
<body>
	<h1>Hello, world!</h1>
	<p style="display: none;">How are you?</p>
</body>
</html>
```

The DOM will include the `<p>` element:

<img src="imgs/vdom-4.png" width="250" height="" />

<img src="imgs/vdom-5.png" width="200" style="float: right; margin-left: 8px; border: 3px solid #acf;" />

However, the render tree, and therefore what is seen in the viewport, will not include that element.

*3.The DOM is not what is in DevTools*

This differentce is a bit more minuscule because the DevTools element inspector provides the closest approximation to the DOM that we have in the browser. However, the DevTools inspector includes addtional information that isn't in the DOM.

The best example of this is CSS pseudo-elements. Pseudo-elements created using the =::before= and =::after= selectors form part of the CSSOM and render tree, but are not technically part of the DOM. This is because the DOM is built from the source HTML document alone, not including the styles applied to the element.

Despite the fact that pseudo-elements are not part of the DOM, they are in our devtools element inspector.

<img src="imgs/vdom-6.png" width="800" />

This is why pseudo-elements cannot be targetted by JavaScript, because they are not part of the DOM.

### Recap

The DOM is an interface to an HTML document. It is used by browsers as a first step towards determining what to render in the viewport, and by Javascript programs to modify the content, structure, or styling of the page.

Although similar to other forms of the source HTML document, the DOM is different in a number of ways:
- It is always valid HTML
- It is a living model that can be modifed by Javascript
- It doesn't include pseudo-elements (e.g. ::after)
- It does include hidden elements (e.g. with display: none)

## Understanding the Critical Rendering Path[2]

When a browser receives the HTML response for a page from the server, there are lot of steps to be taken before pixels are drawn on the screen. This sequence the browser needs to run through for the initial paint of the page is called the *"Critical Rendering Path"*.

>　*Tip: we will use CRP represent Critical Rendering Path.

Knowledge of the CRP is incredibly useful for understanding how a site's performance can be improved. There are 6 stages to the CRP:

```
1. Constructing the DOM Tree
2. Construting the CSSOM Tree
3. Running JavaScript
4. Creating the Render Tree
5. Generating the Layout
6. Painting
```

<img src="imgs/vdom-7.png" width="760" />

### 1.Constructing the DOM Tree

The DOM (Document Object Model) Tree is an Object representation of the fully parsed HTML page.

Starting with the root element, `<html>`, nodes are created for each element/text on the page. Elements nested within other elements are represented as child nodes and each node contains the full attributes for that element. For example, an `<a>` element will have the `href` attribute associated with it's node.

Take, for example, this sample document:

```html
<html>
<head>
  <title>Understanding the Critical Rendering Path</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
      <h1>Understanding the Critical Rendering Path</h1>
  </header>
  <main>
      <h2>Introduction</h2>
      <p>Lorem ipsum dolor sit amet</p>
  </main>
  <footer>
      <small>Copyright 2017</small>
  </footer>
</body>
</html>
```

This will create the following DOM Tree:

<img src="imgs/vdom-8.png" width="720" />

A good thing about HTML is that it can be executed in parts. The full document doesn't have to be loaded for content to start appearing on the page. However, other resources, CSS and JavaScript, can block the render of the page.

### 2.Constructing the CSSOM Tree

The CSSOM (CSS Object Model) is an Object representation of the styles associated with the DOM. It is represented in a similar way to the DOM, but with the associated styles for each node, whether they explicitly declared or implicitly inherited, included.

In the =`tyle.css` file from the document mentioned above, we have the following styles:

```css
body { font-size: 18px; }

header { color: plum; }
h1 { font-size: 28px; }

main { color: firebrick; }
h2 { font-size: 20px; }

footer { display: none; }
```

This will create the following CSSOM Tree:

<img src="imgs/vdom-9.png" width="720" />

CSS is considered a *"render blocking resource"*. This means that the [[*4.Creating the Render Tree][Render Tree (see below)]] cannot be constructed without first fully parsing the resource.

Unlike HTML, CSS cannot be used in parts because of its inherit cascading nature. Styles defined later in the document can override and change styles that were previously defined. So, if we start using CSS styles defined earlier in the stylesheet before the entirety of the stylesheet has been parsed, we may get a situation where the wrong CSS is being applied.

*This means that CSS must be fully parsed before we can move on to the next stage.*

CSS files are only considered render blocking if they apply to the current device. The `<link rel="stylesheet">` tag can accept a `media` attribute, in which we can specify any media query which the styles within apply to. If, for example, we have a stylesheet with a media attribute of `orientation: landscape`, and we are viewing the page in portrait mode, that resource will not be considered render blocking.

CSS can also be *"script blocking"*. This is because JavaScript files must wait until the CSSOM has been constructed before it can run.

### 3.Running JavaScript

JavaScript is considered a *"parser blocking resource"*. This means that the parsing of the HTML document itself is blocked by JavaScript.

When the parser reaches a `<script>` tag, whether that be internal or external, it stops to fetch (if it is external) and run it. This why, if we have a JavaScript file that references elements within the document, it must be placed after the appearance of that document.

To avoid JavaScript being parse blocking, it can be loaded asynchronously be applying the `async` attribute.

```html
<script async src="script.js"></script>
```

### 4.Creating the Render Tree

The Render Tree is a combination of both the DOM and CSSOM. It is a Tree that represents what will be eventually rendered on the page. This means that it only captures the visible content and will not include, for example, elements that have been hidden with CSS using `display: none`.

Using the example DOM and CSSOM above, the following Render Tree will be created:

<img src="imgs/vdom-10.png" width="720" />

### 5.Generating the Layout

The Layout is what determines *what the size of the viewport is* , which provides context for CSS styles that are dependent on it, e.g. percentage or viewport units. The viewport size is determined by meta viewport tag provided in the document head or, if no tag is provided, the default viewport width of 980px is used.

For example, the most common meta viewport value is to set the viewport size to correspond to the device width:

```html
<meta name="viewport" content="width=device-width,initial-scale=1">
```

If the user visits the webpage on a device with a width of, for example, 1000px, then sizes will be based on that unit. Half the viewport will be 500px, 10vw will be 100px, and so on.

### 6.Painting

Finally, in the Painting step, the visible content of the page can be converted to pixels to be displayed on the screen.

How much time the paint step takes depends on the size of the DOM, as well as what styles are applied. Some styles require more work to execute than others. For example, a complicated gradient background-image will require more time than a simple solid background colour.

### Putting it All Together

To see the Critical Rendering Path in process, we can inspect it in DevTools. In Chrome, it is under the *Timeline* tab (in Canary, and soon to be Chrome stable, it's renamed *Performance*).

Take for example, our sample HTML from above (width an added `<script>` tag):

```html
<html>
<head>
<title>Understanding the Critical Rendering Path</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<header>
	<h1>Understanding the Critical Rendering Path</h1>
</header>
<main>
	<h2>Introduction</h2>
	<p>Lorem ipsum dolor sit amet</p>
</main>
<footer>
	<small>Copyright 2017</small>
</footer>
<script src="main.js"></script>
</body>
</html>
```

If we look at the Event Log for the page load, this is what we get:

<img src="imgs/vdom-11.png" width="800" />

1. *Send Request* - GET request sent for index.html
2. *Parse HTML* and *Send Request* - Begin parsing of HTML and DOM construction. Send GET request for `style.css` and `main.js`
3. *Parse Stylesheet* - CSSOM created for `style.css`
4. *Evaluate Script* - Evaluate `main.js`
5. *Layout* - Generate Layout based on meta viewport tag in HTML
6. *Paint* - Paint pixels on document

Based on this information, we can make decisions on how to optimize the Critical Rendering Path. I will go into some of these techniques in later articles.

## Understanding the Virtual DOM[3]

I've recently been writing about what exactly the DOM and the shodow DOM are and how they differ.

To recap, the Document Object Model is an object-based representation of an HTML document and an interface to mainpulating that object.

The shadow DOM can be thought of as a "lite" version of the DOM. It is also an object-based representation of HTML elements, but not of a full standalone document. Instead, the shadow DOM allows us to separate our DOM into smaller, encapsulated bits that can be used across HTML documents.

Another similar term you may have come across is the *"virtual DOM"*.

Although the concep has been around for several years, it was made more popular by its use in the React framework. In this article, I will cover exactly what the virtual DOM is, how it differs from the original DOM, and how it it used.

### Why do we need a virtual DOM?

To understand why the concept of the virtual DOM arose, let's revisit the original DOM.

As I mentioned, there are two parts to the DOM:
- the object-based representation of the HTML document, and
- the API to manipulating that object.

For example, let's take this simple HTML document with an unordered list and one list item.

```html
<!doctype html>
<html lang="en">
 <head></head>
 <body>
    <ul class="list">
        <li class="list__item">List item</li>
    </ul>
  </body>
</html>
```

This document can be represented as the following DOM tree:

<img src="imgs/vdom-12.png" width="260" />

Let's say we want to modify the content of the first list item to *"List item one"* and also add a second list item. To do this, we will need use the DOM APIs to find the elements we want to update, create the new elements, add attributes and content, then finally update the DOM elements themselves.

```js
const listItemOne = document.getElementsByClassName('list__item')[0]
listItemOne.textContent = 'List item one'

const list = document.getElementsByClassName('list')[0]
const listItemTwo = document.createElement('li')
listItemTwo.classList.add('list__item')
listItemTwo.textContent = 'List item two'
list.appendChild(listItemTwo)
```

*The DOM wasn't made for this...*

When the first specification for the DOM was released in 1998, we built and managed web pages in very differently. There was far less reliance on the DOM APIs to create and update the page content as frequently as we do today.

Simple methods such as =document.getElementsByClassName()= are fine to use on a small scale, but if we are updating muliple elements on a page every few seconds, it can start to become really expensive to constantly query and update the DOM.

Even further, because of the way the APIs are setup, it is usually simpler to perform more expensive operations where we update larger parts of the doucment than to find and update the specific elements. Going back to our list example, it is in some ways easier to replace the entire unordered list with a new one than to modify the specific elements.

```js
const list = document.getElementsByClassName('list')[0]
list.innerHTML = `
<li class="list__item">List item one</li>
<li class="list__item">List item two</li>
  `
```

In this particular example, the performance difference between the methods is probably insignificant. However, as the size of the web page grows, it becomes more important to only select and update what is needed.

*...but the virtual DOM was!*

The virtual DOM was created to solve these problems of needing to frequently update the DOM in a more performant way. Unlike the DOM or the shadow DOM, the virtual DOM isn't an official specification, but rather a new method of interfacing with the DOM.

*A virtual DOM can be thought of as a copy of the original DOM.* This copy can be frequently manipulated and upated, without using the DOM APIs. Once all the updates have been made to the virtual DOM, we can look at what specific changes need to be made to the original DOM and make them in a targetted and optimised way.

### What does a virtual DOM look like?

The name "virtual DOM" tends to add to the mystery of what the concept actually is. *In fact, a virtual DOM is just a regular JavaScript object.*

Let's revisit the DOM tree we created earlier:

<img src="imgs/vdom-12.png" width="260" />

This tree can also be represented as a JavaScript object.

```js
const vdom = {
	tagName: 'html',
	children: [
		{ tagName: 'head'},
		{
			tagName: 'body',
			children: [
				{
					tagName: 'ul',
					attributes: { class: 'list' },
					children: [
						{
							tagName: 'li',
							attributes: { class: 'list__item' },
							textContent: 'List item'
						}   // end li
					]
				}   // end ul
			]
		}   // end body
	]
}   // end html
```

We can think of this object as our virtual DOM. Like the original DOM, it is an object-based representation of our HTML document. But since it is a plain JavaScript object, we can manipulate it freely and frequently without touching the actual DOM until we need to.

Instead of using one object for the entire object, it is more common to work with small sections of the virtual DOM. For example, we may work on a *list* component, which would corespond to our unordered list element.

```js
const list = {
	tabName: 'ul',
	attributes: { class: 'list' },
	children: [
		{
			tagName: 'li',
			attributes: { class: 'list__item' },
			textContent: 'List item'
		}
	]
}
```

### Under the hood of the virtual DOM

Now that we've seen what a virtual DOM looks like, how does it work to solve the performance and usability problems of the DOM?

As I mentioned, we can use the virtual DOM to single out the specific changes that need to be made to the DOM and make those specific updates alone. Let's go back to our unordered list example and make the same changes we did using the DOM API.

The first thing we would do is make a copy of the virtual DOM, containing the changes we want to make. Since we don't need to use the DOM APIs, we can actually just create a new object alltogether.

```js
const copy = {
	tagName: 'ul',
	attributes: { class: 'list' },
	children: [
		{
			tagName: 'li',
			attributes: { class: 'list__item' },
			textContent: 'List item one'
		},
		{
			tagName: 'li',
			attributes: { class: 'list__item' },
			textContent: 'List item two'
		}
	]
}
```

This *copy* is used to create what is called a "diff" between the original virtual DOM, in this case the *list* , and the updated one. A diff could look something like this:

```js
const diffs = [
	{
		newNode: { /* new version of list item one */ },
		oldNode: { /* original version of list item one */ },
		index: /* index of element in parent's list of child nodes */
	},
	{
		newNode: { /* list item two */ },
		index: { /* */ }
	}
]
```

This diff provides instructions for how to update the actual DOM. Once all the diffs are collected, we can batch changes to the DOM, making only the updates that are needed.

For example we could loop through each diff and either add a new child or update an old one depending on what the diff specifies.

```js
const domElement = document.getElementsByClassName('list')[0]

diffs.forEach((diff) => {

	cosnt newElement = document.createElement(diff.newNode.tagName)
	/* Add attributes ... */

	if (diff.oldNode) {
		// If there is an old version, replace it with the new version
		domElement.replaceChild(diff.newNode, diff.index)

	} else {
		// if no old version exists, create a new node
		domElement.appendChild(diffNode)
	}
})
```

Note that this is a really simplified and stripped-back version of how a virtual DOM could work and there are lot of cases I didn't cover here.

### The virtual DOM and frameworks

It's more common to work with the virtual DOM via a framework, rather than interfacing with it directly as I showed in the example above.

Frameworks such as React and Vue use the virtual DOM concept to make more performant updates to the DOM. For example, our *list* component can be written in React in the following way.

```js
import React from 'react'
import ReactDOM from 'react-dom'

const list = React.createElement(
	'ul', { className: 'list' },
	React.createElement('li', { className: 'list__item' }, 'List item')
)

ReactDOM.render(list, document.body)
```

If we wanted to update our list, we could just rewrite the entire list template, and call =ReactDOM.render()= again, passing in the new list.

```js
const newList = React.createElement(
	'ul', { className: 'list' },
	React.createElement('li', { className: 'list__item' }, 'List item one'),
	React.createElement('li', { className: 'list__item' }, 'List item two')
)

setTimeout(() => ReactDOM.render(newList, document.body), 5000)
```

Because React uses the virtual DOM, even though we are re-rendering the entire template, only the parts that actually change are updated. If we look at our developer tools when the change happens, we will see the specific elements and the specific parts of the elements that change.

### The DOM vs the virtual DOM

To recap, the virtual DOM is a tool that enables us to interface with DOM elements in an easier and more performant way. It is a JavaScript object representation of the DOM, which we can modify as frequently as we need to. Changes made to this object are then collated, and modifications to the actual DOM are targetted and made less often.

[3]: https://bitsofco.de/understanding-the-virtual-dom/

[2]: https://bitsofco.de/understanding-the-critical-rendering-path/

[1]: https://bitsofco.de/what-exactly-is-the-dom/
