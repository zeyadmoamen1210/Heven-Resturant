<template>
  <div class="receiving-orders">
    <div class="container">

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
      


      <swiper class="swiper" :options="swiperOptionBestSeller">
        <swiper-slide v-for="type in types" :key="type.id">
          <Type
            v-if="type.id != 3"
            :class="{ 'selected-type': type.id == selectedOrderType.id }"
            @click.native="selectType(type)"
            :type="type"
            color="#EBF9FC"
            style="margin-right: 10px; cursor: pointer; margin-top: 20px"
          />
        </swiper-slide>

        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>

      <div class="show-orders" v-if="!showDeliveryModel">
        <!-- <h6 class="text-right" style="color: #949494;font-size: 12px;">ﺐﻠﻄﻟا ﻢﻗﺭ ﻭ ﻖﻃﺎﻨﻤﻟا ﻭ ﻒﺗﺎﻬﻟا ﻢﻗﺮﺑ ﺚﺤﺑا</h6> -->

        <div class="filter-orders d-flex mb-4">
          <div class="ml-2">
            <el-input
              @keydown.enter.native="getOrdersByType()"
              placeholder="ﻞﻳﺎﺑﻮﻤﻟﺎﺑ ﺚﺤﺑا"
              v-model="mobile"
            ></el-input>
          </div>

          <div class="ml-2">
            <el-input
              @keydown.enter.native="getOrdersByType()"
              placeholder="ﺐﻠﻄﻟا ﻢﻗﺮﺑ ﺚﺤﺑا"
              v-model="code"
            ></el-input>
          </div>
          <div>
            <el-select
              clearable
              @change="getOrdersByType"
              v-model="area"
              placeholder="ﻖﻃﺎﻨﻤﻟﺎﺑ ﺚﺤﺑا"
            >
              <el-option :key="5" label="5" :value="5"> </el-option>

              <el-option
                v-for="area in areas"
                :key="area.id"
                :label="area.name"
                :value="area.id"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="row">
          <!-- <div v-for="order in orders" :key="order.id" class="col-md-3">
            <div class="order-card">
              <div class="order-count">
                <el-tooltip content="ﺐﻠﻄﻟا اﺬﻬﻟ ﺕﺎﺠﺘﻨﻤﻟا ﺩﺪﻋ" placement="top">
                  <el-button> {{ order.products.length }} </el-button>
                </el-tooltip>
              </div>

              <div class="customer-data">
                <span class="text-center"> ﺐﻠﻄﻟا ﻞﻴﺻﺎﻔﺗ</span>
                <table style="width: 100%">
                  <tr>
                    <td>ﺐﻠﻄﻟا ﻢﻗﺭ</td>
                    <td>{{ order.id }}</td>
                  </tr>
                  <tr>
                    <td>ﻞﻴﻤﻌﻟا ﻢﺳا</td>
                    <td>
                      <span> <b>ﺃ/</b> </span> {{ order.customer.name }}
                    </td>
                  </tr>
                  <tr>
                    <td>ﻞﻳﺎﺑﻮﻤﻟا</td>
                    <td>{{ order.customer.phone }}</td>
                  </tr>
                  <tr>
                    <td>ﻒﺗﺎﻬﻟا ﻢﻗﺭ</td>
                    <td>{{ order.customer.mobile }}</td>
                  </tr>
                  <tr>
                    <td>ﺔﻟﺎﺤﻟا</td>
                    <td
                      style="border: none"
                      class="text-primary text-center"
                      v-if="order.status == 1"
                    >
                      ﺦﺒﻄﻤﻟا ﻲﻓ
                    </td>
                    <td
                      style="border: none"
                      class="text-warning text-center"
                      v-if="order.status == 2"
                    >
                      ﻖﻳﺮﻄﻟا ﻲﻓ
                    </td>
                    <td
                      style="border: none"
                      class="text-success text-center"
                      v-if="order.status == 3"
                    >
                      ﻞﻴﺻﻮﺘﻟا ﻢﺗ
                    </td>
                    <td
                      style="border: none"
                      class="text-danger text-center"
                      v-if="order.status == 4"
                    >
                      ﺾﻓﺮﻟا ﻢﺗ
                    </td>
                  </tr>
                  <tr>
                    <td>ﻥاﻮﻨﻌﻟا</td>
                    <td style="font-size: 12px">{{ order.address }}</td>
                  </tr>
               
                </table>

                <div class="mb-2 d-flex">
                  <vs-button
                    @click.native="showOrderProducts(order)"
                    transparent
                    class="mx-auto"
                  >
                    ﺕﺎﺠﺘﻨﻤﻟا ﺽﺮﻋ
                  </vs-button>
                  <vs-button
                    v-if="
                      selectedOrderType.id == 2 &&
                      order.employee &&
                      order.status == 2
                    "
                    transparent
                    @click.native="showDeliveryInfo(order)"
                    class="mx-auto"
                  >
                    ﻖﺋﺎﺴﻟا
                  </vs-button>
                </div>
              
              </div>

              <div class="buttons d-flex" v-if="order.status != 2">
                <div>
              
                  <el-button
                    :style="{
                      width: selectedOrderType.id != 2 ? '100%' : '90%',
                    }"
                    plain
                    @click="openModelToUpdateStatus(order)"
                    class="heven-custom"
                    type="primary"
                    >ﺔﻟﺎﺤﻟا ﺮﻴﻴﻐﺗ</el-button
                  >
                </div>

                <div v-if="selectedOrderType.id == 2">
                  <el-button
                    style="
                      background-color: #fe5634 !important;
                      border-color: #fe5634 !important;
                    "
                    color="#FE5634"
                    @click="openAssignToDeliveryModel(order)"
                    type="primary"
                  >
                    ﻖﺋﺎﺳ ﻲﻟﺇ ﺩﺎﻨﺳﺇ
                  </el-button>
               
                </div>
              </div>
            </div>
          </div> -->
      
        <el-table
        class="mt-2"
        align="right"
        v-if="tableData.length > 0"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column label="#" type="index" width="50"> </el-table-column>
        <el-table-column sortable width="100" label="ﻢﻗﺭ " prop="id">
        </el-table-column>

        <el-table-column  width="100" label="ﺔﻤﻴﻘﻟا" prop="total"> </el-table-column>
        <el-table-column  width="100"  label="ﺔﻟﺎﺤﻟا"> 

           <template slot-scope="scope">
             <el-tag v-if="scope.row.status==1">ﺦﺒﻄﻤﻟا ﻲﻓ</el-tag>
             <el-tag type="warning" v-if="scope.row.status==2">ﻖﻳﺮﻄﻟا ﻲﻓ</el-tag>
             <el-tag type="success" v-if="scope.row.status==3">ﻞﻴﺻﻮﺘﻟا ﻢﺗ </el-tag>
             <el-tag type="danger" v-if="scope.row.status==4">ﺽﻮﻓﺮﻣ</el-tag>
           </template>
        </el-table-column>
      
        <el-table-column label= "اﻟﻌﻤﻴﻞ" prop="customer.name"> </el-table-column>
 <el-table-column label="اﻟﻔﻮﻥ" 

prop="customer.mobile"> </el-table-column>        

  <el-table-column label ="ﺑﻮاﺳﻄﺔ"
prop="user.name"> </el-table-column>        
        <el-table-column width="200" sortable label="اﻟﺘﻮﻗﻴﺖ">
     
<template slot-scope="scope">>            
              <span>{{scope.row.created_at | moment("dddd | Do / MM / YYYY | h:mm A")}}</span>
           </template>
        </el-table-column>

         <el-table-column label="ﺕاءاﺮﺟا" width="120">
          <template slot-scope="scope">
              
                  <el-button
                    v-if="scope.row.status<3 && scope.row.order_type_id!=2"
                    plain
                    @click="openModelToUpdateStatus(scope.row)"
                    class="heven-custom"
                    type="primary"
                    >ﺔﻟﺎﺤﻟا ﺮﻴﻴﻐﺗ</el-button
                  >

                  <el-button
                   v-if="scope.row.status<3 && scope.row.order_type_id==2"
                    style="
                      background-color: #fe5634 !important;
                      border-color: #fe5634 !important;
                    "
                    color="#FE5634"
                    @click="openAssignToDeliveryModel(scope.row)"
                    type="primary"
                  >
                    ﻖﺋﺎﺳ ﻲﻟﺇ ﺩﺎﻨﺳﺇ
                  </el-button>
               
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
        <el-table-column sortable width="100" label="ﺔﻴﻤﻜﻟا " prop="pivot.qty">
        </el-table-column>
        <el-table-column  label="ﻒﻨﺼﻟا " prop="name"></el-table-column>
        <el-table-column  width="100"  label="ﺱﺎﻘﻤﻟا " prop="pivot.size"></el-table-column>
        <el-table-column  width="100"  label="ﺮﻌﺴﻟا " prop="pivot.price"></el-table-column>
        <el-table-column  width="100"  label="ﻲﻟﺎﻤﺟﻻا">
            <template slot-scope="scope">
              <span>{{scope.row.pivot.qty* scope.row.pivot.price}}</span>

            </template>

        </el-table-column>

        </el-table>
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
          >ﺕﺎﺒﻠﻄﻟا ﻲﻟﺇ ﻉﻮﺟﺮﻟا</el-button
        >

        <div class="deliveries mt-3">
          <h6 class="text-right" style="color: #949494; font-size: 12px">
            ﻖﻃﺎﻨﻤﻟا ﻭ ﻥﻮﻔﻴﻠﺘﻟا ﻭ ﻒﺗﺎﻬﻟا ﻢﻗﺭ ﻭ ﻞﻴﻤﻌﻟا ﻢﺳﺄﺑ ﺚﺤﺑا
          </h6>
          <div class="d-flex">
            <div class="ml-2">
              <el-input
              @keydown.enter.native="getDrivers()"
                placeholder="ﻖﺋﺎﺴﻟا ﻢﺳﺄﺑ ﺚﺤﺑا "
                v-model="driverName"
              ></el-input>
            </div>
            <div class="ml-2">
              <el-input
               @keydown.enter.native="getDrivers()"

                placeholder="ﻖﺋﺎﺴﻟا ﻢﻗﺮﺑ ﺚﺤﺑا  "
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
                                            <h6> <b>ﺐﺗاﺮﻟا / </b> {{boy.salary}} <sub>L.E</sub></h6>
                                        </div>
                                        <div class="col-md-12">
                                            <h6> <b>ﻪﻋﺎﺴﻟا / </b> {{boy.hour_cost}} </h6>
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
        <h4 class="not-margin">ﺐﻠﻄﻟا ﺕﺎﺠﺘﻨﻣ</h4>
      </template>

      <div class="con-form">
        <div class="">
          <table class="custom-table">
            <thead>
              <tr>
                <td>ﺞﺘﻨﻤﻟا</td>
                <td>ﺔﻴﻤﻜﻟا</td>
                <td>ﺮﻌﺴﻟا</td>
                <td>ﺱﺎﻘﻤﻟا</td>
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
        <!-- <el-select v-model="updateStatus" placeholder="ﺔﻟﺎﺤﻟا ﺮﺘﺧﺇ">
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
             ﺔﻟﺎﺤﻟا ﻞﻳﺪﻌﺗ

        </el-button>

        </template> -->
    </vs-dialog>

    <vs-dialog v-model="showModelToUpdateStatus">
      <template #header>
        <h4 class="not-margin">ﺐﻠﻄﻟا ﺔﻟﺎﺣ ﻞﻳﺪﻌﺗ</h4>
      </template>

      <div class="con-form">
        <el-select v-model="updateStatus" placeholder="ﺔﻟﺎﺤﻟا ﺮﺘﺧﺇ">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
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
          @click="updateStatusInBackend()"
          type="primary"
        >
          ﺔﻟﺎﺤﻟا ﻞﻳﺪﻌﺗ
        </el-button>
      </template>
    </vs-dialog>

    <vs-dialog v-model="showDeliveryInfoModel">
      <template #header>
        <h4 class="not-margin">ﺐﻠﻄﻟا اﺬﻫ ﻖﺋﺎﺳ</h4>
      </template>

      <div class="con-form">
        <table class="custom-table">
          <thead>
            <tr>
              <td>ﻢﺳﻷا</td>
              <td>ﻞﻳﺎﺑﻮﻤﻟا</td>
              <td>ﺮﻌﺴﻟا</td>
              <td>ﺔﻋﺎﺴﻟا ﺔﻔﻠﻜﺗ</td>
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
    Type,
  },
  computed:{
    notAdmin(){
      let user = localStorage.getItem("heavenDashboardUser");
      if(JSON.parse(user).role_id != 1){
        return true;
      }else{
        return false;
      }
  },
  },
  watch: {},
  data() {
    return {
      driverMobile: "",
      driverName: "",
      mobile: "",
      code: "",
      area: "",
      areas: [],
      tableData: [],

      currOrder: [],
      determinePrintersFirst: false,
      toggleOrderProducts: false,
      currOrderProducts: [],
      currDeliveryBoy: {},
      drivers: [],
      updateStatus: "",
      showDeliveryModel: false,
      statusOptions: [
        { label: "ﺭﺎﻈﺘﻧﻹا ﺪﻴﻗ", value: 1 },
        { label: "ﻖﻳﺮﻄﻟا ﻲﻓ", value: 2 },
        { label: "ﻞﻴﺻﻮﺘﻟا ﻢﺗ", value: 3 },
        // { label: "ﺾﻓﺮﻟا ﻢﺗ", value: 4 },
      ],
      showModelToUpdateStatus: false,
      active: 0,
      selectedOrderType: {},
      types: [],
      printers: [],
      orders: [],
      showDeliveryInfoModel: false,

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

  created() {
    this.getOrderTypes(true);
    this.getDrivers();
    this.getAllAreas();
    this.getAllPrinters();
  },

  methods: {


   
    printInvoiceDetails(products) {
      let productsCategories = [];
      for (let i = 0; i < products.length; i++) {
        productsCategories.push(products[i].product_category_id);
      }

      productsCategories = [...new Set(productsCategories)];
      console.log(products);
      console.log(productsCategories);

      let productsPrinters = [];
      productsCategories.map((ele2, index) => {
        productsPrinters.push([]);
        products.map((ele) => {
          if (ele.product_category_id == ele2) {
            productsPrinters[index].push(ele);
          }
        });
      });

      console.log(productsPrinters);


      const { ipcRenderer } = require("electron");


      console.log()
      ipcRenderer.send("printOrder", products);
      console.log( "print order" ,products)
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
    showOrderProducts(order) {
      this.toggleOrderProducts = true;
      this.currOrderProducts = [...order.products];
    },

    printInvoiceDetails(products) {
      let productsCategories = [];
      for (let i = 0; i < products.length; i++) {
        productsCategories.push(products[i].product_category_id);
      }

      productsCategories = [...new Set(productsCategories)];
      console.log(products);
      console.log(productsCategories);

      let productsPrinters = [];
      productsCategories.map((ele2, index) => {
        productsPrinters.push([]);
        products.map((ele) => {
          if (ele.product_category_id == ele2) {
            productsPrinters[index].push(ele);
          }
        });
      });

      console.log(productsPrinters);


      const { ipcRenderer } = require("electron");


      console.log()
      ipcRenderer.send("printOrder", products);
      console.log( "print order" ,products)
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

    
    setDeliveryBoy(delivery) {

      if(!this.printers || this.printers.length == 0){

        this.determinePrintersFirst = true;

        // setTimeout(() => {
        //   this.$bvModal.hide("determinePrintersFirst");
        // }, 2000);

        return;
      }


      this.currDeliveryBoy = { ...delivery };

      
      console.log("selected")
      axiosApi
        .put(`/orders/${this.currOrder.id}`, {
          employee_id: this.currDeliveryBoy.id,
        })
        .then(() => {
            this.printInvoiceDetails({
              products: [...res.data[0].products],
              invoice: res.data[0],
              kitchenPrinters: false,
            });



            console.log("printInvoiceDetails")
          
          this.$notify({
            title: "ﺡﺎﺠﻨﺑ ﻢﺗ",
            message: "ﺡﺎﺠﻨﺑ ﺐﻠﻄﻟا ﻲﻟﺇ ﻖﺋﺎﺴﻟا ﺩﺎﻨﺳﺇ ﻢﺗ",
            type: "success",
          });
          this.showDeliveryModel = false;
          this.getOrdersByType();
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
      console.log("order", order);
      this.showDeliveryModel = true;
      this.currOrder = { ...order };
    },
    updateStatusInBackend() {
      this.showModelToUpdateStatus = false;
      const loading = this.$vs.loading();
      axiosApi
        .put(`/orders/${this.currOrder.id}/status`, {
          status: this.updateStatus,
        })
        .then(() => {
          this.$notify({
            title: "ﺡﺎﺠﻨﺑ ﻢﺗ",
            message: "ﺡﺎﺠﻨﺑ ﺐﻠﻄﻟا ﺔﻟﺎﺣ ﺚﻳﺪﺤﺗ ﻢﺗ",
            type: "success",
          });
          this.getOrdersByType();
        })
        .finally(() => loading.close());
    },
    openModelToUpdateStatus(order) {
      this.currOrder = { ...order };
      this.updateStatus = this.currOrder.status;
      this.showModelToUpdateStatus = true;
    },
    selectType(type) {
      this.selectedOrderType = { ...type };
      this.getOrdersByType();
    },
    getOrdersByType() {
      const loading = this.$vs.loading();
      let url = `/orders-by-type/${this.selectedOrderType.id}?page=1`;
      if (this.mobile.trim() != "") {
        url += "&mobile=" + this.mobile;
      }
      if (this.code.trim() != "") {
        url += "&code=" + this.code;
      }
      if (this.area != "") {
        url += "&area=" + this.area;
      }
      axiosApi
        .get(url)
        .then((res) => {
          this.orders = res.data.data;
          this.tableData = res.data.data;
        })
        .finally(() => loading.close());
    },
    getOrderTypes(inCreated = false) {
      const loading = this.$vs.loading();
      let x = axiosApi
        .get("order-types")
        .then((res) => {
          this.types = res.data;
        })
        .finally(() => loading.close());
      if (inCreated) {
        Promise.all([x]).then(() => {
          this.selectedOrderType = this.types[0];
          this.getOrdersByType();
        });
      }
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
  font-family: "Cairo";
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