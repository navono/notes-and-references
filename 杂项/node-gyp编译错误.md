# 编译使用`node-gyp`
- 安装`windows-build-tools`，管理员权限运行：
  > yarn global add --production windows-build-tools
  
  或者
  >npm install --global --production windows-build-tools
  
- 如果没有手动安装过Python则在上面一步自动安装Python后可能需要手动配置一下环境变量，Windows PowerShell或CMD中执行：
  > npm config set python python2.7
  
- 设置`msvs`版本
  > npm config set msvs_version 2015 --global
  