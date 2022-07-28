import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originalPush.call(this, location, resolve, reject)
  } else {
    originalPush.call(this, location, () => { }, () => { })
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originalReplace.call(this, location, resolve, reject)
  } else {
    originalReplace.call(this, location, () => { }, () => { })
  }
}

const routes = [
  {
    name: 'Home',
    path: '/home',
    component: () => import('@/views/Home'),
    meta: { showFooter: true }
  },
  {
    name: 'Search',
    path: '/search/:keyword?',
    component: () => import('@/views/Search'),
    meta: { showFooter: true }
  },
  {
    name: 'Detail',
    path: '/detail/:skuId?',
    component: () => import('@/views/Detail'),
    meta: { showFooter: true }
  },
  {
    name: 'AddCartSuccess',
    path: '/addcartsuccess',
    component: () => import('@/views/AddCartSuccess'),
    meta: { showFooter: true }
  },
  {
    name: 'ShopCart',
    path: '/shopcart',
    component: () => import('@/views/ShopCart'),
    meta: { showFooter: true }
  },
  {
    name: 'Trade',
    path: '/trade',
    component: () => import('@/views/Trade'),
    meta: { showFooter: true },
    beforeEnter: (to, from, next) => {
      if (from.path !== '/shopcart') {
        history.back()
        next()
      } else {
        next()
      }
    }
  },
  {
    name: 'Pay',
    path: '/pay',
    component: () => import('@/views/Pay'),
    meta: { showFooter: true },
    beforeEnter: (to, from, next) => {
      if (from.path !== '/trade') {
        next(false)
      } else {
        next()
      }
    }
  },
  {
    name: 'PaySuccess',
    path: '/paysuccess',
    component: () => import('@/views/PaySuccess'),
    meta: { showFooter: true },
    beforeEnter: (to, from, next) => {
      if (from.path !== '/pay') {
        next(false)
      } else {
        next()
      }
    }
  },
  {
    name: 'Center',
    path: '/center',
    component: () => import('@/views/Center'),
    meta: { showFooter: true },
    redirect: '/center/myorder',
    children: [
      {
        path: 'myorder',
        component: () => import('@/views/Center/MyOrder')
      },
      {
        path: 'grouporder',
        component: () => import('@/views/Center/GroupOrder')
      }
    ]
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/Login'),
    meta: { showFooter: false }
  },
  {
    name: 'Register',
    path: '/register',
    component: () => import('@/views/Register'),
    meta: { showFooter: false }
  },
  {
    path: '/',
    redirect: 'Home'
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  // 判断仓库中是否有token
  if (store.state.user.token) {
    // 有token的情况下判断是否前往登录或注册界面，强制让其前往主页
    if (to.path === '/login' || to.path === '/register') {
      next('/home')
    } else {
      // 有token的情况下不去登录或注册界面，而是去其他界面，判断是否拥有用户信息
      if (store.state.user.userInfo.name) {
        next()
      } else {
        // 只有token没有用户信息的情况下尝试再次获取用户信息，成功获取则放行，获取失败说明token过期，清空过期的token数据，并让用户重新登录
        try {
          await store.dispatch('user/userInfo')
          next()
        } catch (error) {
          await store.dispatch('user/logout')
          next('/login')
        }
      }
    }
  } else {
    // 未登录的情况下，不允许用户跳转到交易，支付，个人中心等页面
    if (to.path.indexOf('/trade') !== -1 || to.path.indexOf('/pay') !== -1 || to.path.indexOf('/center') !== -1) {
      next('/login?redirect=' + to.path)
    } else {
      // 不前往上述交易，支付，个人中心等页面的放行
      next()
    }
  }
})

export default router
