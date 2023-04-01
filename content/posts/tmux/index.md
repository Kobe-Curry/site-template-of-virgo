---
title: '十分钟掌握 TMUX'
date: 2020-02-26T11:33:29+08:00
draft: false
categories: [Linux]
tags: []
---

<img src="https://www.wangbase.com/blogimg/asset/201910/bg2019102005.png" width="300" />

🔔 [http://www.ruanyifeng.com/blog/2019/10/tmux.html](友情链接)

<div class="oh-essay">
Windows 终于有了个 Windows-Terminal 吧，配置文件还是个 txt .... 哎，微软啊，你妹。
</div>

<!--more-->

## Layouts 布局、Window 窗口、Pane 窗格

| 布局 | 层级    | 描述 | 窗口 | 命令 | 描述             | 窗格 | 命令 | 描述           |
|------|---------|------|------|------|------------------|------|------|--------------|
| \*   | server  | 服务 | \*   | c    | 新建窗口         | \*   | %    | 水平分屏       |
| \*   | session | 会话 | \*   | &    | 关闭窗口         | \*   | "    | 垂直分屏       |
| \*   | window  | 窗口 | \*   | l    | 切换窗口         | \*   | x    | 关闭窗格       |
| \*   | pane    | 窗格 | \*   | n    | 切换到下一个窗口 | \*   | ;    | 切换窗格       |
| \*   |         |      | \*   | p    | 切换到上一个窗口 | \*   | o    | 顺时针切换窗格 |
| \*   |         |      | \*   | w    | 窗口的菜单列表   | \*   | C-o  | 逆时针转换窗格 |
| \*   |         |      | \*   |      |                  | \*   | M-o  | 顺时针转换窗格 |

## 配置 [r1](https://learnxinyminutes.com/docs/zh-cn/tmux-cn/)[r2](https://www.cnblogs.com/weiyinfu/p/10462738.html)

新建 `~/.tmux.conf` 文件，并写入：

```sh
# Set new default prefix
# 修改主键
unbind C-b
set-option -g prefix C-j

# Mouse
# 激活鼠标模式
set-option -g -q mouse on

# Easy split pane commands
# 修改分屏按键
bind h split-window -h
bind v split-window -v
unbind '"'
unbind %
```
