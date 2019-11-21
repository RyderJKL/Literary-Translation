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

## 代码贡献

贡献代码请发起 [`Merge Request`](https://docs.gitlab.com/ee/gitlab-basics/add-merge-request.html).

请先克隆代码到本地，然后检一个自己的分支出来，代码提交后请将需要合并的代码 `Merge Request` 到 `dev` 分支， `Assignee` 请分配给 `chenrong` 或者 `jixuechong`。

被 `Assignee` 的人在完成 `code review` 后确保所有`discussions` 都被 `resolve` 在合并到代码。

## 开发指南

请参看 [docs 文档](./docs/开发指南.md)

## RoadMap

请参看 [roadmap](./road-map/index.md)

## FQA

