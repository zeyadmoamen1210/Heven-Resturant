import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import BranchAccount from "../views/BranchAccount.vue";
import Login from "../views/Auth/Login.vue";
import Signup from "../views/Auth/Signup.vue"
import Operations from "../views/Operations.vue"
import AddProducts from "../views/AddProduct.vue"
import Orders from "../views/Orders/Index.vue"
import OrdersReport from "../views/Orders/Report.vue"
import OrdersStatistics from "../views/Orders/Statistics.vue"
import OrdersProducts from "../views/Orders/Products.vue"
import BranchesSales from "../views/Orders/BranchesSales.vue"
import Stores from "../views/Stores.vue"
import Register from "../views/Register.vue"

import Offers from "../views/offers/index.vue"
import AddOffer from "../views/offers/add.vue"
import UpdateOffer from "../views/offers/update.vue"





import ExpensesReport from "../views/Expenses/Report.vue";
import NewExpense from "../views/Expenses/New.vue";
import ExpenseDetails from "../views/Expenses/ReportDetails.vue";


import UsersAccounts from '../views/Users-Accounts.vue';




Vue.use(VueRouter);

const routes = [
  
  {
    path: "/offers",
    name: "Offers",
    component: Offers,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/offers/add",
    name: "AddOffer",
    component: AddOffer,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/offers/update",
    name: "OffUpdateers",
    component: UpdateOffer,
    meta: {
      requiresAuth: true
    },
  },


  {
    path: "/login",
    name: "Login",
    component: Login,
    
  },


  {
    path: "/branch-account",
    name: "BranchAccount",
    component: BranchAccount,
    
  },


  

  {
    path: "/expenses/new",
    name: "NewExpense",
    component: NewExpense,
    
  },

  {
    path: "/expenses/details",
    name: "ExpenseDetails",
    component: ExpenseDetails,
    
  },

  

  
  

  
 
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/orders/report",
    name: "OrdersReport",
    component: OrdersReport,
    beforeEnter: (to, from, next) => {

      let user = localStorage.getItem("heavenDashboardUser");
      if(user && JSON.parse(user).role_id != 1){
        next({name: "Home"});
      }else{
        next();
      }
      
    },
  },
  {
    path: "/orders/products",
    name: "OrdersProducts",
    component: OrdersProducts,
    beforeEnter: (to, from, next) => {

      let user = localStorage.getItem("heavenDashboardUser");
      if(user && JSON.parse(user).role_id != 1){
        next({name: "Home"});
      }else{
        next();
      }

    },   
  },
  {
    path: "/orders/statistics",
    name: "OrdersStatistics",
    component: OrdersStatistics,
    beforeEnter: (to, from, next) => {

      let user = localStorage.getItem("heavenDashboardUser");
      if(user && JSON.parse(user).role_id != 1){
        next({name: "Home"});
      }else{
        next();
      }

    },   
  },
  {
    path: "/orders/branches-sales",
    name: "BranchesSales",
    component: BranchesSales,
    beforeEnter: (to, from, next) => {

      let user = localStorage.getItem("heavenDashboardUser");
      if(user && JSON.parse(user).role_id != 1){
        next({name: "Home"});
      }else{
        next();
      }

    },   
  },
  
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  }, {
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
    
  },
 
  {
    path: "/add-product",
    name: "AddProducts",
    component: AddProducts,
  },

  {
    path: "/stores",
    name: "Stores",
    component: Stores,
  },

  {
    path: "/register",
    name: "Register",
    component: Register,
  },


  {
    path: '/printOrder',
    name: 'printOrder',
    component: require('../components/printOrder.vue').default,
  },

  {
    path: '/driver-orders',
    name: 'DriverOrders',
    component: require('../views/DriverOrders.vue').default,
    
  },


  {
    path: '/printBarcode',
    name: 'printBarcode',
    component: require('../components/printBarcode.vue').default,
  },


  {
    path: '/users-accounts',
    name: 'UsersAccounts',
    component: UsersAccounts,
  },


  


  
  {
    path: "/expenses/report",
    name: "ExpensesReport",
    component: ExpensesReport,
    meta: {
      requiresAuth: true
    },
  },
 


  

];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

export default router;