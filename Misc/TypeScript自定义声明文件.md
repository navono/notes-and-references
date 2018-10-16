# 为本地的文件（.js）创建声明文件
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

上述如果是为库编写，可以使用`interface`等。

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

# 为第三方的库编写本地声明文件
1. 在`typings`目录下创建于库同名的文件夹，在文件夹下新建`index.d.ts`，然后使用以下格式：
```js
declare module '3rd-lib' {
  export function hello(world: string): void
}
```

需要注意的是，此处的`module`名字必须要和第三方库的名字相同。