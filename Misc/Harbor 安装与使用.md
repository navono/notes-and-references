## 安装

### 前提条件

- Ubuntu 1804
- Docker v2.0.3
- docker-compose v1.24.0

### 下载

从 `https://github.com/goharbor/harbor.git` 下载。如果安装环境无法连接外网，下载离线安装包；如果能连接外网，可以下载在线安装包。


### 修改配置

找到 `harbor.cfg` 文件，修改以下几个参数：

- hostname：运行 `Harbor` 的机器的IP，也可以是域名
- ui_url_protocol：http 或者 https。如果是 https，则需要设置证书

其他的选项可以默认（admin 账户的密码为：Harbor12345），修改好配置文件后，执行：

> sudo ./prepare

启动：

> docker-compose up -d

打开浏览器，输入 `localhost`，即可看到登录界面，输入 `admin` 账户与密码即可进入到主页面。


之后的每次修改，应该遵循操作流程：

1. docker-compose down -v
2. modify harbor.cfg
3. sudo ./prepare
4. docker-compose up -d


## LDAP

打开 `harbor.cfg`，找到 `auth_mod`，修改为 `ldap_auth`。重新执行以上的步骤。`admin` 登录，选择 `配置管理` 节点，在 `配置` 中选择 `认证模式`，与 `LDAP` 相关的选项都会显示在界面。


LDAP URL，即为 LDAP 服务器的地址，格式为：ldap://1.2.3.4:389；

搜索 DN，即用于去查询用户的账户名；

搜索密码，即上述账户的密码；

基础 DN，也就是基础的 Domain Name，这个得根据不同组织的结构，进行填写；

过滤器，可以为空；

用户 UID，如果使用账户名登录的，填入 sAMAccountName，其他的情况按照其他要求即可；

搜索范围，默认子树即可；

组基础 DN，一般填入 ou=Groups，剩下的 DC 根据实际的组织结构填写；

组过滤器，一般填入 (objectCategory=group)；

组 ID 属性，填入 cn；

组管理员 DN，按需填写，默认为空即可；

组搜索范围，默认子树即可；


填写完毕后，可以测试 LDAP 服务器。如果出错，可以根据日志进行相应的排查，日志路径为：/var/log/harbor。同时也可以根据第三方工具 `JXPlorer` 来排查 DN 是否有错（大部分情况都是 DN 的错误）。

设置完成后，在域内其他机器上即可使用域账户登录。


## 使用

### 配置

在客户端安装相应的 `Docker`，安装完成后，在设置中的 `Daemon` 节点，启用 `Advanced`，然后在 `insecure-registries` 中填入上面的 `Harbor` 服务器地址，如果 `harbor.cfg` 中的 `hostname` 是 IP 地址，那么此处也是 IP 地址，如果 `hostname` 填入的是域名，那么此处也填入域名，需要保持一致。最后的配置文件可能这样：

```json
{
  "registry-mirrors": [],
  "insecure-registries": [
    "harbor.rd.supcon.com"
  ],
  "debug": true,
  "experimental": true
}
```

同时确保相应的 `Proxies` 是正确的。

重启 `Docker`。

### 登录

在命令行工具中，登录到 `Harbor` 服务器：

> docker login harbor.rd.supcon.com -u xxx -p xxx

提示登录成功执行下一步

### 镜像推送

如果镜像要推送到 `library` 项目中，需要 `admin` 权限。个人的话，登录 `Harbor` 后，可新建 `Project`，建议以域账户的拼音为名。

先给本地镜像打标签：

> docker tag SOURCE_IMAGE[:TAG] harbor.rd.supcon.com/projectName/IMAGE[:TAG]

然后直接 puish 即可：

> docker push harbor.rd.supcon.com/projectName/IMAGE[:TAG]


拉取镜像也需要配置相应的路径。