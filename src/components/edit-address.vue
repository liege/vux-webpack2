<template>
    <div class="container edit-address-container">
        <group label-width="4.5em" label-margin-right="2em" label-align="right">
            <x-input title="收货人" v-model="userName" placeholder="请输入收货人"></x-input>
            <x-input title="手机号码" v-model="userMobile" placeholder="请输入手机号码"></x-input>
            <x-address title="省市地区" v-model="addressValue" raw-value :list="addressData" value-text-align="left"></x-address>
            <x-textarea title="详细信息" placeholder="请填写详细信息" :show-counter="false" :rows="3"></x-textarea>
<!--             <x-switch title="选择"></x-switch> -->
        </group>
        <footer>

            <div>设置为默认地址</div>

            <div class="on-off" :class="{'on-off-active': showDefault}" @click="showDefault = !showDefault">
            </div>
        </footer>
        <div class="control" @click="updataAddress(userName,provinceCode,cityCode,districtCode,isDefault,userMobile,'Y',addressNo)">
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
import { XButton, Box, GroupTitle, Group, Flexbox, FlexboxItem, Divider, Cell, XInput, Selector, PopupPicker, Datetime, XNumber, ChinaAddressData, XAddress, XTextarea, XSwitch } from 'vux'
export default {
    data: function(){
        return {
            userName: this.$route.params.userName,
            provinceCode: this.$route.params.provinceCode,
            cityCode: this.$route.params.cityCode,
            districtCode: this.$route.params.districtCode,
            isDefault: this.$route.params.isDefault,
            userMobile: this.$route.params.userMobile,
            addressStatus: this.$route.params.addressStatus,
            addressNo: this.$route.params.addressNo,
            showDefault: 0,
            addressData: ChinaAddressData,
            addressValue: [this.$route.params.cityCode + '市', '上海市', '杨浦区'],
        }
    },
    created: function(){

    },
    components: {
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
        updataAddress () {
            return console.log(this.addressValue);
            var self = this;
            // 地址列表
            fetch(GET(BASEURL + '/bill-steward/user/userShippingAddressManage',
                    {
                        userName: self.userName,
                        provinceCode: self.provinceCode,
                        cityCode: self.cityCode,
                        districtCode: self.districtCode,
                        isDefault: self.isDefault,
                        userMobile: self.userMobile,
                        addressStatus: 'Y',
                        addressNo: self.addressNo
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
        },
    },
    mounted:function(){
        
    }
}
</script>