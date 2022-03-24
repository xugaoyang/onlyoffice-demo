## onlyoffice

### 简介

- 打开文件
- 保存文件
- 协同编辑

### 部署

1. 文档管理器 -- 应用端展示的文档列表
2. 文档编辑器 -- 应用端展示的查看编辑界面
3. 文档存储服务 -- 存储具有适当访问权限的用户可用的所有文档的服务器服务
4. 文档编辑服务 -- 允许执行文档查看和编辑的服务器服务
5. 文档命令服务 -- 允许使用文档编辑服务执行其他命令的服务器服务
6. 文档转换服务 -- 允许讲文档文件转换为适当的 office open xml 格式以进行编辑或下载的的服务器服务
7. 文档生成器服务 -- 允许轻松构建文档而无实际运行文档处理编辑器的服务器服务

### 使用

#### API

1. 开启协作功能

2. callbackUrl

document server 会在用户编辑文档期间多次回调接口，会将用户当前编辑状态返回值回调接口。

- status 用户编辑状态
  - 1 -- 文档正在被编辑，一般用户打开文档时的状态
  - 2 -- 文档正要被 document server 保存，用户完成编辑关闭编辑器的状态
  - 3 -- 文档保存失败
  - 4 -- 文档内容未改变
  - 6 -- 用户手动点击保存，需额外配置
  - 7 -- 用户手动保存失败

```
// 用户打开文档进行编辑时会回调接口，发送数据如下：
{
  "key": "100000",
  "status": 1,
  "users": ["001"],
  "actions": [
    {
      "type": 1,
      "userid": "001"
    }
  ]
}

```

```
// 用户保存时，发送数据如下：
{
    "key": "100000", // 文档主键
    "status": 6,
    "url": "http://47.113.219.133:9001/cache/files/100000_5043/output.docx/output.docx?md5=XkF44g2sAkkZVDHCFbJ5Ug&expires=1638441611&filename=output.docx",  // 保存后的文档路径
    "changesurl": "http://47.113.219.133:9001/cache/files/100000_5043/changes.zip/changes.zip?md5=CGdhAG-sO5AUhM3JsKL_Fg&expires=1638441611&filename=changes.zip", // onlyoffice会将文档变化内容保存到一个zip压缩文件中，如果有需要可以将该文件保存起来，可以通过editor相关api在界面上显示变化的内容
    "history": { // 文档编辑历史
        "serverVersion": "6.4.2",
        "changes": [
            {
                "created": "2022-03-23 00:00:00",
                "user": {
                    "id": "001",
                    "name": "admin"
                }
            }
        ]
    },
    "users": [ // 编辑用户，协同会是多个
        "001"
    ],
    "actions": [
        {
            "type": 2,
            "userid": "001"
        }
    ],
    "lastsave": "2021-12-02T10:24:55.000Z",
    "notmodified": false
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

**参考：**

- [官网](https://www.onlyoffice.com/zh/)
- [官网 demo](https://api.onlyoffice.com/editors/try?_ga=2.48702820.392434739.1647845247-635562668.1647845247)
- [官网文档](https://api.onlyoffice.com/editors/basic)
