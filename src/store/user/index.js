import { reqGetCode, reqRegister, reqLogin, reqUserInfo, reqLogout } from '@/api'
import { getToken, setToken, removeToken } from '@/utils/token'
const state = {
  code: '',
  token: getToken(),
  userInfo: {}
}
const getters = {
}
const actions = {
  async getCode(context, phone) {
    const result = await reqGetCode(phone)
    if (result.code === 200) {
      context.commit('GETCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  async userRegister(context, registerData) {
    const result = await reqRegister(registerData)
    console.log(result)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  async userLogin(context, loginData) {
    const result = await reqLogin(loginData)
    console.log(result)
    if (result.code === 200) {
      context.commit('USERLOGIN', result.data.token)
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  async userInfo(context) {
    const result = await reqUserInfo()
    console.log(result)
    if (result.code === 200) {
      context.commit('USERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new ErrorEvent('fail'))
    }
  },
  async logout(context) {
    const result = await reqLogout()
    if (result.code === 200) {
      context.commit('LOGOUT')
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  }
}
const mutations = {
  GETCODE(state, value) {
    state.code = value
  },
  USERLOGIN(state, value) {
    state.token = value
  },
  USERINFO(state, value) {
    state.userInfo = value
  },
  LOGOUT(state) {
    state.token = ''
    state.userInfo = {}
    removeToken()
  }
}
export default { namespaced: true, state, getters, actions, mutations }
