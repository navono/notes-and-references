# 使用方法
先使用`populate_db`填充测试数据。

- 获取token
> curl -X POST -d {\"username\":\"alice\",\"password\":\"secret\"} http://localhost:3000/login -H "Content-Type: application/json" -H "Accept: application/json"

- 验证
> curl -X GET -H "Accept: application/json" http://localhost:3000/checkToken?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFsaWNlIiwiZXhwaXJlIjoxNTI1ODc2OTcwOTQ4fQ.gPdxyRyoCxWu9q3JmEvOw7gp7uhOyCtijpnUhbb57MA
