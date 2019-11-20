# lego-ui-admin-pro

基于 [lego-ui](http://lego-ui.lvwan-inc.com/doc/) 的中后台项目管理系统。

## 开发

环境依赖: node `v8.15.0` 及以上，nvm `v0.33.1` 及以上

clone 项目：

```bash
git clone git@gitlab.lvwan-inc.com:fe/lego-ui-admin-pro.git
```

运行：

```bash
yarn dev
```

开启 mock 服务：

```bash
yarn mock 
```

也可以在运行 `dev` 的同时开启 `mock` 服务(不过，还是建议开发两个终端)：

```bash
yarn dev:mock
```

生产环境构建：

```bash 
yarn build:prod
```

## 更多

请参看 [docs 文档](./docs/开发指南.md)
