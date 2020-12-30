<template>
  <el-image class="table-avatar" :src="imgUrl">
    <div slot="error">
      <el-image v-if="errorImg" :src="errorImg" />
      <el-image v-else :src="require('@/assets/img/default_avatar.png')" />
    </div>
  </el-image>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    imgUrl: {
      type: String,
    },
    errorImg: {
      type: String,
    },
  },
}
</script>
