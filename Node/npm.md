# 知识点
- npm 版本
- 初始化
  <br>`yarn init`
- 包查找
  https://npms.io
- 版本
  <br>一般在安装时，`npm`会默认在包版本前带上`^`前缀。表明在下次使用`yarn`或者`npm install`时。会自动更新最新的`patch`版本。使用`yarn outdated`可以发现目前工程以来的包是否是最新的。
  <br>__SemVer__。分三部分：
  MAJOR.MINOR.PATCH。
    1. MAJOR版本指的是会产生不兼容的API
    2. MINOR版指的是增加新特性，新功能，但是向后兼容
    3. PATCH版指的是向后兼容的bug修改。
- 包的开发
  <br>可以使用`yarn link`来在全局包文件夹下创建一个本地开发版本的软连接，这样就可以在其他工程中使用，比如`yarn link package-name`。
- 包发布
  <br>优点：
    1. 解决一个特定的问题
    2. 多项目共享一个功能代码
- License
  <br>https://choosealicense.com/