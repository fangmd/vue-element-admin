import { CookieUtils } from '@/utils'

// 自定义请求头
export default () => {
  return {
    Authorization: `Bearer ${CookieUtils.getToken()}`,
  }
}
