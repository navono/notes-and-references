# CSP（Communicating Sequential Processes）
并发与并行的区别：
>并发是代码的一个属性；并行是程序（或者说进程）的一个属性。
	
抽象层级。一般的编程语言基本在OS的线程级别，同时增加内存同步访问控制。而Go提供了goroutine，同时还有channel。使得编写并发代码更简单。同时也将问题领域直接映射到相关的逻辑代码。而不需要关心底层的并发机制。比如：
  1. 这个语言是否天生支持线程？还是要选择额外的库？
	2. 线程的限制边界在哪？
	3. 在这个操作系统中，线程是否属于重量级资源？
	4. 运行程序的操作系统是怎样处理线程的差异？（Windows上的线程和Linux上的线程就有很多不同点）
	5. 我应该创建一个线程池来控制线程的数量？那么如何能找到最优的线程池数量？
	
以上的问题在Go中都不需要考虑。因为Go的运行时已经做了相应的工作。

# Go的并发哲学
Go除了提供了goroutine之外，也提供了内存访问同步原语机制。那么在这两者之间该如何选择？
回答以下四个问题：
  1. 是否尝试转移数据的所有权？
  >Yes -> Channels
  <br>No  -> Primitives
  2. 是否尝试保护结构体的内在状态？
  > Yes -> Primitives
  <br> No  -> Channels

  例如：
  ```go
  type Counter struct {
  mu sync.Mutex
  value int
  }
  func (c *Counter) Increment() {
  c.mu.Lock()
  defer c.mu.Unlock()
  c.value++
  }
  ```
  3. 是否在多个逻辑代码中进行协调配合？
  >Yes -> Channels
  <br>No  -> Primitives
  4. 代码是否是性能关键区（performance-critical section） 
  >Yes -> Primitives
  <br>No  -> Channels
		 
旨在简化，尽量使用Channel。
 
# Go 的并发构建块
# Go 的并发模式
# Go 的扩展能力
# goroutine 和 runtime
## goroutine 和 OS thread、Green thread的关系
Green Thread是指由语言的运行时管理，一种更高层级的coroutine的抽象。coroutine是简单的并发subroutine，`不可抢占`，`多入口`。

goroutine不是OS thread，也不是Green thread，而是Go独有的一种coroutine, goroutine是和`Go运行时`紧密绑定的coroutine，由Go的运行时进行调度，进行状态管理。Go的运行时在内部实现了一个`M:N`的调度器，也就是`M个Green Thread`对应`N个OS Thread`，然后将`goroutine`调度到`Green Thread`上。