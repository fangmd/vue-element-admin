<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Store from '@/store'
import { isLogin } from '@/utils'

export default {
  name: 'app',
  components: {},
  created() {
    this.initUser()
  },
  methods: {
    initUser() {
      if (isLogin()) {
        // load menu
        let menu = Store.state.user.userMenu
        if (menu.length === 0) {
          Store.dispatch('user/loadMenu')
        }
      }
    },
  },
}
</script>

<style lang="less">
#app {
  min-height: 100vh;
}
</style>
