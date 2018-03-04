import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import login from './components/login'
import parseMixin from './mixins/parse'

Vue.use(Vuetify)

import Acl from 'vue-acl'
Vue.use( Acl, { router, init: 'public' } )

Vue.mixin(parseMixin)

import router from './router'


new Vue({
  el: '#app',
    parse_class:'main',
    router:router,
  render: h => h(App)
})
