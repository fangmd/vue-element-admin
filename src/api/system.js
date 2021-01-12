// 系统管理

import axios from '@/request'

// get 角色管理
export const roleList = data => {
  return axios.get('/api/admin/roles', { params: data })
}
export const getRoleDetail = data => {
  return axios.get('/api/admin/role', { params: data })
}
export const addRole = data => {
  return axios.post('/api/admin/role', data)
}
export const editRole = data => {
  return axios.put('/api/admin/role', data)
}
export const deleteRole = data => {
  return axios.delete('/api/admin/role', { params: data })
}

// get 角色权限菜单所有
export const roleMenus = data => {
  return axios.get('/api/admin/menu-tree', { params: data })
}

// 用户管理/管理员管理
export const managerList = data => {
  return axios.get('/api/admin/managers', { params: data })
}
export const deleteManager = data => {
  return axios.delete('/api/admin/manager', { params: data })
}
export const editManager = data => {
  return axios.put('/api/admin/manager', data)
}
export const getManager = data => {
  return axios.get('/api/admin/manager', { params: data })
}
export const addManager = data => {
  return axios.post('/api/admin/manager', data)
}
