<template>
  <div class="main">
    <typeNav></typeNav>
    <div class="py-container">
      <!-- bread -->
      <div class="bread">
        <ul class="fl sui-breadcrumb">
          <li>
            <a href="#">全部结果</a>
          </li>
        </ul>
        <!-- 小标签 -->
        <ul class="fl sui-tag">
          <li class="with-x" v-show="SearchParams.categoryName">{{SearchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
          <li class="with-x" v-show="SearchParams.keyword">{{SearchParams.keyword}}<i @click="removeKeyword">×</i></li>
          <li class="with-x" v-show="SearchParams.trademark">{{SearchParams.trademark.split(':')[1]}}<i @click="removeTrademark">×</i></li>
          <li class="with-x" v-for="(attr,index) in SearchParams.props" :key="index">{{attr.split(':')[1]}}<i @click="removeAttr(index)">×</i></li>
        </ul>
      </div>
      <!-- select -->
      <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"></SearchSelector>
      <!-- details -->
      <div class="details clearfix">
        <div class="sui-navbar">
          <div class="navbar-inner filter">
            <ul class="sui-nav">
              <li :class="{active:isShowOne}" @click="changeOrder('1')">
                <a>综合<span v-show="isUp&&isShowOne">⬆</span><span v-show="isDown&&isShowOne">⬇</span></a>
              </li>
              <li :class="{active:isShowTwo}" @click="changeOrder('2')">
                <a>价格<span v-show="isUp&&isShowTwo">⬆</span><span v-show="isDown&&isShowTwo">⬇</span></a>
              </li>
            </ul>
          </div>
        </div>
        <!-- 商品列表 -->
        <div class="goods-list">
          <ul class="yui3-g">
            <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
              <div class="list-wrap">
                <div class="p-img">
                  <router-link :to='`/detail/${good.id}`'><img :src="good.defaultImg" /></router-link>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>{{good.price}}</i>
                  </strong>
                </div>
                <div class="attr">
                  <a target="_blank" href="item.html" :title="good.title">{{good.title}}</a>
                </div>
                <div class="commit">
                  <i class="command">已有<span>2000</span>人评价</i>
                </div>
                <div class="operate">
                  <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                  <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <Paging @getPageNo="getPageNo" :pageNo='SearchParams.pageNo' :pageSize='SearchParams.pageSize' :total='total' :continues='5'></Paging>
      </div>
      <!-- hotsale -->
      <div class="clearfix hot-sale">
        <h4 class="title">热卖商品</h4>
        <div class="hot-list">
          <ul class="yui3-g">
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/like_01.png" />
                </div>
                <div class="attr">
                  <em>Apple苹果iPhone 6s (A1699)</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4088.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有700人评价</i>
                </div>
              </div>
            </li>
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/like_03.png" />
                </div>
                <div class="attr">
                  <em>金属A面，360°翻转，APP下单省300！</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4088.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有700人评价</i>
                </div>
              </div>
            </li>
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/like_04.png" />
                </div>
                <div class="attr">
                  <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4068.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有20人评价</i>
                </div>
              </div>
            </li>
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/like_02.png" />
                </div>
                <div class="attr">
                  <em>Apple苹果iPhone 6s (A1699)</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4088.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有700人评价</i>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector'
import { mapGetters } from 'vuex'
export default {
  name: 'SearchView',
  components: {
    SearchSelector
  },
  data() {
    return {
      SearchParams: {
        // 一级分类id
        category1Id: '',
        // 二级分类id
        category2Id: '',
        // 三级分类id
        category3Id: '',
        // 分类名
        categoryName: '',
        // 搜索关键字
        keyword: '',
        // 排序方式
        order: '1:desc',
        // 当前第几页
        pageNo: 1,
        // 一页展示多少商品
        pageSize: 3,
        // 平台售卖属性操作带的参数
        props: [],
        // 品牌名称
        trademark: ''
      }
    }
  },
  mounted() {
    this.getData()
  },
  computed: {
    ...mapGetters('search', ['goodsList']),
    ...mapGetters('search', ['total', 'totalPages']),
    isShowOne() {
      return this.SearchParams.order.indexOf('1') !== -1
    },
    isShowTwo() {
      return this.SearchParams.order.indexOf('2') !== -1
    },
    isUp() {
      return this.SearchParams.order.indexOf('asc') !== -1
    },
    isDown() {
      return this.SearchParams.order.indexOf('desc') !== -1
    }
  },
  methods: {
    getData() {
      // 每次重新发送请求前清空之前的id，防止用户点击其他id导致与之前的id一起发送
      this.SearchParams.category1Id = undefined
      this.SearchParams.category2Id = undefined
      this.SearchParams.category3Id = undefined
      Object.assign(this.SearchParams, this.$route.params, this.$route.query)
      this.$store.dispatch('search/SearchObj', this.SearchParams)
    },
    // 删除分类名称面包屑
    removeCategoryName() {
      // 清除分类名称
      this.SearchParams.categoryName = undefined
      // 重新路由跳转
      this.$router.push({ name: 'Search', params: this.$route.params })
    },
    // 删除关键字名称面包屑
    removeKeyword() {
      // 清除关键字名称
      this.SearchParams.keyword = undefined
      // 清除header组件中输入框内的关键字
      this.$bus.$emit('clear')
      // 路由跳转
      this.$router.push({ name: 'Search', query: this.$route.query })
    },
    // 删除品牌名称面包屑
    removeTrademark() {
      // 清除品牌名称
      this.SearchParams.trademark = ''
      // 重新发送请求
      this.getData()
    },
    // 删除商品售卖属性面包屑
    removeAttr(index) {
      this.SearchParams.props.splice(index, 1)
      this.getData()
    },
    // 自定义事件，添加子组件的品牌名称并重新发送请求
    trademarkInfo(trademark) {
      this.SearchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      this.getData()
    },
    // 自定义事件，添加商品售卖属性
    attrInfo(attr, attrvalue) {
      // 整理数据
      const props = `${attr.attrId}:${attrvalue}:${attr.attrName}`
      if (this.SearchParams.props.indexOf(props) === -1) {
        this.SearchParams.props.push(props)
        this.getData()
      }
    },
    // 点击切换排序方式
    changeOrder(flag) {
      const currentOrder = this.SearchParams.order.split(':')[0]
      const currentSort = this.SearchParams.order.split(':')[1]
      if (currentOrder === flag) {
        this.SearchParams.order = `${currentOrder}:${currentSort === 'desc' ? 'asc' : 'desc'}`
      } else {
        this.SearchParams.order = `${flag}:desc`
      }
      this.getData()
    },
    // 自定义事件
    getPageNo(pageNo) {
      // console.log(page)
      if (this.SearchParams.pageNo !== pageNo) {
        this.SearchParams.pageNo = pageNo
        this.getData()
      }
    }
  },
  watch: {
    $route: {
      handler() {
        this.getData()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;
  .py-container {
    width: 1200px;
    margin: 0 auto;
    .bread {
      margin-top: 5px;
      margin-bottom: 5px;
      overflow: hidden;
      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;
        li {
          display: inline-block;
          line-height: 18px;
          a {
            color: #666;
            text-decoration: none;
            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }
      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;
        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;
          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }
          &:hover {
            color: #28a3ef;
          }
        }
      }
    }
    .details {
      margin-bottom: 5px;
      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;
        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;
            li {
              float: left;
              line-height: 18px;
              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }
              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }
      .goods-list {
        margin: 20px 0;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;
            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;
                a {
                  color: #666;
                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }
              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                }
              }
              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                a {
                  color: #333;
                  text-decoration: none;
                }
              }
              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }
              .operate {
                padding: 12px 15px;
                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }
                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;
                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }
                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;
                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
    .hot-sale {
      margin-bottom: 5px;
      border: 1px solid #ddd;
      .title {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        border-bottom: 1px solid #ddd;
        background: #f1f1f1;
        color: #333;
        margin: 0;
        padding: 5px 0 5px 15px;
      }
      .hot-list {
        padding: 15px;
        ul {
          display: flex;
          li {
            width: 25%;
            height: 100%;
            .list-wrap {
              .p-img,
              .price,
              .attr,
              .commit {
                padding-left: 15px;
              }
              .p-img {
                img {
                  max-width: 100%;
                  vertical-align: middle;
                  border: 0;
                }
              }
              .attr {
                width: 85%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
              }
              .price {
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                }
              }
              .commit {
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
              }
            }
          }
        }
      }
    }
  }
}
</style>
