<template>
  <div class="root">
    <el-date-picker class="month-filter" v-model="selectedMonthInner" type="month" placeholder="选择月份" />
  </div>
</template>

<script>
import { getMonthStart, getMonthEnd } from '@/utils'
import dayjs from 'dayjs'

export default {
  name: 'MonthFilter',
  props: {
    selectedMonth: undefined,
  },
  data() {
    return {
      selectedMonthInner: '',
    }
  },
  watch: {
    selectedMonth: {
      handler: function(newVal) {
        if (!newVal) {
          this.selectedMonthInner = ''
        }
      },
    },
    selectedMonthInner: {
      handler: function(newVal) {
        console.log(newVal)
        if (newVal) {
          this.$emit('start-time', getMonthStart(newVal.getTime()))
          this.$emit('end-time', getMonthEnd(newVal.getTime()))
        } else {
          this.$emit('start-time', '')
          this.$emit('end-time', '')
        }
        this.$emit('update:selected-month', newVal)
      },
    },
  },
  mounted() {
    this.selectedMonthInner = new Date()
    this.$nextTick(() => {
      this.$emit('start-time', getMonthStart(this.selectedMonthInner.getTime()))
      this.$emit('end-time', getMonthEnd(this.selectedMonthInner.getTime()))
    })
  },
}
</script>

<style lang="less" scoped>
.root {
  display: inline-block;
  font-size: 14px;
  margin: 0 10px;
  padding: 10px 0;

  .month-filter {
    width: 240px;
  }
}
</style>
