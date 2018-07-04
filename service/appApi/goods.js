

/*
 * @Author: jiaxinying 
 * @Date: 2018-07-03 18:13:15 
 * @Last Modified by: jiaxinying
 * @Last Modified time: 2018-07-04 10:19:27
 * 批量插入
 */
const Router = require('koa-router')
let router = new Router()
const mongoose = require('mongoose')
const fs = require('fs')

//导入商品数据
router.get('/insertAllGoodsInfo', async (ctx) => {
  fs.readFile('./newGoods.json', 'utf-8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const Goods = mongoose.model('Goods')
    data.map((value, index) => {

      let newGoods = new Goods(value)
      newGoods.save().then(() => {
        saveCount++

      }).catch(error => {
        console.log(error)
      })
    })
  })
  ctx.body = '开始导入数据'
})

//导入商品分类大类数据
router.get('/insertAllCategory', async (ctx) => {
  fs.readFile('./data_json/category.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const Category = mongoose.model('Category')
    data.RECORDS.map((value, index) => {

      let newCategory = new Category(value)
      newCategory.save().then(() => {
        saveCount++
        console.log('插入成功:' + saveCount)
      }).catch(error => {
        console.log('插入失败:' + error)
      })
    })

  })
  ctx.body = "开始导入数据....."
})
//导入商品分类二级分类数据
router.get('/insertAllCategorySub', async (ctx) => {
  fs.readFile('./data_json/category_sub.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const CategorySub = mongoose.model('CategorySub')
    data.RECORDS.map((value, index) => {

      let newCategorySub = new CategorySub(value)
      newCategorySub.save().then(() => {
        saveCount++
        console.log('插入成功:' + saveCount)
      }).catch(error => {
        console.log('插入失败:' + error)
      })
    })

  })
  ctx.body = "开始导入数据....."
})



module.exports = router

