import { reqDetailInfo, reqSkucarInfo } from '@/api'
import { getUUID } from '@/utils/uuid_token'
const state = {
  detailInfo: {},
  uuid_token: getUUID()
}
const getters = {
  categoryView(state) {
    return state.detailInfo.categoryView || {}
  },
  skuInfo(state) {
    return state.detailInfo.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.detailInfo.spuSaleAttrList || {}
  }
}
const actions = {
  async detailInfo(context, skuId) {
    const result = await reqDetailInfo(skuId)
    if (result.code === 200) {
      context.commit('DETAILINFO', result.data)
    }
  },
  async skucarInfo(context, { skuId, skuNum }) {
    const result = await reqSkucarInfo(skuId, skuNum)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
}
const mutations = {
  DETAILINFO(state, value) {
    state.detailInfo = value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
