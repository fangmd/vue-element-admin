import axios from '@/request'

// 后台管理员-登录
export const adminLogin = data => {
  return axios.post('/api/admin/login', data)
}

// 后台管理员-菜单
export const adminMenus = () => {
  return axios.get('/api/admin/menu')
}
