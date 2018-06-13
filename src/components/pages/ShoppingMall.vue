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
                            <div>￥{{item.price}}(￥{{item.mallPrice}})</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <!--楼层-->
        <floor-component :floorData="floor1"></floor-component>
    </div>
</template>

<script>
import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import SearchHeader from 'common/searchHeader/searchHeader'
import FloorComponent from '../component/floorComponent'
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
            floor1: []

        }
    },
    components: {
        swiper,
        swiperSlide,
        SearchHeader,
        FloorComponent
    },
    created () {
        axios({
            url: 'https://www.easy-mock.com/mock/5ae993753ecdf019c288e529/smileVue/index',
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

                }
            })
            .catch(error => {
                console.log(error)
            })
    }

}
</script>

<style scoped>
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
</style>