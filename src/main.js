import Vue from 'vue'
import App from './App'

import store from './store'
import router from './router'

import VueTour from 'vue-tour'

Vue.config.productionTip = false

require('vue-tour/dist/vue-tour.css')

Vue.use(VueTour)

/* eslint-disable no-new */
new Vue({
  el: '#biobank-aggregates-app-container',
  store,
  router,
  components: {App},
  template: '<App/>'
})
