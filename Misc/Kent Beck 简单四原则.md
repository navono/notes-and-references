# Kent Beck 简单四原则

1. Pass All Test.

    通过全部测试。有测试才能够让软件不断的演进(grow)下去，不然你不是被 regression bugs 淹死，就是只能不计成本把code砍掉重练。如何写好测试也是个大哉问，xUnit Test Patterns: Refactoring Test Code一书是其中的bible，嫌厚的话，可以先看看Refactoring Test Code这一篇paper，都是在讲重构你的测试程式。当然，事情总是过犹不及，老板付钱给你是为了得到 code，不是 tests。测试只是帮助我们写好code的工具，追求100%完整的好测试并不是目的。
2. No Duplication.

    没有重复。"Every piece of knowledge must have a single, unambiguous, authoritative representation within a system".完整定义请复诵三次。有时候重复并不是这么明显，例如作用重复的程式，但命名不同，或是命名重复，但程式作用不一样。这里推荐 David Chelimsky 的影片 Maintaining Balance While Reducing Duplication (slides)和 Maintaining Balance while Reducing Duplication: Part II，可以增进对 DRY 的理解，DRY 不只是在讲不要重复程式码而已。
3. Reveals Intent.

    表达意图，易于理解。其中最重要而且基本的，就是要有好的程式命名，无论是类别、方法、变量等等。专讲 Readable 的书有一本可以推荐 The Art of Readable Code。我这里还推荐一个我最喜欢的技巧 Composed Method (搞笑谈软工也有一篇介绍)，这招也是 Kent Beck 大师提出的，将细节的实作抽取成一个小方法，让整个方法里的操作都是类似的粒度，小小一招，大有作用。
4. Has no superfluous parts.

    没有冗余（降低不必要的复杂度，过度设计）。
