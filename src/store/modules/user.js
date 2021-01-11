import { adminMenus, adminLogin } from '@/api/admin'
import { CookieUtils, parseMenu } from '@/utils'
import { router } from '@/router/index'

// 用户相关
// 1. 用户信息
// 2. 菜单
export default {
  namespaced: true,
  state: {
    userMenu: [],
    userInfo: { username: '', userId: '' },
    isLogin: false,
  },
  // 提交数据
  mutations: {
    loginInit(state, data) {
      console.log('login init')
      state.userInfo.username = data.username
      state.userInfo.userId = data.userId
      state.userMenu = data.menus.map(x => x.menuName)
    },
    // 登陆成功
    login(state, data) {
      console.log('login success')
      state.userInfo.username = data.username
      state.userInfo.userId = data.userId
      CookieUtils.setToken(data.jwt)
      state.isLogin = true
      router.push('/')
    },
    menuSuccess(state, data) {
      state.userMenu = data.menus.map(x => x.menuName)
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
            resolve(data.menus.map(x => x.menuName))
          })
          .catch(() => {
            reject()
          })
      })
    },
    login({ commit, state }, payload) {
      const loginPromise = adminLogin(payload)
      loginPromise.then(res => {
        commit('login', res.data)

        const menuPromise = adminMenus()
        menuPromise.then(res => {
          commit('menuSuccess', res.data)
        })
      })
    },
  },
  // 获取二次处理数据
  getters: {
    sideMenu: state => {
      const ret = parseMenu(state.userMenu)
      return ret
    },
  },
}
