---
title: "Manjaro Linux"
date: 2020-05-06T12:06:13+08:00
draft: false
categories: [Linux]
tags: []
---

<!--more-->

## 安装

去 [Manjaro](https://manjaro.org/) 官网下载镜像 ISO ，使用 [rufus](https://rufus.ie/) 刻录，安装过程……

## 换源

_1. 编辑_

```sh
cd /etc/pacman.d
cp mirrorlist mirrorlist.bak
nano mirrorlist
```

文件头部添加如下内容：

```
## Country : China
Server = http://mirrors.tuna.tsinghua.edu.cn/manjaro/stable/$repo/$arch

## Country : China
Server = https://mirrors.ustc.edu.cn/manjaro/stable/$repo/$arch
```

_#. 添加 archlinuxcn 源_

```sh
cd /etc
nano pacman.conf
```

文件尾部添加如下内容：

```
## 清华大学 (ipv4, ipv6, http, https)
[archlinuxcn]
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
```

安装 `archlinuxcn-keyring` ，如下：

```sh
sudo pacman -S archlinuxcn-keyring
```

_2. 更新_

```sh
sudo pacman -Syy
# 滚动升级一下（可选）
sudo pacman -Syyu
```

## 映射 Caps Lock

编辑 `.zshrc` 或 `.bashrc` ，添加如下内容：

```
setxkbmap -option ctrl:swapcaps
```

然后，执行 `source ~/.zshrc` 或 `source ~/.bashrc` 使配置生效。

### 使用 Xmodmap 工具 [2] [3]
```sh
# 自定义映射表
xmodmap -pke > ~/.Xmodmap

# 在 ~/.Xmodmap 中做好想要的修改
# 如，把 `Shift_R` 映射为 `Esc`
keycode 62 = Escape NoSymbol Escape
# 如，把 `Caps_Lock` 映射为 `Control_L`
keycode 66 = Control_L NoSymbol Control_L

# 测试新的配置文件
xmodmap ~/.Xmodmap
```

## 中文输入法

安装 `fcitx` 及其相关依赖，如下：

```sh
sudo pacman -S fcitx fcitx-im fcitx-configtool
```

然后添加输入法配置文件 `~/.xprofile` ，添加以下内容：

```
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS="@im=fcitx"
```

之后，重启电脑后，添加新的输入法即可。

## 五笔输入

> Windows 上使用的极品五笔，感觉很不错。 Linux 上的 fcitx 也是包含 Wubi 输入的，但是词库有点可怜， 所以 rime 是一个不错的选择，它是一个输入法框架，可以按需引入。

_1. Fcitx Rime_

去 [rime](https://rime.im/) 官网下载，如果使用拼音输入的话，按照其教程操作后即可，以下内容针对 fcitx 五笔的初始化（ibus 的皮肤不好看，官方的是针对 ibus 的）， fcitx 的安装见 [中文输入法 ↑]() 。

*永远记住先把工具用起来，再慢慢研究配置。*

```sh
sudo pacman -S fcitx-rime

cd ~/.config/fcitx/rime/
# 克隆极点五笔的配置，足够好用
git clone https://github.com/KyleBing/rime-wubi86-jidian.git
cp rime-wubi86-jidian/* ./
```

如此，重启电脑后，在 _Fcitx Config_ 工具中添加 rime 后，注销电脑再次登录后即生效。

_2. IBus Rime_

```sh
# 安装
sudo pacman -S ibus ibus-rime rime-wubi
```

*附上 ibus 在 =.xrpofile= 中的值，如下：

```
#IBus
export GTK_IM_MODULE=ibus
export XMODIFIERS=@im=ibus
export QT_IM_MODULE=ibus
# 自动重启 ibus 后台服务
ibus-daemon -x -d
```

## 中文字体[1]

```sh
# 文泉驿字体
sudo pacman -S wqy-bitmapfont wqy-microhei wqy-microhei-lite wqy-zenhei
```

## 美化

| 字段               | 选项                      |
|--------------------|---------------------------|
| Window Decorations | Arc OSX White Transparent |
| Global Theme       | Blur-Glassy               |
|                    | Maia                      |
| Plasma Style       | Blur-Glassy               |

## 工具

| 工具   | 描述                  |
|--------|---------------------|
| Plank  | 类 Mac 的 Doc 栏      |
| Albert | 搜索 Mac 的 spotlight |

## FAQ

### OBS 录制窗口撕裂

```
System Settings → Display and Monitor → Compositor → Tearing prevention ("vsync")
```

修改为 `Never` 。


[3]: https://www.cnblogs.com/yinheyi/p/10146900.html

[2]: https://wiki.archlinux.org/index.php/Xmodmap_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E7%89%B9%E6%AE%8A%E7%9A%84%E6%8C%89%E9%94%AE

[1]: https://blog.csdn.net/DLine199/article/details/102893154

