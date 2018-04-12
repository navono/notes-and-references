- let and const
# arrow function
1. 不需要`function`关键字
2. 捕捉词法环境的`this`
3. 捕捉词法环境的`arguments`

简单理解就是创建了一个自动捕获`this`的`闭包`。

```js
function Person(age) {
  this.age = age;
  this.growOld = function() {
    // 此处的 `this` 会根据调用 `growOld` 的词法环境(调用的上下文环境)而变化
    this.age++;
  }

  // 修改方法1
  var self = this;
  this.growOld2 = function() {
    // 此时会将 `growOld2` 的父作用域保存起来
    self.age++;
  }

  // 修改方法2
  this.growOld3 = () => {
    this.age++;
  }
}
var person = new Person(1);

// 因为这里将 `person.growOld` 作为回调传入，因此在执行时，它的 caller 是 Event Loop。而它的词法环境的 `this` 指的就是 `window`(浏览器环境)
setTimeout(person.growOld,1000);

setTimeout(function() { console.log(person.age); },2000); // 1, should have been 2
```

- class
- object literals
- Map and Set
- WeakMap and WeakSet
- Template literals
- Default fuction parameters
- Rest parameters
- Spread operator
- Destructuring
- new.target
- Proxy
- Reflect
- Symbols
