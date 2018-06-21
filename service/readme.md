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