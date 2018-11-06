import Vue from 'vue'
import Vuex from 'vuex'
import mobile from './modules/mobile'
Vue.use(Vuex);
const store = new Vuex.Store({
  strict: false,
  state: {},
  mutations: {

  },
  actions: {},
  modules: {
    mobile
  }
});

export default store
