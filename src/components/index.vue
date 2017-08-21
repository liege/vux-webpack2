<template>
    <div class="container index-container">
        <!-- 焦点图 -->
        <swiper :list="bannerList" auto dots-class="custom-bottom" dots-position="center" :show-desc-mask="false"></swiper>
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
        <ul class="hot" id="scroll">

          <scroller :on-refresh="refresh"
            :on-infinite="infinite">


            <li v-for="(item,index) in hotList" >
                <router-link :to="{ name: 'product-details', params: { deviceId: 12, dataId:456 }}">
                <img :src="item.picUrl" alt="">
                <div class="info">
                    <p class="title" v-text="item.goodsName"></p>
                    <p class="details" v-text="item.info"></p>
                    <p class="price">市场价<span>￥{{item.goodsPrice}}</span></p>
                    <p class="promPrice">￥{{item.activityPrice}}</p>
                </div>
                <div class="add"><span class="icon icon-addcart" @click.prevent="add"></span></div>
                <div class="type">促</div>
                </router-link>
            </li>   
    <div v-for="(item, index) in items" class="row" :class="{'grey-bg': index % 2 == 0}">
      {{ item }}
    </div>
              </scroller>
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
import { Swiper, GroupTitle, SwiperItem, XButton, LoadMore } from 'vux'
import VueScroller from 'vue-scroller'
import Vue from 'vue'
Vue.use(VueScroller)

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
  name: 'index',
  data () {
    return {
        bannerList: demoList,
        hotList: '',
        menuList: '',
        showList1: true,
        scrollTop: 0,
        onFetching: false,
        bottomCount: 20,
        items: []
    }
  },
  components: {
    Swiper,
    SwiperItem,
    GroupTitle,
    XButton,
    LoadMore
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
    // 分类菜单
    fetch(BASEURL + '/bill-steward/steward/menu')
      .then(function(response) {
        return response.text()
      }).then(function(body) {
        var list = JSON.parse(body).object.list.filter(function (item) {
          return item.spare2 == "0002"
        });

        console.log(list);
        that.menuList = list.reverse()
      }).catch(() => {
        console.error('error');
      });
    // 商品列表
    fetch(BASEURL + '/bill-steward/shopping/queryGoods')
      .then(function(response) {
        return response.text()
      }).then(function(body) {
        that.hotList = JSON.parse(body).result[0].result
        console.log(that.hotList)
      }).catch(() => {
        console.error('error');
      });
  },
  mounted () {
    for (var i = 1; i <= 20; i++) {
      this.items.push(i + ' - keep walking, be 2 with you.');
    }
    this.top = 1;
    this.bottom = 20;
    // console.log(BASEURL);

  },
activated () {
  // this.$refs.scroller.reset()
},
  methods : {
    add: function (e) {
        return false;
    },
    refresh: function (done) {
      var self = this
      setTimeout(function () {
        var start = self.top - 1
        for (var i = start; i > start - 10; i--) {
          self.items.splice(0, 0, i + ' - keep walking, be 2 with you.');
        }
        self.top = self.top - 10;
        done();
      }, 1500)
    },

    infinite: function (done) {
      var self = this
        console.log(self.hotList);
      setTimeout(function () {
        var start = self.bottom + 1;
        for (var i = start; i < start + 10; i++) {
          self.items.push(i + ' - keep walking, be 2 with you.');
          self.hotList.concat(self.hotList);
        }
        self.bottom = self.bottom + 10;
        done();
      }, 1500)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.hot {
    position: relative;
    height: 1000px;
}
.row {
  width: 100%;
  height: 50px;
  padding: 10px 0;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
  color: #444;
  background-color: #fff;
}
</style>
