import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import parseMixin from './mixins/parse'

Vue.use(Vuetify)

Vue.mixin(parseMixin)

new Vue({
  el: '#app',
  render: h => h(App)
})
