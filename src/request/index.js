import { Message } from 'element-ui'
const JSONbigString = require('json-bigint')({ storeAsString: true })
import createHeader from './custom-header'
import Config from '@/config'
import axios from 'axios'
import store from '@/store'
const qs = require('querystring')

// 创建axios实例
var instance = axios.create({
  baseURL: Config.baseUrl,
  timeout: 1000 * 10,
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  },
  // 解决相应数据 bingint 精度丢失问题
  transformResponse: [
    function(data) {
      /* eslint-disable no-undef */
      try {
        return JSONbigString.parse(data)
      } catch (error) {
        return data
      }
    },
  ],
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    let headers = createHeader()
    for (let i in headers) {
      config.headers[i] = headers[i]
    }

    if (config.method === 'post' || config.method === 'put') {
      if (config.url === '/upload') {
        // config.headers['Content-Type'] = 'multipart/form-data'
        // config.headers['Timestamp'] = new Date().getTime()

        console.log(config)
      } else {
        config.headers['Content-Type'] === 'application/x-www-form-urlencoded'
        config.data = qs.stringify(config.data)
      }
    }

    if (config.method === 'get' || config.method === 'delete') {
      for (let i in config.params) {
        if (!config.params[i]) {
          delete config.params[i]
        }
      }
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {
    if (res.status === 200) {
      if (res.data.code && res.data.code !== 100200) {
        Message({
          message: res.data.msg,
          type: 'error',
          duration: 3 * 1000,
        })
        if (res.data.code === 100201) {
          console.log('store.commit')
          store.commit('user/loginOut')
        }
        return Promise.reject(res.data)
      } else {
        if (res.config.method === 'put' || res.config.method === 'post') {
          Message({
            message: res.data.msg,
            type: 'success',
            duration: 3 * 1000,
          })
        }
        return Promise.resolve(res.data)
      }
    } else {
      return Promise.reject(res.data)
    }
  },
  // 请求失败
  error => {
    const { response } = error
    console.log(error)
    Message({
      message: error.message || 'unknow Request Error',
      type: 'error',
      duration: 5 * 1000,
    })
    return Promise.reject(response)
  }
)

export default instance
