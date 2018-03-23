# 最初的最初
实现`EventEmitter`接口，利用回调。但是回调并不意味这异步调用，调用回调可以是同步，也可以是异步。比如以下代码（一个设计不好的函数，因为从设计风格上说，传入的回调要不全是同步调用，要不全是异步调用，混用会导致不一致）：
```js
function fileSize (fileName, cb) {
  if (typeof fileName !== 'string') {
    return cb(new TypeError('argument should be string')); // 同步
  }
  fs.stat(fileName, (err, stats) => {
    if (err) { return cb(err); } // 异步
    cb(null, stats.size); // 异步
  });
}
```
异步调用回调的例子：
```js
const readFileAsArray = function(file, cb) {
  fs.readFile(file, function(err, data) {
    if (err) {
      return cb(err);
    }
    const lines = data.toString().trim().split('\n');
    cb(null, lines);
  });
};
```
这样使用：
```js
readFileAsArray('./numbers.txt', (err, lines) => {
  if (err) throw err;
  const numbers = lines.map(Number);
  const oddNumbers = numbers.filter(n => n%2 === 1);
  console.log('Odd numbers count:', oddNumbers.length);
});
```

一般来说，回调函数是`error first`的风格。也就是第一个参数是错误码，第二个参数是负载。

# 中世界JavaScript的异步（Promise）
`Promise`可以看作是回调的替代。`Promise`对象一般处理`成功`和`失败`场景，同时允许链式调用。

上述同样的`readFileAsArray`，如果是`Promise`风格：
```js
readFileAsArray('./numbers.txt')
  .then(lines => {
    const numbers = lines.map(Number);
    const oddNumbers = numbers.filter(n => n%2 === 1);
    console.log('Odd numbers count:', oddNumbers.length);
  })
  .catch(console.error);
```

那么对应的，就应该对`readFileAsArray`做相应的修改：
```js
const readFileAsArray = function(file, cb = () => {}) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, function(err, data) {
      if (err) {
        reject(err);
        return cb(err);
      }
      const lines = data.toString().trim().split('\n');
      resolve(lines);
      cb(null, lines);
    });
  });
};
```
`cb`有个默认值。


# 现代JavaScript的异步（async/await）

# Task Queue

# Event Loop