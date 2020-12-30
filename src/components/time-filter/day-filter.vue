<template>
  <div class="root">
    <el-date-picker class="day-filter" v-model="selectedDayInner" type="daterange" placeholder="选择时间" />
  </div>
</template>

<script>
export default {
  name: 'DayFilter',
  props: {
    selectedDay: undefined,
  },
  data() {
    return {
      selectedDayInner: '',
    }
  },
  watch: {
    selectedDay: {
      handler: function(newVal) {
        if (!newVal) {
          this.selectedDayInner = ''
        }
      },
    },
    selectedDayInner: {
      handler: function(newVal) {
        if (newVal) {
          this.$emit('start-time', newVal[0].getTime() / 1000)
          this.$emit('end-time', newVal[1].getTime() / 1000 + 24 * 60 * 60)
        } else {
          this.$emit('start-time', '')
          this.$emit('end-time', '')
        }
        this.$emit('update:selected-day', newVal)
      },
    },
  },
}
</script>

<style lang="less" scoped>
.root {
  display: inline-block;
  font-size: 14px;
  margin: 0 10px;
  padding: 10px 0;

  .day-filter {
    width: 240px;
  }
}
</style>
