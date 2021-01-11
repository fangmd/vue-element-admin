<template>
  <div class="nav-bar">
    <div class="nav-breadcrumb" />
    <div class="nav-action">
      <!-- <language-select />&nbsp;
      Welcome-->
      <span>欢迎 {{ userName }}</span
      >&nbsp;
      <el-button class="logout" type="text" @click="handleLoginOut">{{ $t('LoginOut') }}</el-button>
    </div>
  </div>
</template>

<script>
// import LanguageSelect from './language-Select'
import store from '@/store'

export default {
  name: 'NavBar',
  components: {
    // LanguageSelect,
  },
  data() {
    return {}
  },
  computed: {
    userName() {
      return store.state.user.userInfo.username
    },
  },
  methods: {
    handleLoginOut() {
      this.$confirm(this.$t('Msg.LoginOutConfirm'))
        .then(() => {
          store.commit('user/loginOut')
        })
        .catch(e => {
          console.log(e)
        })
    },
  },
}
</script>

<style lang="less" scoped>
.nav-bar {
  height: 100%;
  // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  // padding: 0 15px;
  // background: #fff;
  color: #fff;
}

.logout {
  margin: 0 40px;
  color: #fff;
}
</style>
