1. 创建以下布局的目录结构
```
.
|--- typings
|    |___ test-lib
|         |___ index.d.ts
|
|___ tsconfig.json
```

2. 在`index.d.ts`中书写声明语句：
```js
declare module 'test-lib' {
  export function hello(world: string): void
}
```

3. 配置`tsconfig.json`
```
{
  "compilerOptions": {
    ...
    "typeRoots": ["node_modules/@types", "typings"]
  },
  ...
}
```

4. 使用声明：
```js
import { hello } from 'test-lib'

hello('world!')
```