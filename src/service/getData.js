import axios from 'axios'
import qs from 'qs'
import {getToken} from '../config/utils'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {

    config.headers.Authorization = getToken()
    return config
  })
  
  // //axios配置
  // const $axios = axios.create({
  //     timeout: 50000,
  //     method: 'post',
  //     transformRequest: [function(data) {
    
  //       if (data != undefined && data.constructor.name == 'FormData') {
  //         return data
  //       } else {
  //         return qs.stringify(data)
  //       }
  //     }]
  //   })


export const upload = (param) => (
    axios({
        url:'http://cartoon.com/api/upload',
        method:'post',
        data:param,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
)

export const getCartoon = (param) => (
  axios({
      url:'http://cartoon.com/api/getCartoon',
      method:'post',
      data:param,
  })
)

export const login = (param) => (
  axios({
      url:'http://cartoon.com/api/auth/login',
      method:'post',
      data:param,
  })
)

