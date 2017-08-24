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
                <router-link :to="{ name: 'product-details', params: { deviceId: 12, dataId:item.goodsId }}">
                <img :src="picUrl + item.thumbnailAddr" alt="">
                <div class="info">
                    <p class="title" v-text="item.goodsName"></p>
                    <p class="details" v-text="item.summary"></p>
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
                <div class="count">{{cartList.length}}</div>
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

export default {
    name: 'index',
    data () {
        return {
            bannerList: [],
            hotList: '',
            menuList: '',
            showList1: true,
            scrollTop: 0,
            onFetching: false,
            bottomCount: 20,
            items: [],
            picUrl: BASEPICURL,
            cartList: ''
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
        var self = this;
        self.fetchCartList();
        // 分类菜单
        fetch(BASEURL + '/bill-steward/steward/menu')
            .then(response => response.json())
            .then(data => {
                var list = data.object.list;
                var menuList = list.filter(function (item) {
                    return item.spare2 == "0002" && item.plateType == "2"
                });
                var bannerList = list.filter(function (item) {
                    return item.spare2 == "0002" && item.plateType == "1"
                });
                // 分类菜单
                self.menuList = menuList.reverse()
                // 焦点图
                self.bannerList = bannerList.map((one, index) => ({
                    url: 'javascript:',
                    img: BASEPICURL + one.imgUrl
                }))
            }).catch(() => {
                console.error('error');
        });
        // 商品列表
        fetch(BASEURL + '/bill-steward/shopping/queryGoods')
            .then(response => response.json())
            .then(data => {
            self.hotList = data.result[0].result
            console.info(self.hotList)
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
        // console.info(BASEURL);

    },
    activated () {
      // this.$refs.scroller.reset()
    },
    methods : {
        add () {
            return false;
        },
        fetchCartList () {
            var self = this;
            // 购物车查询
            fetch(GET(BASEURL + '/bill-steward/cart/userCartQuery',
                        {
                            userId: '51000001093876'
                        }
                    )
                )
                .then(response => response.json())
                .then(data => {
                self.cartList = data.result.goodsList
                // console.info(self.cartList)
            }).catch(() => {
                console.error('error');
            });
        },
        refresh (done) {
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

        infinite (done) {
        var self = this
        console.info(self.hotList);
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
