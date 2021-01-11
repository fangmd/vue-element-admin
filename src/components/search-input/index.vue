<template>
  <span class="root">
    <span class="search-input">
      <el-input
        class="input"
        :placeholder="placeholder"
        @keyup.enter.native="confirm"
        v-model="innerKeyword"
        prefix-icon="el-icon-search"
      />
    </span>

    <el-button class="search-btn" @click="confirm" type="primary">搜索</el-button>
  </span>
</template>

<script>
export default {
  name: 'SearchInput',
  props: {
    placeholder: {
      type: String,
      default: '请输入搜索内容',
    },
    keyword: {
      type: String,
      default: '',
    },
    getDatas: undefined,
  },
  data() {
    return {
      innerKeyword: '',
    }
  },
  watch: {
    keyword(newVal) {
      this.innerKeyword = newVal
    },
    innerKeyword(newVal) {
      this.$emit('update:keyword', newVal)
    },
  },
  computed: {},
  methods: {
    confirm() {
      this.$emit('search')
    },
  },
}
</script>

<style lang="less" scoped>
.root {
  .search-input {
    display: inline-block;
    padding: 10px 0;
    width: 250px;
  }
  .input {
    display: inline-block;
  }
  .search-btn {
    transform: translate(-4px, 0);
  }
}
</style>
