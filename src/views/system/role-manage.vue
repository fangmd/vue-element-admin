<template>
  <div class="root">
    <div class="table-header">
      <search-input @search="getDatas" :keyword.sync="listQuery.keyword" placeholder="请输入角色名称" />
      <el-button class="btn" @click="add" type="primary">添加</el-button>
    </div>

    <el-card shadow="always">
      <el-table :data="datas" size="medium">
        <el-table-column label type="index" width="50" />
        <el-table-column label="名称" prop="roleName" />
        <el-table-column label="介绍" prop="roleDescription" />
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button @click="edit(row)">编辑</el-button>
            <el-button @click="deleteRole(row)" type="warning">删除</el-button>
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

    <add-role-dialog :show.sync="showAddDialog" :roleData="editRole" @reload="getDatas"></add-role-dialog>
  </div>
</template>

<script>
import { roleList, deleteRole } from '@/api/system'
import TableMixins from '@/mixins/table-mixins'
import Pagination from '@/components/pagination'
import SearchInput from '@/components/search-input'
import AddRoleDialog from './add-role-dialog'

// 角色管理
export default {
  name: 'RoleManage',
  components: {
    Pagination,
    SearchInput,
    AddRoleDialog,
  },
  mixins: [TableMixins],
  data() {
    return {
      showAddDialog: false,
      editRole: undefined, // 编辑时，编辑角色
    }
  },
  methods: {
    getDatas() {
      roleList(this.listQuery)
        .then(res => {
          this.datas = res.data.list
          this.total = res.data.totalCnt
        })
        .catch(e => {
          console.log(e)
        })
    },
    add() {
      this.editRole = undefined
      this.showAddDialog = true
    },
    edit(row) {
      this.editRole = row
      this.showAddDialog = true
    },
    deleteRole(row) {
      deleteRole({ id: row.id })
        .then(rep => {
          this.getDatasMix()
        })
        .catch(_ => {})
    },
  },
}
</script>

<style lang="less" scoped></style>
