<!-- TOC -->

- [Promise](#promise)
  - [`Promises/A+`规范](#promisesa规范)
  - [Promise化](#promise化)
  - [设计API是基于`callbakc`还是`Promise`](#设计api是基于callbakc还是promise)
- [Generators](#generators)
- [async\await](#async\await)

<!-- /TOC -->

# Promise
`promise`对象有几个状态：
- pending：异步操作尚未执行完成
- fullfilled：异步操作执行成功
- rejected：异步操作异常终止并且产生error
- settled：一旦对象进入`fullfilled`或者`rejected`状态，就被认为是`settled`


格式大概是这样的：
```js
promise.then([onFulfilled], [onRejected]);
```

![promise](./static/promise.png)

只要是在`onFulfilled()`和`onRejected()`函数中被调用，都是异步的，不管在其中执行了什么。


## `Promises/A+`规范
`Promises/A+`规范，实现此规范的库有：
- Bluebird
- Q
- RSVP
- Vow
- When.js
- ES2015 promises

`ES2015 promises` API：
- 构造函数
- `Promise`对象静态函数
  - Promise.resolve(obj)
  - Promise.reject(obj)
  - Promise.all(iterable)
  - Promise.race(iteral)
- 实例方法
  - promise.then(onFulfilled, onRejected)
  - promise.catch(onRejectd)


## Promise化
很多异步函数和库函数以及基于`callback`的方法都不是天生支持`promise`。因此需要做转换。在`util`库中，有个`promisify`方法，可以将方法转换为基于`promise`的。例如：

```js
const fs = require("fs");
const util = require("util");

// 如果要使用异步版本，`fs.readFile`则需要进行以下改造：
const readFile = util.promisify(fs.readFile);
```

或者自己编写一个简单的转换函数：
```js
module.exports.promisify = function(callbackBasedApi) {
  return function promisified() {
    const args = [].slice.call(arguments);
    return new Promise((resolve, reject) => {
      args.push((err, result) => {
        if (err) return reject(err);

        if (arguments.length <= 2) {
          resolve(result);
        } else {
          resolve([].silce.call(arguments, 1));
        }
      });

      callbackBasedApi.apply(null, args);
    })
  }
}

```


## 设计API是基于`callbakc`还是`Promise`
第一类就是基于`callback`；第二类就是基于`callback`但是同时又提供基于`Promise`。此类API会提供一个可选的`callback`参数，如果此参数填充了，那么API就基于`callback`，反之则是基于`Promise`。

```js
function asyncDivision(dividend, divisor, cb) {
  return new Promise((resolve, reject) => {

    process.nextTick(() => {
      const result = dividend / divisor;
      if (isNaN(result) || !Number.isFinite(result)) {
        const error = new Error(`Invalid operands`);
        if (cb) { cb(error); }
        return reject(error);
      }

      if (cb) { cb(null, result); }
      resolve(result);
    })
  })
}
```


# Generators

# async\await