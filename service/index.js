const Koa = require('koa')
const app = new Koa()

const mongoose = require('mongoose')
const { connect, initSchemas } = require('./database/init.js')
  //立即执行函数
  ; (async () => {
    await connect()
    initSchemas()
    const User = mongoose.model('User')
    let oneUser = new User({ userName: 'jspang2', password: '123456' })
    oneUser.save().then(() => { console.log('插入成功') })

    let users = await User.findOne({}).exec()


    console.log('_________' + users)

  })()

app.use(async (ctx) => {
  ctx.body = '<h1>hello koa2</h1>'
})
app.listen(3000, () => {
  console.log('server starting at port 3000')
})