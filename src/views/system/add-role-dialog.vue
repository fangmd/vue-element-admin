<template>
  <div class="root">
    <el-dialog
      :visible.sync="dialogVisible"
      :destroy-on-close="true"
      width="500px"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <el-form
        :model="formData"
        :rules="formRules"
        :validate-on-rule-change="false"
        label-width="100px"
        ref="form"
        size="small"
      >
        <el-form-item label="名称" prop="roleName">
          <el-input v-model="formData.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="介绍" prop="roleDescription">
          <el-input v-model="formData.roleDescription" placeholder="请输入角色介绍" />
        </el-form-item>
        <el-form-item label="权限">
          <div class="roles-tree">
            <el-tree :data="menus" :props="defaultProps" node-key="id" ref="rolesTree" show-checkbox />
          </div>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add" :loading="submitLoading">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addRole, roleMenus, editRole } from '@/api/system'

export default {
  name: 'AddRoleDialog',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    roleData: undefined, // edit 的时候有数据
  },
  watch: {
    show(newVal) {
      this.dialogVisible = newVal
    },
    dialogVisible(newVal) {
      this.$emit('update:show', newVal)
      if (newVal) {
        this.initDialog()
      }
    },
  },
  data() {
    return {
      submitLoading: false,
      dialogVisible: false,
      formData: {
        roleName: '',
        roleDescription: '',
      },
      menus: [], // 菜单
      defaultProps: {
        children: 'children',
        label: 'menuName',
      },
      formRules: {
        roleName: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: 'blur',
          },
        ],
        roleDescription: [
          {
            required: true,
            message: '请输入角色介绍',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  mounted() {
    this.getAdminMenuTreeList()
  },
  methods: {
    initDialog() {
      this.$nextTick(function() {
        if (this.roleData) {
          this.formData.roleName = this.roleData.roleName
          this.formData.roleDescription = this.roleData.roleDescription
          this.$refs.rolesTree.setCheckedKeys(this.roleData.menuIds.split(','))
        } else {
          this.formData.roleName = ''
          this.formData.roleDescription = ''
          this.$refs.rolesTree.setCheckedKeys([])
        }
      })
    },
    getAdminMenuTreeList() {
      roleMenus().then(({ data }) => {
        const parseLocal = menus => {
          menus.forEach(menu => {
            menu.menuName = this.$t(`Router.${menu.menuTitle}`)
            if (menu.children && menu.children.length > 0) {
              parseLocal(menu.children)
            }
          })
        }
        parseLocal(data.list)
        this.menus = data.list
      })
    },
    add() {
      this.formData.menuIds = this.$refs.rolesTree.getCheckedKeys()
      this.$refs['form'].validate(valid => {
        if (valid) {
          const postData = { ...this.formData }
          postData.menuIds = postData.menuIds.join()
          if (!postData.menuIds) {
            postData.menuIds = '-'
          }

          if (this.roleData) {
            postData.id = this.roleData.id
            this.editCore(postData)
          } else {
            this.addCore(postData)
          }
        } else {
          return false
        }
      })
    },
    addCore(postData) {
      this.submitLoading = true
      addRole(postData)
        .then(res => {
          this.$emit('update:show', false)
          this.$emit('reload')
          this.submitLoading = false
        })
        .catch(e => {
          this.submitLoading = false
        })
    },
    editCore(postData) {
      this.submitLoading = true
      editRole(postData)
        .then(res => {
          this.$emit('update:show', false)
          this.$emit('reload')
          this.submitLoading = false
        })
        .catch(_ => {
          this.submitLoading = false
        })
    },
    handleClose(done) {
      done()
    },
  },
}
</script>

<style lang="less" scoped></style>
