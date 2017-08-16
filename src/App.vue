<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import './lib/hotcss.js';
import './sass/base.scss';
import './sass/common.scss';
export default {
  name: 'app'
}
</script>

<style lang="less">
// style

@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
