<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row">


        <div class="col-md-7 meun mt-5">
          <Type @setOrdersTabActive="setOrdersTabActive" :type="types" />
          <Workbook  />
        </div>
        
        <div class="col-md-5 data">
            <Order :activeOrderTab="activeOrderTab" />
        </div>
 
      </div>

      <div class="row">
         <Addition />
      </div>
    </div>
  </div>
</template>

<script>
import axiosApi from '@/plugins/axios.js';
import Type from "../components/typeCard";
import Workbook from "../components/workbooks";
// import workbooks from "../data/Workbooks";

import Order from "../components/order";
import Addition from "../components/addition";
export default {
  name:"Home",
  components: {
    Type,
    Workbook,
    Order,
    Addition,
  },

  methods:{
    setOrdersTabActive(){
      console.log("hi")
      this.activeOrderTab = true;
    },
    updateTables(ele){
      console.log(ele)
      this.tableNamesToggle = ele;
    },
    getOrdersTypes(){
        const loading = this.$loading({
          lock: true,
          text: false,
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255,.7)',
          customClass: 'fullscreen-loading'
        });
        axiosApi.get('order-types').then(res => {
            this.types = res.data;
            console.log("order types ")
        }).finally(() => {
          loading.close()
        });
    },
  },
 
  data: () => ({
    activeOrderTab: "",
    types: [],
  
    tableNamesToggle:true,
    items: [],
  }),

  created(){
    this.getOrdersTypes();
    
  }
};
</script>
