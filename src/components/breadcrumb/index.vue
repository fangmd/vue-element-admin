<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="(item, index) in pathArray" :key="index" :to="{ path: item.path }">{{
      item.name
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {},
  data() {
    return {
      pathArray: [],
    }
  },
  watch: {
    $route(to, from) {
      this.udpateRoute()
    },
  },
  mounted() {
    this.udpateRoute()
  },
  methods: {
    udpateRoute() {
      this.pathArray = []

      if (this.$route.path === '/') {
        this.pathArray = []
        return
      }

      this.pathArray.push({
        name: '首页',
        path: '/',
      })

      if (this.$route.path === '/member/memberinfo') {
        this.pathArray.push({
          name: '信息管理',
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  height: 30px;
}
</style>
