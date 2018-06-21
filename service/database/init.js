const mongo = 'mongoose';

const mongoose = require('mongoose')
const db = 'mongodb://localhost/smile-db'



exports.connect = () => {
  //连接数据库
  mongoose.connect(db)

  let maxConnectTimes = 0

  return new Promise((resolve, reject) => {


    //增加数据库连接的事件监听 ,断开的时候
    mongoose.connection.on('disconnected', () => {
      //进行重连
      if (maxConnectTimes < 3) {
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        reject()
        throw new Error('数据库出现问题，程序无法搞定，请认为修理。。')
      }

    })

    //数据库出现错误
    mongoose.connection.on('error', err => {
      //进行重连
      if (maxConnectTimes < 3) {
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        reject(err)
        throw new Error('数据库出现问题，程序无法搞定，请认为修理。。')
      }

    })

    //连接打开的时候
    mongoose.connection.on('open', () => {
      console.log('mogodb connected successfully!')
      resolve()
    })


  })



}