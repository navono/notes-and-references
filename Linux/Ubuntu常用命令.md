# 1. 查看内核信息
> uname -a

# 2. 查看磁盘信息
> df -h

# 3. 修改root密码
> sudo passwd root

# 4. 增加用户
> useradd --create-home a

修改密码：
> passwd a

# 5. 给用户增加`sudo`权限
进入 root 账户，对`sudoers`增加写权限
> chmod u+w /etc/sudoers

编辑`sudoers`文件
>vim /etc/sudoers

在文件中的 
> ## Allow root to run any commands anywhere
>  root    ALL=(ALL:ALL)       ALL

下增加相应的用户，格式和`root`一样

删除写权限
> chmod u-w /etc/sudoers

