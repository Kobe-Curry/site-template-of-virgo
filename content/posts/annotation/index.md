---
title: "注解"
date: 2022-07-05T10:00:17+08:00
draft: false
categories: [Java]
tags: [Spring]
card: false
---

🔔 以下内容主要摘录自 [廖雪峰老师的博客](https://www.liaoxuefeng.com/wiki/1252599548343744/1255945389098144)，具体示例请跳到原文参考。

<!--more-->

<img src="/posts/annotation/imgs/1.jpg" width="" style="float: ;" />

*=好吧，廖老师配图一直可以的。* 

## 注解是什么

注解是什么呢？它和注释有什么区别？

> 注解定义后也是一种 `class` ，所有的注解都继承自 `java.lang.annotaion.Annotation` 。 OK，我们先看看注解是做什么用的，再来了解如何定义和使用它。

注解是放在 Java 源码的类、方法、字段、参数前的一种特殊的“注释”（注意并不是注释），是一种用做标注的“元数据”。如，我们日常使用的 `@Override` 就是一种注解。

从 JVM 的角度看，注解本身对代码逻辑没有任何影响，如何使用注解完全由工具决定。

<div class="oh-essay">
其实这里的意思时，注解的作用取决于你是如何定义注解和使用注解的方法的。注解，就像是你在代码的某个位置放的一个钩子，至于如何使用它，则完全由你决定。
</div>

Java 的注解可以分为三类：
1. 由编译器使用的注解；
2. 由工具处理 `.class` 文件使用的注解；
3. 在程序运行运行期能够读取的注解。

第一类，编译器使用的注解，如 `@Override` 让编译器检查该方法是否正确地实现了覆写， `@SuppressWarnings` 告诉编译器忽略此处代码产生的警告等。这类注解不会被编译进入 `.class` 文件，它们在编译后就被编译器扔掉了。（😿）

第二类，由工具处理 `.class` 文件使用的注解，比如有些工具会在加载 class 的时候，对 class 做动态修改，以实现一些特殊的功能。这类注解会被编译进入 `.class` 文件，但在类加载结束后并不会存在于内存中（使命已经完成了，仅作用于 class）。它只被一些底层库使用，一般不必我们自己处理。

第三类，在程序运行期能够读取的注解，这类注解在加载后一起存在于 JVM（内存中啦） 中（因为要在运行期读取啦 😏），这也是最常用的注解。

OK，了解了注解是什么，有什么用之后 ，让我们来看一下如何定义一个注解吧。

## 定义注解

Java 语言使用 `@interface` 语法来定义注解，它的格式如下：

```java
public @interface Report {
	int type() default 0;			// default 后就是默认值
	String level() default "info";
	String value() default "";
}
```

> 注解定义后也是一种 class，所有的注解都继承自 `java.lang.annotation.Annotation` 。

不难看出，在定义一个注解时，还可以定义配置参数。需要注意的是，配置参数必须是常量，在定义注解时就已经确定了每个参数的值（可以有默认值）。

*大部分注解会有一个名为 `value` 的配置参数，对此参数赋值，可以只写常量，相当于省略了 `value` 参数。

**有一些注解可以修饰其他注解 -- 元注解（meta annotation）。**

这里，我们只了解两个常用的元注解： `@Target` 和 `@Retention` 。

**`@Target`**

最常用的元注解是 `@Target` ，它用来定义 Annotation 能够被应用于源码的哪些位置：
- 类或接口： `ElementType.TYPE` ；
- 字段： `ElementType.FIELD` ；
- 方法： `ElementType.METHOD` ；
- 构造方法： `ElementType.CONSTRUCTOR` ；
- 方法参数： `ElementType.PARAMETER` 。

实际上 `@Target` 定义的 `value` 是 `ElementType[]` 数组，只有一个元素时，可以省略数组的写法。

**`@Retention`**

`@Retention` 定义了 Annotation 的生命周期：
- 仅编译器（译后即丢）： `RetentionPolicy.SOURCE` ；
- 仅 class （不入 JVM）文件： `RetentionPolicy.CLASS` ；
- 运行期（加载进 JVM，供程序读取）： `RetentionPolicy.RUNTIME` 。

如果 `@Retention` 不存在，则该 Annotation 默认为 `CLASS`，但其实通常我们自定义的 Annotation 都是 `RUNTIME` ，所以 **务必要加上 `@Retention(RetentionPolicy.RUNTIME)` 这个元注解。**

OK，我们来总结一下定义 Annotation 的步骤：
1. 用 `@interface` 定义注解；
2. 添加参数、默认值（把最常用的参数定义为 `value()` ，方便使用时直接写常量）；
3. 用元注解配置注解。

<div class="oh-essay">
一直走在偷懒的路上，永不停歇……
</div>

如这样：

```java
@Target(ElementType.TYPE)				// 3
@Retention(RetentionPolicy.RUNTIME)
public @interface Report {				// 1
    int type() default 0;				// 2
    String level() default "info";
    String value() default "";
}
```

## 处理注解

在日常生产环境中，我们基本上只需编写和使用 `RUNTIME` 类型的注解，所以我们只讨论它。前面已经说过，该类型注解是加载进 JVM 供程序读取的，那么如何读取呢？**反射 API！**

使用反射 API 读取 Annotation：

- `Class.getAnnotation(Class)` ；
- `Field.getAnnotation(Class)` ；
- `Method.getAnnotation(Class)` ；
- `Constructor.getAnnotation(Class)` ；

如：

```java
// 获取 Person 定义的@Report 注解：
Report report = Person.class.getAnnotation(Report.class);
int type = report.type();
String level = report.level();
```

如果读取时，Annotation 不存在，则返回 `null` 。

……

注意，定义了注解，本身对程序逻辑没有任何影响。我们必须自己编写代码来使用注解，**检查逻辑完全是我们自己编写的，JVM 不会自动给注解添加任何额外的逻辑。**

## 应用注解

> 这时我们概览一下注解在 Web 开发中的常见应用形式。

### 在 Servlet 中的应用

在 JavaEE 平台上，处理 TCP 连接，解析 HTTP 协议这些底层工作统统扔给现成的 Web 服务器去做。我们使用 Servlet API 编写自己的 Servlet 来处理 Http 请求，Web 服务器实现 Servlet API 接口，实现底层功能：

```
                 ┌───────────┐
                 │My Servlet │
                 ├───────────┤
                 │Servlet API│
┌───────┐  HTTP  ├───────────┤
│Browser│<──────>│Web Server │
└───────┘        └───────────┘
```

注解在 Servlet 中如何应用呢？它有什么作用呢？

<u>1. @WebServlet</u>

我们知道，一个 Servlet 总是继承自 `HttpServlet` ，然后覆写 `doGet()` 或 `doPost()` 方法。如何知道客户端的请求地址呢？早期的 Servlet 使用 `web.xml` 文件来配置映射路径，现在我们使用注解 `@WebServlet` 来实现。如下：

```java
// WebServlet 注解表示这是一个 Servlet ，并映射到地址 /hello:
@WebServlet(urlPatterns = "/hello")
public class HelloServlet extends HttpServlet {
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        // 设置响应类型：
        resp.setContentType("text/html");
        // 获取输出流：
        PrintWriter pw = resp.getWriter();
        // 写入响应：
        pw.write("<h1>Hello, world!</h1>");
        // 最后不要忘记 flush 强制输出：
        pw.flush();
    }
}
```

浏览器发出的 HTTP 请求总是由 Web Server 先接收，然后，根据 Servlet 配置的映射，不同的路径转发到不同的 Servlet 。

<u>2. @WebFilter</u>

在一个复杂的 Web 应用程序中，通常有很多 URL 映射，对应的，也会有多个 Servlet 来处理 URL 。为了把一些公用逻辑从各个 Servlet 中抽离出来，JavaEE 的 Servlet 规范还提供了一种 Filter 组件，即过滤器。它的作用是，在 HTTP 请求到达 Servlet 之前，可以被一个或多个 Filter 预处理，类似打印日志、登录检查等逻辑，完全可以放到 Filter 中。

使用也很简单，来看一段示例：

```java
// 用 @WebFilter 注解标注该 Filter 需要过滤的 URL ，这里的 /* 表示所有路径
@WebFilter(urlPatterns = "/*")
public class EncodingFilter implements Filter {
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        System.out.println("EncodingFilter:doFilter");
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        chain.doFilter(request, response);
    }
}
```

<u>3. @WebListener</u>

除了 Servlet 和 Filter 外，JaveEE 的 Servlet 规范还提供了第三种组件 - Listener （监听器） 。

有好几种 Listener ，其中最常用的是 `ServletContextListener` ，我们来编写一个实现该接口的类，如下：

```java
@WebListener
public class AppListener implements ServletContextListener {
    // 在此初始化 WebApp, 例如打开数据库连接池等：
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("WebApp initialized.");
    }

    // 在此清理 WebApp, 例如关闭数据库连接池等：
    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("WebApp destroyed.");
    }
}
```

任何标注为 `@WebListener` ，且实现了特定接口的类会被 Web 服务器自动初始化。

<div class="oh-essay">
看，我们有钩子了 🥰
</div>

一个 Web 服务器可以运行一个或多个 WebApp，对于每个 WebApp ，Web 服务器都会为其创建一个全局唯一的 `ServletContext` 实例，我们在上例中编写的两个回调方法实际上对应的就是 `ServletContext` 实例的创建和销毁。

### 在 Spring 中的应用

我们知道 Spring 的核心就是提供了一个 IoC 窗口，它可以管理所有轻量级的 JavaBean 组件。起初，Spring 也使用类似 XML 这样的配置文件，来描述 Bean 的依赖关系，然后让容器来创建并装配 Bean 。然而，这种方式虽然直观，写起来却很繁琐。

<u>1. @Component 和 @Autowired</u>

现在，我们可以使用 Annotation 来注解，让 Spring 自动扫描 Bean 并组装它们。如：

```java
@Component
class MailService {
    ...
}

@Component
public class UserService {
	@Autowired
	MailService mailService;

	// ...
}
```

如上，这个 `@Component` 注解就相当于定义了一个 Bean ，它有一个可选的名称，默认是 `mailService` 、`userService` （小写开头的类名）。

`@Autowired` 则相当于把指定类型的 Bean 注入到指定的字段中。它不但可以写在 `set()` 方法上，还可以直接写在字段上，甚至可以写在构造方法中。

<u>2. @Configuration 和 @ComponentScan</u>

要启动一个 Spring 应用，我们需要编写一个类启动容器，如下：

```java
@Configuration
@ComponentScan
public class AppConfig {
    public static void main(String[] args) {
        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        UserService userService = context.getBean(UserService.class);
        User user = userService.login("bob@example.com", "password");
        System.out.println(user.getName());
    }
}
```

其中， `@Configuration` 表示 `AppConfig.class` 是一个配置类，在创建 `ApplicationContext` 时，使用的实现类是 `AnnotationConfigApplicationContext` ，必须传入一个标注了 `@Configuration` 的类名。

`@ComponentScan` 则告诉容器，自动搜索当前类所在的包以及子包，把所有标注为 `@Component` 的 Bean 自动创建出来，并根据 `@Autowired` 进行装配。

<div class="oh-essay">
看，Ioc 容器其实啥都不知道，你需要用 Annotation 告诉它，做什么、怎么做、在哪做。
</div>

使用 `@ComponentScan` 很方便，但是，我们也要特别注意包的层次结构。通常来说，启动配置类位于自定义的顶层包，其他 Bean 按类别放入子包。

思考一下，如何创建并配置一个第三方 Bean 呢？它并不在当前可搜索的包中！

<u>3. @Bean</u>

如果一个 Bean 不在我们自己的 package 管理之内，例如 `ZoneId` ，如何创建它？我们只需要在 `@Configuration` 配置类中编写一个 Java 方法（该方法使用 `@Bean` 注解）创建并返回它。

```java
@Configuration
@ComponentScan
public class AppConfig {
    // 创建一个 Bean:
    @Bean
    ZoneId createZoneId() {
        return ZoneId.of("Z");
    }
}
```

<u>4. @PropertySource</u>

在开发应用程序时，经常需要读取配置文件，最常用的配置方法是以 `key=value` 的形式写在 `*.properties` 文件中。 Spring 提供了一个简单的 `@PropertySource` 来自动读取配置文件，只需要在配置类上再添加一个注解。

```java
@Configuration
@ComponentScan
@PropertySource("app.properties") // 表示读取 classpath 的 app.properties
public class AppConfig {
    @Value("${app.zone:Z}")
    String zoneId;

    @Bean
    ZoneId createZoneId() {
        return ZoneId.of(zoneId);
    }
}
```

如上，Spring 容器看到 `@PropertySource("app.properties")` 注解后，就会自动读取这个配置文件，然后，我们使用 `@Value` 正常注入。

<u>5. @Profile 和 @Conditional</u>

创建某个 Bean 时，Spring 容器可以根据注解 `@Profile` 来决定是否创建，除此之外，也可以根据 `@Conditional` 来决定。

<div class="oh-essay">
其实，还有其他的一些，blablabla…… 因为，Spring boot 提供了更好的，所以，我们在实际工作中并不怎么一些“老旧”的注解了。
</div>

<u>6. @Aspect 和 @EnableAspectJAutoProxy</u>

当 Spring 的 IoC 容器看到 `@EnableAspectJAutoProxy` 这个注解，就会自动查找带有 `@Aspect` 的 Bean，然后根据每个方法的 `@Before、@Around` 等注解把 AOP 注入到特定的 Bean 中。

---

<u>7. @EnableTransactionManagement 和 @Transactional</u>

Spring 提供了一个 `PlatformTransactionManager` 来表示事务管理器，所有的事务都由它负责管理。使用编程的方式使用 Spring 事务仍然比较繁琐，更好的方式是通过声明式事务来实现。

使用声明式事务非常简单，除了在配置类中追加一个定义的 `PlatformTransactionManager` 外，再添加一个 `@EnableTransactionManagement` 就可启用声明式事务。

```java
@Configuration
@ComponentScan
@EnableTransactionManagement // 启用声明式
@PropertySource("jdbc.properties")
public class AppConfig {
    // ...
}
```

然后，对需要事务支持的方法，加一个 `@Transactional` 注解。也可以直接加在 Bean 的 `class` 处，它表示其所有 `public` 方法都具有事务支持。

> Spring 对一个声明式事务的方法开启事务支持的原理，仍然是 AOP 代理，取了通过自动创建 Bean 的 Proxy 实现。

### 在 Spring MVC 中的应用

> 我们知道，Spring 提供的是一个 IoC 容器，所有的 Bean 都在该容器中被初始化。而 Servlet 容器由 JavaEE 服务器人提供（如 Tomcat）, Servlet 容器对 Spring 一无所知，它们之间依靠什么进行联系？又是以何种顺序初始化的呢？
> 详细答案请参考 [如何关联 Servlet 和 Spring](https://www.liaoxuefeng.com/wiki/1252599548343744/1282383921807393) 。

只需要在配置类上加上 `@EnableWebMVC` 注意，就激活了 Spring MVC 。

```java
// Controller 使用@Controller 标记而不是@Component:
@Controller
public class UserController {
    // 正常使用 @Autowired 注入：
    @Autowired
    UserService userService;

    // 处理一个 URL 映射：
    @GetMapping("/")
    public ModelAndView index() {
        ...
    }
    ...
}
```

这里，我们需要注意， Controller 使用 `@Controller` 标记，而不是 `@Component` 。（很明显，前者针对 Coontroller 做了一些增强）。

好的，现在我们来回答一下开始的问题 - 如何关联 Servlet 和 Spring ？

Spring MVC 提供了一个 `DispatcherServlet` 类，我们只需在 `web.xml` 中配置它。

```xml
<!DOCTYPE web-app PUBLIC
 "-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN"
 "http://java.sun.com/dtd/web-app_2_3.dtd" >

<web-app>
    <servlet>
        <servlet-name>dispatcher</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextClass</param-name>
            <param-value>org.springframework.web.context.support.AnnotationConfigWebApplicationContext</param-value>
        </init-param>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>com.itranswarp.learnjava.AppConfig</param-value>
        </init-param>
        <load-on-startup>0</load-on-startup>
    </servlet>

    <servlet-mapping>
        <servlet-name>dispatcher</servlet-name>
        <url-pattern>/*</url-pattern>
    </servlet-mapping>
</web-app>
```

Servlet 容器会首先初始化 `DispatcherServlet` ，在 `DispatcherServlet` 启动时，根据配置类 `AppConfig` 创建一个类型是 `WebApplicationContext` 的 IoC 容器，完成所有 Bean 的初始化，并将该容器绑到 `ServletContext` 上。

如此， `DispatcherServlet` 持有 IoC 容器，自然就可以从 IoC 容器中获取所有的 `@Controller` 的 Bean ，在接收到 HTTP 请求后，根据 Controller 方法配置的路径转发到指定方法，并根据返回的 `ModelAndView` 决定如何渲染页面。

最后，在配置类 `AppConfig` 中通过 `main()` 方法启动嵌入式 Tomcat 即可。

<u>1. @Controller</u>

该注解用来标识当前 Bean 是一个 Controller 。Spring MVC 对 Controller 没有固定的要求，也不需要实现特定的接口，只需要在 Controller 类中，编写对应的方法处理相应的请求路径就可以了。

<u>2. @GetMapping、@PostMapping、@RequestParam</u>

```java
@Controller
public class UserController {
	// ...

	@PostMapping("/signin")
	public ModelAndView doSignin(
		@RequestParam("email") String email,
		@RequestParam("password") String password,
		HttpSession session) {
			// ...
		}
	}
}
```

一个方法对应一个 HTTP 请求路径，用 `@GetMapping` 或 `@PostMapping` 表示 GET 或 POST 请求。

需要接收的 HTTP 参数以 `@RequestParam()` 标注。

<u>2. @RestController</u>

直接用 Spring 的 Controller 配合一大堆注解写 REST 太麻烦了，因此，Spring 额外提供了一个 `@RestController` 注解，使用它注解 Controller，每个方法自动变成 API 接口方法。

```java
@RestController
@RequestMapping("/api")
public class ApiController {
    @Autowired
    UserService userService;

    @GetMapping("/users")				// 实际为 /api/users，下同
    public List<User> users() {
        return userService.getUsers();
    }

    @GetMapping("/users/{id}")
    public User user(@PathVariable("id") long id) {
        return userService.getUserById(id);
    }

    @PostMapping("/signin")
    public Map<String, Object> signin(@RequestBody SignInRequest signinRequest) {
        try {
            User user = userService.signin(signinRequest.email, signinRequest.password);
            return Map.of("user", user);
        } catch (Exception e) {
            return Map.of("error", "SIGNIN_FAILED", "message", e.getMessage());
        }
    }

    public static class SignInRequest {
        public String email;
        public String password;
    }
}
```

如此，编写 REST 接口只需要定义 ｀＠RestController` ，然后每个方法都是一个 API 接口，输入和输出只要能被 Jackson 序列化或反序列化为 JSON 就没有问题。

<u>3. @CrossOrigin</u>

……

### 在 Spring Boot 中的应用

Spring Boot 是什么？了解 [她](../spring-boot/) 。

<u>1. @SpringBootApplication</u>

Spring Boot 要求 `main()` 方法所在的启动类必须放到 package 下，命名不作要求。启动 Spring Boot 应用程序只需要一行代码加上一个注解 `@SpringBootApplication` 即可。

```java
@SpringBootApplication
public class Application {
    public static void main(String[] args) throws Exception {
        SpringApplication.run(Application.class, args);
    }
}
```

<div class="oh-essay">
还要啥自行车，直接飞起了 🚀
</div>

<u>2. @ConditionalOnXxx</u>

Spring 本身提供了条件装配 `@Conditional`，但是要自己编写比较复杂的 Condition 来做判断，比较麻烦。Spring Boot 则为我们准备好了几个非常有用的条件，如：
- `@ConditionalOnProperty` ：如果有指定的配置，条件生效；
- `@ConditionalOnBean` ：如果有指定的 Bean，条件生效；
- `@ConditionalOnMissingBean` ：如果没有指定的 Bean，条件生效；
- `@ConditionalOnMissingClass` ：如果没有指定的 Class，条件生效；
- `@ConditionalOnWebApplication` ：在 Web 环境中条件生效；
- `@ConditionalOnExpression` ：根据表达式判断条件是否生效。

……