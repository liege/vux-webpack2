<template>
    <div class="container manage_address-container">
        <toast v-model="toastShow">操作成功</toast>
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
                        <div @click="delAddress(item.userName,item.provinceCode,item.cityCode,item.districtCode,item.isDefault,item.userPhone,'N',item.addressNo)">
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
import {Toast} from 'vux';
export default {
    data () {
        return {
            addressList: '',
            userName: '',
            provinceCode: '',
            cityCode: '',
            districtCode: '',
            isDefault: '',
            userPhone: '',
            addressStatus: '',
            addressNo: '',
            toastShow: false
        }
    },
    components: {
        Toast
    },
    created (){
        var slef = this;
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
        //     slef.addressList = list;
        //   }).catch(() => {
        //        alert('error');
        //   });


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
        fetchAddressList () {
            var self = this;
            // 地址列表
            fetch(GET(BASEURL + '/bill-steward/user/queryUserShippingAddress',
                    {
                        operatorNo:'51000001093876'
                    }
                )
            )
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if(data.success) {
                    var list = data.result;
                    self.addressList = list;
                }else {
                    alert(data.responseDesc)
                }
            }).catch((error) => {
                alert(error);
            });
        },
        delAddress () {
            // return console.log(arguments[0]);
            var self = this;
            // 地址列表
            fetch(GET(BASEURL + '/bill-steward/user/userShippingAddressManage',
                    {
                        userName: arguments[0],
                        provinceCode: arguments[1],
                        cityCode: arguments[2],
                        districtCode: arguments[3],
                        isDefault: arguments[4],
                        userPhone: arguments[5],
                        addressStatus: arguments[6],
                        addressNo: arguments[7]
                    }
                )
            )
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if(data.success) {
                    var list = data.result;
                    self.toastShow = true;
                    self.fetchAddressList();
                }else {
                    alert(data.responseDesc)
                }
            }).catch((error) => {
                alert(error);
            });
        },
        onHide () {
            console.log('on hide')
        },
    },
    mounted (){
        this.fetchAddressList();
    }
}
</script>