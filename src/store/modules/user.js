import { adminMenus } from '@/api/admin'
import { CookieUtils, parseMenu } from '@/utils'
import { router } from '@/router/index'

// 用户相关
// 1. 用户信息
// 2. 菜单
export default {
  namespaced: true,
  state: {
    userMenu: [],
    userInfo: { nickname: '', admin_user_id: '' },
    isLogin: false,
  },
  // 提交数据
  mutations: {
    loginInit(state, data) {
      console.log('isLogined')
      state.userInfo.nickname = data.nickname
      state.userInfo.admin_user_id = data.admin_user_id
      state.userMenu = data.menus.map(x => x.menu_name)
    },
    // 登陆
    login(state, data) {
      console.log('login')
      state.userInfo.nickname = data.nickname
      state.userInfo.admin_user_id = data.admin_user_id
      state.userMenu = data.menus.map(x => x.menu_name)
      CookieUtils.setToken(data.token)
      state.isLogin = true
      router.push('/')
    },
    // 退出
    loginOut(state) {
      console.log('login out ------')
      state.isLogin = false
      CookieUtils.setToken('')
      router.push('/login')
    },
  },
  actions: {
    // 使用 mutations 提交数据，可以包含网络请求
    loadMenu({ commit, state }) {
      return new Promise((resolve, reject) => {
        adminMenus()
          .then(({ data }) => {
            commit('loginInit', data)
            resolve(data.menus.map(x => x.menu_name))
          })
          .catch(() => {
            reject()
          })
      })
    },
  },
  // 获取二次处理数据
  getters: {
    sideMenu: state => {
      // console.log(state.userMenu)
      const ret = parseMenu(state.userMenu)
      // console.log(ret)
      return ret
    },
  },
}
