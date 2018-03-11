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
`Go`的`for`集合了类似C语言中的`for`和`while`功能。由三种形式：
```go
// Like a C for
for init; condition; post { }

// Like a C while
for condition { }

// Like a C for(;;)
for { }
```


# 函数
## 多返回值
## 命名的返回值
## Defer


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