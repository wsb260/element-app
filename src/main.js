import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(router)
// eslint-disable-next-line no-debugger
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
