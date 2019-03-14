# Windows

在 `Windows` 下命令行使用 `curl`，`POST` 的数据如果是 `json` 格式，引号应该加载转义字符，例如：
> curl -H "Content-Type: application.json" -X POST http://localhost:8000/city -d "{\\"name\\":\\"New York\\",\\"area\\":304}"