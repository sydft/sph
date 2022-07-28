import axios from 'axios'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

const mockAjax = axios.create({
  baseURL: '/mock',
  timeout: 5000
})
// 请求拦截器
mockAjax.interceptors.request.use((config) => {
  nProgress.start()
  return config
})
// 响应拦截器
mockAjax.interceptors.response.use(
  (res) => {
    nProgress.done()
    return res.data
  },
  (err) => {
    return Promise.reject(new Error(err))
  }
)

export default mockAjax
