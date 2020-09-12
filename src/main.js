import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible/flexible'
import { Button } from 'mint-ui';

import router from './router'
import Header from './components/Header/Header.vue'
import store from './vuex/store';
import * as api from './api/index';
import i18n from './i18n'

Vue.config.productionTip = false

// 挂载api到Vue的原型对象上
Vue.prototype.$api = api;

Vue.component('HeaderGuide', Header)
Vue.component(Button.name, Button);

new Vue({
  render: h => h(App),
  router,
  i18n,
  store
}).$mount('#app')
