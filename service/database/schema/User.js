// import { isMaster } from 'cluster';
// import { resolve } from 'path';

const mongoose = require('mongoose')//引入Mongoose
const Schema = mongoose.Schema//声明Schema
let ObjectId = Schema.Types.ObjectId//声明Object类型
const bcrypt = require('bcrypt')//加盐加密
const SALT_WORK_FACTOR = 10//1~99均可

//创建我们的用户schema  在表中，使用叫user的表
const userSchema = new Schema({
  UserId: ObjectId,
  userName: { unique: true, type: String },
  password: String,
  createAt: { type: Date, default: Date.now() },
  lastLoginAt: { type: Date, default: Date.now() }
}, {
    collection: 'user'
  })
//对密码进行加盐加密
userSchema.pre('save', function (next) {
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})

// 比对密码是否相同,在appApi 中的User.js中使用了
userSchema.methods = {
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  }
}

//发布模型
mongoose.model('User', userSchema)


