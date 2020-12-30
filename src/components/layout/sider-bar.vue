<template>
  <div class="sider-bar">
    <div class="sider-logo">
      <router-link to="/"> <span class="logo">XXX</span> 后台管理 </router-link>
    </div>
    <el-menu
      :default-active="active"
      :unique-opened="true"
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="sider-menu"
      text-color="#fff"
    >
      <template v-for="menu in routers">
        <el-submenu :index="menu.path" :key="menu.path" v-if="menu.meta.hidden !== true">
          <template slot="title">
            <span>{{ $t(`Router.${menu.meta.title}`) }}</span>
          </template>
          <el-menu-item-group :key="menuItem.path" v-for="menuItem in menu.children">
            <el-menu-item :index="menu.path + '/' + menuItem.path" @click="toLink(menu.path, menuItem.path)">{{
              menuItem.meta ? $t(`Router.${menuItem.meta.title}`) : ''
            }}</el-menu-item>
            <!-- v-if="menuItem.meta.public !== true" -->
          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { routers } from '@/router'
import store from '@/store'

// 菜单栏
export default {
  name: 'SiderBar',
  computed: {
    active() {
      return this.$route.path
    },
    routers() {
      let rs = store.getters['user/sideMenu']
      for (let i in rs) {
        if (rs[i].children && rs[i].children instanceof Array) {
          rs[i].children = rs[i].children.filter(item => {
            return !item.meta.hidden
          })
        }
      }
      return rs
    },
  },
  created() {},
  methods: {
    toLink(ppath, path) {
      this.$router.push(ppath + '/' + path)
    },
  },
}
</script>

<style lang="less" scoped>
.sider-menu {
  height: calc(100vh - 60px);
  overflow-y: auto;
}

.sider-logo {
  background: #2b2f3a;
  width: calc(100%);
  height: 60px;
  line-height: 60px;
  color: #ffffff;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  .logo {
    font-size: 30px;
    line-height: 60px;
    font-family: Impact;
    color: #cc985b;
  }
}

a {
  color: white;
  text-decoration: none;
}
</style>
