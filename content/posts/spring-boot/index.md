---
title: "Spring Boot"
date: 2022-07-04T15:26:05+08:00
draft: false
categories: [Java]
tags: [Spring]
card: false
---

🔔 相关内容请参阅 https://www.liaoxuefeng.com/wiki/1252599548343744/1266265175882464

Spring Boot 是什么？它是一个基于 [Spring](../spring/) 的套件，它帮助我们预组装了一系列组件，以便以尽可能少的代码和配置来开发基于 Spring 的 Java 应用程序。

> Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can "just run".  
> We take an opinionated view of the Spring platform and third-party libraries so you can get started with minimum fuss. Most Spring Boot applications need minimal Spring configuration.  
> -- [Spring Boot](https://spring.io/projects/spring-boot)

在 Spring 中，我们使用 `xml` 文件或是注解来告诉 Spring 如果处理我们的组件。但是你必需给它明确的指令，它才知道如何正确的执行。随着组件数量的增多，配置项变得越来越长，以至于难以维护。所以，有必要让框架为我们做更多的事儿，比如解决依赖的依赖等问题，这就是为什么我们需要 Spring Boot。

Spring Boot 是如何做到这些的呢？下面让我们来慢慢揭开这位“俏姑娘”的面纱 🥰。

<!--more-->

## 她长什么样？

我们不妨新建一个 `springboot-hello` 项目，创建标准的 Maven 目录结构如下：

```
springboot-hello
├── pom.xml
├── src
│   └── main
│       ├── java
│       └── resources
│           ├── application.yml		# Spring Boot 默认的配置文件
│           ├── logback-spring.xml	# Spring Boot 的 logback 配置文件名称
│           ├── static				# 静态文件目录
│           └── templates			# 模板文件目录
└── target
```

我们主要的工作目录是 `src/main/java/` ，我们来看一看源码目录结构：

```
src/main/java
└── com
    └── itranswarp
        └── learnjava
            ├── Application.java		# ！启动类
            ├── entity
            │   └── User.java
            ├── service
            │   └── UserService.java
            └── web
                └── UserController.java
```

注意：Spring Boot 要求 `main()` 方法所在的启动类必须放到根 package 下，命名不做要求（这里我们以 `Application.java` 命名）。

<div class="oh-essay">
启动类，是一切的起点哦。
</div>

## 她的魔法之源

### 启动类

我们来看一下上个章节中的 `Application.java` 启动类，其内容如下：

```java
@SpringBootApplication
public class Application {
    public static void main(String[] args) throws Exception {
        SpringApplication.run(Application.class, args);
    }
}
```

像是之前，我们使用的 Spring 启动类，它包含了各种各样的注解，如 `@Configuration、 @ComponentScan` 等。现在，我们却只需要 `@SpringBootApplication`，它是如何工作的？

原来 `@SpringBootApplication` 这个注解实际上包含了：

```
- @SpringBootConfiguration
  - @Configuration
- @EnableAutoConfiguration
  - @AutoConfigurationPackage
- @ComponentScan
```

所以，这一个注解相当于启动了自动配置和自动扫描。那么，她是 **如何实现自动配置和自动扫描的呢？**

### 自动扫描和配置

我们再观察 `pom.xml` ，它的内容如下：

```xml
<project ...>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.0.RELEASE</version>
    </parent>

    <modelVersion>4.0.0</modelVersion>
    <groupId>com.itranswarp.learnjava</groupId>
    <artifactId>springboot-hello</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <java.version>11</java.version>
        <pebble.version>3.1.2</pebble.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jdbc</artifactId>
        </dependency>

        <!-- 集成 Pebble View -->
        <dependency>
            <groupId>io.pebbletemplates</groupId>
            <artifactId>pebble-spring-boot-starter</artifactId>
            <version>${pebble.version}</version>
        </dependency>

        <!-- JDBC 驱动 -->
        <dependency>
            <groupId>org.hsqldb</groupId>
            <artifactId>hsqldb</artifactId>
        </dependency>
    </dependencies>
</project>

```

使用 Spring Boot 时，强烈推荐从 `spring-boot-starter-parent` 继承，它会引入 Spring Boot 的预置配置。

<div class="oh-essay">
按大佬说的做，别给自己找 trouble 😂
</div>

紧接着，我们引入了各种 `starter` 依赖，并且没有指定版本号，因为引入的 `<parent>` 内已经指定了，只有我们自己引入的某些第三方 jar 包需要指定版本号。

**`starter` 是个啥？**

> Spring Boot 将日常企业应用研发中的各种场景都抽取出来，做成一个个的 starter （启动器），starter 中整合了该场景下各种可能用到的依赖，用户只需要在 Maven 中引入 starter 依赖，SpringBoot 就能自动扫描到要加载的信息并启动相应的配置。

> starter 提供了大量的自动配置，让用户摆脱了处理各种依赖和配置项的困扰。所有这些 starter 都遵循着约定俗成的默认配置，并允许用户调整这些配置。

> 并不是所有的 starter 都是由 Spring Boot 官方提供的，也有部分 starter 是第三方技术厂商提供的，如 `druid-spring-boot-starter` 和 `mybatis-spring-boot-starter` 等等。

在启动时， Spring Boot 自动启动了嵌入式 Tomcat ，如数据源、声明式事务、jdbcTemplate 等 Bean 都是由 Spring Boot 自动创建 -- 通过 `AutoConfiguration`。

**在 starter 引入后，在启动时会自动扫描所有的 `XxxAutoConfiguration`** ，如，当我们引入  `spring-boot-starter-jdbc` 时，它自动扫描了如下：

- `DataSourceAutoConfiguration` ：自动创建一个 `DataSource` ，其中配置项从 `application.yml` 的 `spring.datasource` 中读取；
- `DataSourceTransactionManagerAutoConfiguration` ：自动创建了一个基于 JDBC 的事务管理器；
- `JdbcTemplateAutoConfiguration`：自动创建了一个 `JdbcTemplate` 。

因此，我们自动得到了一个 `DataSource`、一个 `DataSourceTransactionManager` 和一个 `JdbcTemplate` 。

Spring Boot 大量使用 `XxxAutoConfiguration` 来使得许多组件被自动化配置并创建。

**看， `XxxAutoConfiguration` 就是 Spring Boot 的魔力之源，许多事情这些自动配置类都帮我们做了，谢谢它们全家。**

## 点石成金

i.e. 打包 Spring Boot 应用

Spring Boot 自带了一个简单强大的 `spring-boot-maven-plugin` 插件用来打包，我们只需要在 `pom.xml` 中引入它即可。像这样：

```xml
<project ...>
    ...
    <build>
		<!-- 默认的项目名为 `项目名+版本号`，不喜欢可以通过 `finalName` 自定义 -->
		<!-- <finalName>awesome-app</finalName> -->

        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

无需使用配置，Spring Boot 的这款插件会自动定位应用程序的入口 Class ，我们只需要执行 `mvn clean package` 命令就可以打包了。

之后 ，在打包后的 `target` 目录下，可以看到一个 `springboot-exec-jar-1.0-SNAPSHOT.jar` 包，它包含了项目运行所需的所有依赖，可以直接运行：

```sh
java -jar springboot-exec-jar-1.0-SNAPSHOT.jar
```

这样，部署一个 Spring Boot 应用就非常简单，无需预安装任何服务器，只需要上传 jar 包即可。

## 结语

看 Spring Boot 很简单，让我们的工程实现也变得简单。我们在这里只涉及了基本的初步介绍，想要了解更多，去设计一个项目吧，只有在具体的问题中才能更好地了解“她”。