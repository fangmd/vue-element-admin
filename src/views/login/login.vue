<template>
  <div class="login-container">
    <el-form
      :model="loginForm"
      :rules="loginRules"
      autocomplete="off"
      class="login-form"
      label-position="left"
      ref="loginForm"
    >
      <div class="title-container">
        <h3 class="title-logo">XXX</h3>
      </div>
      <el-form-item prop="username">
        <el-input
          autocomplete="off"
          name="username"
          placeholder="Username"
          ref="username"
          tabindex="1"
          type="text"
          v-model="loginForm.username"
        />
      </el-form-item>
      <el-tooltip content="大写锁定已打开" manual placement="right">
        <el-form-item prop="password">
          <el-input
            @keyup.enter.native="handleLogin"
            autocomplete="off"
            name="password"
            placeholder="Password"
            ref="password"
            tabindex="2"
            type="password"
            v-model="loginForm.password"
          />
        </el-form-item>
      </el-tooltip>
      <el-button
        :loading="loading"
        @click.native.prevent="handleLogin"
        style="width: 100%; margin-bottom: 30px"
        type="primary"
        >{{ $t('Login') }}</el-button
      >
    </el-form>
  </div>
</template>

<script>
import Store from '@/store'
import { adminLogin } from '@/api/admin'

// 登录页面
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: 'admin',
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入用户名',
          },
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入密码',
          },
        ],
      },
      loading: false,
      redirect: undefined,
    }
  },
  computed: {
    loacl() {
      return this.$i18n.locale
    },
  },
  watch: {
    loacl(newVal) {
      this.$refs.loginForm.resetFields()
      this.$forceUpdate()
    },
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    handleLogin() {
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          this.loading = true
          Store.dispatch('user/login', this.loginForm)
            .then(data => {
              this.loading = false
            })
            .catch(e => {
              console.log(e)
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style lang="less">
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #fff;
      height: 47px;
      caret-color: #fff;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #283443 inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .lang-select-area {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
}
</style>

<style lang="less" scoped>
.el-dropdown {
  color: #f2f2f2;
}
.login-container {
  min-height: 100vh;
  width: 100%;
  background-color: #2d3a4b;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #eee;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .title-logo {
      font-size: 50px;
      font-family: Impact;
      color: #cc985b;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
