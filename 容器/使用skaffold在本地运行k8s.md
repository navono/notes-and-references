[Using Kubernetes for Local Development](https://nemethgergely.com/using-kubernetes-for-local-development/)

# Skaffold
- 检测变化。会自动检测源代码的变化，然后自动构建、推送、部署
- 自动更新镜像标签。这样就不需要手动更新`Kubernetes`的`manifest`文件
- 支持开发和生产环境。

# 环境准备
- [docker](https://docs.docker.com/install/#supported-platforms)
- [minikube](https://github.com/kubernetes/minikube/releases)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [skaffold](https://github.com/GoogleCloudPlatform/skaffold/releases)


# 使用 Windows Hyper-V
确保满足以下条件：
- Win10 Enterprise, Professional, or Education
- 64-bit Processor
- CPU support for VM Monitor Mode Extension
- Minimum of 4 GB memory

## 安装 Hyper-V
- 使用PowerShell开启Hyper-V
  管理者权限运行`PowerShell`：
  > Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All

- 使用 CMD 和 DISM 开启 Hyper-V
  管理者权限运行`PowerShell`：
  > DISM /Online /Enable-Feature /All /FeatureName:Microsoft-Hyper-V

- 在控制面板的`Windows功能`中开启Hyper-V

## 创建 virtual switch
具体参考[此链接](https://docs.microsoft.com/en-us/windows-server/virtualization/hyper-v/get-started/create-a-virtual-switch-for-hyper-v-virtual-machines)

## 环境变量
> 将用户下的 `.minikube`加入到环境变量，如果没有目录，则创建一个

## 启动
调试可用下面命令，会输出很详细的日志：
> minikube start --vm-driver="hyperv" --hyperv-virtual-switch="k8s" --v=7 --alsologtostderr

`--v=x`，x表示日志输出的等级，数字越高，日志越丰富越多。

正常的日志输出：
> minikube start --vm-driver="hyperv" --hyperv-virtual-switch="k8s" --v=3

## 注意事项
`minikube`依赖了`ssh`，在`Win10`环境下，可能会启动不成功，此时可是尝试在`git bash`环境下运行上述命令。

一直提示`SSH`错误，尝试以下方法：
1. Create an Virtual Switch in Hyper-V with the Connect Type set to "Internal network"; I named mine Minikube.
2. In Network Connections select your actual internet connect (Ethernet for me); right click > Properties.
3. On the Sharing tab tick "Allow other network users to connect through ..." and then select the virtual switch you created in step 1 ("vEthernet (Minikube)" in my case).
4. Delete any existing Minikube VMs in Hyper-v and delete the .minikube folder in your home folder.
5. Run (as an administrator) "minikube start --vm-driver=hyperv --hyperv-virtual-switch=Minikube"
This provides an internet connection and DHCP for the minikube VM.