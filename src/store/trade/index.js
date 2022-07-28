import { reqAddressAndDetailArrayList } from '@/api'
const state = {
  tradeInfo: {}
}
const getters = {
  userAddressList() {
    return state.tradeInfo.userAddressList || []
  },
  detailArrayList() {
    return state.tradeInfo.detailArrayList || []
  }
}
const actions = {
  async addressAndDetailArrayList(context) {
    const result = await reqAddressAndDetailArrayList()
    console.log(result)
    if (result.code === 200) {
      context.commit('ADDRESSANDDETAILARRAYLIST', result.data)
    }
  }
}
const mutations = {
  ADDRESSANDDETAILARRAYLIST(state, value) {
    state.tradeInfo = value
  }
}
export default { namespaced: true, state, getters, actions, mutations }
