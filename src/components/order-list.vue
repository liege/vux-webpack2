<template>
    <div class="container order-list-container">
        <tab>
            <tab-item selected @on-item-click="onItemClick">全部</tab-item>
            <tab-item @on-item-click="onItemClick">待付款</tab-item>
            <tab-item @on-item-click="onItemClick">待发货</tab-item>
            <tab-item @on-item-click="onItemClick">待收货</tab-item>
            <tab-item @on-item-click="onItemClick">已完成</tab-item>
        </tab>
        <div class="tips">
            <img src="/static/order-null.png" alt="">
            <div>赶紧去逛逛吧~</div>
        </div>
        <ul class="order-list">
            <li v-for="(item, index) in shopList">
                <div class="title">2017-08-17 17:48:50<span class="status">状态</span></div>
                <div class="layout-wrap">
                    <div class="con-img"><img :src="item.img"></div>
                    <div class="con-detail">
                        <p>{{item.detail}}</p>
                        <p>颜色：白色；尺寸：XXL</p>
                    </div>
                    <div class="price">
                        <p>{{item.num*item.price | formatMoney}}</p>
                        <p>× {{item.num}}</p>
                    </div>
                </div>
                <div class="total">共1件商品 合计: ￥49</div>
                <div class="control">btn</div>
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

<style lang="sass">


</style>

<script type="text/javascript">
import { Tab, TabItem } from 'vux';

var list1 = [
                    {img: "http://placehold.it/750x360", detail: "澳洲进口奶粉 德运 Devondale脱脂成人奶粉 1kg", price: "4900", num: 1},
                    {img: "http://placehold.it/750x360", detail: "澳洲进口奶粉 德运 Devondale脱脂成人奶粉 1kg", price: "4900", num: 2},
                    {img: "http://placehold.it/750x360", detail: "澳洲进口奶粉 德运 Devondale脱脂成人奶粉 1kg", price: "4900", num: 3},
                    {img: "http://placehold.it/750x360", detail: "澳洲进口奶粉 德运 Devondale脱脂成人奶粉 1kg", price: "4900", num: 4},
                    {img: "http://placehold.it/750x360", detail: "澳洲进口奶粉 德运 Devondale脱脂成人奶粉 1kg", price: "4900", num: 5},
                    {img: "http://placehold.it/750x360", detail: "澳洲进口奶粉 德运 Devondale脱脂成人奶粉 1kg", price: "4900", num: 6},
                    {img: "http://placehold.it/750x360", detail: "澳洲进口奶粉 德运 Devondale脱脂成人奶粉 1kg", price: "4900", num: 6},
                    {img: "http://placehold.it/750x360", detail: "澳洲进口奶粉 德运 Devondale脱脂成人奶粉 1kg", price: "4900", num: 7}
                ];

var list2 = [
                    {img: "http://placehold.it/750x360", detail: "芝麻糊 精选油猫24907 1kg", price: "7879900", num: 1},
                    {img: "http://placehold.it/750x360", detail: "芝麻糊 精选油猫24907 1kg", price: "7879900", num: 2},
                    {img: "http://placehold.it/750x360", detail: "芝麻糊 精选油猫24907 1kg", price: "7879900", num: 3},
                ];
var list3 = [];
export default {
  name: 'hello',
  data () {
    return {
        totalMoney: 0,
        totalCheckNum: 0,
        isEmpty: true,
        shopList: list3
    }
  },
  components: {
    Tab,
    TabItem
  },
  created () {

  },
  mounted () {
  },
    filters: {
        formatMoney:function (value) {
            var number = parseInt(value);
            return "￥"+(number/100).toFixed(2);
        }
    },
  methods: {
    onItemClick (index) {
      console.log('on item click:', index);
      console.log(this.shopList = list2);
    }
  }
}

</script>