[What is a Cloure](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36)
<!-- TOC -->

- [闭包](#闭包)
  - [函数是通过引用赋值的](#函数是通过引用赋值的)
  - [作用域由生命周期](#作用域由生命周期)
  - [闭包的生命周期横跨多个作用域](#闭包的生命周期横跨多个作用域)
  - [不要混淆闭包与作用域](#不要混淆闭包与作用域)
  - [闭包可以读写访问](#闭包可以读写访问)
  - [闭包可以共享作用域](#闭包可以共享作用域)
  - [函数式编程中的应用](#函数式编程中的应用)
  - [Application](#application)
  - [Partial Application](#partial-application)
  - [最后小试验](#最后小试验)

<!-- /TOC -->

# 闭包
Q：解释下JavaScript中的闭包（Closure）

A：JavaScript中的任意一个函数都是一个闭包。闭包和`函数作用域（Function Scopes）`有点类似。从定义上来说，`闭包`就是一个函数和其引用的状态（词法环境）的组合，换句话说，`闭包`使得一个内部函数访问外部函数作用域的能力。`闭包`是在函数创建的时候被创建，而不是在执行的时候。
   
## 函数是通过引用赋值的
```js
function sayHello() {
  console.log('hello');
};
var func = sayHello;
```
`func`是`sayHello`的一个引用
   
## 作用域由生命周期
函数每次被执行都会创建一个新的作用域

## 闭包的生命周期横跨多个作用域
闭包是在函数定义的时候被创建的。闭包包含了函数定义时可以访问的所有一切，包括函数的作用域，以及所有嵌套的作用域和全局作用域。
```js
var G = 'G';
// Define a function and create a closure
function functionA() {
  var A = 'A'
  
  // Define a function and create a closure
  function functionB() {
  var B = 'B'
  console.log(A, B, G);
  }
  
  functionB();  // prints A, B, G
  // functionB closure does not get discarded
  A = 42;
  functionB();  // prints 42, B, G
}
functionA();
```
`functionB`能访问`functionA`和全局的作用域，并且对变量都是引用访问。

## 不要混淆闭包与作用域
用例子来说明
```js
// scope: global
var a = 1;
void function one() {
  // scope: one
  // closure: [one, global]
  var b = 2;
  
  void function two() {
    // scope: two
    // closure: [two, one, global]
    var c = 3;
    
    void function three() {
      // scope: three
      // closure: [three, two, one, global]
      var d = 4;
      console.log(a + b + c + d); // prints 10
    }();
  }();  
}();
```
简单来说，函数作用域的范围限定在函数体内，而闭包则是包括了声明函数的父函数，直到全局作用域，也就是可以访问的作用域。

稍微复杂点的：
```js
var v = 1;
var f1 = function () {
  console.log(v);
}
var f2 = function() {
  var v = 2;
  f1(); // Will this print 1 or 2?
};
f2();
```
记住最重要的一点：__闭包是在函数声明时创建的__ 即可，也就是说它是`静态`的。最新的`ECMA`标准中，称其为`词法作用域`，这有别于其他语言的`动态作用域`。

## 闭包可以读写访问
因为闭包访问变量都是通过引用的，因此对变量可以进行读写。

## 闭包可以共享作用域
在函数定义时，闭包就创建了，同时还可以访问嵌套的作用域。当在同一个作用域内定义多个函数时，此作用域在多个闭包间共享。最好的例子就是全局作用域在多有的闭包间共享。

## 函数式编程中的应用
经常用于` partial application`和` currying`。
## Application
将函数作为参数传入，然后产生一个返回值。

## Partial Application
简单来说就是，将多参数的函数作为参数，返回一个更少参数的函数。这个也称之为`柯里化(currying)`。

## 最后小试验
下面的例子输出什么
```js
let a = 1;

const function1 = function() {
  console.log(a);
  a = 2;
}

a = 3;

const function2 = function() {
  console.log(a);
}

function1();
function2();
```
