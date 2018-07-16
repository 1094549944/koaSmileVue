

/*
 * @Author: jiaxinying 
 * @Date: 2018-07-03 18:13:15 
 * @Last Modified by: jiaxinying
 * @Last Modified time: 2018-07-16 11:27:09
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

//获取商品详情信息的路由  推荐写法
router.post('/getDetailGoodsInfo', async (ctx) => {
  try {
    let goodsId = ctx.request.body.goodsId
    const Goods = mongoose.model('Goods')
    let result = await Goods.findOne({ ID: goodsId }).exec()
    ctx.body = { code: 200, message: result }
  } catch (error) {
    ctx.body = { code: 500, message: error }
  }
})

//获取商品详情信息的路由 路由第二种写法

// router.post('/getDetailGoodsInfo', async (ctx) => {
//   let goodsId = ctx.request.body.goodsId
//   const Goods = mongoose.model('Goods')
//   await Goods.findOne({ ID: goodsId }).exec().then(async (result) => {
//     ctx.body = { code: 200, message: result }
//   }).catch(error => {
//     console.log(error)
//     ctx.body = {
//       code: 500,
//       message: error
//     }
//   })

// })

//读取大类别的API制作
router.get('/getCategoryList', async (ctx) => {
  try {
    const Category = mongoose.model('Category')
    let result = await Category.find().exec()
    ctx.body = { code: 200, message: result }
  } catch (err) {
    ctx.body = { code: 200, message: err }
  }
})

//读取小类别的API制作

router.get('/getCategorySubList', async (ctx) => {
  try {
    let categoryId = 1
    const CategorySub = mongoose.model('CategorySub')
    let result = await CategorySub.find({ MALL_CATEGORY_ID: categoryId }).exec()
    ctx.body = { code: 200, message: result }
  } catch (err) {
    ctx.body = { code: 500, message: err }
  }
})

//根据商品类别获取商品列表
router.get('/getGoodsListByCategorySubID', async (ctx) => {
  try {
    let categorySubId = '2c9f6c946016ea9b016016f79c8e0000'
    const Goods = mongoose.model('Goods')
    let result = await Goods.find({ SUB_ID: categorySubId }).exec()
    ctx.body = { code: 200, message: result }
  } catch (err) {
    ctx.body = { code: 500, message: err }
  }
})


module.exports = router

