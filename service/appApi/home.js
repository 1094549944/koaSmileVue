/*
 * @Author: jiaxinying 
 * @Date: 2018-07-03 18:11:55 
 * @Last Modified by: jiaxinying
 * @Last Modified time: 2018-07-03 18:12:46
 */

const Router = require('koa-router')

let router = new Router()

router.get('/', async (ctx) => {
  ctx.body = '这是首页接口'
})
module.exports = router