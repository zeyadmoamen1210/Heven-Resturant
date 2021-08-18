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

@font-face {
  font-family: "CairoBold";
  src: url('./assets/fonts/Cairo/Cairo-Bold.ttf');
}
@font-face {
  font-family: "CairoSemiBold";
  src: url('./assets/fonts/Cairo/Cairo-SemiBold.ttf');
}
@font-face {
  font-family: "CairoRegular";
  src: url('./assets/fonts/Cairo/Cairo-Regular.ttf');
}
h1,h2,h3{
  font-family: "CairoBold";
}
h4,h5,h6{
  font-family: "CairoSemiBold";
}
p, span, input, label, div, li{
  font-family: "CairoRegular";
}

h6{
  margin-bottom: 0;
  margin-top: 0;
      font-size: 13px;
    margin-bottom: 3px;
}
.el-select{
  width: 100%;
}
.vs-dialog{
  text-align: center !important;
}
.el-notification {
  direction: rtl !important;
}
.el-dropdown-menu{
  li{
    text-align: right !important;
  }
}
.el-select-dropdown{
  text-align: right;
}
.edit-delete{text-align: center;}

.delete-dialog {
  .con-content{text-align: center;}
  .con-content p{
    display: inline-block !important;
  }
  .con-content h6{
    display: inline-block !important;
  }
}

.vs-dialog__header{
      display: block;
    text-align: center;
    font-family: "CairoBold";
    font-weight: bold;
    font-size: 19px;
    margin-bottom: 0;
    padding-bottom: 0;
}

:root{
  --danger: #e74c3c;
  --bs-danger: #e74c3c;
  --success: #2ecc71;
  --bs-success: #2ecc71
}

.categories-selection .nav.nav-pills.card-header-pills{
    padding: 0;
    list-style: none;
    display: flex;
    li{
      padding: 0 10px;
    }
  }

  .categories-selection .nav-pills .nav-link.active, .categories-selection .nav-pills .show > .nav-link {

    padding: 0px 13px;
    text-decoration: none !important;
  }

  .vs-button__content{
    padding-top: 2px !important;
  }

  .vs-dialog__header{
    padding-bottom: 0 !important;
    h4, h6{
      padding: 0;
      margin: 0;
    }
  }

.el-table{
  td{
    border: 1px solid #EBEEF5 !important;
  }
}
</style>
