---
title: 'Markdown'
date: 2022-06-29T09:18:49+08:00
draft: false
categories: [关于]
tags: [Hugo]
---

> 这里是 Hugo 解析 Markdown 内容的展示，如果你使用的是 Org Mode ，可以跳转 [Org Mode](/posts/org-mode) 查看相关样式。

> 以下 markdown 正文内容，摘自 [Markdown 测试文本](https://github.com/hexojs/hexo-theme-unit-test/edit/master/source/_posts/markdown.md) ，并添加、修改了一些章节。

This post is originated from [here](https://gist.github.com/apackeer/4159268) and is used for testing markdown style. This post contains nearly every markdown usage. Make sure all the markdown elements below show up correctly.

<!--more-->

---

## Headers

```markdown
# H1

## H2

### H3

#### H4

##### H5

###### H6

Alternatively, for H1 and H2, an underline-ish style:

# Alt-H1

## Alt-H2
```

# H1

## H2

### H3

#### H4

##### H5

###### H6

Alternatively, for H1 and H2, an underline-ish style:

# Alt-H1

## Alt-H2

## Emphasis

```markdown
Emphasis, aka italics, with _asterisks_ or _underscores_.

Strong emphasis, aka bold, with **asterisks** or **underscores**.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~
```

Emphasis, aka italics, with _asterisks_ or _underscores_.

Strong emphasis, aka bold, with **asterisks** or **underscores**.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~

## Lists

```markdown
1. First ordered list item
2. Another item

-   Unordered sub-list.

1. Actual numbers don't matter, just that it's a number
1. Ordered sub-list
1. And another item.

    You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

    To have a line break without a paragraph, you will need to use two trailing spaces.  
    Note that this line is separate, but within the same paragraph.  
    (This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

-   Unordered list can use asterisks

*   Or minuses

-   Or pluses

*   Paragraph In unordered list

    For example like this.

Common Paragraph with some text.
And more text.
```

1. First ordered list item
2. Another item

-   Unordered sub-list.

1. Actual numbers don't matter, just that it's a number
1. Ordered sub-list
1. And another item.

    You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

    To have a line break without a paragraph, you will need to use two trailing spaces.  
    Note that this line is separate, but within the same paragraph.  
    (This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

-   Unordered list can use asterisks

*   Or minuses

-   Or pluses

*   Paragraph In unordered list

    For example like this.

Common Paragraph with some text.
And more text.

## Inline HTML

```markdown
<p>To reboot your computer, press <kbd>ctrl</kbd>+<kbd>alt</kbd>+<kbd>del</kbd>.</p>
```

<p>To reboot your computer, press <kbd>ctrl</kbd>+<kbd>alt</kbd>+<kbd>del</kbd>.</p>

```markdown
<dl>
    <dt>Definition list</dt>
    <dd>Is something people use sometimes.</dd>

    <dt>Markdown in HTML</dt>
    <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>

</dl>
```

<dl>
    <dt>Definition list</dt>
    <dd>Is something people use sometimes.</dd>

    <dt>Markdown in HTML</dt>
    <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>

</dl>

## Links

```markdown
[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][arbitrary case-insensitive reference text]

[I'm a relative reference to a repository file](../blob/master/LICENSE)

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself]

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://hexo.io
[1]: https://hexo.io/docs/
[link text itself]: https://hexo.io/api/
```

[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][arbitrary case-insensitive reference text]

[I'm a relative reference to a repository file](../blob/master/LICENSE)

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself]

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://hexo.io
[1]: https://hexo.io/docs/
[link text itself]: https://hexo.io/api/

## Images

```markdown
hover to see the title text:

Inline-style:

![alt text](https://hexo.io/icon/favicon-196x196.png 'Logo Title Text 1')

Reference-style:
![alt text][logo]

[logo]: https://hexo.io/icon/favicon-196x196.png 'Logo Title Text 2'
```

hover to see the title text:

Inline-style:

![alt text](https://hexo.io/icon/favicon-196x196.png 'Logo Title Text 1')

Reference-style:
![alt text][logo]

[logo]: https://hexo.io/icon/favicon-196x196.png 'Logo Title Text 2'

## Code and Syntax Highlighting

Inline `code` has `back-ticks around` it.

```javascript
var s = 'JavaScript syntax highlighting';
alert(s);
```

```python
s = "Python syntax highlighting"
print s
```

```
No language indicated, so no syntax highlighting.
But let's throw in a <b>tag</b>.
```

## Tables

```markdown
|                  | ASCII                           | HTML                          |
|------------------|---------------------------------|-------------------------------|
| Single backticks | `'Isn't this fun?'`             | 'Isn't this fun?'             |
| Quotes           | `"Isn't this fun?"`             | "Isn't this fun?"             |
| Dashes           | `-- is en-dash, --- is em-dash` | -- is en-dash, --- is em-dash |
```

|                  | ASCII                           | HTML                          |
|------------------|---------------------------------|-------------------------------|
| Single backticks | `'Isn't this fun?'`             | 'Isn't this fun?'             |
| Quotes           | `"Isn't this fun?"`             | "Isn't this fun?"             |
| Dashes           | `-- is en-dash, --- is em-dash` | -- is en-dash, --- is em-dash |

Colons can be used to align columns.

```markdown
| Tables        |      Are      | Cool |
|---------------|:-------------:|-----:|
| col 3 is      | right-aligned |      |
| col 2 is      |   centered    |      |
| zebra stripes |   are neat    |      |
```

| Tables        |      Are      | Cool |
|---------------|:-------------:|-----:|
| col 3 is      | right-aligned |      |
| col 2 is      |   centered    |      |
| zebra stripes |   are neat    |      |

The outer pipes (|) are optional, and you don't need to make the raw Markdown line up prettily. You can also use inline Markdown.

```markdown
| Markdown | Less      | Pretty     |
|----------|-----------|------------|
| _Still_  | `renders` | **nicely** |
| 1        | 2         | 3          |
```

| Markdown | Less      | Pretty     |
|----------|-----------|------------|
| _Still_  | `renders` | **nicely** |
| 1        | 2         | 3          |

> You can find more information about **LaTeX** mathematical expressions [here](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference).

## Blockquotes

> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can _put_ **Markdown** into a blockquote.

## Horizontal Rule

Three or more...

```markdown
---
Hyphens
---

Asterisks

---

Underscores
```

---

Hyphens

---

Asterisks

---

Underscores

## Line Breaks

```markdown
Here's a line for us to start with.

This line is separated from the one above by two newlines, so it will be a _separate paragraph_.

This line is also a separate paragraph, but...
This line is only separated by a single newline, so it's a separate line in the _same paragraph_.
```

Here's a line for us to start with.

This line is separated from the one above by two newlines, so it will be a _separate paragraph_.

This line is also a separate paragraph, but...
This line is only separated by a single newline, so it's a separate line in the _same paragraph_.

---

```markdown
This is a regular paragraph.

<table>
    <tr>
        <td>Foo</td>
    </tr>
</table>

This is another regular paragraph.
```

This is a regular paragraph.

<table>
    <tr>
        <td>Foo</td>
    </tr>
</table>

This is another regular paragraph.

## Oh Essay

在编辑博文的时候，经常想插入一些突然闪现出来的内容，或是于行文无关的吐槽等。为了更好地与正文内容做区分，做了一个定制模式，以 html 格式插入。

```html
<div class="oh-essay">
这就是我们插入的随笔喽…… blablablabla……
</div>
```

<div class="oh-essay">
这就是我们插入的随笔喽…… blablablabla……
</div>

## Bilibili Videos

<div class="oh-essay">
Youbube ? No no no ! Bilibili ? Yes ! 
</div>

<iframe src="//player.bilibili.com/player.html?aid=338348299&bvid=BV1FR4y1u7GF&cid=489898794&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

Bilibili 真的很不错，体验上比 Youtube 要好，内容类型嘛，则没有后者丰富，这个没办法，生态大环境决定的。

```
## Youtube videos

```markdown
<a href="https://www.youtube.com/watch?feature=player_embedded&v=ARted4RniaU
" target="_blank"><img src="https://img.youtube.com/vi/ARted4RniaU/0.jpg"
alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>

Pure markdown version:

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/ARted4RniaU/0.jpg)](https://www.youtube.com/watch?v=ARted4RniaU)

<a href="https://www.youtube.com/watch?feature=player_embedded&v=ARted4RniaU
" target="_blank"><img src="https://img.youtube.com/vi/ARted4RniaU/0.jpg"
alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>

Pure markdown version:

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/ARted4RniaU/0.jpg)](https://www.youtube.com/watch?v=ARted4RniaU)
```