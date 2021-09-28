<template>
  <div class="receiving-orders">

    <el-dialog
      :visible.sync="determinePrintersFirst"
      width="30%">

      <div class="d-block text-center">
        <div class="text-center">
          <img
            style="width: 90px;margin-bottom: 10px;"
            src="@/assets/printer.svg"
            alt=""
          />
        </div>
        <h3 class="text-center">من فضلك حدد الطابعات علي الجهاز اولاً</h3>
      </div>
      
    </el-dialog>
    
    <div class="container-fluid">



      <swiper class="swiper" :options="swiperOptionBestSeller">
        
        <swiper-slide v-for="type in types" :key="type.id">
          <Type
            :class="{ 'selected-type': type.id == selectedOrderType.id }"
            @click.native="selectType(type)"
            :type="type"
            color="#EBF9FC"
            style="margin-right: 10px; cursor: pointer; margin-top: 20px"
          />
        </swiper-slide>

        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>


     
      <div class="show-orders" style="padding: 0 45px;">
        <!-- <h6 class="text-right" style="color: #949494;font-size: 12px;">اﺑﺤﺚ ﺑﺮﻗﻢ اﻟﻬﺎﺗﻒ ﻭ اﻟﻤﻨﺎﻃﻖ ﻭ ﺭﻗﻢ اﻟﻄﻠﺐ</h6> -->

        <div class="filter-orders d-flex mb-4">
          <div class="ml-2">
            <el-input
              @keydown.enter.native="getOrders()"
              placeholder="اﺑﺤﺚ ﺑﺎﻟﻤﻮﺑﺎﻳﻞ"
              v-model="mobile"
            ></el-input>
          </div>

          <div class="ml-2">
            <el-input
              @keydown.enter.native="getOrders()"
              placeholder="اﺑﺤﺚ ﺑﺮﻗﻢ اﻟﻄﻠﺐ"
              v-model="code"
            ></el-input>
          </div>
          <div>
            <el-select
              clearable
              @change="getOrders"
              v-model="area"
              placeholder="اﺑﺤﺚ ﺑﺎﻟﻤﻨﺎﻃﻖ"
            >
              <!-- <el-option :key="5" label="5" :value="5"> </el-option> -->

              <el-option
                v-for="area in areas"
                :key="area.id"
                :label="area.name"
                :value="area.id"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <el-select
              clearable
              @change="getOrders"
              v-model="status"
              placeholder="حالة الطلب"
            >
              <!-- <el-option :key="5" label="5" :value="5"> </el-option> -->

              <el-option
                v-for="option in statusOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <el-select
              clearable
              @change="getOrders"
              v-model="payment_type"
              placeholder="طريقة الدفع"
            >
              <!-- <el-option :key="5" label="5" :value="5"> </el-option> -->

              <el-option
                v-for="option in paymentStatus"
                :key="option.val"
                :label="option.name"
                :value="option.val"
              >
              </el-option>
            </el-select>
          </div>

          <div class="mr-2">
                <!-- range-separator="اﻟﻲ" -->
              <!-- <el-date-picker
                
                v-model="dateRange"
                type="daterange"
                format="yyyy/MM/dd"
                value-format="yyyy-MM-dd"
                start-placeholder="ﺑﺪاﻳﺔ اﻟﻔﺘﺮﺓ"
                end-placeholder="ﻧﻬﺎﻳﺔ اﻟﻔﺘﺮﺓ"
              >
              </el-date-picker> -->


              <el-date-picker
                @change="getOrders"
                :format="format"
                :value-format="valueFormat"
                v-model="dateRange"
                type="datetimerange"
                range-separator="إلي"
                start-placeholder="بداية الفترة"
                end-placeholder="نهاية الفترة">
              </el-date-picker>


          </div>
        </div>
        <div class="row">

       
        
       <el-table
        class="mt-2"
        align="right"
        v-if="tableData.length > 0"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column label="#" type="index" width="50"> </el-table-column>
        <el-table-column sortable width="80" label="ﺭﻗﻢ " prop="order">
        </el-table-column>

        <el-table-column  width="100" label="القيمة">

          <template slot-scope="scope">
             {{Number(scope.row.total) + Number(scope.row.restaurant_cost) + Number(scope.row.driver_cost)}}
           </template>

        </el-table-column>

        
        <el-table-column   width="100"  label="اﻟﺤﺎﻟﺔ"> 

           <template slot-scope="scope">
             <el-tag v-if="scope.row.status==1">ﻓﻲ اﻟﻤﻄﺒﺦ</el-tag>
             <el-tag type="warning" v-if="scope.row.status==2">ﻓﻲ اﻟﻄﺮﻳﻖ</el-tag>
             <el-tag type="success" v-if="scope.row.status==3">ﺗﻢ اﻟﺘﻮﺻﻴﻞ </el-tag>
             <el-tag type="danger" v-if="scope.row.status==4"> ﻣﺮﻓﻮﺽ بعد</el-tag>
             <el-tag type="danger" v-if="scope.row.status==5">ﻣﺮﻓﻮﺽ قبل</el-tag>
           </template>
        </el-table-column>
       
        <el-table-column   width="180" label="اﻟﻌﻤﻴﻞ" >
           <template slot-scope="scope">
             <span>{{scope.row.customer.name }}</span>

           </template>
           </el-table-column>
        <el-table-column label="ﺑﻮاﺳﻄﺔ" prop="user.name"> </el-table-column>
         <el-table-column   width="100"  label="اﻟﻨﻮﻉ"> 

           <template slot-scope="scope">
           
             <el-tag type="warning" >{{scope.row.order_type.name}}</el-tag>
         
           </template>
        </el-table-column>
      
        <el-table-column label="اﻟﺴﺎﺋﻖ"> 
            <template slot-scope="scope">
              <span v-if="scope.row.employee.id>1">{{scope.row.employee.name}}</span>

            </template>

        </el-table-column>
        
      
        <el-table-column width="200" sortable label="اﻟﺘﻮﻗﻴﺖ">
     
            <template slot-scope="scope">
              <span>{{scope.row.created_at | moment("dddd | Do / MM / YYYY | h:mm A")}}</span>
            </template>
        </el-table-column>

         <el-table-column label="اﺟﺮاءاﺕ" >
          <template slot-scope="scope">

            <el-dropdown>
              <el-button type="primary">
                الإجرائات<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="scope.row.status<4" @click.native="openModelToUpdateStatus(scope.row)">ﺗﻐﻴﻴﺮ اﻟﺤﺎﻟﺔ</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.status<4" @click.native="openModelToUpdatePaymentWay(scope.row)" >طريقة الدفع</el-dropdown-item>
                <el-dropdown-item @click.native="printOrder(scope.row)" v-if="isAdmin">إعادة الطباعة</el-dropdown-item>

              </el-dropdown-menu>
            </el-dropdown>

              
                 
                  
               
          </template>
         </el-table-column>
         <el-table-column type="expand">
      <template slot-scope="props">
        <el-table
        class="mt-2"
        align="right"
        :data="props.row.products"
        border
        style="width: 60%; margin-right:20%"
      >

       <el-table-column label="#" type="index" width="50"> </el-table-column>
        <el-table-column sortable width="100" label="اﻟﻜﻤﻴﺔ " prop="pivot.qty">
        </el-table-column>
        <el-table-column  label="اﻟﺼﻨﻒ " prop="name"></el-table-column>
        <el-table-column  width="100"  label="اﻟﻤﻘﺎﺱ " prop="pivot.size"></el-table-column>
        <el-table-column  width="100"  label="اﻟﺴﻌﺮ " prop="pivot.price"></el-table-column>
        <el-table-column  width="100"  label="اﻻﺟﻤﺎﻟﻲ">
            <template slot-scope="scope">
              <span>{{scope.row.pivot.qty* scope.row.pivot.price}}</span>

            </template>

        </el-table-column>

        

       

        </el-table>

      <el-tag type="success" v-if="props.row.notes"> * ﻣﻼﺣﻈﺎﺕ : {{props.row.notes}}</el-tag>
      <el-tag type="danger" v-if="props.row.rejected_reason"> * ﺳﺒﺐ اﻟﺮﻓﺾ : {{props.row.rejected_reason}}</el-tag>
      <el-tag type="warning" v-if="props.row.payment_type && props.row.payment_type == 1"> * نوع الدفع : نقدي </el-tag>
      <el-tag type="warning" v-if="props.row.payment_type && props.row.payment_type == 2"> * نوع الدفع: فيزا</el-tag>

      <el-tag type="warning" v-if="props.row.preparated_at"> * تاريخ الاستلام : {{new Date(props.row.preparated_at).toLocaleString("ar-EG")}}   </el-tag>
      </template>
    </el-table-column>
       
      </el-table>
        </div>
      </div>

      <div class="show-deliveries" v-if="showDeliveryModel">
        <el-button
          class="d-block heven-secondary p-0"
          icon="el-icon-right"
          plain
          @click="showDeliveryModel = !showDeliveryModel"
          type="primary"
          >اﻟﺮﺟﻮﻉ ﺇﻟﻲ اﻟﻄﻠﺒﺎﺕ</el-button
        >

        <div class="deliveries mt-3">
          <h6 class="text-right" style="color: #949494; font-size: 12px">
            اﺑﺤﺚ ﺑﺄﺳﻢ اﻟﻌﻤﻴﻞ ﻭ ﺭﻗﻢ اﻟﻬﺎﺗﻒ ﻭ اﻟﺘﻠﻴﻔﻮﻥ ﻭ اﻟﻤﻨﺎﻃﻖ
          </h6>
          <div class="d-flex">
            <div class="ml-2">
              <el-input
              @keydown.enter.native="getDrivers()"
                placeholder="اﺑﺤﺚ ﺑﺄﺳﻢ اﻟﺴﺎﺋﻖ "
                v-model="driverName"
              ></el-input>
            </div>
            <div class="ml-2">
              <el-input
               @keydown.enter.native="getDrivers()"

                placeholder="اﺑﺤﺚ ﺑﺮﻗﻢ اﻟﺴﺎﺋﻖ  "
                v-model="driverMobile"
              ></el-input>
            </div>
          </div>

          <div class="row">
            <div
              v-for="boy in drivers"
              :key="boy.id"
              class="col-md-2"
            >
              <div
                class="delivery-boy"
                @click="setDeliveryBoy(boy)"
                :class="{
                  'selected-delivery-boy': boy.id == currDeliveryBoy.id,
                }"
              >
                <img src="@/images/delivery-boy.png" alt="" />
                <div>
                  <h6 style="font-size: 18px; margin-bottom: 10px">
                    {{ boy.name }}
                  </h6>
                  <h6>{{ boy.mobile }}</h6>
                  <!-- <div class="row">
                                        <div class="col-md-12">
                                            <h6> <b>اﻟﺮاﺗﺐ / </b> {{boy.salary}} <sub>L.E</sub></h6>
                                        </div>
                                        <div class="col-md-12">
                                            <h6> <b>اﻟﺴﺎﻋﻪ / </b> {{boy.hour_cost}} </h6>
                                        </div>
                                    </div> -->

                  <!-- <h6> {{boy.address}} </h6> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <vs-dialog v-model="toggleOrderProducts">
      <template #header>
        <h4 class="not-margin">ﻣﻨﺘﺠﺎﺕ اﻟﻄﻠﺐ</h4>
      </template>

      <div class="con-form">
        <div class="">
          <table class="custom-table">
            <thead>
              <tr>
                <td>اﻟﻤﻨﺘﺞ</td>
                <td>اﻟﻜﻤﻴﺔ</td>
                <td>اﻟﺴﻌﺮ</td>
                <td>اﻟﻤﻘﺎﺱ</td>
              </tr>
            </thead>

            <tr v-for="(item, index) in currOrderProducts" :key="index">
              <td>{{ item.name }}</td>
              <td>{{ item.pivot.qty }}</td>
              <td>{{ item.pivot.price }}</td>
              <td>{{ item.pivot.size }}</td>
            </tr>
          </table>
        </div>
        <!-- <el-select v-model="updateStatus" placeholder="ﺇﺧﺘﺮ اﻟﺤﺎﻟﺔ">
                <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select> -->
      </div>

      <!-- <template #footer>

          <el-button style="background-color: #FE5634 !important;border-color: #FE5634 !important;color:#FFF !important" plain @click="updateStatusInBackend()" type="primary">
             ﺗﻌﺪﻳﻞ اﻟﺤﺎﻟﺔ

        </el-button>

        </template> -->
    </vs-dialog>

    <vs-dialog v-model="showModelToUpdateStatus">
      <template #header>
        <h4 class="not-margin">ﺗﻌﺪﻳﻞ ﺣﺎﻟﺔ اﻟﻄﻠﺐ</h4>
      </template>

      <div class="con-form">
        <el-select v-model="updateStatus" placeholder="ﺇﺧﺘﺮ اﻟﺤﺎﻟﺔ">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="con-form" v-if="updateStatus==4||updateStatus==5">
          <el-select
              clearable
              v-model="rejectedReason"
              placeholder="ﺣﺪﺩ ﺳﺒﺐ اﻟﺮﻓﺾ"
            >

              <el-option
                v-for="reason in orderRejectReasons"
                :key="reason.id"
                :label="reason.reason"
                :value="reason.reason"
              >
              </el-option>
            </el-select>
      </div>
    <span v-if="updateStatus==4&&rejectedReason==''" class="text-danger">ﻣﻦ ﻓﻀﻠﻚ ﺣﺪﺩ ﺳﺒﺐ اﻟﺮﻓﺾ</span>
      <template #footer>
        <!-- <vs-button border @click="updateStatusInBackend()"> </vs-button> -->

        <el-button

        :disabled="updateStatus==4&&rejectedReason==''"
          style="
            background-color: #fe5634 !important;
            border-color: #fe5634 !important;
            color: #fff !important;
          "
          plain
          @click="updateStatusInBackend()"
          type="primary"
        >
          ﺗﻌﺪﻳﻞ اﻟﺤﺎﻟﺔ
        </el-button>
      </template>
    </vs-dialog>







    <vs-dialog v-model="showModelToUpdatePaymentWay">
      <template #header>
        <h4 class="not-margin">ﺗﻌﺪﻳﻞ طريقة الدفع</h4>
      </template>

    
      <div class="con-form" >
          <el-select
              clearable
              v-model="paymentWay"
              placeholder="حالات الدفع"
              key-value="val"
            >

              <el-option
                v-for="way in paymentStatus"
                :key="way.val"
                :label="way.name"
                :value="way.val"
              >
              </el-option>
            </el-select>
      </div>
      <template #footer>
        <!-- <vs-button border @click="updateStatusInBackend()"> </vs-button> -->

        <el-button
          style="
            background-color: #fe5634 !important;
            border-color: #fe5634 !important;
            color: #fff !important;
          "
          plain
          @click="updatePaymentWay()"
          type="primary"
        >
          ﺗﻌﺪﻳﻞ طريقة الدفع
        </el-button>
      </template>
    </vs-dialog>





    <vs-dialog v-model="showDeliveryInfoModel">
      <template #header>
        <h4 class="not-margin">ﺳﺎﺋﻖ ﻫﺬا اﻟﻄﻠﺐ</h4>
      </template>

      <div class="con-form">
        <table class="custom-table">
          <thead>
            <tr>
              <td>اﻷﺳﻢ</td>
              <td>اﻟﻤﻮﺑﺎﻳﻞ</td>
              <td>اﻟﺴﻌﺮ</td>
              <td>ﺗﻜﻠﻔﺔ اﻟﺴﺎﻋﺔ</td>
            </tr>
          </thead>

          <tr v-if="currOrder && currOrder.employee">
            <td>{{ currOrder.employee.name }}</td>
            <td>{{ currOrder.employee.mobile }}</td>
            <td>{{ currOrder.employee.salary }}</td>
            <td>{{ currOrder.employee.hour_cost }}</td>
          </tr>
        </table>
      </div>
    </vs-dialog>
  </div>
</template>

<script>
import axiosApi from "@/plugins/axios.js";
import Type from "@/components/Operations/Type.vue";

export default {
  components: {
    Type
  },
  watch: {},
  data() {
    return {
      determinePrintersFirst: false,
      showModelToUpdatePaymentWay:false,
    //  
      dateRange:localStorage.getItem('reportsInterval')?JSON.parse(localStorage.getItem('reportsInterval')): [((this.$moment(new Date(), "DD-MM-YYYY")).locale("en").format("YYYY-MM-DD") + ' '+'11:30:00'), ((this.$moment(new Date(), "DD-MM-YYYY").add(1,'days')).locale("en").format("YYYY-MM-DD")+ ' '+'11:30:00')],


      format:'yyyy-MM-dd HH:mm A',
      valueFormat:'yyyy-MM-dd HH:mm:ss',

      rejectedReason: "",
      driverMobile: "",
      driverName: "",
      mobile: "",
      code: "",
      area: "",
      areas: [],
      orderRejectReasons: [],
      tableData: [],

      currOrder: [],
      toggleOrderProducts: false,
      currOrderProducts: [],
      currDeliveryBoy: {},
      drivers: [],
      updateStatus: "",
      showDeliveryModel: false,
      payment_type:this.$route.query.payment_type?Number(this.$route.query.payment_type):'',
      paymentStatus:[
        {name: 'نقدي', val: 1},
        {name: 'فيزا', val: 2},
      ],
      paymentWay: '',
      status:this.$route.query.status?Number(this.$route.query.status):'',
      statusOptions: [
        { label: "ﻗﻴﺪ اﻹﻧﺘﻈﺎﺭ", value: 1 },
        { label: "ﻓﻲ اﻟﻄﺮﻳﻖ", value: 2 },
        { label: "ﺗﻢ اﻟﺘﻮﺻﻴﻞ", value: 3 },
        { label: " مرفوض بعد التشغيل", value: 4 },
        { label: " مرفوض قبل التشغيل", value: 5 },
      ],
      selectedOrderType:{},
      showModelToUpdateStatus: false,
      active: 0,
      printers:[],
      selectedOrderType: {},
      types: [],
      orders: [],
      showDeliveryInfoModel: false,
      categories:[],

      swiperOptionBestSeller: {
        slidesPerView: 8,
        spaceBetween: 5,
        slidesPerGroup: 1,
        loopFillGroupWithBlank: false,
        breakpoints: {
          1200: {
            slidesPerView: 8,
            spaceBetween: 5,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
          350: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          0: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
   computed: {
    isAdmin() {
      let user = localStorage.getItem("heavenDashboardUser");
      if (JSON.parse(user).role_id == 1) {
        return true;
      } else {
        return false;
      }
    },
  },

  created() {
  
    this.getOrders();
    this.getOrderRejectReasons();
    this.getAllAreas();
    this.getOrderTypes(true);
    this.getAllPrinters();
  },

  methods: {

    getOrderTypes(inCreated = false) {
      const loading = this.$vs.loading();
      let x = axiosApi
        .get("order-types")
        .then((res) => {
          this.types = res.data;
          this.types.unshift({
            id:0,
            name:'الكل'
          })
        })
        .finally(() => loading.close());
      if (inCreated) {
        Promise.all([x]).then(() => {
          this.selectedOrderType = this.types[0];
          this.getOrders();
        });
      }
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

    printOrder(order){


      if(!this.printers || this.printers.length == 0){

        this.determinePrintersFirst = true;

        // setTimeout(() => {
        //   this.$bvModal.hide("determinePrintersFirst");
        // }, 2000);

        return;
      }


      this.printInvoiceDetails({
              products: [...order.products],
              invoice: order,
              kitchenPrinters: true,
      });

    },
 
    printInvoiceDetails(products) {



      // Set Printer id inside products

      products.products.map(prod => {
        this.categories.map(cate => {
          if(cate.id == prod.product_category_id){
            prod.printer_id = cate.printer_id;
          }
        })
      });


      let productsCategories = [];
      for (let i = 0; i < products.products.length; i++) {
        productsCategories.push(products.products[i].product_category_id);
      }

      productsCategories = [...new Set(productsCategories)];
      console.log(products);
      console.log(productsCategories);

      let productsPrinters = [];
      productsCategories.map((ele2, index) => {
        productsPrinters.push([]);
        products.products.map((ele) => {
          if (ele.product_category_id == ele2) {
            productsPrinters[index].push(ele);
          }
        });
      });

      console.log(productsPrinters);

      console.log(this.printers);

      const { ipcRenderer } = require("electron");

      console.log();
      ipcRenderer.send("printOrder", products);
      console.log("print order", products);
    },
 

    showDeliveryInfo(order) {
      this.currOrder = { ...order };
      this.showDeliveryInfoModel = true;
    },

    getAllAreas() {
      axiosApi.get(`/areas`).then((res) => {
        this.areas = res.data;
      });
    },
    getOrderRejectReasons() {
      axiosApi.get(`/reject-reasons`).then((res) => {
        this.orderRejectReasons = res.data;
      });
    },
    showOrderProducts(order) {
      this.toggleOrderProducts = true;
      this.currOrderProducts = [...order.products];
    },

   


    setDeliveryBoy(delivery) {


      if(!this.printers || this.printers.length == 0){

        this.determinePrintersFirst = true;

        // setTimeout(() => {
        //   this.$bvModal.hide("determinePrintersFirst");
        // }, 2000);

        return;
      }


      this.currDeliveryBoy = { ...delivery };
      axiosApi
        .put(`/orders/${this.currOrder.id}`, {
          employee_id: this.currDeliveryBoy.id,
        })
        .then((res) => {

          
          this.printInvoiceDetails({
              products: [...res.data[0].products],
              invoice: res.data[0],
              kitchenPrinters: false,
            });
          this.$notify({
            title: "ﺗﻢ ﺑﻨﺠﺎﺡ",
            message: "ﺗﻢ ﺇﺳﻨﺎﺩ اﻟﺴﺎﺋﻖ ﺇﻟﻲ اﻟﻄﻠﺐ ﺑﻨﺠﺎﺡ",
            type: "success",
          });
          this.showDeliveryModel = false;
          this.getOrders();
        });
    },
    getDrivers() {
      let url = `/employees/drivers?page=1`;
      if (this.driverMobile.trim() != "") {
        url += "&mobile=" + this.driverMobile;
      }
      if (this.driverName.trim() != "") {
        url += "&name=" + this.driverName;
      }

      axiosApi.get(url).then((res) => {
        this.drivers = res.data.data;
      });
    },
    openAssignToDeliveryModel(order) {
      console.log("order",order)
      this.showDeliveryModel = true;
      this.currOrder = { ...order };
    },
    updatePaymentWay(){
      this.showModelToUpdatePaymentWay = false;
      const loading = this.$vs.loading();
     
      axiosApi
        .put(`/orders/${this.currOrder.id}/update`, {
          payment_type: this.paymentWay
        })
        .then(() => {
          this.$notify({
            title: "ﺗﻢ ﺑﻨﺠﺎﺡ",
            message: "ﺗﻢ ﺗﺤﺪﻳﺚ طريقة الدفع ﺑﻨﺠﺎﺡ",
            type: "success",
          });
          this.getOrders();
        })
        .finally(() => loading.close());
    },
    updateStatusInBackend() {
      this.showModelToUpdateStatus = false;
      const loading = this.$vs.loading();
     
      axiosApi
        .put(`/orders/${this.currOrder.id}/status`, {
          status: this.updateStatus,
          reject_reason:this.rejectedReason
        })
        .then(() => {
          this.$notify({
            title: "ﺗﻢ ﺑﻨﺠﺎﺡ",
            message: "ﺗﻢ ﺗﺤﺪﻳﺚ ﺣﺎﻟﺔ اﻟﻄﻠﺐ ﺑﻨﺠﺎﺡ",
            type: "success",
          });
          this.getOrders();
        })
        .finally(() => loading.close());
    },
    openModelToUpdateStatus(order) {
      this.currOrder = { ...order };
      this.rejectedReason="";
      this.updateStatus = this.currOrder.status;
      this.showModelToUpdateStatus = true;
    },
    openModelToUpdatePaymentWay(order){
      this.currOrder = { ...order };
      this.showModelToUpdatePaymentWay = true;
    },
    selectType(type) {
      this.selectedOrderType = { ...type };
      this.getOrders();
    },
    getOrders() {
      const loading = this.$vs.loading();
    //   /orders?area=1&employee=1&user=1&start=2021-05-01&end_date=2021-06-30
      let url = `/orders?page=1`;
      if (this.mobile.trim() != "") {
        url += "&mobile=" + this.mobile;
      }
      if (this.code.trim() != "") {
        url += "&code=" + this.code;
      }
      if (this.area != "") {
        url += "&area=" + this.area;
      }
      if (this.payment_type !="") {
        url += "&payment_type=" + this.payment_type;
      }
      if (this.status != "") {
        url += "&status=" + this.status;
      }
      if (Object.keys(this.selectedOrderType).length > 0 &&this.selectedOrderType.id>0)  {
        url += "&order_type=" + this.selectedOrderType.id;
      }
        if (this.dateRange != null) {localStorage.setItem('reportsInterval',JSON.stringify(this.dateRange));

      localStorage.setItem('reportsInterval',JSON.stringify(this.dateRange));

          url += "&start=" + this.dateRange[0];
          url += "&end=" + this.dateRange[1];
        }
      console.log(this.dateRange)
      console.log(url)
      axiosApi
        .get(url)
        .then((res) => {
          this.orders = res.data.data;
          this.tableData = res.data.data;

        })
        .finally(() => loading.close());
    },
   
  },
};
</script>

<style lang="scss">
.con-form {
  .el-select {
    width: 100%;
    margin-bottom: 14px;
  }
}
.el-table .cell{
  text-align: center;
}
.el-select-dropdown.el-popper {
  z-index: 999999 !important;
}
.selected-type {
  background: #fe5634 !important;
  color: #fff !important;
}
.selected-delivery-boy {
  background: #f7f7f7 !important;
}
.receiving-orders {
  margin-top: 20px;
}
.receiving-orders {
  .swiper-slide {
    width: auto !important;
  }

  .deliveries {
    .delivery-boy {
      cursor: pointer;
      padding: 25px 0;
      // box-shadow: 0 4px 25px 0 #0000000f;
      border-radius: 17px;
      margin-top: 15px;
      text-align: center !important;
      img {
        width: 67px;
      }
      h6 {
        font-size: 12px;
        margin-bottom: 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}

.show-orders {
  .order-card {
    position: relative;
    box-shadow: 0 4px 25px 0 #0000000f;
    padding: 6px 7px;
    margin-bottom: 15px;
    text-align: start;
    height: 322px;

    .order-count {
      button {
        padding: 8px 10px 5px;
        border: 1px solid #eee;
        border-radius: 50%;
      }
      position: absolute;
      top: 11px;
      right: 10px;
    }

    .customer-data {
      table {
        font-family: din;
        //    margin-bottom:10px;
      }
      table,
      tr,
      td {
        //    border: 1px solid #333;
        padding: 3px;
      }
      td {
        &:last-of-type {
          text-align: center;
          padding: 0 9px;
          font-size: 14px;
        }
        &:first-of-type {
          width: 33%;
        }
      }

      > span {
        display: block;
        background: #ebf9fc;
        padding: 8px;
        margin-bottom: 4px;
        /* border-bottom: 1px solid #ccc; */
        color: #545352;
      }
      h6 {
        margin-bottom: 4px;
      }
      .additional-data {
        h6 {
          font-size: 10px;
          color: #675d5d;
          margin-bottom: 6px;
        }
      }
      .total-price {
        b {
          font-size: 20px;
        }
      }
    }

    .buttons {
      div {
        flex: 1;
        text-align: center;
        button {
          width: 90%;
          margin: 0;
        }
      }
    }
  }
}

.el-button--primary.is-plain {
  color: #fe5634 !important;
  background: #ffffff !important;
  border-color: #fe5634 !important;
  transition: all 0.5s ease;

  &:hover {
    background: #fe5634 !important;
    color: #fff !important;
  }
}

.custom-table {
  width: 100%;
  direction: rtl;
  font-family: "din";
  thead {
    font-family: "din-bold";
  }
  td {
    font-size: 13px;
  }
  tr {
    &:nth-of-type(even) {
      background: #f7f7f7;
    }
  }
}
</style>