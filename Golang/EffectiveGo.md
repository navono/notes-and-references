[Effective Go](https://golang.org/doc/effective_go.html)
<!-- TOC -->

- [格式化](#格式化)
- [注释](#注释)
- [命名](#命名)
  - [包名称](#包名称)
  - [Getter](#getter)
  - [接口名称](#接口名称)
  - [大小写混合](#大小写混合)
- [分号](#分号)
- [流程控制](#流程控制)
  - [if](#if)
  - [for](#for)
  - [switch](#switch)
  - [Type switch](#type-switch)
- [函数](#函数)
  - [多返回值](#多返回值)
  - [命名的返回值](#命名的返回值)
  - [Defer](#defer)
- [数据](#数据)
  - [new](#new)
  - [构造函数和字面组合（composite literals）](#构造函数和字面组合composite-literals)
  - [make](#make)
  - [数组](#数组)
  - [Slices](#slices)
  - [二维slices](#二维slices)
  - [Map](#map)
  - [Printing](#printing)
  - [Append](#append)
- [初始化](#初始化)
  - [常量](#常量)
  - [变量](#变量)
  - [init函数](#init函数)
- [方法](#方法)
  - [指针 vs. 值](#指针-vs-值)
- [接口和其他类型](#接口和其他类型)
  - [接口](#接口)
  - [转换](#转换)
  - [接口转换和类型断言](#接口转换和类型断言)
  - [接口和方法](#接口和方法)
- [空白标识符](#空白标识符)
- [Embedding](#embedding)
- [并发](#并发)
- [Errors](#errors)
- [web服务器例子](#web服务器例子)

<!-- /TOC -->
# 格式化
使用`gofmt`工具，使得代码格式化更简单，更统一。比如：

```go
type T struct {
	name  string // name of the object
value int // its value
}
```
使用后：
```go
type T struct {
	name  string // name of the object
	value int    // its value
}
```
主要包括以下几点：
- 缩进
- 代码行长度
- 圆括号

# 注释
注释包括两种：
- C风格的 /**/
- C++风格的 //

一般每一个`包（package）`都应该由一个包注释，通常是C风格的。其他情况下大部分为C++风格的。包的每一个导出方法都应该写注释，说明其意图。同时最好是以导出方法的名字开始注释。

注释风格会直接影响`godoc`产生的文档的质量。

# 命名
命名在每门语言中都很重要。在`Go`中尤其如此。因为`Go`的包中的方法是否导出直接是与方法名的首字母大小写相关的。

## 包名称
通常情况下，包名称一般都是小写的，单字的，没必要使用下划线和大小混合的写法。

## Getter
`Go`没有自动支持`Getter`和`Setter`。如果有一个内部字段，名字为：`owner`，那么它的`Getter`名应该为`Owner`，而不是`GetOwner`；`Setter`名则是`SetOwner`。

```go
owner := obj.Owner()
if owner != user {
    obj.SetOwner(user)
}
```

## 接口名称
通常情况下，当方法的接口名称直接使用方法名加一个`er`的后缀或者类似的方法构造一个名词：`Reader`,`Writter`,`Formatter`等。

## 大小写混合
在`Go`中，一般不使用下划线，而是使用`MixedCaps`或`mixedCaps`风格。


# 分号
`Go`的语法解析器使用分号来区分语句，但是不是显示在源码中，而是词法分析器在扫描源码时，简单地自动在语句后面插入分号。

有一个情况需要注意的是，条件控制语句中，左花括号不能另起一行，如果另起一行，那么词法解析器会自动在上面一行增加分号，这就导致了错误。
正确写法：
```go
if i < f() {
    g()
}
```

错误写法：
```go
if i < f()  // wrong!
{           // wrong!
    g()
}
```

# 流程控制
`Go`中没有`do`或者`while`循环，只有一个通用的`for`，和更灵活的`switch`。`if`和`switch`接受一个像`for`一样的可选的初始化语句。`Go`中增加了一个类型`select`。

## if
`if`除了常用的用法外，还可以在接受初始化语句。比如
```go
if err := file.Chmod(0664); err != nil {
    log.Print(err)
    return err
}
```

## for
`Go`的`for`集合了类似C语言中的`for`和`while`功能。有三种形式：
```go
// Like a C for
for init; condition; post { }

// Like a C while
for condition { }

// Like a C for(;;)
for { }
```
`for`也可以作为数组的遍历。
```go
for pos, char := range "日本\x80語" { // \x80 is an illegal UTF-8 encoding
    fmt.Printf("character %#U starts at byte position %d\n", char, pos)
}
```

## switch
`Go`的`switch`比`C`的更灵活。它的表达式不需要是`常量`或者`整型`。

## Type switch
判断接口变量的动态类型，得到一个变量的类型使用关键字`type`。
```go
var t interface{}
t = functionOfSomeType()
switch t := t.(type) {
default:
    fmt.Printf("unexpected type %T\n", t)     // %T prints whatever type t has
case bool:
    fmt.Printf("boolean %t\n", t)             // t has type bool
case int:
    fmt.Printf("integer %d\n", t)             // t has type int
case *bool:
    fmt.Printf("pointer to boolean %t\n", *t) // t has type *bool
case *int:
    fmt.Printf("pointer to integer %d\n", *t) // t has type *int
}
```

# 函数
## 多返回值
`Go`的其中一个特性就是`函数`和`方法`可以返回多个值。这也就导致`Go`的`API`风格和其他语言有所区别。比如`File`的`Write`方法：
```go
func (file *File) Write(b []byte) (n int, err error)
```
上述方法返回已写入字节的数量以及出错时的错误变量。

## 命名的返回值
方法的参数没有强制规定要命名，但是也可以通过命名参数增强代码的可读性，同时命名的返回值的初始化和结果时绑定在这个变量名称上的。
```go
func ReadFull(r Reader, buf []byte) (n int, err error) {
    for len(buf) > 0 && err == nil {
        var nr int
        nr, err = r.Read(buf)
        n += nr
        buf = buf[nr:]
    }
    return
}
```

## Defer
对于被标记了`defer`的函数调用，都会被延迟执行，直到函数退出的时候。同时多个`defer`函数以`后进先出`的队列方式执行。
```go
for i := 0; i < 5; i++ {
    defer fmt.Printf("%d ", i)
}
```
以上会输出`4 3 2 1 0`。

这种方式的好处就是对于资源的管理。对资源的销毁动作调用加上`defer`，总能在函数退出的时候进行释放，而不用关心资源能否得到妥善的处理。

看一个有趣的例子：
```go
func trace(s string) string {
    fmt.Println("entering:", s)
    return s
}

func un(s string) {
    fmt.Println("leaving:", s)
}

func a() {
    defer un(trace("a"))
    fmt.Println("in a")
}

func b() {
    defer un(trace("b"))
    fmt.Println("in b")
    a()
}

func main() {
    b()
}
```
输出：
```go
entering: b
in b
entering: a
in a
leaving: a
leaving: b
```

# 数据
## new
## 构造函数和字面组合（composite literals）
## make
## 数组
## Slices
## 二维slices
## Map
## Printing
## Append


# 初始化
## 常量
## 变量
## init函数


# 方法
## 指针 vs. 值


# 接口和其他类型
## 接口
## 转换
## 接口转换和类型断言
## 接口和方法


# 空白标识符


# Embedding


# 并发


# Errors


# web服务器例子