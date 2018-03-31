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

`require`是同步的，但是曾经出现过`异步require`，后来删除了。


## 模块解析算法
`npm`根据模块的加载目录，从此目录加载不同的模块版本。因为每个模块依赖都会有自己的`node_modules`目录，下面存放的仅仅只是本模块的依赖包。

这个算法主要是针对`resolve`函数，它接收一个字符串，返回一个这个模块的全路径。模块名称解析算法主要分三个分支：
- 文件模块（File modules）。以`/`开始代表的是绝对路径；以`./`开始代表的是相对路径
- Node.js核心模块（Core modules）。没有以`/`或`./`开头的，算法首先试图从核心的Node.js模块查找
- 包模块（Package modules）。如果在核心模块中没有查找到，那么会继续从本目录下的`node_modules`目录下查找，如果没有查到到会逐层直到根目录。


对于`文件模块`和`包模块`，单个文件和目录都可能匹配到`moduleName`，它会尝试用以下规则取匹配：
- <moduleName>.js
- <moduleName>/index.js
- 在`package.json`的`main`属性中指定的文件/文件名


举个例子说明`Node.js`如何解决`dependency hell`问题。假设我们有以下结构的目录：

myApp
|---- foo.js
|---- node_modules
      |
      |---- depA
      |     |____ index.js
      |---- depB
      |     |---- bar.js
      |     |____ node_modules
      |           |---- depA
      |                 |____ index.js
      |---- depC
      |     |---- foobar.js
      |     |____ node_modules
      |           |____ depA
      |                 |____ index.js
      |


`myApp`、`depB`、`depC`都依赖于`depA`，但是它们每一个都有自已私有版本的依赖包。同时在不同文件使用`require(depA)`时，路径解析算法都会正确解析到相应的模块路径。比如：
- 从`/myApp/foo.js`调用`require("depA")`将会加载`/myApp/node_modules/depA/index.js`
- 从`/myApp/node_moudles/depB/bar.js`调用`require("depA")`将会加载`/myApp/node_modules/depB/node_modules/depA/index.js`
- 从`/myApp/node_moudles/depC/foobar.js`调用`require("depA")`将会加载`/myApp/node_modules/depC/node_modules/depA/index.js`


## 模块缓存


## 循环依赖
# 模块定义模式

- 命名导出
- 导出函数
- 导出构造函数
- 导出实例


## 修改其他模块或者全局作用域
