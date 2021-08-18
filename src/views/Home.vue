<template>
  <div class="home">
    <b-container fluid>
      <b-row>



        

        <b-col lg="7" md="12" class="meun mt-5">
          <Type @setOrdersTabActive="setOrdersTabActive" :type="types" />
          <Workbook  />
        </b-col>

        <b-col lg="5" md="12" class="data">
          <b-row>
            
            <b-col md="12" class="mt-5">
              <Order :activeOrderTab="activeOrderTab" />
            </b-col>
          </b-row>
        </b-col>

        
        <Addition />
    
        
        
      </b-row>
    </b-container>
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
        const loading = this.$vs.loading();
        axiosApi.get('order-types').then(res => {
            this.types = res.data;
        }).finally(() => loading.close());
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
    console.log("route ",this.$route)
  }
};
</script>
