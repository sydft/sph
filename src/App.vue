<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    // 触发vuex内actions中的方法
    this.$store.dispatch('categoryList')
    if (this.$route.name !== 'Home') {
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
