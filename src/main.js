import './assets/main.scss'

import Vue from 'vue'

import App from './App.vue'
import router from './router'
import axios from './helpers/axios'
import Vuex from 'vuex';

Vue.use(Vuex);
Vue.use(axios);


const store = new Vuex.Store({
  state() {
    return {
      rules: '',
      unique_code: '',
    }
  },
  mutations: {
    setRules(state, rules) {
      state.rules = rules
    },
    setCode(state, unique_code) {
      state.unique_code = unique_code
    },
  }
});



const app = new Vue({
  router,
  store,
  render: (h) => h(App)
})


// app.config.globalProperties.$axios = axios;

app.$axios.get('device_code').then((response) => {
  store.commit('setCode', response.data && response.data.code ? response.data.code : '')
})

app.$mount('#app')

let loadRules = () => {
  app.$axios.get('api/GetRules').then((response) => {
    store.commit('setRules', response.data && response.data.message ? response.data.message : '')
  })
}
setInterval(loadRules, 60 * 1000)
loadRules()
