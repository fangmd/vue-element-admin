<template>
  <div class="root">
    <div class="table-header">
      <search-input @search="getDatas" :keyword.sync="listQuery.keyword" placeholder="请输入昵称、账户" />
      <el-button class="btn" @click="add" type="primary">添加</el-button>
    </div>

    <el-card shadow="always">
      <el-table :data="datas" size="medium">
        <el-table-column label="昵称" prop="nickname" />
        <el-table-column label="账户" prop="username" />
        <el-table-column label="角色" prop="role.roleName" />
        <el-table-column label="状态" prop="status">
          <template slot-scope="{ row }">
            <span>{{ row.status | parseStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="activity_desc_b" width="300">
          <template slot-scope="{ row }">
            <el-button @click="edit(row)">编辑</el-button>
            <el-button @click="deleteRow(row)" type="warning">删除</el-button>
            <el-button @click="changeStatus(row)" type="warning" v-if="row.status === 1">禁用</el-button>
            <el-button @click="changeStatus(row)" type="success" v-else>启用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :limit.sync="listQuery.rows"
        :page.sync="listQuery.page"
        :total="total"
        @pagination="getDatas"
        v-show="total > 0"
      />
    </el-card>
    <add-manage-dialog
      :show.sync="showAddDialog"
      :inputData="editRow"
      @reload="getDatas"
      :roles="roles"
    ></add-manage-dialog>
  </div>
</template>

<script>
import { managerList, roleList, deleteManager, editManager } from '@/api/system'
import TableMixins from '@/mixins/table-mixins'
import AddManageDialog from './add-manage-dialog'

// 用户管理
export default {
  name: 'UserManage',
  components: { AddManageDialog },
  mixins: [TableMixins],
  data() {
    return {
      showAddDialog: false,
      editRow: undefined,
      roles: [],
    }
  },
  mounted() {
    roleList().then(res => {
      this.roles = res.data.list
    })
  },
  methods: {
    getDatas() {
      this.listQuery.selectedCoinName = this.selectedCoinName
      managerList(this.listQuery)
        .then(res => {
          this.datas = res.data.list
          this.total = res.data.totalCnt
        })
        .catch(e => {
          console.log(e)
        })
    },
    add() {
      this.showAddDialog = true
      this.editRow = undefined
    },
    edit(row) {
      this.editRow = row
      this.showAddDialog = true
    },
    deleteRow(row) {
      this.$confirm('删除管理员账号？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteManager({ id: row.id }).then(res => {
          this.getDatasMix()
        })
      })
    },
    changeStatus(row) {
      let newStatus = row.status === 1 ? 0 : 1
      editManager({
        id: row.id,
        status: newStatus,
      }).then(res => {
        this.getDatasMix()
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
