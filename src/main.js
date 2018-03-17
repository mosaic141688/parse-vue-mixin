import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import parseMixin from './mixins/parse'
import router from './router'

Vue.use(Vuetify)

import Acl from 'vue-acl'
Vue.use( Acl, { router, init: 'public' , save: true } )

Vue.mixin(parseMixin)


new Vue({
  el: '#app',
    router:router,
  render: h => h(App)
})
