import CookieUtils from './cookie-utils'
import { routes } from '@/router'

// 是否已经登陆
const isLogin = () => {
  return CookieUtils.getToken()
}

// 生成侧边菜单栏
const parseMenu = menu => {
  return _parseMenu(routes, menu)
}

const _parseMenu = (routers, menus) => {
  const retMenu = []
  for (let i = 0; i < routers.length; i++) {
    if (routers[i].meta.public) {
      retMenu.push(routers[i])
      continue
    }
    if (routers[i].children && routers[i].children.length > 0) {
      const tempParent = { ...routers[i] }
      tempParent.children = _parseMenu(tempParent.children, menus)
      if (tempParent.children.length > 0) {
        retMenu.push(tempParent)
      }
      continue
    }
    if (menus.includes(routers[i].name)) {
      retMenu.push(routers[i])
      continue
    }
  }
  return retMenu
}

export { isLogin, CookieUtils, parseMenu }
