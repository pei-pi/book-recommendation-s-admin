import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import 'core-js';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import Axios from 'axios'

import '@/styles/index.scss' // global css


import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(ElementUI)
const axiosInstance = Axios.create({ 
  baseURL: 'http://localhost:8090', 
});
Vue.prototype.$axios = axiosInstance;

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

export default axiosInstance;