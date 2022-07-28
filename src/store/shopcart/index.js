import { reqCartList, deleteCartBySkuId, changeChecked } from '@/api'
const state = {
  cartList: []
}
const getters = {
  cartList() {
    return state.cartList[0] || {}
  }
}
const actions = {
  async cartList(context) {
    const result = await reqCartList()
    if (result.code === 200) {
      context.commit('CARTLIST', result.data)
    }
  },
  async deleteCartBySkuId(context, skuId) {
    const result = await deleteCartBySkuId(skuId)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  async changeChecked(context, { skuId, isChecked }) {
    const result = await changeChecked(skuId, isChecked)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  deleteAllCheckedCart(context) {
    const PromiseAll = []
    context.getters.cartList.cartInfoList.forEach(item => {
      if (item.isChecked === 1) {
        const promise = context.dispatch('deleteCartBySkuId', item.skuId)
        PromiseAll.push(promise)
      }
    })
    return Promise.all(PromiseAll)
  },
  updateAllChecked(context, isChecked) {
    const PromiseAll = []
    context.getters.cartList.cartInfoList.forEach(item => {
      const promise = context.dispatch('changeChecked', { skuId: item.skuId, isChecked })
      PromiseAll.push(promise)
    })
    return Promise.all(PromiseAll)
  }

}
const mutations = {
  CARTLIST(state, value) {
    state.cartList = value
  }
}
export default { namespaced: true, state, getters, actions, mutations }
