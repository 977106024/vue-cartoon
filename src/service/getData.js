import axios from 'axios'
import qs from 'qs'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    return config
  })
  
  //axios配置
  const $axios = axios.create({
      timeout: 50000,
      method: 'post',
      transformRequest: [function(data) {
    
        if (data != undefined && data.constructor.name == 'FormData') {
          return data
        } else {
          return qs.stringify(data)
        }
      }]
    })


export const upload = (param) => (
    $axios({
        url:'http://cartoon.com/getCartoonPhoto',
        method:'get',
        params:param
    })
)

