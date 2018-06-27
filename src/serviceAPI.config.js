const BASEURL = 'https://www.easy-mock.com/mock/5ae993753ecdf019c288e529/smileVue/'
const LOCALURL = 'http://localhost:3000/'

const URL = {
  //商城首页数据
  getShopingMallInfo: BASEURL + 'index',
  //商品信息
  getGoodsInfo: BASEURL + 'getGoodsInfo',
  //用户注册接口
  registerUser: LOCALURL + 'user/register',
  //用户登录接口
  login: LOCALURL + 'user/login'

}

module.exports = URL