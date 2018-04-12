<!-- TOC -->

- [git仓库迁移](#git仓库迁移)
- [Windows 配置 SSH](#windows-配置-ssh)
  - [安装 Git](#安装-git)
  - [生成SSH key](#生成ssh-key)
  - [本地Agent添加私钥](#本地agent添加私钥)
  - [git服务器添加公钥](#git服务器添加公钥)
  - [本地条件 config 文件](#本地条件-config-文件)
  - [测试](#测试)

<!-- /TOC -->

# git仓库迁移
1. 从原地址克隆一份裸版本库，比如原本托管于 GitHub。
> git clone --bare git://github.com/username/project.git

--bare 创建的克隆版本库都不包含工作区，直接就是版本库的内容，这样的版本库称为裸版本库。

2. 然后到新的 Git 服务器上创建一个新项目，比如 Gitea。

3. 以镜像推送的方式上传代码到 GitCafe 服务器上。
> cd project.git
> <br>git push --mirror git@gitcafe.com/username/newproject.git

-- mirror 克隆出来的裸版本对上游版本库进行了注册，这样可以在裸版本库中使用git fetch命令和上游版本库进行持续同步。

4. 删除本地代码
> cd ..
> <br>rm -rf project.git

5. 到新服务器 Gitea 上找到 Clone 地址，直接 Clone 到本地就可以了。
> git clone git@gitcafe.com/username/newproject.git

这种方式保留了原版本库中的所有内容。

# Windows 配置 SSH
## 安装 Git
安装完成后，设置全局的`Git`账户
> git config --global --list
> git config --global user.name name
> git config --global user.email email

## 生成SSH key
使用的`email`地址要与`Git`全局配置的`email`地址（也就是`github`账户的地址）一致。
> ssh-keygen rsa -C "name@gmail.com"

后缀为`.pub`的是公钥，另一个不带后缀的是私钥。如果要生成多个，可取不同的名称。

## 本地Agent添加私钥
`ssh-agnet`是本地的密钥管理器，运行`ssh-agent`后，使用`ssh-add`将私钥交给`ssh-agent`管理。

后台运行`ssh-agent`：
> eval $(ssh-agent -s)

追加私钥：
> ssh-add /path/to/id_rsa


如果出现`Could not open a connection to your authentication agent.`的话，杀掉老的
`ssh-agent`再重启一个。

## git服务器添加公钥
将`.pub`文件的内容拷贝到`Github`账户中的设置（`SSH`）中。

## 本地条件 config 文件
内容：
```json
# github
Host github.com
HostName ssh.github.com
Port 443
PreferredAuthentications publickey
IdentityFile C:\\Users\\zen\\.ssh\\id_rsa
User navono
```
__注意上述`HostName`的`ssh`。__

`config`文件也可以配置多个地址，比如类似下面这种：
```json
# gitlab
Host gitool.glanway.com
HostName gitool.glanway.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_gitlab
User yangjie

# github
Host github.com
HostName ssh.github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_github
User yangjie
```

## 测试
> ssh -vT git@github.com