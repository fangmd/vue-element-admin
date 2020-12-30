import Vue from 'vue'
import VueRouter from 'vue-router'
import i18n from '../lang/index'
import { isLogin } from '@/utils'
import BaseLayout from '@/components/layout/index.vue'

Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
const routerReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return routerReplace.call(this, location).catch(error => error)
}

const routes = [
  {
    path: '/',
    component: BaseLayout,
    meta: {
      hidden: true,
      public: true,
    },
    children: [
      {
        path: '',
        meta: {
          title: 'Home',
          public: true,
        },
        name: 'Home',
        component: () => import(/* webpackChunkName:"home" */ '@/views/home.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName:"login" */ '@/views/login/login.vue'),
    meta: {
      hidden: true,
      public: true,
      title: 'Login',
    },
  },
  // {
  //   path: '/member',
  //   name: 'MemberManage',
  //   component: BaseLayout,
  //   meta: {
  //     title: 'MemberManage',
  //     icon: 'el-icon-info',
  //   },
  //   children: [
  //     {
  //       path: 'memberinfo',
  //       name: 'MemberInfo',
  //       meta: {
  //         title: 'MemberInfo',
  //         icon: 'el-icon-info',
  //       },
  //       component: () => import(/* webpackChunkName:"member" */ '@/views/member/member-info.vue'),
  //     },
  //   ],
  // },
]

const router = new VueRouter({
  routes,
})

router.beforeEach(async (to, from, next) => {
  const isLoginB = isLogin()

  // //TOTO: test all next()
  // next()
  // return

  // 未登陆，去登陆
  if (!isLoginB && to.name !== 'Login') {
    next({
      name: 'Login',
      replace: true,
    })
    return
  }

  // 已登陆 且 目标页面是login, 去首页
  if (isLoginB && to.name === 'Login') {
    next({
      name: 'Home',
      replace: true,
    })
    return
  }

  // 公开页面，允许访问
  if (to.meta.public) {
    next()
    return
  }

  next()
})

router.afterEach((to, from) => {
  window.document.title = i18n.t(`Router.${to.meta.title}`) + ' - Admin'
})

export { router, routes }
