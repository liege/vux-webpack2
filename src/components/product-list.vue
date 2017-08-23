<template>
    <div class="container product-list-container">
        <div class="banner">
            <img src="http://192.168.203.10/group1/M00/00/36/wKjLClmdNPSABPlPAAT6Ltd_mwE097.png" alt="">
        </div>
        <ul class="product-list">
            
                <li v-for="(item,index) in goodsList">
                <router-link :to="{ name: 'product-details', params: { deviceId: 123, dataId:456 }}">
                    <a href="javascript:;"><img :src="picUrl + item.thumbnailAddr" alt=""></a>
                    <div class="info">
                        <p class="title" v-text="item.summary"></p>
                        <p class="price">活动价<span>￥{{item.activityPrice}}</span></p>
                    </div>
                    <div class="add"><span class="icon icon-addcart"></span></div>
                </router-link>
                </li>
            

        </ul>
        <ul class="menu">
            <li>
                <a href="javascript:;"><span class="icon icon-index"></span></a>
                <div class="title">首页</div>
            </li>
            <li>
                <a href="javascript:;"><span class="icon icon-cart"></span></a>
                <div class="title">购物车</div>
            </li>
            <li>
                <a href="javascript:;"><span class="icon icon-order"></span></a>
                <div class="title">我的订单</div>
            </li>
        </ul>
    </div>
</template>

<style lang="sass">


</style>

<script type="text/javascript">

export default {
    data () {
        return {
            goodsList: '',
            picUrl: BASEPICURL
        }
    },
    init: function(){
        console.log('init');
        console.log('deviceid: ' + this.$route.params.deviceId);
        console.log('dataId: ' + this.$route.params.dataId);
    },
    created () {
        var self = this;
        // 商品列表
        fetch(BASEURL + '/bill-steward/shopping/queryGoods')
            .then(response => response.json())
            .then(data => {
            self.goodsList = data.result[0].result
            console.log(self.goodsList)
        }).catch((error) => {
            console.error(error);
        });
    }
}
</script>






