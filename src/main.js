import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import parseMixin from './mixins/parse'
import router from './router'

Vue.use(Vuetify, {
    theme: {
        primary: "#263238",
        secondary: "#039BE5",
        accent: "#00BCD4",
        error: "#f44336",
        warning: "#ffeb3b",
        info: "#2196f3",
        success: "#4caf50"
    }
})

Vue.mixin(parseMixin({router}))


new Vue({
    el: '#app',
    router,
    render: h => h(App)
}).$mount('#app')
