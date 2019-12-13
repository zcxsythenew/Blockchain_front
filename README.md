# 区块链大作业前端部分

17343116 吴国璋

## 主要技术

Vue（含 Vue-router、Vuex）框架

axios 数据请求接口

mock 假数据生成接口

crypt 数据加密

Element UI 组件库

## 项目搭建
```
npm install
```

## 编译并支持开发时热重载
```
npm run serve
```

## 编译为静态资源
```
npm run build
```

## 项目结构

public 目录：可以通过浏览器直接访问的文件。例如 GET /favicon.ico，可直接访问 public/favicon.ico 文件。

src/api 目录：包含需要向后端服务器请求数据的相应 API 需求。

src/components 目录：各类视图组件，如主页、采购页、结算页等，以及交易详情的 Dialog。还包含这些页面需要用到的 filter 和 formatter。

src/crypt 目录：加密和解密数据所需代码。

src/mock 目录：制造假数据所需代码。

src/router 目录：Vue-router 所需代码。

src/store 目录：Vuex 所需代码，存储用户当前的登录状态。关闭浏览器或刷新页面失效。

src/utils 目录：包含 request，向后端发送请求均通过 request 来发送。request 的被注释部分为制作假数据所需代码，未被注释部分是使用真实数据所需代码。

App.vue：Vue 的根组件，包括页面顶部的导航栏。

main.js：Vue 程序的入口点。
