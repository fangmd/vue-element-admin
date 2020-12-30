import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'

import 'normalize.css'

import '@/assets/css/base.less'
import '@/assets/css/modify.css'
import '@/assets/css/biz.less'

import './plugins/element.js'

import i18n from './lang'

// 注册全局过滤器
import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  i18n,
}).$mount('#app')
