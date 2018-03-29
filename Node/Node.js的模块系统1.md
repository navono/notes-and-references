# 模块系统及其模式
模块是复杂系统的基础构成部分，它不仅使得应用更加高内聚低耦合，同时也隐藏了细节。

但是因为`JavaScript`缺乏命名空间，因此变量会自动挂载到全局作用域，这也就导致了作用域污染。解决这个问题有一种称之为`Revealing module pattern`的方式：
```js
const module = (() => {
  const privateFoo = () => {...};
  const privateBar = [];
  
  const exported = {
    publicFoo: () => {...},
    publicBar: () => {...}
  };
  
  return exported;
})();
console.log(module);
```

其实就是一个函数表达式，然后在其内部使用私有的变量，导出公共接口。

`CommonJS`是一个促进`JavaScript`生态标准化的一个组织，其他一个知名的提议就是`CommonJS modules`。`Node.js`的模块系统就是构建在其之上，同时附加了一些自定义的扩展。[isaacs说Node.js不在使用CommonJS](https://github.com/nodejs/node-v0.x-archive/issues/5132#issuecomment-15432598)了。

## 手工模块加载器
我们的目的是创建一个函数模拟全局的`require()`的一些功能（不是全部）。

先创建一个函数，它可以加载模块的内容，将其包装到一个私有作用域，然后进行`evaluate`：
```js
function loadModule(filename, module, require) {
  const wrappedSrc = `(function(module, exports, require) {
    ${fs.readFileSync(filename, "utf8")}
  })(module, module.exports, require)`;
  eval(wrappedSrc);
}
```

然后简单实现一个`require()`函数：
```js
const require(moduleName) => {
  console.log(`Require invoked for module: ${moduleName}`);
  const id = require.resolve(moduleName);
  if (require.cache[id]) {
    return require.cache[id].exports;
  }

  // module metadata
  const module = {
    exports: {},
    id: id
  };

  // Update the cache
  require.cache[id] = module;

  // load the module
  loadModule(id, module, require);

  // return exported variables
  return module.exports;
};

require.cache = {};
require.resolve = (moduleName) => {
  // resolve a full module id from the moduleName
};
```

上面的例子 __只是__ 为了演示`Node.js`中的模块系统内部是如何工作的。解释一下步骤：
1. 

所有模块内的遍历都是私有的。除了使用`modlue.exports`导出的。有一个特殊的变量，称之为`global`，赋值给此`global`的变量都会自动加入到全局作用域中。

## module.export vs. exports
`exports`是`module.exports`初始化值的引用，这在模块加载前只是一个简单的对象字面量。因此我们只能在`exports`引用的对象上增加属性：
```js
exports.hello = () => {
  console.log("hello");
}
```

所以对`exports`的值重新赋值并不会影响`mnodule.exports`的值。而`module.exports`可以导出`函数`、`实例`或者`变量`。

## require是同步的


## 模块解析算法


## 模块缓存


## 循环依赖
# 模块定义模式

- 命名导出
- 导出函数
- 导出构造函数
- 导出实例


## 修改其他模块或者全局作用域
