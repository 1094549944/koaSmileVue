import { ObjectID } from '../../../../../../Library/Caches/typescript/2.6/node_modules/@types/bson';

// 引入mongoose
const mongoose = require('mongoose')

//声明Schema
const Schema = mongoose.Schema

//声明Object 类型

//创建我们的用户Schema

const userSchema = new Schema({
  UserId: ObjectID,
  userName: { unique: true, type: String },
  password: String,
  createaT: { type: Date, default: Date.now() },
  lastLoginAt: { type: Date, default: Date.now() }
})
mongoose.model('User', userSchema)