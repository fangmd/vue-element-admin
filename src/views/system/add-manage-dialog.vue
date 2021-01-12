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
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="formData.nickname" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="formData.roleId" placeholder="请选择角色">
            <el-option v-for="(item, index) in roles" :key="index" :label="item.roleName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="formData.password" placeholder="请输入密码" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add" :loading="submitLoading">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addManager, editManager } from '@/api/system'

export default {
  name: 'AddManageDialog',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    roles: undefined,
    inputData: undefined, // edit 的时候有数据
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
    inputData: {
      handler(newVal) {
        this.formRules = this.inputData ? this.editFormRules : this.addFormRules
      },
    },
  },
  data() {
    return {
      submitLoading: false,
      dialogVisible: false,
      formData: {
        username: '',
        password: '',
        roleId: '',
        nickname: '',
      },
      formRules: {},
      addFormRules: {
        nickname: [
          {
            required: true,
            message: '请输入昵称',
            trigger: 'blur',
          },
        ],
        username: [
          {
            required: true,
            message: '请输入账号名',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
        ],
        roleId: [
          {
            required: true,
            message: '请选择角色',
            trigger: 'blur',
          },
        ],
      },
      editFormRules: {
        nickname: [
          {
            required: true,
            message: '请输入昵称',
            trigger: 'blur',
          },
        ],
        username: [
          {
            required: true,
            message: '请输入账号名',
            trigger: 'blur',
          },
        ],
        roleId: [
          {
            required: true,
            message: '请选择角色',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  mounted() {
    this.formRules = this.addFormRules
  },
  methods: {
    initDialog() {
      if (this.inputData) {
        this.formData.username = this.inputData.username
        this.formData.password = this.inputData.password
        this.formData.roleId = this.inputData.roleId
        this.formData.nickname = this.inputData.nickname
      }
    },
    add() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          const postData = { ...this.formData }
          if (this.inputData) {
            postData.id = this.inputData.id
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
      addManager(postData)
        .then(res => {
          this.$emit('update:show', false)
          this.$emit('reload')
          this.submitLoading = false
        })
        .catch(_ => {
          this.submitLoading = false
        })
    },
    editCore(postData) {
      this.submitLoading = true
      editManager(postData)
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
      this.formData.username = ''
      this.formData.password = ''
      this.formData.roleId = ''
      this.formData.nickname = ''
      done()
    },
  },
}
</script>

<style lang="less" scoped></style>
