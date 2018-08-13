<template>
  <div class="main">
    <div class="navbar-div">
      <van-nav-bar title="类别列表"
                   left-text="返回"
                   left-arrow
                   @click-left="onClickLeft" />
    </div>
    <div>
      <van-row>

        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li @click="clickCategory(index,item.ID)"
                  :class="{categoryActive:categoryIndex==index}"
                  v-for="(item,index) in category"
                  :key="index">
                {{item.MALL_CATEGORY_NAME}}</li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs v-model="active"
                      sticky
                      swipeable
                      @click="onClickCategorySub">
              <van-tab v-for="(item,index) in categorySub"
                       :key="index"
                       :title="item.MALL_SUB_NAME">

              </van-tab>
            </van-tabs>

          </div>
          <div id="list-div">
            <van-pull-refresh v-model="isRefresh"
                              @refresh="onRefresh">
              <van-list v-model="loading"
                        :finished="finished"
                        @load="onLoad">
                <div class="list-item"
                     @click="goGoodsInfo(item.ID)"
                     v-for="(item,index) in goodList"
                     :key="index">
                  <div class="list-item-img">
                    <img :src="item.IMAGE1"
                         width="100%"
                         :onerror="errorImg" />

                  </div>
                  <div class="list-item-text">
                    <div>{{item.NAME}}</div>
                    <div>￥{{item.ORI_PRICE | moneyFilter}}</div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import { Toast } from 'vant'
import { toMoney } from '@/filter/moneyFilter.js'
export default {
  name: 'CategoryList',
  components: {

  },
  data () {
    return {
      category: [],
      categoryIndex: 0,
      categorySub: [],  //小类类别
      active: 0,    //激活标签的值
      loading: false,
      finished: false, //上拉加载是否有数据
      // list: [], //商品数据 （模拟用）
      isRefresh: false, //下拉刷新
      page: 1,//商品列表页数
      goodList: [],//商品数据列表
      categorySubId: '',//商品子类ID
      errorImg: 'this.src="' + require('@/assets/images/errorimg.png') + '"'
    }
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  },
  methods: {
    //返回按钮
    onClickLeft () {
      this.$router.go(-1)
    },
    //获取一级分类
    getCategory () {
      axios({
        url: url.getCategoryList,
        method: 'get'
      }).then(response => {
        if (response.data.code == 200 && response.data.message) {
          this.category = response.data.message
          this.getCategorySubByCategoryId(this.category[0].ID)
        } else {
          Toast('服务器错误，数据获取失败')
        }
      })
    },
    //一级，二级分类点击
    clickCategory (index, categoryId) {
      this.categoryIndex = index
      this.page = 1
      this.finished = false
      this.goodList = []
      this.getCategorySubByCategoryId(categoryId)
    },
    //获取二级分类
    getCategorySubByCategoryId (categoryId) {
      axios({
        url: url.getCategorySubList,
        method: 'post',
        data: {
          categoryId: categoryId
        }
      }).then(res => {
        if (res.data.code == 200 && res.data.message) {
          this.categorySub = res.data.message
          this.active = 0
          this.categorySubId = this.categorySub[0].ID
          this.onLoad()
        } else {

          Toast('服务器错误，获取数据失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },

    //上拉加载方法
    onLoad () {

      setTimeout(() => {
        this.categorySubId = this.categorySubId ? this.categorySubId : this.categorySub[0].ID
        this.getGoodList()
      }, 500);

    },
    //下拉刷新方法
    onRefresh () {
      setTimeout(() => {
        this.isRefresh = false;
        this.finished = false;
        this.goodList = []
        this.onLoad()
      }, 500)
    },
    //获取子类的列表
    getGoodList () {
      axios({
        url: url.getGoodsListByCategorySubID,
        method: 'post',
        data: {
          categorySubId: this.categorySubId,
          page: this.page
        }
      })
        .then(response => {
          console.log('获取数据列表', response)
          if (response.data.code == 200 && response.data.message.length) {
            this.page++
            this.goodList = this.goodList.concat(response.data.message)
          } else {
            this.finished = true
          }
          this.loading = false;

        })
        .catch(error => {
          console.log(error)
        })
    },
    //点击子类的方法
    onClickCategorySub (index, title) {

      this.categorySubId = this.categorySubId[index].ID
      this.goodList = []
      this.finished = false
      this.page = 1
      this.onLoad()
    },
    goGoodsInfo (id) {
      this.$router.push({ name: 'Goods', params: { goodsId: id } })
    }
  },
  created () {
    this.getCategory()


  },
  mounted () {
    let winHeight = document.documentElement.clientHeight
    document.getElementById('leftNav').style.height = winHeight - 46 - 50 + 'px'
    document.getElementById("list-div").style.height = winHeight - 90 - 50 + 'px'
  }
}
</script>

<style scoped>
#leftNav {
  background-color: aliceblue;
}
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActice {
  background-color: #fff;
}
.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}
#list-div {
  overflow: scroll;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}
</style>
