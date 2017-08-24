<template>
    <div class="container cart-container">

        <div class="title" v-show="goodsList.length">
            购物车共{{totalNum}}件宝贝<span>编辑</span>
        </div>
        <div class="tips" v-show="goodsList.length == 0">
            <img src="/static/cart-null.png" alt="">
            <div>赶紧去逛逛吧~</div>
        </div>
        <div class="con" id="wrapper" v-show="goodsList.length">
            <ul>
                <li v-for="(item, index) in goodsList">
                    <div class="chek" :class="{'cheked': item.checked}" @tap="chooseShop(item)"></div>
                    <div class="con-img"><img :src="item.img"></div>
                    <div class="con-detail">
                        <p>{{item.detail}}</p>
                        <p>{{item.num*item.price | formatMoney}}</p>
                        <div class="num-con">
                            <span @tap="changeMoney(item, -1)">-</span><span>{{item.num}}</span><span @tap="changeMoney(item, 1)">+</span>
                        </div>
                    </div>
                </li>
                <li></li>
            </ul>
        </div>
        <footer v-show="goodsList.length">
            <div class="chek" :class="{'cheked': ''}" @tap="chooseShop(item)"></div>
            <span>总计：{{totalMoney | formatMoney}}</span><span>去结算({{totalCheckNum}})</span>
        </footer>
    </div>
</template>

<style lang="sass">

</style>

<script type="text/javascript">
var list1 = [
                    {img: "http://placehold.it/750x360", detail: "澳洲进口奶粉 德运 Devondale脱脂成人奶粉 1kg", price: "4900", num: 1},
                    {img: "http://placehold.it/750x360", detail: "澳洲进口奶粉 德运 Devondale脱脂成人奶粉 1kg", price: "4900", num: 2},
                    {img: "http://placehold.it/750x360", detail: "澳洲进口奶粉 德运 Devondale脱脂成人奶粉 1kg", price: "4900", num: 3},
                    {img: "http://placehold.it/750x360", detail: "澳洲进口奶粉 德运 Devondale脱脂成人奶粉 1kg", price: "4900", num: 4},
                    {img: "http://placehold.it/750x360", detail: "澳洲进口奶粉 德运 Devondale脱脂成人奶粉 1kg", price: "4900", num: 5},
                    {img: "http://placehold.it/750x360", detail: "澳洲进口奶粉 德运 Devondale脱脂成人奶粉 1kg", price: "4900", num: 6},
                    {img: "http://placehold.it/750x360", detail: "澳洲进口奶粉 德运 Devondale脱脂成人奶粉 1kg", price: "4900", num: 7}
                ];

export default {
    data () {
        return {
                totalMoney: 0,
                totalCheckNum: 0,
                goodsList:list1,
                chooseList:[]
        }
    },
    created (){
        console.log('deviceid: ' + this.$route.params.deviceId);
        console.log('dataId: ' + this.$route.params.dataId);
    },
    filters: {
        formatMoney:function (value) {
            var number = parseInt(value);
            return "￥"+(number/100).toFixed(2);
        }
    },
    computed: {
        totalNum: function(){
            return this.goodsList.length;
        }
    },
    methods: {
        chooseShop: function (item) {
            if(item.checked == "undefined"){
                this.$set(item, "checked", true);
            }else{
                item.checked = !item.checked;
            }
            this.calcTotalPrice();
        },
        changeMoney: function(product, way){
            if(way>0){
                product.num++;
            }
            if(way<0){
                if(product.num == 1){
                    this.delShop(product);
                }else{
                    product.num--; 
                }
            }
            this.calcTotalPrice();
        },
        calcTotalPrice: function(){
            this.totalMoney = 0;
            this.totalCheckNum = 0;
            var _this = this;
            this.goodsList.forEach(function(item, index){
                if(item.checked){
                    _this.totalMoney += item.price * item.num;
                    _this.totalCheckNum += item.num;
                }
            });
        },
        delShop: function(product){
            var index = this.goodsList.indexOf(product);
            var _this = this;
            _this.goodsList.splice(index, 1);
        }
    },
    mounted (){
        // this.totalNum = this.goodsList.length;
        var myScroll = new IScroll('#wrapper',{
            mouseWheel: true,
            // scrollbars: true,
            tap:true
        });
        
    }
}
</script>