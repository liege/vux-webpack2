<template>
    <div class="container edit-address-container">
        <toast v-model="toastShow">操作成功</toast>
        <group label-width="4.5em" label-margin-right="2em" label-align="right">
            <x-input title="收货人" v-model="userName" placeholder="请输入收货人"></x-input>
            <x-input title="手机号码" v-model="userMobile" placeholder="请输入手机号码"></x-input>
            <x-address title="省市地区" v-model="addressValue" placeholder="请点击选择" raw-value :list="addressData" value-text-align="left"></x-address>
            <x-textarea title="详细信息" v-model="addressDetail" placeholder="请填写详细信息" :show-counter="false" :rows="3"></x-textarea>
<!--             <x-switch title="选择"></x-switch> -->
        </group>
        <footer>

            <div>设置为默认地址</div>

            <div class="on-off" :class="{'on-off-active': showDefault}" @click="showDefault = !showDefault">
            </div>
        </footer>
        <div class="control" @click="addAddress()">
            <box gap="10px 10px"><x-button type="primary">保存并使用</x-button></box>
        </div>
    </div>
</template>

<style lang="less">
.edit-address-container{ 
    .weui-cells {
        margin-top: 0!important;
    }
}
</style>

<script type="text/javascript">
import {Toast, XButton, Box, GroupTitle, Group, Flexbox, FlexboxItem, Divider, Cell, XInput, Selector, PopupPicker, Datetime, XNumber, ChinaAddressData, XAddress, XTextarea, XSwitch } from 'vux'
export default {
    data: function(){
        return {
            operatorNo: '',
            userName: '',
            userMobile: '',
            provinceCode: '',
            cityCode: '',
            districtCode: '',
            addressDetail: '',
            isDefault: '',
            connChannel: 'GW',
            showDefault: 0,
            addressData: ChinaAddressData,
            addressValue: ["上海市", "直辖市", "杨浦区"],
            // addressValue: this.getName(["310000", "310100", "310101"]),
            toastShow: false
        }
    },
    created: function(){

    },
    components: {
        Toast,
        XButton,
        Box,
        GroupTitle,
        Group,
        Flexbox,
        FlexboxItem,
        Divider,
        Cell,
        XInput,
        Selector,
        PopupPicker,
        XAddress,
        Datetime,
        XNumber,
        XTextarea,
        XSwitch
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
       test: function(){
            console.log(this.nameInp);
        },
        addAddress () {
            // return console.log(this.$route.params.userId);
            var self = this;
            // 修改
            fetch(GET(BASEURL + '/bill-steward/user/userShippingAddressCreate',
                    {
                        operatorNo: this.$route.params.userId,
                        userName: self.userName,
                        userMobile: self.userMobile,
                        provinceCode: self.addressValue[0],
                        cityCode: self.addressValue[1],
                        districtCode: self.addressValue[2],
                        addressDetail: self.addressDetail,
                        isDefault: self.showDefault? 'Y' : 'N',
                        connChannel: 'GW',
                    }
                )
            )
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if(data.success) {
                    var list = data.result;
                    self.toastShow = true;
                    // self.$router.push('/')
                    // self.fetchAddressList();
                }else {
                    alert(data.responseDesc)
                }
            }).catch((error) => {
                alert(error);
            });
        },
        getName (value) {
            return value2name(value, ChinaAddressV3Data)
        }
    },
    mounted:function(){
        
    }
}
</script>