/*
 * @Author: jiaxinying 
 * @Date: 2018-06-25 11:23:11 
 * @Last Modified by: jiaxinying
 * @Last Modified time: 2018-06-27 11:29:20
 */

const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

router.get('/', async (ctx) => {
  ctx.body = '这是用户操作首页'
})

router.post('/register', async (ctx) => {
  const User = mongoose.model('User')
  let newUser = new User(ctx.request.body)

  await newUser.save().then(() => {
    ctx.body = {
      code: 200,
      message: '注册成功'
    }
  }).catch((error) => {
    ctx.body = {
      code: 500,
      message: error
    }
  })
})

//登录
router.post('/login', async (ctx) => {
  let loginUser = ctx.request.body

  let userName = loginUser.userName
  let password = loginUser.password

  //引入User中的model
  const User = mongoose.model('User')
  await User.findOne({ userName: userName }).exec().then(async (result) => {

    //用户名比对成功，比较密码
    if (result) {
      let newUser = new User()
      await newUser.comparePassword(password, result.password).then(async (isMatch) => {
        ctx.body = {
          code: 200,
          messge: isMatch
        }
      }).catch((err) => {

        ctx.body = {
          code: 500,
          message: err
        }
      })
    } else {
      ctx.body = {
        code: 200,
        message: '用户名不存在'
      }
    }
  }).catch((error) => {

    ctx.body = {
      code: 500,
      message: error
    }
  })

})


module.exports = router
