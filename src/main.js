// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import fetch from 'whatwg-fetch'

// 导入vuex
import store from './../store/store'

Vue.use(VueRouter)

const routes = [{
	    path: '/',
	    name: 'index',
	    // component: resolve => require(['./components/index.vue'], resolve)
	    component: view('index'),
	    title: '首页'
	}, {
	    path: '/order',
	    name: 'order',
	    component: view('order')
	}, {
		path: '/product/list/:deviceId/:dataId',
	    name: 'product-list',
	    component: view('product-list')
	}, {
	    path: '/product/details/:deviceId/:dataId',
	    name: 'product-details',
	    component: view('product-details')
	}, {
	    path: '/cart',
	    name: 'cart',
	    component: view('cart')
	}, {
	    path: '/address/edit/:userName/:provinceCode/:cityCode/:districtCode/:isDefault/:userMobile/:addressStatus/:addressNo',
	    name: 'edit-address',
	    component: view('edit-address')
	}, {
	    path: '/address/add/:userId',
	    name: 'add-address',
	    component: view('add-address')
	}, {
	    path: '/address/select/:userId',
	    name: 'select-address',
	    component: view('select-address')
	}, {
	    path: '/address/manage',
	    name: 'manage-address',
	    component: view('manage-address')
	}, {
	    path: '/order/center',
	    name: 'order-center',
	    component: view('order-center')
	}, {
	    path: '/order/list',
	    name: 'order-list',
	    component: view('order-list')
	}

]

const router = new VueRouter({
  routes
})
router.afterEach(function (to) {
	console.log('-->',to)
    if (to.name) {
        document.title = to.name;
    }
});
/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * @param  {string}   name     the filename (basename) of the view to load.
 */
function view(name) {
  return function(resolve) {
    require(['./components/' + name + '.vue'], resolve);
  }
};



FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
