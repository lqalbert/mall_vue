// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import VModal from 'vue-js-modal'

// import Mock from './mock/mock';

Vue.use(VModal);
// Vue.use($);

// console.log(store);

import newDialog from './components/common/Dialog';
import InitObject from './mix/InitObjectFromObject';
import Delete from './mix/Delete';
import VueAreaLinkage from 'vue-area-linkage';

Vue.use(VueAreaLinkage);
Vue.component('MyDialog',newDialog);

Vue.mixin(InitObject);
Vue.mixin(Delete);

Vue.use(ElementUI);


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store: store,
    template: '<App/>',
    components: { App }
})
