import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import * as FaIcons from './utils/fa-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

library.add(...Object.values(FaIcons))
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
