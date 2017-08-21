<template>
    <div class="container manage_address-container">
        <ul class="address_list">
            <li v-for="(item,index) in addressList">
                <div class="name">
                    <div>{{item.userName}}</div>
                    <div>{{item.userPhone}}</div>
                </div>
                <div class="address_default">{{item.cityCode}} {{item.districtCode}} {{item.provinceCode}}</div>
                <div class="text">
                    <div class="left">
                        <div>
                            <input id="btn_default" class="d-x-f" type="radio" name="theWay" value="1">
                            <label for="btn_default"></label>
                            <span>[默认地址]</span>
                        </div>
                        <div></div>
                    </div>
                    <div class="right">
                        <div>
                            <img src="../img/text.png"> 编辑
                        </div>
                        <div>
                            <img src="../img/delete.png"> 删除
                        </div>
                    </div>
                </div>
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
            addressList: ''
        }
    },
    init: function(){
        console.log('init');
        console.log('deviceid: ' + this.$route.params.deviceId);
        console.log('dataId: ' + this.$route.params.dataId);
    },
    created: function(){
        var that = this;
        // 分类菜单
        // fetch(BASEURL + '/bill-steward/user/queryUserShippingAddress' , {
        //     method:'POST',
        //     headers:{
        //          'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         operatorNo: '51000001093876'
        //     })
        // })
        // .then(function(response) {
        //     return response.text()
        // }).then(function(body) {
        //     var list = JSON.parse(body).result;
        //     console.log(list);
        //     that.addressList = list;
        //   }).catch(() => {
        //        alert('error');
        //   });

        // 分类菜单
        fetch(BASEURL + '/bill-steward/user/queryUserShippingAddress?operatorNo=51000001093876')
        .then(function(response) {
            return response.text()
        }).then(function(body) {
            var list = JSON.parse(body).result;
            console.log(list);
            that.addressList = list;
          }).catch(() => {
               alert('error');
          });
    },
    filters: {
        formatMoney:function (value) {
            var number = parseInt(value);
            return "￥"+(number/100).toFixed(2);
        }
    },
    computed: {
        
    },
    methods: {

    },
    mounted:function(){
        
    }
}
</script>