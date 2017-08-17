<template>
    <div class="container index-container">
        <!-- 焦点图 -->
<swiper :list="demo03_list" auto dots-class="custom-bottom" dots-position="center"></swiper>
        <!-- 分类导航 -->
        <ul class="sort">
            <router-link :to="{ name: 'product-list', params: { deviceId: 123, dataId:456 }}"><li>
                <a href="javascript:;"><img src="http://placehold.it/100x100" alt=""></a>
                <div class="title">进口食品</div>
            </li></router-link>
            <li>
                <a href="javascript:;"><img src="http://placehold.it/100x100" alt=""></a>
                <div class="title">数码家电</div>
            </li>
            <li>
                <a href="javascript:;"><img src="http://placehold.it/100x100" alt=""></a>
                <div class="title">有线订购</div>
            </li>
            <li>
                <a href="javascript:;"><img src="http://placehold.it/100x100" alt=""></a>
                <div class="title">知言学习</div>
            </li>
        </ul>
        <!-- 产品列表 -->
        <ul class="hot">
            <li v-for="(item,index) in hotList">
                <a href="javascript:;"><img :src="item.picUrl" alt=""></a>
                <div class="info">
                    <p class="title" v-text="item.title"></p>
                    <p class="details" v-text="item.info"></p>
                    <p class="price">市场价<span>￥{{item.price}}</span></p>
                    <p class="promPrice">￥{{item.promPrice}}</p>
                </div>
                <div class="add"><span class="icon icon-addcart"></span></div>
                <div class="type">促</div>
            </li>            
        </ul>
        <!-- 底部菜单 -->
        <ul class="menu">
            <li>
                <a href="javascript:;"><span class="icon icon-index"></span></a>
                <div class="title">首页</div>
            </li>
            <li>
                <a href="javascript:;"><span class="icon icon-cart"></span></a>
                <div class="title">购物车</div>
            </li>
            <router-link :to="{ name: 'order-center', params: { deviceId: 123, dataId:456 }}"><li>
                <a href="javascript:;"><span class="icon icon-order"></span></a>
                <div class="title">我的订单</div>
            </li></router-link>
        </ul>
    </div>
</template>

<script>
import { Swiper, GroupTitle, SwiperItem, XButton, Divider } from 'vux'
var hotList = [
    {
        picUrl: 'http://placehold.it/220x200',
        title: '产品大标题',
        info: '产品介绍',
        price: '69',
        promPrice: '49'
    },
    {
        picUrl: 'http://placehold.it/220x200',
        title: '产品大标题',
        info: '产品介绍',
        price: '69',
        promPrice: '49'
    },
    {
        picUrl: 'http://placehold.it/220x200',
        title: '产品大标题',
        info: '产品介绍',
        price: '69',
        promPrice: '49'
    },
    {
        picUrl: 'http://placehold.it/220x200',
        title: '产品大标题',
        info: '产品介绍',
        price: '69',
        promPrice: '49'
    },
    {
        picUrl: 'http://placehold.it/220x200',
        title: '产品大标题',
        info: '产品介绍',
        price: '69',
        promPrice: '49'
    },
    {
        picUrl: 'http://placehold.it/220x200',
        title: '产品大标题',
        info: '产品介绍',
        price: '69',
        promPrice: '49'
    },
    {
        picUrl: 'http://placehold.it/220x200',
        title: '产品大标题',
        info: '产品介绍',
        price: '69',
        promPrice: '49'
    },
    {
        picUrl: 'http://placehold.it/220x200',
        title: '产品大标题',
        info: '产品介绍',
        price: '69',
        promPrice: '49'
    },
    {
        picUrl: 'http://placehold.it/220x200',
        title: '产品大标题',
        info: '产品介绍',
        price: '69',
        promPrice: '49'
    },
    {
        picUrl: 'http://placehold.it/220x200',
        title: '产品大标题',
        info: '产品介绍',
        price: '69',
        promPrice: '49'
    }
]
const imgList = [
  'http://placehold.it/750x360/ff6760',
  'http://placehold.it/750x360/780213',
  'http://placehold.it/750x360/1830af'
]
const demoList = imgList.map((one, index) => ({
  url: 'javascript:',
  img: one
}))
export default {
  name: 'hello',
  data () {
    return {
        demo03_list: demoList,
        hotList: hotList
    }
  },
  components: {
    Swiper,
    SwiperItem,
    GroupTitle,
    XButton,
    Divider
  },
  created () {
    // console.log(TouchSlide)
    fetch('http://192.168.20.23:8083/bill-steward/shopping/queryGoods?channel=app&goodsCategory=C090301&startRow=10&pageSize=2')
      .then(function(response) {
        return response.text()
      }).then(function(body) {
        console.info(body.result)
        // this.hotList = 
      })
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
