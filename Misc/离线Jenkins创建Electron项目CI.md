# Electron工程
因为`CI`平台是离线的，因此在工程里新建一个`ci`分支，在联网的机器中，下载所有依赖库，然后在此分支中上传所有`node_modules`文件。因为在`build`的过程中还需要`electron`和`electron-builder`的支持，因此需要将联网环境下更新的上述两个包的缓存拷贝至`CI`平台的用户目录下，具体目录为：
> C:\Users\USER\AppData\Local\electron
>
> C:\Users\USER\AppData\Local\electron-builder


# 安装`Jenkins`与插件
## 服务配置
基于`Windows`平台的服务方式安装的`2.121.2`版本。同时在系统服务中找到`Jenkins`服务，在`登录`选项中选择`此账户`，然后使用登录`Windows`的账户信息，重启服务。

这一步非常重要，目的是让在`Jenkins`中运行的`Windows Shell`能够读取我们第一步拷贝到此用户的下`electron`和`electron-builder`的缓存，否则会去联网下载，而目前`CI`机器是内网，所有会导致构建失败。

## 插件安装
[下载插件](http://updates.jenkins-ci.org/download/plugins/)

包括`GitLab`, `gitlab-hook`, `publish-over-ftp`等一系列需要用到的插件。在`系统管理` -> `插件管理`中的`高级`中进行安装。

## 配置环境
### ftp
安装完`publish-over-ftp`插件后，在`系统管理` -> `系统设置`中配置`FTP`服务器信息。

### build Timestamp
开启`BUILD_TIMESTAMP`选项

# 配置Job
为`electron`工程生成一个`job`，同时在`electron`工程的`Git`设置中，开启`Web Hooks`。在构建后，可以将构建后的文件上传到`ftp`服务器。可以将`Remote directory`设置为一下格式：
> 'upload/ProjectName/'yyyy-MM-dd_${BUILD_NUMBER}
