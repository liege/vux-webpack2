<template>
    <div class="container order-list-container">12
<tab>
      <tab-item selected @on-item-click="onItemClick">已发货</tab-item>
      <tab-item @on-item-click="onItemClick">未发货</tab-item>
      <tab-item @on-item-click="onItemClick">全部订单</tab-item>
</tab>
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