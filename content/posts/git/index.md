---
title: 'Git'
date: 2021-07-21T15:22:00+08:00
draft: false
categories: [Linux]
tags: []
---

> 不可或缺的工具！！！

本文旨在记录个人使用过程中遇到的相关 Git 命令，非教程式的，详细学习请参阅 [《Pro Git》 的中文文档](https://git-scm.com/book/zh/v2)。

<!--more-->

## 入门篇

<img src="imgs/workflow.jpg" width="600" />

### 安装设置

去 [Git 官网](https://git-scm.com/) 下载对应版本的 Git 安装即可，此处不再赘述。

安装完成后，需要设置当前用户的名字和 Email 地址：

```sh
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
```

你总是可以通过以下方式获取帮助：

```sh
git help <verb>
git <verb> -h                   # --help 最常用，如 git config --help
man git-<verb>
```

### 基本操作

```sh
git init                         # 初始化仓库
# ……
git add .                        # 添加工作区所有变更到暂存区
git commit -m "some commit log." # 提交缓存区内变更到本地仓库
```

## 进阶篇

### 远程仓库

我们就以 [站点仓库](https://github.com/loveminimal/loveminimal.github.io) 为例。

本地仓库和远程仓库之间的传输是通过 SSH 加密的，在使用远程仓库之前，我们需要先创建 SSH Key 。

```sh
ssh-keygen -t rsa -C "youremail@example.com"
```

在用户主目录下，会生成 `.ssh` 目录，包含 `id_rsa` （私钥）和 `id_rsa.pub` （公钥）等文件。

……

```sh
# 列出远程仓库（名称及地址）
git remote -v                   # --verbose

# 添加远程仓库
git remote add <name> <url>
# 移除远程仓库
git remote remove <name>
# 重命名远程仓库分支
git remote rename <old> <new>
```

关于远程仓库的其他操作，会分散在后续章节中，不在此处单独列出。

### 分支

```sh
# 列出分支
git branch
git branch -l                   # --list 列出本地分支
git branch -a                   # --all  列出远程、本地分支

# 创建分支
git checkout -b <branch>

# 切换分支
git checkout <branch>

# 删除分支
git branch -d <branch>          # --delete 删除合并完全的分支
git branch -D <branch>          # 强制删除分支（包含未合并完全）
# 删除远程分支
git branch -d <remote-repo> <remote-branch>    # --delete 删除远程仓库的指定分支
git push <remote-repo> :<remote-branch>        # Or 推送一个空分支到远程分支，其实就相当于删除远程分支
git push <remote-repo> --delete <remote-brach> #

# 重命名分支
git branch -m <branch>          # --move

# 合并分支
git merge <other-branch> <current-branch>
```

我们从一个远程仓库拉取分支，默认会在本地创建 `master` 分支，并关联到远程仓库的主分支。

```sh
# 拉取远程仓库并关联到自定义本地分支
git clone -b <local-branch> <remote-repo-url>

# 摘取远程仓库指定分支并关联自定义本地分支
git remote add origin <remote-repo-url>
git fetch origin <remote-branch>
git checkout -b <local-branch> origin/<remote-branch> # ！关键
git pull origin <remote-branch>
```

强制推送本地分支到远程仓库分支（两者分支名称不同时），如下：

```sh
  # git remote add origin https://github.com/loveminimal/loveminimal.github.io.git
  # git push -f origin master:main  # 本地分支 master ，远程分支 main
  git push -f origin master         # 本地分支与远程分支名称相同，皆为 master
```

<div class="oh-essay">
<b>!!永远不要试图一蹴而就，在使用的过程中慢慢补充完善即可！</b>
</div>

git 设置本地与远程分支关联:

```sh
# 查看本地与远程分支关联的情况
git branch -vv

# 设置本地与远程分支关联
git branch --set-upstream-to=origin/<remote-branch> <local-branch>
```

### Git Submodule 子模块

> 参考 https://zhuanlan.zhihu.com/p/87053283

<div class="oh-essay">
果然，可以模块的地方，最终都会模块化。
</div>

假定我们有两个项目： `project-main` （主项目）和 `project-sub-1` （子模块项目）。

我们可以使用 `git submodule add <submodule_url> [<local_dir_name>]` 命令在项目中创建一个子模块。

*其中， `<local_dir_name>` 可选。

上述命令执行之后，项目仓库会多出两个文件： `.gitmodules` （子模块的相关信息）和 `project-sub-1` （子模块当前版本的版本号信息）。

**如何获取  submodule 呢？**

> 为了方便，我们不妨称主模块为 Main ，子模块为 Sub 。

对于主项目 Main 使用普通的 `clone` 操作并不会拉取到子模块 Sub 中的实际代码（它是空的）。如果希望子模块代码也获取到，可以使用以下两种方式：
1. 在克隆 Main 的时候带上参数 `--recurse-submodules` ，如此会递归地将项目中所有子模块的代码拉取；或，
2. 在 Main 中执行 `git submodule init & git submodule update` ，会根据主项目的配置信息，拉取更新子模块中的代码（or `git submodule update --init --recursive`）。

**子模块内容更新了如何操作？**

对于子模块 Sub 而言，它并不知道引用自己的主项目的存在，其自身是一个完整的 Git 仓库，按照正常的 Git 代码管理规范操作即可。

主模块的处理，目前就记住，操作了 Sub 后，再去操作 Main 即可。

**删除子模块**

使用 `git submodule deinit` 命令卸载一个子模块。这个命令如果添加上参数 `--force` ，则子模块工作区内即使有本地的修改，也会被移除。


## 其他

### 搭建 Git 服务器并启用 Hooks

许多教程使用的都是 `root` 账户，其实我们使用哪个账户都可以，比如，这里我们就用当前用户 `jack` 来搭建 git 服务。

首先，把客户机的公钥 `id_rsa.pub` 文件，导入到 `/home/jack/.ssh/authorized_keys` 文件里（若没有，新建该文件即可），一行一个。

然后，选定一个目录作为 Git 仓库，比如 `~/.repo/site.git` ，在 `.repo` 目录下，输入：

```sh
git init --bare site.git
```

Git 就会创建一个裸仓库，它没有工作区，纯粹是为了共享。

最后，在客户机上，就可以通过 `git clone` 命令克隆远程仓库了，如：

```sh
# jack - 服务器主机用户名
# ovirgo.com - 服务器绑定的域名（可以是 IP）
git clone jack@ovirgo.com:/home/jack/.repo/site.git
```

**什么是 Hooks 呢？**

执行 `cd ~/.repo/site.git/hooks && ls` ，你会发现许多 hooks 文件示例，用于该仓库去响应客户机的某些指令时的一些操作，比如，我们在客户机向该仓库推送时，自动克隆部署该仓库。

在 `hooks` 目录下，执行以下操作：

```sh
# 新建 post-receive
touch post-receive
vim post-receive
```

编辑 `post-receive` 这个钩子：

```sh
#!/bin/sh
cd /home/jack
rm -rf blog
git clone .repo/site.git blog
```

是的，它是一个 shell 脚本，如此而已。

综上，我们完成了服务器端的 Git 搭建及自动化部署。
