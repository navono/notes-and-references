# Windows 配置 SSH
## 1.1. 安装 Git
安装完成后，设置全局的`Git`账户
> git config --global --list
> <br>git config --global user.name name
> <br>git config --global user.email email

## 1.2. 生成SSH key
使用的`email`地址要与`Git`全局配置的`email`地址（也就是`github`账户的地址）一致。
> ssh-keygen rsa -C "name@gmail.com"

后缀为`.pub`的是公钥，另一个不带后缀的是私钥。如果要生成多个，可取不同的名称。

## 1.3. 本地Agent添加私钥
`ssh-agnet`是本地的密钥管理器，运行`ssh-agent`后，使用`ssh-add`将私钥交给`ssh-agent`管理。

后台运行`ssh-agent`：
> eval $(ssh-agent -s)

追加私钥：
> ssh-add /path/to/id_rsa


如果出现`Could not open a connection to your authentication agent.`的话，杀掉老的
`ssh-agent`再重启一个。

## 1.4. git服务器添加公钥
将`.pub`文件的内容拷贝到`Github`账户中的设置（`SSH`）中。

## 1.5. 本地条件 config 文件
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
__注意上述`HostName`的`ssh`和`IdentityFile`的路径。__

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

## 1.6. 测试
> ssh -vT git@github.com