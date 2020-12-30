<template>
  <el-dropdown style="cursor: pointer;" @command="handleCommand">
    <span class="el-dropdown-link">
      {{ langMap[currentLang] }}
      <i class="el-icon-arrow-down el-icon--right" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh-CN">中文</el-dropdown-item>
      <el-dropdown-item command="en-US">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
import { getLanguage, setLanguage } from '@/utils'

// 多语言切换组件
export default {
  name: 'LanguageSelect',
  data() {
    return {
      currentLang: '',
      langMap: {
        'zh-CN': '中文',
        'en-US': 'English',
      },
    }
  },
  mounted() {
    this.currentLang = getLanguage()
  },
  methods: {
    handleCommand(command) {
      this.currentLang = command
      setLanguage(command)
      this.$i18n.locale = command
    },
  },
}
</script>
