# npm init 
# npm install koa --save

# 下载mongodb,并安装

# 如果mongodb 链接错误，参考：https://www.cnblogs.com/timtike/p/6629764.html



MongoDB shell version v3.4.2
connecting to: mongodb://127.0.0.1:27017
2017-03-28T02:11:34.775+0800 W NETWORK [thread1] Failed to connect to 127.0.0.1:27017, in(checking socket for error after poll), reason: Connection refused
2017-03-28T02:11:34.778+0800 E QUERY [thread1] Error: couldn't connect to server 127.0.0.1:27017, connection attempt failed :
connect@src/mongo/shell/mongo.js:237:13
@(connect):1:6
exception: connect failed


当mongodb service 没有运行的时候会发生这样的错误

尝试了新建一个/data/db 目录，但不奏效

 

最后找到了如下方法解决

然后 在bash 输入

brew services start mongodb
 

再输入mongo进入数据库
1
mongo

成功！

关闭
brew services stop mongodb

##  使用mongoose 来解决node 和 mongodb 数据通讯的数据建模库

## 安装mongoose  npm install mongoose --save


# mongoose 的schema

## 
schema :用来定义表的模板，实现和MongoDb数据库的映射,不具备表的操作能力
model: 具备表操作能力的一个集合，是mongoose的核心能力,有表的操作能力
entity: 类似记录，由model创建的实体，有表的操作能力


##加密处理：md5 和哈希256算法

www.atool.org/hash.php 哈希加密算法


即使加密也不是很安全，暴力破解，则可以破解出来。

##加盐处理：防止暴力破解


# bcrypt 用来加盐处理。


# service目录下
 npm install --save bcrypt

 如果安装失败，则使用npm install --save bcrypt --registry=https://registry.npm.taobao.org

 
# 安装koa-router

npm install koa-router --save

# koa 中间件 用来接收post数据
npm install --save koa-bodyparser


# koa 中间件，解决跨域

npm install --save koa2-cors

