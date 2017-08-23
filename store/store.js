import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        addressData: ''
    },
    mutations: {
        setAddressData (state, data) {
            state.addressData = data;
        }
    }
});

export default store