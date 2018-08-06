<template>
    <div>
        <search-header></search-header>
        <!--swiper area-->
        <div class="swiper-area">
            <van-swipe :autoplay="1000">
                <van-swipe-item v-for="( banner ,index) in bannerPicArray"
                                :key="index">
                    <img v-lazy="banner.image"
                         width="100%" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <!--type bar-->
        <div class="type-bar">
            <div v-for="(cate,index) in category"
                 :key="index">
                <img v-lazy="cate.image"
                     width="90%">
                <span>{{cate.mallCategoryName}}</span>

            </div>
        </div>
        <!--adbanner area-->
        <div>
            <img v-lazy="adBanner"
                 width="100%" />
        </div>
        <!--Recommend goods area-->
        <div class="recommend-area">
            <div class="recommend-title">
                商品推荐
            </div>
            <div class="recommend-body">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item,index) in recommendGoods "
                                  :key="index">
                        <div class="recommend-item">
                            <img :src="item.image"
                                 width="80%">
                            <div>{{item.goodsName}}</div>
                            <div>￥{{item.price|moneyFilter}}(￥{{item.mallPrice|moneyFilter}})</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <!--楼层-->
        <floor-component :floorData="floor1"
                         :floorTitle="floorName.floor1"></floor-component>
        <floor-component :floorData="floor2"
                         :floorTitle="floorName.floor2"></floor-component>
        <floor-component :floorData="floor3"
                         :floorTitle="floorName.floor3"></floor-component>
        <!--热卖组件-->
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
                <!--这里是一个list组件-->
                <van-list>
                    <van-row gutter="20">
                        <van-col span="12"
                                 v-for="item of hotGoods"
                                 :key="item.goodsId">
                            <goods-info :goodsImage="item.image"
                                        :goodsName="item.name"
                                        :goodsPrice="item.price"
                                        :goodsId="item.goodsId"></goods-info>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import SearchHeader from 'common/searchHeader/searchHeader'
import FloorComponent from '../component/floorComponent'
import { toMoney } from '@/filter/moneyFilter'
import goodsInfo from '../component/goodsInfoComponent'
import url from '@/serviceAPI.config.js'
import {
    swiper,
    swiperSlide
} from 'vue-awesome-swiper'

export default {
    data () {
        return {
            swiperOption: {
                slidesPerView: 3
            },
            bannerPicArray: [],
            category: [],
            adBanner: '',
            recommendGoods: [],
            floor1: [],
            floor2: [],
            floor3: [],
            floorName: [],
            hotGoods: []//热卖商品

        }
    },
    filters: {
        moneyFilter (money) {
            return toMoney(money)
        }
    },
    components: {
        swiper,
        swiperSlide,
        SearchHeader,
        FloorComponent,
        goodsInfo
    },
    created () {
        axios({
            url: url.getShopingMallInfo,
            method: 'get',
        })
            .then(res => {
                if (res.status == 200) {
                    let data = res.data.data
                    this.category = data.category;
                    this.adBanner = data.advertesPicture.PICTURE_ADDRESS;
                    this.bannerPicArray = data.slides;
                    this.recommendGoods = data.recommend;
                    this.floor1 = data.floor1
                    this.floor2 = data.floor2
                    this.floor3 = data.floor3
                    this.floorName = data.floorName
                    this.hotGoods = data.hotGoods
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

}
</script>

<style scoped>
.search-bar {
  height: 2.2rem;
  background-color: #e5017d;
  line-height: 2.2rem;
  overflow: hidden;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid #fff !important;
  background-color: #e5017d;
  color: #fff;
}
.location-icon {
  padding-top: 0.2rem;
  padding-left: 0.3rem;
}
.swiper-area {
  clear: both;
  max-height: 15rem;
  overflow: hidden;
}
.type-bar {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
  flex: 1;
}
.recommend-area {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}
.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
</style>
