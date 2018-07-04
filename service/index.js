const Koa = require('koa')
const app = new Koa()


const { connect, initSchemas } = require('./database/init.js')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const Router = require('koa-router')


//koa post方法中间件
app.use(bodyParser())
//koa 解决跨域问题
app.use(cors())


//引入用户模块
let user = require('./appApi/User.js')
let home = require('./appApi/home.js')
let goods = require('./appApi/goods.js')
//装载所有子路由
let router = new Router()

router.use('/user', user.routes())
router.use('/home', home.routes())
router.use('/goods', goods.routes())

//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

  //egg.js 阿里的框架，可以参考他的方式来配置，大型系统，如果小型的，则目前可以使用
  //立即执行函数
  ; (async () => {
    await connect()
    initSchemas()
  })()

app.use(async (ctx) => {
  ctx.body = '<h1>hello koa2</h1>'
})
app.listen(3000, () => {
  console.log('server starting at port 3000')
})