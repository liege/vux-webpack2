<template>
    <div class="container product-list-container">
        <div class="banner">
            <img src="http://placehold.it/750x290" alt="">
        </div>
        <ul class="product-list">
            
                <li><router-link :to="{ name: 'product-details', params: { deviceId: 123, dataId:456 }}">
                    <a href="javascript:;"><img src="http://placehold.it/750x290" alt=""></a>
                    <div class="info">
                        <p class="title">马来西亚进口 马马马马马马马马马 马马马马马马马马马</p>
                        <p class="price">活动价<span>￥9.90</span></p>
                    </div>
                    <div class="add"><span class="icon icon-addcart"></span></div>
                </router-link></li>
            

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
    init: function(){
        console.log('init');
        console.log('deviceid: ' + this.$route.params.deviceId);
        console.log('dataId: ' + this.$route.params.dataId);
    }
}
</script>