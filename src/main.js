import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Paging from '@/components/Paging'
import '@/mock/mockServer'
import 'swiper/css/swiper.css'
import * as API from '@/api'
import { Button, MessageBox } from 'element-ui'
import '@/plugins/validata'

Vue.use(Button)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

Vue.config.productionTip = false

Vue.component('TypeNav', TypeNav)
Vue.component('Carousel', Carousel)
Vue.component('Paging', Paging)

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  }
}).$mount('#app')
