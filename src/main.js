import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import 'jquery'
import '@/assets/index.css'
import Cookies from 'js-cookie';

Object.defineProperty(Vue.prototype, "$Cookies", { value: Cookies });

Vue.use(Vuex)
Vue.use(iView);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
