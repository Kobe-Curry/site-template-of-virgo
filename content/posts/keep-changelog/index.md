---
title: "如何维护更新日志"
date: 2022-11-02T15:42:33+08:00
draft: false
categories: [标准化]
tags: []
card: false
---

<img alt="picture 14" src="/posts/keep-changelog/imgs/de78a20f0efae9c4f2c0432200dfe721f1007dc1c9af179b9c33d842f20d1e7b.png" width="300" />  

🔔 本文摘录自 [如何维护更新日志 -- 更新日志绝对不应该是 git 日志的堆砌物](https://keepachangelog.com/zh-CN/1.0.0/)

<!--more-->

## 简介

[Version 1.0.0](https://github.com/olivierlacan/keep-a-changelog/blob/master/CHANGELOG.md)

```_更新日志详情
# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2017-06-20
### Added
- New visual identity by [@tylerfortune8](https://github.com/tylerfortune8).
- Version navigation.
- Links to latest released version in previous versions.
- "Why keep a changelog?" section.
- "Who needs a changelog?" section.
- "How do I make a changelog?" section.
- "Frequently Asked Questions" section.
- New "Guiding Principles" sub-section to "How do I make a changelog?".
- Simplified and Traditional Chinese translations from [@tianshuo](https://github.com/tianshuo).
- German translation from [@mpbzh](https://github.com/mpbzh) & [@Art4](https://github.com/Art4).
- Italian translation from [@azkidenz](https://github.com/azkidenz).
- Swedish translation from [@magol](https://github.com/magol).
- Turkish translation from [@karalamalar](https://github.com/karalamalar).
- French translation from [@zapashcanon](https://github.com/zapashcanon).
- Brazilian Portugese translation from [@Webysther](https://github.com/Webysther).
- Polish translation from [@amielucha](https://github.com/amielucha) & [@m-aciek](https://github.com/m-aciek).
- Russian translation from [@aishek](https://github.com/aishek).
- Czech translation from [@h4vry](https://github.com/h4vry).
- Slovak translation from [@jkostolansky](https://github.com/jkostolansky).
- Korean translation from [@pierceh89](https://github.com/pierceh89).
- Croatian translation from [@porx](https://github.com/porx).
- Persian translation from [@Hameds](https://github.com/Hameds).
- Ukrainian translation from [@osadchyi-s](https://github.com/osadchyi-s).

### Changed
- Start using "changelog" over "change log" since it's the common usage.
- Start versioning based on the current English version at 0.3.0 to help
translation authors keep things up-to-date.
- Rewrite "What makes unicorns cry?" section.
- Rewrite "Ignoring Deprecations" sub-section to clarify the ideal
  scenario.
- Improve "Commit log diffs" sub-section to further argument against
  them.
- Merge "Why can’t people just use a git log diff?" with "Commit log
  diffs"
- Fix typos in Simplified Chinese and Traditional Chinese translations.
- Fix typos in Brazilian Portuguese translation.
- Fix typos in Turkish translation.
- Fix typos in Czech translation.
- Fix typos in Swedish translation.
- Improve phrasing in French translation.
- Fix phrasing and spelling in German translation.

### Removed
- Section about "changelog" vs "CHANGELOG".

## [0.3.0] - 2015-12-03
### Added
- RU translation from [@aishek](https://github.com/aishek).
- pt-BR translation from [@tallesl](https://github.com/tallesl).
- es-ES translation from [@ZeliosAriex](https://github.com/ZeliosAriex).

## [0.2.0] - 2015-10-06
### Changed
- Remove exclusionary mentions of "open source" since this project can
benefit both "open" and "closed" source projects equally.

## [0.1.0] - 2015-10-06
### Added
- Answer "Should you ever rewrite a change log?".

### Changed
- Improve argument against commit logs.
- Start following [SemVer](https://semver.org) properly.

## [0.0.8] - 2015-02-17
### Changed
- Update year to match in every README example.
- Reluctantly stop making fun of Brits only, since most of the world
  writes dates in a strange way.

### Fixed
- Fix typos in recent README changes.
- Update outdated unreleased diff link.

## [0.0.7] - 2015-02-16
### Added
- Link, and make it obvious that date format is ISO 8601.

### Changed
- Clarified the section on "Is there a standard change log format?".

### Fixed
- Fix Markdown links to tag comparison URL with footnote-style links.

## [0.0.6] - 2014-12-12
### Added
- README section on "yanked" releases.

## [0.0.5] - 2014-08-09
### Added
- Markdown links to version tags on release headings.
- Unreleased section to gather unreleased changes and encourage note
keeping prior to releases.

## [0.0.4] - 2014-08-09
### Added
- Better explanation of the difference between the file ("CHANGELOG")
and its function "the change log".

### Changed
- Refer to a "change log" instead of a "CHANGELOG" throughout the site
to differentiate between the file and the purpose of the file — the
logging of changes.

### Removed
- Remove empty sections from CHANGELOG, they occupy too much space and
create too much noise in the file. People will have to assume that the
missing sections were intentionally left out because they contained no
notable changes.

## [0.0.3] - 2014-08-09
### Added
- "Why should I care?" section mentioning The Changelog podcast.

## [0.0.2] - 2014-07-10
### Added
- Explanation of the recommended reverse chronological release ordering.

## [0.0.1] - 2014-05-31
### Added
- This CHANGELOG file to hopefully serve as an evolving example of a
  standardized open source project CHANGELOG.
- CNAME file to enable GitHub Pages custom domain
- README now contains answers to common questions about CHANGELOGs
- Good examples and basic guidelines, including proper date formatting.
- Counter-examples: "What makes unicorns cry?"

[Unreleased]: https://github.com/olivierlacan/keep-a-changelog/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/olivierlacan/keep-a-changelog/compare/v0.3.0...v1.0.0
[0.3.0]: https://github.com/olivierlacan/keep-a-changelog/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/olivierlacan/keep-a-changelog/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/olivierlacan/keep-a-changelog/compare/v0.0.8...v0.1.0
[0.0.8]: https://github.com/olivierlacan/keep-a-changelog/compare/v0.0.7...v0.0.8
[0.0.7]: https://github.com/olivierlacan/keep-a-changelog/compare/v0.0.6...v0.0.7
[0.0.6]: https://github.com/olivierlacan/keep-a-changelog/compare/v0.0.5...v0.0.6
[0.0.5]: https://github.com/olivierlacan/keep-a-changelog/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/olivierlacan/keep-a-changelog/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/olivierlacan/keep-a-changelog/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/olivierlacan/keep-a-changelog/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/olivierlacan/keep-a-changelog/releases/tag/v0.0.1
```

**更新日志是什么？**

更新日志（Change Log）是一个由人工编辑，以时间为倒序的列表， 以记录一个项目中所有版本的显著变动。

**为何要提供更新日志？**

为了让用户和开发人员更简单明确的知晓项目在不同版本之间有哪些显著变动。

**哪些人需要更新日志？**

人人需要更新日志。无论是消费者还是开发者，软件的最终用户都关心软件所包含什么。 当软件有所变动时，大家希望知道改动是为何、以及如何进行的。

## 怎样制作高质量的更新日志？

**指导原则：**
- 记住日志是写给人的，而非机器
- 每个版本都应该有独立的入口
- 同类改动应该分组放置
- 版本与章节应该相互对应
- 新版本在前，旧版本在后
- 应包括每个版本的发布日期
- 注明是否遵守 [语义化版本格式](../posts/../semantic-versioning/)

| 变动类型     | 备注                               |
| :----------- | :--------------------------------- |
| `Added`      | 新添加的功能                       |
| `Changed`    | 对现有功能的变更                   |
| `Deprecated` | 已经不建议使用，准备很快移除的功能 |
| `Removed`    | 已经移除的功能                     |
| `Fixed`      | 对 bug 的修复                        |
| `Security`   | 对安全的改进                       |

`> 表：变动类型`

## 如何减少维护更新日志的精力？

在文档最上方提供 `Unreleased` 区块以记录即将发布的更新内容。

这样有两大意义：
- 大家可以知道在未来版本中可能会有哪些变更
- 在发布新版本时，可以直接将 `Unreleased` 区块中的内容移动至新发布版本的描述区块就可以了

## 有很糟糕的更新日志吗？

当然有，下面就是一些糟糕的方式。

**使用 git 日志**

使用 git 日志作为更新日志是个非常糟糕的方式：git 日志充满各种无意义的信息， 如合并提交、语焉不详的提交标题、文档更新等。

提交的目的是记录源码的演化。 一些项目会清理提交记录，一些则不会。

更新日志的目的则是记录重要的变更以供最终受众阅读，而记录范围通常涵盖多次提交。

**无视即将弃用功能**

当从一个版本升级至另一个时，人们应清楚（尽管痛苦）的知道哪些部分将出现问题。 应该允许先升级至一个列出哪些功能将会被弃用的版本，待去掉那些不再支持的部分后， 再升级至把那些弃用功能真正移除的版本。

即使其他什么都不做，也要在更新日志中列出 derecations，removals 以及其他重大变动。

**易混淆的日期格式**

在美国，人们将月份写在日期的开头 (06-02-2012 对应 2012 年 6 月 2 日）， 与此同时世界上其他地方的很多人将至写作 2 June 2012，并拥有不同发音。 2012-06-02 从大到小的排列符合逻辑，并不与其他日期格式相混淆，而且还 符合 ISO 标准。因此，推荐在更新日志中采用使用此种日期格式。

还有更多内容。请通过 [发布问题](https://github.com/olivierlacan/keep-a-changelog/issues) 或发布 pull 请求帮助我收集更多异常模式。

## FAQ

**是否有一个标准化的更新日志格式？**

并没有。虽然 GNU 提供了更新日志样式指引，以及那个仅有两段长的 GNU NEWS 文件“指南”， 但两者均远远不够。

此项目意在提供一个 [更好的更新日志惯例](https://github.com/olivierlacan/keep-a-changelog/blob/master/CHANGELOG.md) 所有点子都来自于在开源社区中对优秀实例的观察与记录。

对于所有建设性批评、讨论及建议，我们都非常 [欢迎](https://github.com/olivierlacan/keep-a-changelog/issues)。

**更新日志文件应被如何命名？**

可以叫做 `CHANGELOG.md`。 一些项目也使用 `HISTORY、NEWS` 或 `RELEASES`。

当然，你可以认为更新日志的名字并不是什么要紧事，但是为什么要为难那些仅仅是想看到都有哪些重大变更的最终用户呢？

**对于 GitHub 发布呢？**

这是个非常好的倡议。[Releases](https://help.github.com/articles/creating-releases/) 可通过手动添加发布日志或将带 有注释的 git 标签信息抓取后转换的方式，将简单的 git 标签（如一个叫 `v1.0.0` 的标签） 转换为信息丰富的发布日志。

GitHub 发布会创建一个非便携、仅可在 GitHub 环境下显示的更新日志。尽管会花费更 多时间，但将之处理成更新日志格式是完全可能的。

现行版本的 GitHub 发布不像哪些典型的大写文件 (`README, CONTRIBUTING`, etc.)，仍可以认为是不利于最终用户探索的。 另一个小问题则是界面并不提供不同版本间 commit 日志的链接。

**更新日志可以被自动识别吗？**

非常困难，因为有各种不同的文件格式和命名。

[Vandamme](https://github.com/tech-angels/vandamme/) 是一个 Ruby 程序，由 Gemnasium 团队制作，可以解析多种 （但绝对不是全部）开源库的更新日志。

**那些后来撤下的版本怎么办？**

因为各种安全/重大 bug 原因被撤下的版本被标记 'YANKED'。 这些版本一般不出现在更新日志里，但建议他们出现。 显示方式应该是： `## 0.0.5 - 2014-12-13 [YANKED]` 。

`[YANKED]` 的标签应该非常醒目。人们应该非常容易就可以注意到他。 并且被方括号所包围也使其更易被程序识别。

**是否可以重写更新日志？**

当然可以。总会有多种多样的原因需要我们去改进更新日志。 对于那些有着未维护更新日志的开源项目，我会定期打开 pull 请求以加入缺失的发布信息。

另外，很有可能你发现自己忘记记录一个重大功能更新。这种情况下显然你应该去重写更新日志。

**如何贡献？**

本文档并非真理。而是我深思熟虑后的建议，以及我收集的信息与典例。

我希望我们的社区可以对此达成一致。我相信讨论的过程与最终结果一样重要。

所以欢迎 [贡献](https://github.com/olivierlacan/keep-a-changelog).

## 访谈

我在 [更新日志播客](https://changelog.com/podcast/127) 上讲述了为何维护者与贡献者应关心更新日志， 以及支持我进行此项目的诸多因素。
