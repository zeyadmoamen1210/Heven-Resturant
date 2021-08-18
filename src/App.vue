<template>
  <div id="app" dir="rtl">
    <div :style="{'padding-left': isAuth() && $route.name != 'printOrder' ? '50px': '0'}" class="heaven-content">
    <Siderbar v-if="isAuth() && $route.name != 'printOrder' &&  $route.name !=  'printBarcode'" />
      <router-view dir="rtl" />
    </div>

  </div>
</template>

<script>
import Siderbar from "@/components/sidebar";

export default {
  components:{Siderbar},
  name: 'App',
  methods:{
    printBarCode(){
      const { ipcRenderer } = require("electron");

      ipcRenderer.send("printBarCode");
    },
    isAuth(){
      return (localStorage.getItem('heavenDashboardToken') && localStorage.getItem('heavenDashboardUser'))
    }

  }
}
</script>

<style lang="scss">
@import "./styles/bootstrap.scss";
.fullscreen-loading{
  i{
    font-size:  35px !important;
  }
}

.el-select-dropdown{
  z-index: 9999999999 !important;
}
</style>
