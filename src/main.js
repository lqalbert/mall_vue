// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import VModal from 'vue-js-modal'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// import Mock from './mock/mock';

Vue.use(VModal);
// Vue.use($);
Vue.use(VueQuillEditor);
// console.log(store);
//console.log(VueQuillEditor);

import newDialog from './components/common/Dialog';
import InitObject from './mix/InitObjectFromObject';
import Delete from './mix/Delete';
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
