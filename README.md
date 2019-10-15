# lego-ui-admin-pro

基于 [lego-ui](http://172.22.1.88/fe/lego-ui) 的中后台项目管理系统。

## 开发 

环境依赖: node `v8.15.0` 及以上，nvm `v0.33.1` 及以上

clone 项目： 

```bash
git clone 

cd lego-ui-admin-pro

yarn
```

运行：

```bash
yarn dev
```

## 主要技术栈

* "react": "16.8.6"
* "mobx": "5.13.0"
* "mobx-react": "6.1.3"
* "mobx-state-tree": "3.14.1"
* "mst-react-router": "2.3.1"
* "react-router": "5.0.0"
* "react-router-config": "5.1.1"
* "rjax": "0.0.1"
* "rxjs": "6.5.2"
* "rxjs-hooks": "0.4.3"
* "webpack": "4.31.0"
* "typescript": "3.4.5"

## Roadmap

### 技术栈选型

### 鉴权

#### 登录鉴权

#### 路由鉴权

[] 根据 `role` 信息动态生成路由；

### 系统级别页眉

[] 系统设置
[] 个人设置
[] 通知机制

### 页面级别页眉

[] 面包屑
[] 页面 Title

### Dashboard 模块

### 主题配置

### Q4 

lego-ui-admin-pro 的目标是基于 lego-ui 向上构建，提炼出典型模板/业务组件，并以此为基础构建基于区块开发的生态系统(最终目标)。 

下面是 lego-ui-admin-pro 2019 Q4 的可执行目标：

目前还处于起步阶段，有很多东西都还是摸着石头过河，所以有些计划在具体执行的时候可能有些变动。 

1. 完善系统整体架构；
   * 基于 `rxjs` 封装的 `request` 网络请求层工具函数 (100%)；
   * 基于 `request`  进行用统一管理的 `service` 请求函数 (100%)；
   * 基于 Mobx 的状态管理和全局通信; 
   * 使用 `Rxjs` 接管所有的事件行为(UI 交互事件，WebSocket, Web Workers，Ajax 请求等)； 
   * 基于角色的权限系统；
   * 基于权限的多布局方案；
   * ...
   
2. 接入 lego-ui；
   * 自定义主题配置；
   * 个人中心；
   * 导航栏；
   * 系统级别的页面和页脚；
   * 页面级别的页面和页脚（面包屑，页面标题等）； 
   * 基础表单；
   * 高级表单
   ......
   
3. 接入 Mock 机制，使用前端虚拟接口联调；

4. 基于 lego-ui-admin-pro 模板的脚手架开发；

5. 前期开发文档编写；
   目前系统使用较新的技术体系 `react 16.8 (hooks)` + `typescript` + `mobx` + `rxjs`，新的技术融合带来的是与以前迥异的编程思维，文档编写的目的，主要是为了指引新同学快速了解前期的知识储备。
   
