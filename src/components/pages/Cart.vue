<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="购物车" />
    </div>
    <div class="cart-title">
      <van-button size="small"
                  type="danger"
                  @click="clearCart"
                  plain>
        清空购物车
      </van-button>
    </div>
    <!--显示购物车中的商品-->
    <div class="cart-list">
      <div class="pang-row"
           v-for="(item,index) in cartInfo"
           :key="index">

        <div class="pang-img">
          <img :src="item.image"
               alt=""
               srcset=""
               width="100%">
        </div>
        <div class="pang-text">
          <div class="pang-goods-name">{{item.name}}</div>
          <div class="pang-control">
            <van-stepper v-model="item.count"></van-stepper>
          </div>
        </div>
        <div class="pang-goods-price">
          <div>￥{{item.price|moneyFilter}}</div>
        </div>
        <div>
          x{{item.count}}
        </div>
        <div classallPrice>
          ￥{{item.price*item.count|moneyFilter}}
        </div>

      </div>
    </div>
    <!--显示总金额-->
    <div class="totalMoney">
      商品总价￥{{totalMoney|moneyFilter}}
    </div>
  </div>
</template>

<script>
import { toMoney } from '@/filter/moneyFilter.js'

export default {
  name: 'Cart',
  data () {
    return {
      cartInfo: [],//
      isEmpty: false
    }
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  },
  computed: {
    totalMoney () {
      let allMoney = 0
      this.cartInfo.forEach((item, index) => {
        allMoney += item.price * item.count
      })
      localStorage.cartInfo = JSON.stringify(this.cartInfo)
      return allMoney
    }
  },
  methods: {
    //获取购物车信息
    getCartInfo () {
      //判断localstorage里面是否有购物车信息
      if (localStorage.cartInfo) {
        this.cartInfo = JSON.parse(localStorage.cartInfo)
      }
      console.log('this.cartInfo', JSON.stringify(this.cartInfo))
      this.isEmpty = this.cartInfo.length ? true : false
    },
    clearCart () {
      localStorage.removeItem('cartInfo')
      this.cartInfo = []
    }
  },
  created () {
    this.getCartInfo()
  }
}
</script>

<style scoped>
.cart-title {
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  text-align: right;
}
.cart-list {
  background-color: #fff;
}
.pang-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0.5rem;
  font-size: 0.85rem;
  border-bottom: 1px solid #e4e7ed;
}
.pang-img {
  flex: 6;
}
.pang-text {
  flex: 14;
  padding-left: 10px;
}
.pang-control {
  padding-top: 10px;
}
.pang-goods-price {
  flex: 4;
  text-align: right;
}
.allPrice {
  color: red;
}
.totalMoeny {
  text-align: right;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
}
</style>
