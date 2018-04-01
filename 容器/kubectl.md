# Cluster Introspection
>kubectl get services                    # List all services 
><br>kubectl get pods                    # List all pods
><br>kubectl get nodes -w                # Watch nodes continuously
><br>kubectl version                     # Get version information
><br>kubectl cluster-info                # Get cluster information
><br>kubectl config view                 # Get the configuration
><br>kubectl describe node <node>        # Output information about a node

# Pod and Container Introspection
>kubectl get pods                         # List the current pods
><br>kubectl describe pod <name>              # Describe pod <name>
><br>kubectl get rc                           # List the replication controllers
><br>kubectl get rc --namespace="<namespace>" # List the replication controllers in <namespace>
><br>kubectl describe rc <name>               # Describe replication controller <name>
><br>kubectl get svc                          # List the services
><br>kubectl describe svc <name>              # Describe service <name>

# Interacting with Pods
>kubectl run <name> --image=<image-name>                             # Launch a pod called <name> using image <image-name>
><br>kubectl create -f <manifest.yaml>                               # Create a service described in <manifest.yaml>
><br>kubectl scale --replicas=<count> rc <name>                     # Scale replication controller <name> to <count> instances
><br>kubectl expose rc <name> --port=<external> --target-port=<internal> # Map port <external> to port <internal> on replication controller <name>

# Stopping Kubernetes
>kubectl delete pod <name>                                         # Delete pod <name>
><br>kubectl delete rc <name>                                          # Delete replication controller <name>
><br>kubectl delete svc <name>                                         # Delete service <name>
><br>kubectl drain <n> --delete-local-data --force --ignore-daemonsets # Stop all pods on <n>
><br>kubectl delete node <name>                                        # Remove <node> from the cluster

# Debugging
>kubectl exec <service> <command> [-c <$container>] # execute <command> on <service>, optionally selecting container <$container>
><br>kubectl logs -f <name> [-c <$container>]           # Get logs from service <name>, optionally selecting container <$container>
 
watch -n 2 cat /var/log/kublet.log                 # Watch the Kublet logs
><br>kubectl top node                                   # Show metrics for nodes
><br>kubectl top pod                                    # Show metrics for pods

# Administration
>kubeadm init                                              # Initialize your master node
><br>kubeadm join --token <token> <master-ip>:<master-port>    # Join a node to your Kubernetes cluster
><br>kubectl create namespace <namespace>                      # Create namespace <name>
><br>kubectl taint nodes --all node-role.kubernetes.io/master- # Allow Kubernetes master nodes to run pods
><br>kubeadm reset                                             # Reset current state
><br>kubectl get secrets                                       # List all secrets

 每个命令都会有一定的参数，在使用时可以配合使用。
 