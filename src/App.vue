<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import './lib/hotcss.js';
import './lib/iscroll-probe.js';
import './sass/base.scss';
import './sass/common.scss';
export default {
  name: 'app',
  methods: {

  }
}

window.GET = (url,params) => {
	    let paramsArray = [];  
	    //拼接参数  
	    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))  
	    if (url.search(/\?/) === -1) {  
	        url += '?' + paramsArray.join('&')  
	    } else {  
	        url += '&' + paramsArray.join('&')  
	    }
	    return url;
	}
</script>

<style lang="less">
// style

@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
