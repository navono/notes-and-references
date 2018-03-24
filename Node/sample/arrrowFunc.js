function DelayedGreeter(name) {
  this.name = name;
}

DelayedGreeter.prototype.greet = function () {
  console.log("parent of setTimeout in normall cb: ", this);
  setTimeout( function cb() {
    console.log("setTimeout in normall cb: ", this);
    console.log("Hello " + this.name);
  }, 500);
};

// 箭头函数是绑定其词法上下文的。意思就是说，箭头函数内的 `this` 和其上一层代码块是一样的
DelayedGreeter.prototype.greet2 = function () {
  console.log("parent of setTimeout in arrow func cb: ", this);
  setTimeout( () => {
    console.log("setTimeout in arrow func cb: ", this);
    console.log("Hello " + this.name);
  }, 500
)};

const greeter = new DelayedGreeter("World");
greeter.greet();  // will print "Hello undefined"
greeter.greet2();
