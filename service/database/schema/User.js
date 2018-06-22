const mongoose = require('mongoose')//引入Mongoose
const Schema = mongoose.Schema//声明Schema
let ObjectId = Schema.Types.ObjectId//声明Object类型
const bcrypt = require('bcrypt')//加盐加密
const SALT_WORK_FACTOR = 10//1~99均可

//创建我们的用户schema
const userSchema = new Schema({
  UserId: ObjectId,
  userName: { unique: true, type: String },
  password: String,
  createAt: { type: Date, default: Date.now() },
  lastLoginAt: { type: Date, default: Date.now() }
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

//发布模型
mongoose.model('User', userSchema)