<template>
    <div class="container manage_address-container">
        <toast v-model="toastShow">操作成功</toast>
        <ul class="address_list">
            <li v-for="(item,index) in addressList">
                <div class="name">
                    <div>{{item.userName}}</div>
                    <div>{{item.userMobile}}</div>
                </div>
                <div class="address_default">{{item.provinceName}} {{item.cityName}} {{item.districtName}} {{item.addressDetail}}</div>
                <div class="text">
                    <div class="left">
                        <div>
                            <input :class="item.isDefault == 'Y' ? 'checked' : 'unchecked'" id="btn_default" type="radio" name="theWay" value="1" @click="setDefault(item.userName,item.provinceCode,item.cityCode,item.districtCode,item.isDefault,item.userMobile,'Y',item.addressNo)">
                            <label for="btn_default"></label>
                            <span v-text="item.isDefault == 'Y' ? '默认地址' : '设为默认'"></span>
                        </div>
                        <div></div>
                    </div>
                    <div class="right">
                        <div>
                            <router-link :to="{ name: 'edit-address', params: {userName: item.userName,provinceCode: item.provinceCode,cityCode: item.cityCode,districtCode: item.districtCode,isDefault: item.isDefault,userMobile: item.userMobile,addressStatus: 'Y',addressNo: item.addressNo}}">
                            <img src="../img/text.png"> 编辑
                            </router-link>
                        </div>
                        <div @click="delAddress(item.userName,item.provinceCode,item.cityCode,item.districtCode,item.isDefault,item.userMobile,'N',item.addressNo)">
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
            userMobile: '',
            addressStatus: '',
            addressNo: '',
            toastShow: false,
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
                        userMobile: arguments[5],
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
        setDefault () {
            // return console.log(this.addressValue);
            var self = this;
            // 地址列表
            fetch(GET(BASEURL + '/bill-steward/user/userShippingAddressManage',
                    {
                        userName: arguments[0],
                        provinceCode: arguments[1],
                        cityCode: arguments[2],
                        districtCode: arguments[3],
                        isDefault: arguments[4],
                        userMobile: arguments[5],
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
                    // self.toastShow = true;
                    self.$router.push('/')
                    // self.fetchAddressList();
                }else {
                    alert(data.responseDesc)
                }
            }).catch((error) => {
                alert(error);
            });
        }
    },
    mounted (){
        this.fetchAddressList();
    }
}
</script>