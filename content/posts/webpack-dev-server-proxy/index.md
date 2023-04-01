---
title: "Webpack Dev Server Proxy"
date: 2020-11-02T09:10:08+08:00
draft: false
categories: [JavaScript]
tags: []
---


🔔 转载自 [详解Webpack-dev-server的proxy用法](https://www.cnblogs.com/liuguiqian/p/11362211.html) ，了解更多[1]

解决开发环境的跨域问题(不用在去配置nginx和host, 爽歪歪~~)

*注：F12 查看网络请求路径，还是原来的，所以只能从效果上去观察是否正确代理了。

<!--more-->

## 基本用法

```js
module.exports = {
	//...
	devServer: {
		proxy: {
			'/api': 'http://localhost:3000'
		}
	}
};

// 请求到 `/api/xxx` 现在会被代理到请求 http://localhost:3000/api/xxx ，
// 例如 `/api/user` 现在会被代理到请求 http://localhost:3000/api/user
```

## 代理多个路径

```js
module.exports = {
	//...
	devServer: {
		proxy: [{
			context: ['/auth', '/api'],
			target: 'http://localhost:3000',
		}]
	}
};

// 如果你想要代码多个路径代理到同一个 `target` 下，
// 你可以使用由一个或多个「具有 `context` 属性的对象」构成的数组
```

## 忽略API前缀

```js
module.exports = {
	//...
	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				pathRewrite: {'^/api' : ''}
			}
		}
	}
};

// 请求到 `/api/xxx` 现在会被代理到请求 http://localhost:3000/xxx ，
// 例如 `/api/user` 现在会被代理到请求 http://localhost:3000/user
```

## 忽略https安全提示

```js
module.exports = {
	//...
	devServer: {
		proxy: {
			'/api': {
				target: 'https://other-server.example.com',
				secure: false
			}
		}
	}
};

// 默认情况下，不接受运行在 HTTPS 上，且使用了无效证书的后端服务器。
// 如果你想要接受，只要设置 `secure: false` 就行。
```

## 自定义规则

```js
module.exports = {
	//...
	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				bypass: function(req, res, proxyOptions) {
					if (req.headers.accept.indexOf('html') !== -1) {
						console.log('Skipping proxy for browser request.');
						return '/index.html';
					}
				}
			}
		}
	}
};

// 有时你不想代理所有的请求，可以基于一个函数的返回值绕过代理。
// 在函数中你可以访问请求体、响应体和代理选项，必须返回 false 或路径，来跳过代理请求。

// 例如：对于浏览器请求，你想要提供一个 HTML 页面，但是对于 API 请求则保持代理。
```

## 跨域

```js
module.exports = {
	//...
	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				changeOrigin: true,
			}
		}
	}
};

// 上面的参数列表中有一个 `changeOrigin` 参数, 是一个布尔值,
// 设置为 `true`, 本地就会虚拟一个服务器接收你的请求并代你发送该请求
```

## 配置多个规则：Vue-cli中 `proxyTable` 配置接口

```js
module.exports = {
	dev: {
		// 静态资源文件夹
		assetsSubDirectory: 'static',
		// 发布路径
		assetsPublicPath: '/',

		// 代理配置表，在这里可以配置特定的请求代理到对应的API接口
		// 使用方法：https://vuejs-templates.github.io/webpack/proxy.html
		proxyTable: {
			// 例如将'localhost:8080/api/xxx'代理到'https://wangyaxing.cn/api/xxx'
			'/api': {
				target: 'https://wangyaxing.cn', // 接口的域名
				secure: false,                   // 如果是https接口，需要配置这个参数
				changeOrigin: true,              // 如果接口跨域，需要进行这个参数配置
			},
			// 例如将'localhost:8080/img/xxx'代理到'https://cdn.wangyaxing.cn/xxx'
			'/img': {
				target: 'https://cdn.wangyaxing.cn', // 接口的域名
				secure: false,                       // 如果是https接口，需要配置这个参数
				changeOrigin: true,                  // 如果接口跨域，需要进行这个参数配置
				pathRewrite: {'^/img': ''}           // pathRewrite 来重写地址，将前缀 '/api' 转为 '/'。
			}
		},
		// Various Dev Server settings
		host: 'localhost', // can be overwritten by process.env.HOST
		port: 4200,        // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
	}
}
```

## 更多参数

```
dev-server 使用了非常强大的http-proxy-middleware ,
http-proxy-middleware 基于 http-proxy 实现的，
可以查看 http-proxy 的源码和文档：https://github.com/nodejitsu/node-http-proxy。

- target：要使用url模块解析的url字符串
- forward：要使用url模块解析的url字符串
- agent：要传递给 http(s)s.request 的对象（请参阅 Node 的 https 代理和 http 代理对象）
- ssl：要传递给 https.createServer() 的对象
- ws：true / false，是否代理 websockets
- xfwd：true / false，添加 x-forward 标头
- secure：true / false，是否验证 SSL Certs
- toProxy：true / false，传递绝对URL作为路径（对代理代理很有用）
- prependPath：true / false，默认值：true - 指定是否要将目标的路径添加到代理路径
- ignorePath：true / false，默认值：false - 指定是否要忽略传入请求的代理路径（注意：如果需要，您必须附加/手动）
- localAddress：要为传出连接绑定的本地接口字符串
- changeOrigin：true / false，默认值：false - 将主机标头的原点更改为目标 URL
```

## vue-element-admin分析代码

```js
// 环境变量:VUE_APP_BASE_API = '/dev-api'
// 发送的请求:127.0.0.1/dev-api/login

proxy: {
	// change dev-api/login => /login
	// detail: https://cli.vuejs.org/config/#devserver-proxy
	[process.env.VUE_APP_BASE_API]: {
		target: `https://my.baidu.com`,
		changeOrigin: true,
		pathRewrite: {
			['^' + process.env.VUE_APP_BASE_API]: ''
		}
	}
},
```



[1]: https://blog.csdn.net/guzhao593/article/details/81516135
