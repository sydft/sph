<template>
  <div class="order-content">
    <div class="title">
      <h3>我的订单</h3>
    </div>
    <div class="chosetype">
      <table>
        <thead>
          <tr>
            <th width="29%">商品</th>
            <th width="31%">订单详情</th>
            <th width="13%">收货人</th>
            <th>金额</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="orders">

      <table class="order-item" v-for="order in myOrder.records" :key="order.id">
        <thead>
          <tr>
            <th colspan="5">
              <span class="ordertitle">{{order.createTime}} 订单编号：{{order.outTradeNo}} <span class="pull-right delete"><img src="../images/delete.png"></span></span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(detail,index) in order.orderDetailList" :key="detail.id">
            <td width="60%">
              <div class="typographic">
                <img :src="detail.imgUrl" style="width:83px;">
                <a class="block-text">{{detail.skuName}}</a>
                <span>x{{detail.skuNum}}</span>
                <a href="#" class="service">售后申请</a>
              </div>
            </td>
            <td :rowspan="order.orderDetailList.length" v-if="index===0" width="8%" class="center">{{order.consignee}}</td>
            <td :rowspan="order.orderDetailList.length" v-if="index===0" width="13%" class="center">
              <ul class="unstyled">
                <li>总金额¥{{order.totalAmount}}</li>
                <li>在线支付</li>

              </ul>
            </td>
            <td :rowspan="order.orderDetailList.length" v-if="index===0" width="8%" class="center">
              <a href="#" class="btn">{{order.orderStatusName}} </a>
            </td>
            <td :rowspan="order.orderDetailList.length" v-if="index===0" width="13%" class="center">
              <ul class="unstyled">
                <li>
                  <a href="mycomment.html" target="_blank">评价|晒单</a>
                </li>

              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="choose-order">
      <Paging @getPageNo="getPageNo" :pageNo='page' :pageSize='limit' :total='myOrder.total' :continues='5'></Paging>
    </div>
  </div>
</template>

<script>
import Paging from '@/components/Paging'
export default {
  name: 'MyOrder',
  components: {
    Paging
  },
  data() {
    return {
      page: 1,
      limit: 3,
      myOrder: {}
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const result = await this.$API.reqMyOrderList(this.page, this.limit)
      if (result.code === 200) {
        this.myOrder = result.data
        // 翻页后回到顶部
        window.scrollTo(0, 0)
      }
    },
    // 自定义事件
    getPageNo(pageNo) {
      // console.log(page)
      if (this.page !== pageNo) {
        this.page = pageNo
        this.getData()
      }
    }
  }
}
</script>

<style>
</style>
