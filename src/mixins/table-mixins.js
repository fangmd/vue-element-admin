import Pagination from '@/components/pagination'
import SearchInput from '@/components/search-input'
// import FilterType from '@/components/filter-type'

// 表格页面基础类
// 子类需要实现 Methods: getDatas
export default {
  components: {
    Pagination,
    SearchInput,
    // FilterType,
  },
  data() {
    return {
      mixData: 'Hi TableMix',
      datas: [],
      lastListQuery: {},
      listQuery: {
        page: 1,
        rows: 20,
        keyword: '',
        start_time: '',
        end_time: '',
      },
      total: 0,
      lastJSON: '',
    }
  },
  created() {
    const { page, rows } = this.$route.query
    page && (this.$data.listQuery.page = Number(page))
    rows && (this.$data.listQuery.rows = Number(rows))
  },
  mounted() {
    this.getDatas && this.getDatas()
  },
  methods: {
    getDatasMix() {
      const newListQ = { ...this.listQuery }
      delete newListQ.page
      delete newListQ.rows
      const nowJSON = JSON.stringify(newListQ)
      if (nowJSON != this.lastJSON) {
        this.resetPage()
        this.lastJSON = nowJSON
      }
      this.getDatas && this.getDatas()
    },
    startTime(time) {
      this.listQuery.start_time = time
    },
    endTime(time) {
      this.listQuery.end_time = time
    },
    sort(val) {
      // 1=倒许 2=升序
      this.listQuery.sort = val
      this.getDatas && this.getDatas()
    },
    userStatusMix(val) {
      // 0=所有 1=可用 2=禁用
      this.listQuery.user_status = val
    },
    resetPage() {
      // 重制 Page 参数
      this.listQuery.page = 1
      this.listQuery.rows = 20
    },
  },
}
