const fs = require('fs')
//读数据
fs.readFile('./data_json/goods.json', 'utf8', function (err, data) {

  let newData = JSON.parse(data)
  let pushData = []
  let i = 0

  newData.map(function (value, index) {
    if (value.IMAGE1 != null) {
      i++
      pushData.push(value)
    }
  })
  console.log(i)
  //console.log(pushData)
  //写数据
  fs.writeFile('./data_json/newGoods.json', JSON.stringify(pushData), function (err) {
    if (err) console.log('写文件操作失败')
    else console.log('写文件操作成功')
  })
})
