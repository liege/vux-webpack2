<template>
    <div class="container order-list-container">
        <tab>
            <tab-item selected @on-item-click="onItemClick">全部</tab-item>
            <tab-item @on-item-click="onItemClick">待付款</tab-item>
            <tab-item @on-item-click="onItemClick">待发货</tab-item>
            <tab-item @on-item-click="onItemClick">待收货</tab-item>
            <tab-item @on-item-click="onItemClick">已完成</tab-item>
        </tab>

        <ul class="order-list">
            <li>
                <div class="title">2017-08-17 17:48:50<span class="status">状态</span></div>
            </li>
        </ul>
    </div>
</template>

<style lang="sass">


</style>

<script type="text/javascript">
import { Tab, TabItem } from 'vux';

export default {
  name: 'hello',
  data () {
    return {
    }
  },
  components: {
    Tab,
    TabItem
  },
  created () {
    // console.log(TouchSlide)
  },
  mounted () {
  },
  methods: {
    onItemClick (index) {
      console.log('on item click:', index)
    }
  }
}

</script>