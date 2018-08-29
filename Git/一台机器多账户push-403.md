# push 403 error
在一台机器上，拥有多个账户时，非`global`的账户在`clone`项目后，提交到仓库时，提示`403`错误。

## 解决办法
编辑项目的`.git`的`config`文件，将
>[remote "origin"]
	url = http://192.168.200.100/test/test2.git
	fetch = +refs/heads/*:refs/remotes/origin/*

修改为：
>[remote "origin"]
	url = http://test:1234@192.168.200.100/test/test2.git
	fetch = +refs/heads/*:refs/remotes/origin/*

也就是在`url`前加上`username:passwd@`即可。
