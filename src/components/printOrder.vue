<template>
  <div>


    



    <div v-if="printAllProducts" class="all-product-orders">


      <MainPrinterComponent :allOrderPrice="allOrderPrice" :isKitchenPrinters="isKitchenPrinters" :dataForPrint="dataForPrint" :inVoiceDetails="inVoiceDetails" />

    </div>

    <div v-else>


      <KitchenPrinterComponent :productsToPrint="productsToPrint[index]" :inVoiceDetails="inVoiceDetails" :table_id="table_id" :notes="notes" />

    </div>


  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import axiosApi from '@/plugins/axios.js'

import MainPrinterComponent from '@/components/printers/main.vue';
import KitchenPrinterComponent from '@/components/printers/kitchen.vue';

export default {
  components:{
    MainPrinterComponent,
    KitchenPrinterComponent
  },
  data(){
    return {
      dataForPrint:[],
      index:0,
      categories: [],
      printers:[],
      inVoiceDetails:{},
      productsToPrint:[],
      printAllProducts: true,
      allOrderPrice:0,
      isKitchenPrinters:true,

      table_id: null,
      notes: null
    }
  },

  methods:{
    
    getAllCategories(){
      axiosApi.get(`/product-categories`).then(res => {
        this.categories = res.data;
        console.log(this.categories)
      })
    },
    getAllPrinters() {

      
      if( JSON.parse(localStorage.getItem("printers")) ){
          let printers = JSON.parse(localStorage.getItem("printers"));
      

          if(printers.findIndex(ele => !ele.devicePrinter) > -1){
            console.log("printer hasn't device printer")
            this.printers = [];
            return;
          }
      }

      this.printers = JSON.parse(localStorage.getItem("printers"));
      console.log("printer has device printer")

    },
  },
  created(){

  

  this.getAllCategories();
  this.getAllPrinters();

  ipcRenderer.on("directData", (e, a) => {




    this.isKitchenPrinters = true;
    this.getAllPrinters();
    this.notes = a.notes;
    this.table_id = a.table_id;

    this.inVoiceDetails = {};
    this.dataForPrint = []
    this.index = 0;
    console.log('direct ', a)
    this.printAllProducts = true;
    this.dataForPrint = [...a.products];
    if(a.invoice && a.invoice.length > 0){
      this.inVoiceDetails = a.invoice[0];
    }else if (Object.keys(a.invoice).length > 0){
      this.inVoiceDetails = a.invoice
    }
    this.isKitchenPrinters = a.kitchenPrinters;

    console.log("direct ", a.products)

    this.allOrderPrice = 0;
      this.dataForPrint.forEach(ele => {
        this.allOrderPrice += (ele.pivot ? ele.pivot.price : ele.price) * (ele.pivot ? ele.pivot.qty : ele.qty);
      })

    


      ipcRenderer.send("printTotalOrder", this.printers[0].devicePrinter);

  });

    ipcRenderer.on("data", (event, arg) => {




      this.isKitchenPrinters = true;
      this.getAllPrinters();

     


      this.inVoiceDetails = {};
    this.dataForPrint = []
      this.index = 0;
      console.log(arg);

      
      if(arg.invoice){
      this.inVoiceDetails = arg.invoice[0] || arg.invoice;
    }


     this.notes = arg.notes;
    this.table_id = arg.table_id;
    

      this.dataForPrint = [...arg.products];

      this.allOrderPrice = 0;
      this.dataForPrint.forEach(ele => {
        this.allOrderPrice += (ele.pivot ? ele.pivot.price : ele.price) * (ele.pivot ? ele.pivot.qty : ele.qty);
      })

      console.log("prices" , this.allOrderPrice)
      this.printAllProducts = true;

      if(this.categories && this.printers){


        let productsPrinters = [];
        for(let i = 0 ; i < this.dataForPrint.length ; i++){
            productsPrinters.push(this.dataForPrint[i].printer_id);
        }
      
        productsPrinters = [...new Set(productsPrinters)];

        this.productsToPrint = []
          productsPrinters.map((ele2,index) => {
              this.productsToPrint.push([]);
              this.dataForPrint.map((ele) => {
                if(ele.printer_id == ele2){
                  this.productsToPrint[index].push(ele)
                }
              })
            
          })


          if(arg.type_id && arg.type_id == 3){
            this.printAllProducts = false;
            this.isKitchenPrinters = true;

            console.log("print specific printer ", this.productsToPrint[this.index][0].printer_id)
            // ipcRenderer.send("printSpecificPrinter", this.productsToPrint[this.index] );

            let printer = this.printers.find(ele => ele.id == this.productsToPrint[this.index][0].printer_id);



            // deleted
        ipcRenderer.send("printSpecificPrinter", {data: this.productsToPrint[this.index], printer: printer.devicePrinter});




            // this.currPrinter = 
            // console.log("curr printer " ,this.productsToPrint[this.index][0].printer_id)
          }else{
  
              ipcRenderer.send("printTotalOrder", this.printers[0].devicePrinter );

          }


          

      }
  
    })




    ipcRenderer.on('printed', () => {
      this.index = Number(this.index) + 1;

      if(this.index < this.productsToPrint.length){

        let printer = this.printers.find(ele => ele.id == this.productsToPrint[this.index][0].printer_id);
        ipcRenderer.send("printSpecificPrinter", {data: this.productsToPrint[this.index], printer: printer.devicePrinter});

      }else{
          ipcRenderer.send("closePrinting");
      }

    });


    ipcRenderer.on('printedTotal', () => {

      if(this.isKitchenPrinters){
        this.printAllProducts = false;
      }else{
        this.printAllProducts = true;

      }

    
        
      

      if(this.isKitchenPrinters && (this.index < this.productsToPrint.length)){

        let printer = this.printers.find(ele => ele.id == this.productsToPrint[this.index][0].printer_id);

        ipcRenderer.send("printSpecificPrinter", {data: this.productsToPrint[this.index], printer: printer.devicePrinter});


      }else{
          ipcRenderer.send("closePrinting");
      }
    
     

    });

    

    


    

  }
}
</script>

<style lang="scss">



</style>