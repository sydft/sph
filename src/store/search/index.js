import { reqSearchList } from '@/api'
const state = {
  SearchObj: {}
}
const getters = {
  goodsList(state) {
    return state.SearchObj.goodsList || []
  },
  attrsList(state) {
    return state.SearchObj.attrsList || []
  },
  trademarkList(state) {
    return state.SearchObj.trademarkList || []
  },
  total(state) {
    return state.SearchObj.total || []
  },
  totalPages(state) {
    return state.SearchObj.totalPages || []
  }
}
const actions = {
  async SearchObj(context, params = {}) {
    const result = await reqSearchList(params)
    if (result.code === 200) {
      context.commit('SEARCHOBJ', result.data)
    }
  }
}
const mutations = {
  SEARCHOBJ(state, value) {
    state.SearchObj = value
  }
}

export default { namespaced: true, state, getters, actions, mutations }
