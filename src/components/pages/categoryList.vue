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
                      swipeable>
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
                     v-for="item in list"
                     :key="item">
                  {{item}}
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
import { Toast } from 'vant';
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
      list: [], //商品数据 
      isRefresh: false, //下拉刷新

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
          this.getGoodsListByCategorySubID(this.categorySub[0].ID)
        } else {
          Toast('服务器错误，获取数据失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    //获取商品列表
    getGoodsListByCategorySubID (categorySubId) {
      axios({
        url: url.getGoodsListByCategorySubID,
        method: 'post',
        data: {
          categorySubId: categorySubId
        }
      }).then(res => {

        if (res.data.code == 200 && res.data.message) {

          this.goodsList = res.data.message

        } else {
          Toast('服务器错误，获取数据失败')
        }
      }).catch(err => {
        console.log(err)
      })

    },
    //二级点击，商品列表改变
    getClickSub (item) {
      let id = this.categorySub[item].ID
      this.getGoodsListByCategorySubID(id)
    },
    //上拉加载方法
    onLoad () {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        this.loading = false

        if (this.list.length >= 100) {
          this.finished = true
        }
      }, 500)
    },
    //下拉刷新方法
    onRefresh () {
      setTimeout(() => {
        this.isRefresh = false;
        this.finished = false;
        this.list = []
        this.onLoad()
      }, 500)
    }
  },
  created () {
    this.getCategory()

  },
  mounted () {
    let winHeight = document.documentElement.clientHeight
    document.getElementById('leftNav').style.height = winHeight - 46 + 'px'
    document.getElementById("list-div").style.height = winHeight - 90 + 'px'
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
  text-align: center;
  line-height: 80px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
}
#list-div {
  overflow: scroll;
}
</style>
