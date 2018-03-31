# pod一直卡在 `ContainerCreating` 状态
使用
> kubectl describe pod NAME 

查看状态

# 部署
> kubectl run hello-minikube --image=k8s.gcr.io/echoserver:1.4 --port=8080

# 删除部署
> kubectl delete deployment hello-minikube

# 暴露服务
> kubectl expose deployment hello-minikube --type=NodePort

# 删除服务
> kubectl delete service hello-minikube

# 获取 pod 状态
> kubectl get pod
