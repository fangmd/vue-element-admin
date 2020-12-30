<template>
  <div style="cursor: pointer;" class="root">
    <el-image :key="index" :src="url" @click="handelImgClick(index)" v-for="(url, index) in parseList" fit="scale-down">
      <!-- style="width: 100px; height: 100px;margin-right: 5px;" -->
      <div class="image-slot" slot="error" v-if="errorImg">
        <el-image :src="errorImg" />
        <!-- style="width: 100px; height: 100px;margin-right: 5px;"  -->
      </div>
    </el-image>
    <image-viewer :index.sync="currentIndex" :on-close="closeViewer" :url-list="parseList" v-if="showViewer" />
  </div>
</template>

<script>
import ImageViewer from './image-viewer.vue'

export default {
  name: 'ImgListView',
  components: {
    ImageViewer,
  },
  props: {
    errorImg: {
      type: [String],
      default: '',
    },
    imgs: {
      type: [Array, String],
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      showViewer: false,
      currentIndex: 0,
    }
  },
  computed: {
    parseList() {
      if (typeof this.imgs === 'string') {
        return [this.imgs]
      }
      return this.imgs
    },
  },
  methods: {
    handelImgClick(index) {
      this.showViewer = true
      this.currentIndex = index
    },
    closeViewer() {
      this.showViewer = false
    },
  },
}
</script>

<style lang="less" scoped>
.root {
  width: 100%;
  height: 100%;
  .el-image {
    width: 100%;
    height: 100%;
  }
}
</style>
