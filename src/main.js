import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import parseMixin from './mixins/parse'
import router from './router'

Vue.use(Vuetify)

Vue.mixin(parseMixin({router}))


new Vue({
  el: '#app',
    router:router,
  render: h => h(App)
}).$mount('#app')
