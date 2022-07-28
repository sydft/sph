import { reqCategoryList, reqBannerList, reqFloorList } from '@/api'
const state = {
  categoryList: [],
  bannerList: [],
  floorList: []
}
const getters = {}
const actions = {
  async categoryList(context) {
    const result = await reqCategoryList()
    if (result.code === 200) {
      context.commit('CATEGORYLIST', result.data)
    }
  },
  async bannerList(context) {
    const result = await reqBannerList()
    if (result.code === 200) {
      context.commit('BANNERLIST', result.data)
    }
  },
  async floorList(context) {
    const result = await reqFloorList()
    if (result.code === 200) {
      context.commit('FLOORLIST', result.data)
    }
  }
}
const mutations = {
  CATEGORYLIST(state, value) {
    state.categoryList = value
  },
  BANNERLIST(state, value) {
    state.bannerList = value
  },
  FLOORLIST(state, value) {
    state.floorList = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
