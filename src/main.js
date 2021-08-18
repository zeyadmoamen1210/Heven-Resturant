import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

import {
  BootstrapVue,
  IconsPlugin
} from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";
// import "bootstrap/dist/css/bootstrap.css";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
// import "@/fontawesome-free-5.9.0-web/css/all.css";


import {
  initialize
} from '@/plugins/general.js';

initialize(store, router);


import 'element-ui/lib/theme-chalk/index.css';

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, { locale })
import store from './store'


Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   if (to.name !== 'Login' 
//   && !localStorage.getItem('heavenDashboardToken') 
//   && !localStorage.getItem("heavenDashboardUser")) next({ name: 'Login' })
//   else next()
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
