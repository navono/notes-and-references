<!-- TOC -->

- [依赖包安装](#依赖包安装)
- [babelrc文件](#babelrc文件)
- [webpack配置文件](#webpack配置文件)
- [`babel-polyfill`实例全局唯一](#babel-polyfill实例全局唯一)

<!-- /TOC -->

# 依赖包安装
- 安装`babel-plugin-transform-runtime`到`devDependencies`
- 安装`babel-polyfill`和`babel-runtime`到`dependencies`

# babelrc文件
```json
{
  "presets": [
    [ "env", {
      "modules": false,
      "useBuiltIns": true,
      "debug": true,
      "targets": {
        "browsers": ["last 2 versions"]
      }
    }],
    "react"
  ],
  "plugins": [
    "transform-runtime",
    "transform-object-rest-spread",
    "transform-class-properties",
    "react-hot-loader/babel",
    ["import", { 
      "libraryName": "antd", 
      "libraryDirectory": "es", 
      "style": true 
    }]
  ]
}
```

# webpack配置文件
在`entry`的数组中加入：`babel-polyfill`

# `babel-polyfill`实例全局唯一
因为`babel-polyfill`实例全局要求只能有一个，因此可能需要动态引入`babel-polyfill`。
```js
if (!global._babelPolyfill) {
  require("babel-polyfill");
}
```
