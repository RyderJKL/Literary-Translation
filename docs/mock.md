# Mock

支持 [mockjs](https://github.com/nuysoft/Mock/wiki/Getting-Started)

# Mock

使用 [mock](https://github.com/nuysoft/Mock) 模拟接口请求，模板配置请参考官方文档。

## 如何启用 mock 接口 ?

举个栗子：

```
$request.post('/user/login', { username: 'jack' }, { params: { mock: 'true' } })
$request.get('/user/profile', { username: 'jack' }, { params: { mock: 'true' } })
// 以上三个参数分别代表 url，body，HttpParams，
```

你需要在 `method` 方法的 `options` 中添加 `params`，并且添加 `mock: 'true'` 参数。

`@/utils/requset` 就会将该接口的 `url` 替换为 `${process.env.MOCK_API}/${url}`，同时会在 `HttpRequest` 的 `parameters` 中清除该 `mock` 值，不用担心会污染到后端接口。
  
## 添加 mock 数据

样例代码请参考 `mock/templates/user.ts` 以及其它已有的模块文件。

