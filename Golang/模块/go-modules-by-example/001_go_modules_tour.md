# 例子（Example）
注意：
- `Go` 版本必须 >= 1.11
- 操作目录必须在 `GOPATH` 下

# Hello, world
在 ` GOPATH/src/github.com` 的用户下创建：
```
$ mkdir hello
$ cd hello
```

然后增加一个名为 `hello.go` 的文件：
```
package main

import (
  "fmt"
  "rsc.io/quote"
)

func main() {
  fmt.Println(quote.Hello())
}
```

在工程目录下创建一个新的 `go.mod` ，然后再构建运行：
```
$ go mod init github.com/you/hello
go: creating new go.mod: module github.com/you/hello
$ go build
go: finding rsc.io/quote v1.5.2
go: downloading rsc.io/quote v1.5.2
go: finding rsc.io/sampler v1.3.0
go: finding golang.org/x/text v0.0.0-20170915032832-14c0d48ead0c
go: downloading rsc.io/sampler v1.3.0
go: downloading golang.org/x/text v0.0.0-20170915032832-14c0d48ead0c
$ ./hello
Hello, world.
```

注意到这里没有任何显示的 `go get` 要求。在运行 `go build` 的时候，如果文件中出现了未知的 `import` 的包，会在其相应的模块中查找，将其最新版作为一个依赖（ requirement ）加入到当前模块中。

```
$ cat go.mod
module github.com/you/hello

require rsc.io/quote v1.5.2
```

在 `go.mod` 更新后，再次 `build` 就不会再次解析 `import` ，去下载包，而是直接编译：
```
$ go build
$ ./hello
Hello, world.
```

即使 `rsc.io` 库升级到了 `v1.5.3` 或者 `v1.6.0` ，在此目录下构建依然使用 `v1.5.2` 的版本，除非手动升级。

`go.mod` 下包含的是最小化的依赖，意思就是它只表明当前模块的直接依赖。例如 `rsc.io` 还依赖了特定版本的 `src/sampler` 和 `golang.org/x/text` ，但
在 `go.mod` 却没有显示出来。

对于 `go build` 所依赖的所有模块，可以通过使用 `go list -m`：
```
$ go list -m
github.com/you/hello
```

至于一个 `hello world` 中为什么还包含了 `golang.org/x/text` ，那是因为 `rsc.io` 依赖了 `rsc.io/sampler` ，进而依赖 `golang/x/text` 用于多语言：
```
$ LANG=zh ./hello
你好，世界.
```

# 升级（Upgrading）
当新的模块在解析一个新的 `import` 导入时，`Oo` 总是采用最新的版本，在之前的 `rsc.io` 的例子中已经看到了。除了解析新的 `import` 导入是采用最新的版本，一旦版本号写入到 `go.mod` 后，就只会从此文件读取版本号。在 `rsc.io` 例子中，被此模块间接依赖的包：`golang/x/text` 和 `rsc.io/sampler` 都有新版本。使用 `-u` (updated) 可以检查模块是否有更新。
```
$ go list -m -u
github.com/you/hello
```

被列出来的模块表明其依赖存在更新，因此可能会需要更新，更新的方法是直接获取最新的包：
```
$ go get golang.org/x/text
go: finding golang.org/x/text v0.3.0
go: downloading golang.org/x/text v0.3.0
$ cat go.mod
module github.com/you/hello

require (
	golang.org/x/text v0.3.0 // indirect
	rsc.io/quote v1.5.2
)
```

# 降级（Downgrading）

# 排除（Excluding）

# 替代（Replacing）

# 向后兼容（Backwards Compatibility）

# What's Next?