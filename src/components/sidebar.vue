<template>
  <aside>
    <vs-sidebar style="background: #EBF9FC" hover-expand reduce v-model="active" open class="">
      <template #logo>
        <div class="d-block">
          <img src="@/images/profilePic.png" alt="" />
        </div>
      </template>
      <p class="ml-5 pl-5 pt-2 text-center">اﺳﻢ اﻟﻤﺴﺘﺨﺪﻡ</p>

      <vs-sidebar-item class="mt-3" to="/" id="home">
        <template #icon>
          <i class="fas fa-qrcode"></i>
        </template>
        اﻟﺮﺋﺴﻴﺔ
      </vs-sidebar-item>
       <vs-sidebar-item v-if="!notAdmin" to="/add-product" class="mt-2" id="add-product">
        <template #icon>
          <i class="fas fa-tasks"></i>
        </template>
        اﻟﻤﻨﻴﻮ
      </vs-sidebar-item>
      <vs-sidebar-item class="mt-2" id="order" to="/orders">
        <template #icon>
          <i class="fas fa-utensils"></i>
        </template>
        اﻟﻄﻠﺒﺎﺕ
      </vs-sidebar-item>
      <vs-sidebar-item v-if="!notAdmin" class="mt-2" id="order-report" to="/orders/report">
        <template #icon>
          <i class="el-icon-shopping-cart-2"></i>
        </template>
        ﺗﻘﺮﻳﺮ اﻟﻄﻠﺒﺎﺕ
      </vs-sidebar-item>
       <vs-sidebar-item class="mt-2" id="branch-account" to="/branch-account">
        <template #icon>
          <i class="el-icon-money"></i>
        </template>
     حسابات الفروع
      </vs-sidebar-item>

        <vs-sidebar-item v-if="!notAdmin" class="mt-2" id="orders-products" to="/orders/products">
        <template #icon>
          <i class="el-icon-shopping-cart-2"></i>
        </template>
    مبيعات الأصناف
      </vs-sidebar-item>

      <!-- <vs-sidebar-item class="mt-2" id="branch-account" to="/branch-account">
        <template #icon>
          <i class="el-icon-money"></i>
        </template>
     حسابات الفروع
      </vs-sidebar-item> -->


      <vs-sidebar-item class="mt-2" id="order-statistics-0" to="/expenses/new">
        <template #icon>
          <i class="el-icon-money"></i>
        </template>
      اﻟﻤﺼﺮﻭﻓﺎﺕ
      </vs-sidebar-item>


      <vs-sidebar-item v-if="!notAdmin" class="mt-2" id="order-statistics" to="/orders/statistics">
        <template #icon>
          <i class="far fa-chart-bar"></i>
        </template>
      اﻻﺣﺼﺎﺋﻴﺎﺕ
      </vs-sidebar-item>
      <!-- <vs-sidebar-item v-if="!notAdmin" class="mt-2" id="order-saless" to="/orders/branches-sales">
        <template #icon>
          <i class="el-icon-money"></i>
        </template>
      مبيعات الفروع
      </vs-sidebar-item> -->
      <vs-sidebar-item to="/driver-orders" class="mt-2" id="star">
        <template #icon>
          <i class="fas fa-motorcycle"></i>
        </template>
      الدليفري
      </vs-sidebar-item>



      <!-- <vs-sidebar-item @click.native="printBarCode" class="mt-2" id="barcode">
        <div @click="printBarCode">
          طباعة باركود
        </div>
      </vs-sidebar-item> -->



      <!-- <vs-sidebar-item class="mt-2" id="service">
        <template #icon>
          <i class="fas fa-concierge-bell"></i>
        </template>
        ﺧﺪﻣﺔ اﻟﻌﻤﻼء
      </vs-sidebar-item>
      <vs-sidebar-item class="mt-2" id="time0">
        <template #icon>
          <i class="far fa-clock"></i>
        </template>
        ﻣﺘﺎﺑﻌﺔ اﻟﻄﻠﺒﺎﺕ
      </vs-sidebar-item> -->

      <vs-sidebar-item v-if="!notAdmin" class="mt-2" to="/operations" id="operations">
        <template #icon>
          <i class="fas fa-plus"></i>
        </template>
        اﻟﻌﻤﻠﻴﺎﺕ
      </vs-sidebar-item>



      <vs-sidebar-item v-if="!notAdmin" class="mt-2" to="/users-accounts" id="users-accounts">
        <template #icon>
          <i class="el-icon-user"></i>
        </template>
        عرض الحسابات
      </vs-sidebar-item>


      


      <vs-sidebar-item v-if="!notAdmin" class="mt-2" to="/stores" id="stores">
        <template #icon>
          <i class="fas fa-truck-loading"></i>
        </template>
        المخازن
      </vs-sidebar-item>


      <vs-sidebar-item v-if="!notAdmin" class="mt-2" to="/register" id="register">
        <template #icon>
         <i class="far fa-user"></i>
        </template>
        حساب جديد
      </vs-sidebar-item>


      <button class="mt-2" @click="printBarCode">
         <i class="far fa-user"></i>
       
        طباعة 
      </button>

      


      <vs-sidebar-item class="mt-2" @click.native="logout()" id="logout">
        <template #icon>
          <i class="fas fa-sign-out-alt"></i>
        </template>
        ﺗﺴﺠﻴﻞ اﻟﺨﺮﻭﺝ
      </vs-sidebar-item>
    </vs-sidebar>
  </aside>
</template>

<script>

export default {
  
  data: () => ({
    active: "home",
    barcodeValue: 'zeyad'
  }),
  methods:{
    printBarCode(){
      const { ipcRenderer } = require("electron");

      ipcRenderer.send("printBarCode");
    },
    logout(){
        this.$store.commit('Logout');
    }
  },
  computed:{
    notAdmin(){
      let user = localStorage.getItem("heavenDashboardUser");
      if(JSON.parse(user).role_id != 1){
        return true;
      }else{
        return false;
      }
    }
  }
};
</script>
<style lang="scss">
@import "../styles/sidebar.scss";
</style>