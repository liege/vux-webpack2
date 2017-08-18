<template>
    <div class="container index-container">
        <!-- 焦点图 -->
<swiper :list="demo03_list" auto dots-class="custom-bottom" dots-position="center" :show-desc-mask="false"></swiper>
        <!-- 分类导航 -->
        <ul class="sort">
          <template  v-for="(item, index) in menuList">  
            <router-link :to="{ name: 'product-list', params: { deviceId: item.id, dataId:456 }}"><li>
                <img :src="'/static/pic-sort-' + index +'.png'" height="89" width="88" alt="">
                <div class="title">{{item.operationDesc}}</div>
            </li></router-link>
          </template>
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
          <router-link :to="{ name: 'index'}">
            <li>
                <span class="icon icon-index"></span>
                <div class="title">首页</div>
            </li>
          </router-link>
          <router-link :to="{ name: 'cart', params: { deviceId: 123, dataId:456 }}">
            <li>
                <span class="icon icon-cart"></span>
                <div class="title">购物车</div>
                <div class="count">1</div>
            </li>
          </router-link>
          <router-link :to="{ name: 'order-center', params: { deviceId: 123, dataId:456 }}">
            <li>
                <span class="icon icon-order"></span>
                <div class="title">我的订单</div>
            </li>
          </router-link>
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
        hotList: hotList,
        menuList: ''
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
    console.log(BASEURL);
    var that = this;
    var tsUrl = 'http://192.168.20.23:8083/order-center/pay/test'
    var url = 'https://api.github.com/repos/vuejs/vue/commits?per_page=3&sha='
    // fetch('http://192.168.20.23:8083/bill-steward/shopping/queryGoods?channel=app&goodsCategory=C090301&startRow=10&pageSize=2')
    //   .then(function(response) {
    //     // alert(response);
    //     return response.text()
    //   }).then(function(body) {
    //     this.hotList = body.result;
    //     console.info(this.hotList)
    //   }).catch(() => {
    //     alert('error');
    //   });

    // fetch('http://192.168.20.23:8083/bill-steward/steward/menu')
    //   .then(function(response) {
    //     return response.text()
    //   }).then(function(body) {

    //     var list = JSON.parse(body).object.list.filter(function (item) {
    //       return item.spare2 == "0002"
    //     });
    //     that.menuList = list.reverse()
    //   }).catch(() => {
    //     console.error('error');
    //   });

    fetch('http://192.168.203.20:8194/bill-steward/shopping/queryGoods')
      .then(function(response) {
        return response.text()
      }).then(function(body) {
        console.log(body)
      }).catch(() => {
        console.error('error');
      });
  },
  mounted () {
    // console.log(BASEURL);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
