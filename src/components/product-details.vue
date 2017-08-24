<template>
    <div class="container product-details-container">
        <!-- 焦点图 -->
        <swiper :list="bannerList" height="260px" auto dots-class="custom-bottom" dots-position="center" :show-desc-mask="false"></swiper>
        <div class="trade_box">
            <div class="trade_title">
                <p class="title">{{goodsData.goodsName}}</p>
                <p class="trade_name">{{goodsData.summary}}</p>
                <p class="price">￥{{goodsData.activityPrice}} <span>市场价 <i>￥{{goodsData.goodsPrice}}</i></span></p>
            </div>
            <div class="t_option">
                <div class="t_size" @click="ScaleSize">
                    <span  v-text='Choice'></span>
                    <!-- <span v-else='show' v-text='myChoice'></span> -->
                    <i class="entrance_icon"></i>
                </div>
                <div class="parameter" @click="ViewParameters"><span>产品参数</span><i class="entrance_icon"></i></div>
            </div>
        </div>
        <div class="t_details clearfix">
            <p class="details_tit"><span>商品详情</span></p>
            <img src="http://placehold.it/170x170" width="100%">
            <img src="http://placehold.it/170x170" width="100%">
            <img src="http://placehold.it/170x170" width="100%">
            <img src="http://placehold.it/170x170" width="100%">
            <img src="http://placehold.it/170x170" width="100%">
        </div>
        <div class="t_bottom menu">
            <div class="shopping_cart">
                <a href="#">
                <i><span v-if="sopCar">{{sopCar}}</span></i>
                <p>购物车</p></a>
            </div>
            <div class="add_cart" @click="add_cart">加入购物车</div>
            <div class="purchase">
                <router-link :to="{ name: 'order', params: { deviceId: 123, dataId:456 }}">立即购买</router-link></div>
        </div>
        <div class="Scale_modal" @click="close" @touchmove.prevent :class={modal_show:modal_show,bg:!isactive}>
            <div class="dv animated" @click="noclose($event)" :class="{fadeInDownBig:isactive,fadeInUpBig:!isactive}">
                <div class="parameter_select">
                    <div class="logo"><img :src="picUrl + goodsData.thumbnailAddr" alt=""></div>
                    <p class="merchandise_news">￥<span class="cost" >{{finalPrice}}</span>
                        <br/><span class="inventory" ><span v-text='inventory'>1345</span></span>
                        <br/>
                        <!-- <span class="at_present" v-if='show' v-text='Choice'></span> -->
                        <!-- <span class="at_present" v-else='show' v-text='myChoice'></span> -->
                    </p>
                </div>
                <div id="wrapper" class="size_select">
                    <div class="scroll_box">
                        <div>
                            <!-- 商品选择 -->
                            <div class="standard" >
                                <p class="standard_tit">规格</p>
                                <ul class="standard_list clearfix">
                                    <checker
                                    v-model="demo5"
                                    default-item-class="demo5-item"
                                    selected-item-class="demo5-item-selected"
                                    >
                                      <checker-item v-for="(item,index) in specificationsList" :key="i" :value="item.activityPrice">{{item.categoryName}}</checker-item>
                                    </checker>
                                </ul>
                            </div>
                        </div>
                        <div class="quantity">
                            <p>购买数量</p>
                            <div class="compute clearfix">
                                <div class="prep" @tap=prep()>-</div>
                                <div class="price">
                                    <input type="" name="" value="1" readonly="readonly" v-model='piece'>
                                </div>
                                <div class="plus" @tap=plus()>+</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="affirm" @click="close">完成</div>
            </div>
        </div>
        <div class="Parameters_modal" @click="close" @touchmove.prevent :class={modal_show:modal1_show,bg:!isactive}>
            <div class="dv animated" @click="noclose($event)" :class="{fadeInDownBig:isactive,fadeInUpBig:!isactive}">
                <div class="p_top">产品参数</div>
                <div class="p_middle" id="wrapper1">
                    <ul>
                        <li v-for="item in parameterList"><span class="taxon">{{item.name}}</span><span class="text">{{item.price}}</span></li>
                    </ul>
                </div>
                <div class="affirm" @click="close">完成</div>
            </div>
        </div>
    </div>
</template>

<style lang="sass">


</style>

<script type="text/javascript">
// import '../lib/TouchSlide.1.1.js';
import {Checker, CheckerItem, Swiper} from 'vux'

export default {
    data () {
        return {
            show:true,
            iscur: 0,
            iscur1: 0,
            sortId: [],
            Choice:'请选择',
            myChoice:'',
            inventory:'请选择规格',//库存
            price:[],
            piece:1,//商品件数
            sopCar:0,
            isactive: true,
            modal_show: false,
            modal1_show: false,
            select: '',
            parameterList:'',
            goodsData: '',
            bannerList: '',
            picUrl: BASEPICURL,
            specificationsList: '',
            goodsId: this.$route.params.dataId
        }
    },
    components: {
        Swiper,
        Checker,
        CheckerItem
    },
    created () {
        var self = this;
        // 商品列表
        fetch(GET(BASEURL + '/bill-steward/shopping/queryGoodsDetails',
                    {
                        goodsId:self.goodsId
                    }
                )
            )
            .then(response => response.json())
            .then(data => {
            var data = data.result[0]
            self.goodsData = data.goodsQueryRespVo   //商品简略信息
            self.specificationsList = data.goodsSpecificationsVoList  // 规格分类
            self.bannerList = data.goodsHighDefinitionPictureList.map((one, index) => ({
                url: 'javascript:',
                img: BASEPICURL + one.pictureAdd
            }))
            self.parameterList = data.categoryAttributeList
            console.log(self.goodsData)
        }).catch((error) => {
            console.error(error);
        });
    },
    mounted () {
        // TouchSlide({
        //     slideCell: "#focus",
        //     mainCell: ".bd ul",
        //     titCell: ".hd ul",
        //     effect: "left",
        //     autoPlay: true, //自动播放
        //     autoPage: true, //自动分页
        //     switchLoad: "_src" //切换加载，真实图片路径为"_src"
        // });
        console.log('this.select',this.select);
    },
    methods: {
        // 商品选择弹窗
        ScaleSize: function() {
            this.scroll = false;
            this.modal_show = true;
            this.isactive = false;
            this.da = true;
            // var myScroll = new IScroll('#wrapper', {
            //     mouseWheel: true,
            //     scrollbars: false,
            //     tap: true
            // });
        },
        // 关闭弹窗
        close: function() {
            var _this = this;
            this.isactive = true;
            setTimeout(function() {
                _this.modal_show = false;
                _this.modal1_show = false;
            }, 300)
        },
        // 不关闭弹窗，禁止冒泡
        noclose($event) {
            event.cancelBubble = true;
        },
        // 打开商品参数弹窗
        ViewParameters: function() {
            this.scroll = false;
            this.modal1_show = true;
            this.isactive = false;
            this.da = true;
            // this.isA=true;
            // var myScroll1 = new IScroll('#wrapper1', {
            //     mouseWheel: true,
            //     scrollbars: false,
            //     tap:true
            // });
        },
        add_cart:function(){
            console.log(myChoice.length,select.length)
            if(myChoice.length==select.length+1){
                this.sopCar++;
            }else{
                this.ScaleSize()
            }

        },
        // 减
        prep:function(){
            if(this.piece>1){
                this.piece--;
            }

            // console.log(this.piece);
        },
        // 加
        plus:function(){
            this.piece++;
        },
        init:function(){
            var _this=this;
            console.log(this.sortId);
            for(var i=0;i<select.length;i++){
                choice.push(select[i].title);
            }
            this.Choice=choice.join(" ")
            Vue.set(_this.price, 0, select[0].select1[0].price)
        }
    },
    computed: {
        finalPrice: function () {
            var num=0;
            for(var i=0;i<this.price.length;i++){
                num+= parseFloat(this.price[i])
            }
            return num;

        }
    }
}
</script>