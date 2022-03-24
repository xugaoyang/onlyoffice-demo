## onlyoffice

### 项目目录
```
├─docs -------------------------- 文件目录
└─server
  └─index.js -------------------- node回调服务接口 
├─excel.html -------------------- excel在线编辑器
├─word.html --------------------- word在线编辑器
├─onlyoffice_flow.drawio
└─README.md
```
### 启动

#### document server 安装部署，需要在onlyoffice官网获取社区版然后进行部署，本仓库不做此说明
```
// 公司内部外网部署地址
http://192.168.59.33:9022
```


#### 接口服务启动

默认使用express搭建node服务
```
1. cd server
2. node index.js
```
可以在控制台看到document server 调用回调返回的信息

#### 静态服务启动
1. 安装node

2. 安装 anywhere【静态服务】| 也可使用live-server
```
npm install anywhere -g
```

3. 启动静态服务器
```
anywhere 7000
```
4. 访问[http://localhost:7000](http://localhost:7000)，可进行编辑保存查看node服务的面板信息，每次状态的变更都会有url返回，点击可在浏览器下载查看修改


### 简介

- 打开文件
- 保存文件
- 协同编辑

### 服务说明

1. 文档管理器 -- 应用端展示的文档列表
2. 文档编辑器 -- 应用端展示的查看编辑界面
3. 文档存储服务 -- 存储具有适当访问权限的用户可用的所有文档的服务器服务
4. 文档编辑服务 -- 允许执行文档查看和编辑的服务器服务
5. 文档命令服务 -- 允许使用文档编辑服务执行其他命令的服务器服务
6. 文档转换服务 -- 允许讲文档文件转换为适当的 office open xml 格式以进行编辑或下载的的服务器服务
7. 文档生成器服务 -- 允许轻松构建文档而无实际运行文档处理编辑器的服务器服务

### 使用

#### API说明

##### 1. callbackUrl

  **document server** 会在用户编辑文档期间多次回调接口，会将用户当前编辑状态返回值回调接口。

  - status 用户编辑状态
    - 1 -- 文档正在被编辑，一般用户打开文档时的状态
    - 2 -- 文档正要被**document server**保存，用户完成编辑关闭编辑器的状态
    - 3 -- 文档保存失败
    - 4 -- 文档内容未改变
    - 6 -- 用户手动点击保存，需额外配置
    - 7 -- 用户手动保存失败

```
// 用户打开文档进行编辑时会回调接口，发送数据如下：
{
  key: '53500B46FCA9',
  status: 1,
  users: [ 'uid-1648090986654' ],
  actions: [ { type: 1, userid: 'uid-1648090986654' } ]
}

```

```
// 用户关闭文档编辑器
{
  key: '53500B46FCA9',
  status: 2,
  url: 'http://192.168.59.33:9022/cache/files/53500B46FCA9_6035/output.xlsx/output.xlsx?md5=jplHmlv3Gmb0y9JKcCOvoQ&expires=1648092745&filename=output.xlsx',
  changesurl: 'http://192.168.59.33:9022/cache/files/53500B46FCA9_6035/changes.zip/changes.zip?md5=OjQ6ZarR5O7AeP4Yfgy3-g&expires=1648092745&filename=changes.zip',
  history: { serverVersion: '6.4.2', changes: [ [Object] ] },
  users: [ 'uid-1648090986654' ],
  actions: [ { type: 0, userid: 'uid-1648090986654' } ],
  lastsave: '2022-03-24T03:17:07.000Z',
  notmodified: true
}
```

```
// 没有修改的返回参数
{
  key: '53500B46FCA9',
  status: 4,
  actions: [ { type: 0, userid: 'uid-1648090986654' } ]
}
```

```
// 用户强制保存时，发送数据如下：
{
  key: '53500B46FCA9',
  status: 6,
  url: 'http://192.168.59.33:9022/cache/files/53500B46FCA9_8663/output.xlsx/output.xlsx?md5=yiU6itXHh7i3zkcmNvKPKg&expires=1648093607&filename=output.xlsx',
  changesurl: 'http://192.168.59.33:9022/cache/files/53500B46FCA9_8663/changes.zip/changes.zip?md5=PKpeEBPNUPVGaR6UuHmmxQ&expires=1648093607&filename=changes.zip',
  history: { serverVersion: '6.4.2', changes: [ [Object] ] },
  users: [ 'uid-1648090986654' ],
  actions: [ { type: 2, userid: 'uid-1648090986654' } ],
  lastsave: '2022-03-24T03:31:43.000Z',
  forcesavetype: 1
}
```

### 配置

- font
  - 系统字体导入【可能在 document server 能加载对应的字体包】
- language
- view

1. 社区版
2. 开发版

- customer
- logo

### 问题

1. 文件改变之后没有保存至文件服务器，文档编辑器会弹出警告，出现版本不一致的情况，导致不能编辑；


#### 参考：

- [官网](https://www.onlyoffice.com/zh/)
- [官网 demo](https://api.onlyoffice.com/editors/try?_ga=2.48702820.392434739.1647845247-635562668.1647845247)
- [官网文档](https://api.onlyoffice.com/editors/basic)
