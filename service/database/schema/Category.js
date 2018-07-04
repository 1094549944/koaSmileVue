/*
 * @Author: jiaxinying 
 * @Date: 2018-07-04 10:11:52 
 * @Last Modified by: jiaxinying
 * @Last Modified time: 2018-07-04 10:17:43
 * 大类分类
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  ID: { unique: true, type: String },
  MALL_CATEGORY_NAME: { type: String },
  IMAGE: { type: String },
  TYPE: { type: Number },
  SORT: { type: Number },
  COMMENTS: { type: String }
})

mongoose.model('Category', categorySchema)