import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueResource from 'vue-resource'
Vue.use(VueResource);

import './plugins/vuetify'
import App from './App.vue'

// Vuetify - material components
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import { createSimpleTransition } from 'vuetify/es5/util/helpers'
import ru from './i18n/vuetify/ru'
 
const myTransition = createSimpleTransition('my-transition')
Vue.component('my-transition', myTransition)

var vuetifyTheme = {}

Vue.use(Vuetify, {
  theme: vuetifyTheme,
  lang: {
    locales: { ru },
    current: 'ru'
  }
})
// Vuetify \\

Vue.config.productionTip = false

import router from './module/route'
import store from './module/store'

new Vue({
  el: '#app',
  render: h => h(App),
  router: router,
  store
})