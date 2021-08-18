<template>
  <div id="app">
    <button @click="printBarCode"> Print </button>


    <router-view dir="rtl" />
    
  </div>
</template>

<script>

export default {
  name: 'App',
  methods:{
    printBarCode(){
      const { ipcRenderer } = require("electron");

      ipcRenderer.send("printBarCode");
    },
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
</style>
