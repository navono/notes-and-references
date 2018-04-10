[grokking-v8-closure](https://mrale.ph/blog/2012/09/23/grokking-v8-closures-for-fun.html)

# Contexts
简单说，每个函数都会有一个`词法环境`。通过这个`词法环境`，函数才得以能够访问到变量。
```js
function makeF() {
  var x = 11;
  var y = 22;
  return function (what) {
    switch (what) {
      case "x": return x;
      case "y": return y;
    }
  }
}

var f = makeF();
f("x");
```

上述的`f`要能够访问到`x`和`y`，必定是有某种存储，用来存保存变量`x`和`y`的值，同时这个存储是和`f`相关联的。

`V8`是通过创建一个称之为`Context`的对象来附着到`闭包`（在`V8`内部以类`JSFunction`的实例呈现）上。`V8`是在进入`makeF`时才创建此对象的，而不是在闭包创建的时候。
![Contexts](./static/contexts.png)



