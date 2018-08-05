// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Meta from 'vue-meta'
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false

Vue.use(require('vue-moment'))
Vue.use(Meta)
Vue.use(VueAnalytics, {
  id: 'UA-73944565-5'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
