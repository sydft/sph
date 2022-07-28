import requests from './request'
import mockAjax from './mockAjax'
// /api/product/getBaseCategoryList   get
export const reqCategoryList = () => {
  return requests({ url: '/product/getBaseCategoryList', method: 'get' })
}
// 获取banneer图片
export const reqBannerList = () => {
  return mockAjax({ url: '/banner', method: 'get' })
}
// 获取floor数据
export const reqFloorList = () => {
  return mockAjax({ url: '/floor', method: 'get' })
}
// 获取search数据
export const reqSearchList = (params) => {
  return requests({ url: '/list', method: 'post', data: params })
}
// 获取detail数据
export const reqDetailInfo = (skuId) => {
  return requests({ url: `/item/${skuId}`, method: 'get' })
}
// 添加购物车后发送请求，将数据传给服务器
export const reqSkucarInfo = (skuId, skuNum) => {
  return requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
}
// 获取购物车列表数据
export const reqCartList = () => {
  return requests({ url: '/cart/cartList', method: 'get' })
}
// 删除购物车中数据
export const deleteCartBySkuId = (skuId) => {
  return requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
}
// 改变购物车商品选中状态
export const changeChecked = (skuId, isChecked) => {
  return requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })
}
// 获取验证码 /user/passport/sendCode/{phone}
export const reqGetCode = (phone) => {
  return requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
}
// 注册
export const reqRegister = (data) => {
  return requests({ url: '/user/passport/register', data, method: 'post' })
}
// 登录
export const reqLogin = (data) => {
  return requests({ url: '/user/passport/login', data, method: 'post' })
}
// 获取已登录用户信息
export const reqUserInfo = () => {
  return requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })
}
// 退出登录
export const reqLogout = () => {
  return requests({ url: '/user/passport/logout', method: 'get' })
}
// 获取用户地址和商品清单信息
export const reqAddressAndDetailArrayList = () => {
  return requests({ url: '/order/auth/trade', method: 'get' })
}
// 提交订单
export const reqOrder = (tradeNo, data) => {
  return requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })
}
// 获取订单支付信息
export const reqPayInfo = (orderId) => {
  return requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })
}
// 查询支付状态
export const reqPayStatus = (orderId) => {
  return requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })
}
// 获取我的订单列表
export const reqMyOrderList = (page, limit) => {
  return requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })
}
