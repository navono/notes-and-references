<!-- TOC -->

- [回调模式](#回调模式)
  - [CPS - Continuation-Passing Style](#cps---continuation-passing-style)
    - [同步CPS](#同步cps)
    - [异步CPS](#异步cps)
    - [非CPS风格的回调](#非cps风格的回调)
  - [同步还是异步](#同步还是异步)
    - [不可预测](#不可预测)
    - [[Unleashing Zalgo](http://blog.izs.me/post/59142742143/designing-apis-for-asynchrony)](#unleashing-zalgohttpblogizsmepost59142742143designing-apis-for-asynchrony)
    - [延时执行](#延时执行)
  - [Node.js的回调惯例](#nodejs的回调惯例)
- [观察者模式（Event Emitter）](#观察者模式event-emitter)

<!-- /TOC -->

# 回调模式
`回调`是`Reactor模式`中handler的具化。另外一个实现`回调`的方式是`闭包`。

## CPS - Continuation-Passing Style
在`JavaScript`中，`回调`会被当做参数传递给一个函数，之后执行完的结果会通过`调用回调`来通知最初的操作发起方。在`FP`中，这种传递结果的方式称之为`Continuation-Passing Style (CPS)`。这是个通用的概念，简单来说就是操作结果不直接返回给调用方，而是通过调用另外一个函数（回调）来传递。

### 同步CPS
普通的函数，通常会通过`return`将结果返回给调用方：
```js
function add(a, b) {
  return a + b;
}
```

同等的`CPS`风格就是调用一个回调参数，然后将结果传递给这个回调：
```js
function add(a, b, callback) {
  callback(a + b);
}
```
上述的`add`就是一个同步的CPS函数。它只有在`callbakc`执行完才会把控制权交还给调用方。

```js
console.log('before');
add(1, 2, result => console.log('Result: ' + result));
console.log('after');
```
输出：
```
before
Result: 3
after
```

### 异步CPS
如果将上述例子改成异步CPS，只需要在调用`callback`改成异步即可。
```js
function addAsync(a, b, callback) {
  setTimeout(() => callback(a + b), 100);
}
```

测试代码：
```js
console.log('before');
addAsync(1, 2, result => console.log('Result: ' + result));
console.log('after');
```
输出：
```
before
after
Result: 3
```

`setTimeout`会触发一个异步操作，它不会等待回调执行完毕而是直接将控制权交还给调用方。这个和`Event Loop`在用户执行完回调后，会重新获取控制权一样，这样接下来的事件才能够被处理。

下图是上面`addAsync`的整个流程：
![async-CPS](./static/async-CPS.PNG)


### 非CPS风格的回调
这个其实就是`map`之类的操作。
```js
const result = [1,2,3].map(ele => ele - 1);
console.log(result);  // [0,1,2]
```

## 同步还是异步
一般来说，设计API时应该尽量避免不一致性。因为这会给后期的问题排查带来很大的困难以及不可重现。

### 不可预测
```js
const fs = require('fs');
const cache = {};
function inconsistentRead(filename, callback) {
  if(cache[filename]) {
      //invoked synchronously
      callback(cache[filename]);
    } else {
    //asynchronous function
    fs.readFile(filename, 'utf8', (err, data) => {
      cache[filename] = data;
      callback(data);
    });
  }
}
```
上面的函数不可预测是因为，同样的参数，不同时机调用，内部的实现是不同的。

### [Unleashing Zalgo](http://blog.izs.me/post/59142742143/designing-apis-for-asynchrony)

代码参照`unleashingZalgo.js`。返现第二次根本没有输出。原因是：
- 在创建`reader1`的时候，因为没有缓存，所以会调用异步的读文件API，因此此时会直接将控制权交还给调用方，因此调用方有时间注册回调函数。在读操作完成后，会指另一个`Event Loop`循环中执行回调。
- 当创建`reader2`时，此时以及存在缓存，因此没有执行异步操作，而是直接同步调用到回调。因此`reader2`的所有`listener`都会被同步调用，然而我们是在创建`reader2`之后才进行的`listener`注册，这就导致了所有的`listener`都没有被调用。

要解决这个问题其实只要保持调用的一致性即可。比如使用同步的`readFileSync`。改变API的调用风格会直到API的使用者的代码风格也要改变。使用同步API存在以下几个问题：
- 有些特定功能可能不支持同步API
- 同步API会阻塞`Event Loop`，这会导致并发的请求被阻塞，也就导致了程序整体性能的下降。

### 延时执行
另外一种方案就是全部异步改造。在这个问题上将回调的调用时机延后即可，也就是不要在同一个`Event Loop`中调用回调，可以使用`process.nextTick()`达到将回调延时到后面一个`Event Loop`循环执行。另外一个能达到同样效果的API就是`setImmediate()`。

但是`process.nextTick()`和`setImmediate()`的语义完全不同。`process.nextTick()`的回调会在所有`I/O事件`前被调用；而`setImmediate()`的回调则时在所有的`I/O事件`（如果队列中存在的话）之后被调用。

因此递归使用`process.nextTick()`，会导致`I/O`饥饿现象，因为`I/O事件`一直得不到执行。

## Node.js的回调惯例
在`Node.js`中的`CPS`风格的`API`和`回调`都遵循一组特定的惯例。这不仅体现在`Node.js`的核心模块中，用户的代码应该也尽量保持一致。

- callback总是在API的最后面
- 错误总是在回调的最前面
- 错误传播（Propagating errors）
  > 通过第二条规则向上传递

```js
const fs = require('fs');
function readJSON(filename, callback) {
  fs.readFile(filename, 'utf8', (err, data) => {
    let parsed;
    if(err)
    //propagate the error and exit the current function
    return callback(err);
    try {
      //parse the file contents
      parsed = JSON.parse(data);
    } catch(err) {
      //catch parsing errors
      return callback(err);
    }
    //no errors, propagate just the data
    callback(null, parsed);
  });
};
```
- 未捕获的异常
  > 如果在异步的回调中发生了`Throw`，那么这个异常会直接进入到`Event Loop`而不是传递到上层（因为调用回调的控制权是在`Event Loop`）。这直接的后果就是进程异常退出。因此在异步的回调中，对可能会发生异常的调用一定要使用`try...catch`来捕获异常，同时向上传播。

  > 对于在`Event Loop`中发生的异常，`Node.js`提供了一个特殊的事件用来全局捕获，`uncaughtException`，如果发生了异常，这个事件会在进程退出前被触发。


# 观察者模式（Event Emitter）
