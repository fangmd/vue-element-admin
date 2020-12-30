<template>
  <div class="layout">
    <el-container>
      <el-aside width="auto;">
        <sider-menu />
      </el-aside>
      <el-container>
        <el-header>
          <nav-bar />
        </el-header>
        <el-main>
          <breadcrumb />
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavBar from './nav-bar.vue'
import SiderMenu from './sider-bar.vue'
import Breadcrumb from '@/components/breadcrumb'

export default {
  name: 'Layout',
  components: {
    NavBar,
    SiderMenu,
    Breadcrumb,
  },
  data() {
    return {}
  },
}
</script>

<style lang="less">
.el-header {
  padding: 0 0 !important;
  background: #2b2f3a;
}
</style>
