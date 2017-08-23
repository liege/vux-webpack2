<template>
    <div class="container select-address-container">
        <toast v-model="toastShow">操作成功</toast>
        <ul class="address_list">
            <li v-for="(item,index) in addressList" @click="selectAddress(item)">
                <div :class="item.isDefault == 'Y' ? 'current' : ''"  class="name">
                    <div>{{item.userName}}</div>
                    <div>{{item.userMobile}}</div>
                    <span v-text="item.isDefault == 'Y' ? '默认' : ''"></span>
                </div>
                <div class="address_default">{{item.provinceName}} {{item.cityName}} {{item.districtName}} {{item.addressDetail}}</div>
                <div class="edit">
                    <router-link :to="{ name: 'edit-address', params: {userName: item.userName,provinceCode: item.provinceCode,cityCode: item.cityCode,districtCode: item.districtCode,isDefault: item.isDefault,userMobile: item.userMobile,addressStatus: 'Y',addressNo: item.addressNo}}">
                    <img src="../img/text.png">
                    </router-link>
                </div>
            </li>
        </ul>
        <div class="control" @click="addAddress()">
            <router-link :to="{name: 'add-address', params: {}}">
            <box gap="10px 10px"><x-button type="primary">+ 新建地址</x-button></box>
            </router-link>
        </div>
    </div>
</template>

<style lang="sass">


</style>

<script type="text/javascript">
import {Toast, Box, XButton} from 'vux';
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
        Toast,
        Box,
        XButton
    },
    created (){
        var slef = this;
        console.log('vuex select',this.$store.state.addressData.a)
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
        selectAddress () {
            this.$store.commit('setAddressData',arguments[0])
            this.toastShow = true;
            this.$router.push('/order');
        },
        onHide () {
            console.log('on hide')
        }
    },
    mounted (){
        this.fetchAddressList();
    }
}
</script>