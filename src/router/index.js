import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Operations from "../views/Operations.vue";
import Login from "../views/Auth/Login.vue";









Vue.use(VueRouter);

const routes = [
  



  {
    path: "/login",
    name: "Login",
    component: Login,
    
  },

  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    },
    
  },


  {
    path: "/operations",
    name: "Operations",
    component: Operations,
    meta: {
      requiresAuth: true
    },
    
  },
 
  {
    path: '/printBarcode',
    name: 'printBarcode',
    component: require('../components/printBarcode.vue').default,
  },
 
  {
    path: '/printOrder',
    name: 'printOrder',
    component: require('../components/printOrder.vue').default,
  },


 


  

];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

export default router;