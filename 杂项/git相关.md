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
