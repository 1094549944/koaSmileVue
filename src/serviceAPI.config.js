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
  login: LOCALURL + 'user/login',
  //获取商品详情
  getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo',
  //得到大类信息
  getCategoryList: LOCALURL + 'goods/getCategoryList',
  //得到小类别信息
  getCategorySubList: LOCALURL + 'goods/getCategorySubList',
  //根据商品类别获取商品列表
  getGoodsListByCategorySubID: LOCALURL + 'goods/getGoodsListByCategorySubID'
}

module.exports = URL