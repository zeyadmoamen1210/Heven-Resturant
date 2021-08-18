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


      <vs-sidebar-item class="mt-3" to="/operations" id="operations">
        <template #icon>
          <i class="fas fa-qrcode"></i>
        </template>
        العمليات
      </vs-sidebar-item>
     

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