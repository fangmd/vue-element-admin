import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
console.log(`Debug Mode: ${debug}, Mock Mode: ${process.env.VUE_APP_MOCK}`)

export default new Vuex.Store({
  strict: debug,
  modules: { user: user },
})
