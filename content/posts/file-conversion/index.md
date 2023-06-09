---
title: 'File Conversion'
date: 2020-11-26T09:40:28+08:00
draft: false
categories: [JavaScript]
tags: []
---

JavaScript 中的 file、blob 和 base64 。

<!--more-->

## Blob[1]

Blob 对象表示一个不可变、原始数据的 *_类文件对象* ，它的数据可以按文本或二进制的格式进行读取，也可以转换成 `ReadableStream` 来用于数据操作。

Blob 表示的不一定是 JavaScript 原生格式的数据。 `File` 接口基于 Blob，继承了 blob 的功能并将其扩展，使其支持用户系统上的文件。

要从其他非 blob 对象和数据构造一个 Blob ，请使用 `Blob()` 函数；要创建一个 blob 数据的子集 blob ，请使用 `slice()` 方法；要获取用户文件系统上的文件对应的 Blob 对象，请参阅 `File` 文档。

接受 Blob 对象的 API 也被列在 `File` 文档中。

*_1. Blob() 构造函数*

`Blob()` 构造函数允许通过其它对象创建 Blob 对象，比如，用字符串构建一个 blob ：

```js
var obj = { name: 'Jack Liu' };
var blob = new Blob([JSON.stringify(obj)], { type: 'application/json' });
```

*_2. 使用 Blob 创建一个指向类型化数组的 URL*

```js
var typeArray = GetTheTypedArraySomehow();
// 传入一个合适的 MIME 类型
var blob = new Blob([typeArray.buffer], { type: 'application/octet-stream' });
var url = URL.creatObjectURL(blob);
// 会产生一个类似 blob:d3958f5c-0777-0845-9dcf-2cb28783acaf 这样的 URL 字符串
// 你可以像使用普通的 URL 那样使用它，比如用在 img.src 上
```

*_3. 从 Blob 中提取数据*

一种从 Blob 中读取内容的方法是使用 `FileReader` ，以下代码将 Blob 的内容作为类型数组读取：

```js
var reader = new FileReader();
reader.addEventListener('loadend', function () {
    // reader.result 包含被转化为类型数组 typed array 的 blob
});
reader.readAsArrayBuffer(blob);
```

另一种读取 Blob 中内容的方式是使用 Response 对象，下述代码将 Blob 中的内容读取为文本：

```js
var text = await new Response(blob).text();
```

通过使用 `FileReader` 的其它方法可以把 Blob 读取为字符串或者数据 URL 。

## File[2]

文件（ `File` ）接口提供有关文件的信息，并允许网页中的 JavaScript 访问其内容。

通常情况下，File 对象是来自用户在一个 `<input>` 元素上选择文件后返回的 `FileList` 对象，也可以是来自由拖放操作生成的 `DataTransfer` 对象，或者来自 `HTMLCanvasElement` 上的 `mozGetAsFile()` API 。

File 对象是特殊类型的 `Blob` ，且可以用在任意的 Blob 类型的 context 中。比如说， `FileReader, URL.createObjectURL(), createImageBitmap()` 及 `XMLHttpRequest.send()` 都能处理 Blob 和 File 。

## Base64[3]

Base64 是一组相似的二进制到文本（binary-to-text）的 *_编码规则* ，使得二进制数据在解释成 radix-64 的表现形式后能够用 ASCII 字符串的格式表示出来。

*=Base64 这个词出自一种 MIME 数据传输编码。*

Base64 编码普遍应用于需要通过被设计为处理文本数据的媒介上储存和传输二进制数据而需要编码该二进制数据的场景，这样是为了保证数据的完整并且不用在传输过程中修改这些数据。

在 JavaScript 中，有两个函数被分别用来解码和编码 base64 字符串： `atob()` 和 `btoa()` 。

`atob()` 函数能够解码通过 base-64 编码的字符串数据，相反地， `btoa()` 函数能够从二进制数据字符串创建一个 base-64 编码的 ASCII 字符串。

```js
// atob() 将 base64 解码
// btoa() 将 字符串转码为 base64
var str = 'javascript';
window.btoa(str); // 转码 → amF2YXNjcmlwdA==
window.atob('amF2YXNjcmlwdA=='); // 解码 → javascript

// 中方需要先用 encodeURIComponent 和 decodeURIComponent 转/解码
```

*_编码尺寸增加* ，每一个 Base64 字符串实际上代表着 6 比特位，因此，3 字节（1 字节是 8 比特，3 字节为 24 比特）的字符串/二进制文件可以转换成 4 个 Base64 字符（4 \* 6 = 24 比特）。

这意味着 Base64 格式的字符串或文件的尺寸是原始尺寸的 133% ，如果编码的数据很少，增加的比例可能会更高。

*=是不是有些混乱？Hmm... 来看下百度百科吧。*

> Base64 要求把每三个 8bit 的字节转换为四个 6bit 的字节（`3*8 = 4*6 = 24`），然后把 6bit 再添加两位高位 0 ，组成四个 8bit 的字节，也就是说，转换后的字符串理论上将要比原来的长 1/3 。

其具规则如下[5]：

```
1. 把 3 个字节变成 4 个字节
2. 每 76 个字符加一个换行符
3. 最后的结束符也要处理
```

下面来看一个具体的例子。

```
转换前： 10101101,10111010,01110110
等价于：   101011   01,1011   1010,01  110110
转换后： 00101011,00011011 ,00101001,00110110
十进制： 43       27        41       54

对照 =Table 1: The Base64 Alphabet= 码表：
         r        b         p        2
```

如上，上面的 24 位编码后的 Base64 值为 `rbp2` 。解码同理，把 `rbp2` 的二进制位连接上再重组得到的 8 位值，得出原码。

## FormData

FormData 接口提供了一种表示表单数据的键值 `key/value` 的构造方式，并且可以轻松地将数据通过 `XMLHttpRequest.send()` 方法发送出去。如果送出时的编码类型被设为 `multipart/form-data` ，它会使用和表单一样的格式。

实现了 FormData 接口的对象可以直接在 `for...of` 结构中使用，而不需要调用 `entries()` ： `for(var p of myFormData)` 的作用和 `for(var p of myFormData.entries())` 是相同的。

`FormData()` 构造函数用来创建一个新的 FormData 对象。

*=有时候，这种“参考书式的定义”真的让人很……*

*_FormData 有会么用呢？*

FormData 类型是在 XMLHttpRequest 2 级定义的，它是为序列化表单以及创建与表单格式相同的数据提供便利（用于 XHR 传输）。

*_1. 序列化表单*

将 form 表单元素的 `name` 与 `value` 进行组合，实现表单数据的序列化，从而减少表单元素的拼接，提高工作效率。

```html
<form id="myForm" method="post" action="">
    <input name="name" type="text" value="jack" />
    <input name="pswd" type="password" value="12345678" />
    <input type="submit" value="提交" />
</form>
```

我们可以使用这个表单元素作为初始化参数，来实例化一个 FormData 对象。

```js
// 1. 获取页面已有的一个 form 表单
var myForm = document.getElementById('myForm');
// 2. 用表单来初始化
var formData = new FormData(form);

// 我们可以根据 name 来访问表单中的字段
var name = formData.get('name'); // → jack
var pswd = formData.get('pswd'); // → 12345678

// 当然，我们也可以在此基础上添加其他数据
formData.append('token', 'fajskd.fj23jkf.sdfk');

// 你还可以通过 xhr 来发送数据
var xhr = new XMLHttpRequest();
xhr.open('post', 'http://127.0.0.1/login');
xhr.setHeader('Content-Type', 'application/x-www-form-urlencoded'); // ?? 此处存疑
xhr.send(formData);
xhr.onload = function () {
    if (xhr.status === 200) {
        // ...
    }
};
```

*_2. 直接创建一个 FormData 对象*

使用 `FormData` 构造函数可以直接创建一个 FormData 对象，如： `var formData = new FormData()` ，然后，就可以调用相关方法进行操作。

*_3. 常用方法*

*=无非是“增删查改”那些事儿……*

| 方法                 | 描述                                                                               |
|----------------------|----------------------------------------------------------------------------------|
| `append(key, value)` | 向 FormData 中添加新的属性值，对应的属性值存在也不会覆盖                            |
| `get(key)`           | 返回在 FormData 对象中与给定键关联的第一个值                                       |
| `getAll(key)`        | 返回一个包含 FormData 对象中与给定键关联的所有值的数组                             |
| `has(key)`           | 返回一个布尔值表明 FormData 对象是否包含某些键                                     |
| `set(key, value)`    | 给 FormData 设置属性值，如果 FormData 对应的属性值存在则覆盖原值，否则新增一项属性值 |
| `entries`            | 返回一个包含所有键值对的 iterator 对象                                             |
| `keys`               | 返回一个包含所有键的 iterator 对象                                                 |
| `values`             | 返回一个包含所有值的 iterator 对象                                                 |
| `delete(key)`        | 从 FormData 对象里面删除一个键值对                                                 |

## 转换[4]

### fileToBase64

主要应用场景：图片预览。

```js
function fileToBase64(file, callback) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
        var base64 = e.target.result;

        if (typeof callback === 'function') {
            callback(base64);
        } else {
            console.log('base64: ', base64);
        }
    };
}
```

### fileToBlob

主要应用场景：文件上传。

```js
function fileToBlob(file, callback) {
    var type = file.type;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
        var blob = new Blob([e.target.result], { type });

        if (typeof callback === 'function') {
            callback(blob);
        } else {
            console.log('blob: ', blob);
            return blob;
        }
    };
}
```

### base64ToFile

主要应用场景：文件上传。

```js
function base64ToFile(base64, callback(fileName)) {
	var arr = base64.split(','),
		type = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Unit8Array(n)

	while(n--) {
		u8arr[n] = bstr.charCodeAt(n)
	}

	return new File([u8arr], fileName, {type})
}
```

### base64ToBlob

主要应用场景：文件上传。

```js
//dataURL 类似为 data:img/jpg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2w...
function base64ToBlob(base64, callback) {
    var arr = base64.split(','),
        // mimeString
        type = arr[0].match(/:(.*?);/)[1],
        // byteString
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    // for (var i = 0; i < byteString.length; i++) {
    //     ia[i] = byteString.charCodeAt(i)
    // }

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type });
}
```

### blobToFile

主要应用场景：文件上传。

```js
function blobToFile(blob, fileName) {
    var file = new File([blob], fileName, { type: blob.type });
    return file;
}
```

### blobToBase64

主要应用场景：图片预览。

```js
function blobToBase64(blob, callback) {
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function (e) {
        if (typeof callback === 'function') {
            callback(e.target.result);
        } else {
            console.log('base64: ', e.target.result);
            return e.target.result;
        }
    };
}
```


[5]: https://baike.baidu.com/item/base64/8545775?fr=aladdin

[1]: https://developer.mozilla.org/zh-CN/docs/Web/API/Blob

[2]: https://developer.mozilla.org/zh-CN/docs/Web/API/File

[3]: https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/Base64_encoding_and_decoding

[4]: https://blog.csdn.net/baymaxcsdn/article/details/108077233
