import axios from 'axios'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

const requests = axios.create({
  baseURL: 'http://gmall-h5-api.atguigu.cn/api',
  timeout: 5000
})
// 请求拦截器
requests.interceptors.request.use((config) => {
  // 如果存在uuid则携带请求头
  if (store.state.detail.uuid_token) {
    config.headers.userTempId = store.state.detail.uuid_token
  }
  // 携带token
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }
  nProgress.start()
  return config
})
// 响应拦截器
requests.interceptors.response.use(
  (res) => {
    nProgress.done()
    return res.data
  },
  (err) => {
    return Promise.reject(new Error(err))
  }
)

export default requests
