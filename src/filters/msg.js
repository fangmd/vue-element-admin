// 内容解析 int => String

// 上线/下线
export const parseOnlineOffline = status => {
  const map = ['', '已上线', '已下线']
  return map[status]
}

// '禁用', '可用'
export const parseStatus = status => {
  const map = ['禁用', '可用']
  return map[status]
}
