<template>
  <div class="driver-orders">
    <div class="container-fluid">
      <h6>إختر سائق لعرض جميع الطلبات</h6>
      <!-- <el-autocomplete
        style="    min-width: 413px;margin-bottom: 20px"
        v-model="state"
        :fetch-suggestions="querySearchAsync"
        placeholder="ﺇﺑﺤﺚ ﻋﻦ ﺳﺎﺋﻖ"
        @select="handleSelect"
        :trigger-on-focus="false"
      >
        <template slot-scope="{ item }">
          <div class="name">{{ item.name }}</div>
        </template>
      </el-autocomplete> -->



      <el-select
        style="    max-width: 413px;margin-bottom: 20px"
        v-model="currDelivery"
        placeholder="ﺇﺑﺤﺚ ﻋﻦ ﺳﺎﺋﻖ"
        value-key="id"
        filterable
        @change="getDeliveryOrders()"
      >
        <el-option v-for="driver in allDeliveries" :key="driver.id" :label="driver.name" :value="driver">
          {{driver.name}}
        </el-option>
      </el-select>

      
              <el-date-picker
              class="mr-2"
                @change="getDeliveryOrders"
                :format="format"
                :value-format="valueFormat"
                v-model="dateRange"
                type="datetimerange"
                range-separator="إلي"
                start-placeholder="بداية الفترة"
                end-placeholder="نهاية الفترة">
              </el-date-picker>




      <table v-if="currDelivery">
        <tr>
            <td>الأسم</td>
            <td>{{ currDelivery.name }}</td>
        </tr>
        <tr>
            <td>الموبايل</td>
            <td>{{ currDelivery.mobile }}</td>
        </tr>
      </table>

      <el-tabs
        style="font-family: 'din';    margin-top: 20px;"
        v-if="currDelivery"
        tab-position="right"
        v-model="currTabName"
      >
        <el-tab-pane label="الأحصائيات" color="#FE5634" name="orderDriver">
          <div class="flex-grid">
            <div
              class="table-container"
              v-if="
                Object.keys(currDelivery).length > 0 && allOrders.length != 0
              "
            >
              
              <table>
                <thead>
                  <tr>
                    <td>المنطقة</td>
                    <td>إجمالي الطلبات</td>
                    <td>إجمالي التوصيل للمطعم</td>
                    <td>إجمالي التوصيل للسائق</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in allOrders" :key="order.id">
                    <td v-if="order.area">{{ order.area.name }}</td>
                    <td>{{ order.total_orders }}</td>
                    <td>{{ order.total_restaurant_delivery_cost }}</td>
                    <td>{{ order.total_driver_cost }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td>إجمالي مستحق المطعم:</td>
                    <td>{{ totalHeven }}</td>

                    <td>إجمالي مستحق السائق:</td>
                    <td>{{ totalDriver }}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div v-else-if="allOrders.length == 0">
              <NoData />
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane
          label="تفاصيل الطلبات"
          color="#FE5634"
          name="ordersDetails"
        >
          <div class="flex-grid">
            <el-table
             id="driverTable"
              class="mt-2 "
              align="right"
              v-if="tableData.length > 0"
              :data="tableData"
              border
              style="width: 100%"
            >
             
              <el-table-column sortable label="رقم " prop="id">
              </el-table-column>

              <el-table-column   label="القيمة">

                <template slot-scope="scope">
                  {{Number(scope.row.total) + Number(scope.row.restaurant_cost) + Number(scope.row.driver_cost)}}
                </template>

              </el-table-column>

              <el-table-column  label="الحالة">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.status == 1">في المطبخ</el-tag>
                  <el-tag type="warning" v-if="scope.row.status == 2"
                    >في الطريق</el-tag
                  >
                  <el-tag type="success" v-if="scope.row.status == 3"
                    >تم التوصيل
                  </el-tag>
                  <el-tag type="danger" v-if="scope.row.status == 4"
                    >مرفوض</el-tag
                  >
                </template>
              </el-table-column>

              <el-table-column label="العميل" v-if="tableData.customer" prop="customer.name">
              </el-table-column>
              <el-table-column label="الفون" v-if="tableData.customer" prop="customer.mobile">
              </el-table-column>
              <el-table-column label="بواسطة" v-if="tableData.user" prop="user.name">
              </el-table-column>
              <el-table-column  sortable label="التوقيت">
                <template slot-scope="scope">
                  <span>{{
                    scope.row.created_at
                      | moment("dddd | Do / MM / YYYY | h:mm A")
                  }}</span>
                </template>
              </el-table-column>

             
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-table
                    class="mt-2"
                    align="right"
                    :data="props.row.products"
                    border
                    style="width: 100%;margin: auto;"
                  >
                    <el-table-column label="#" type="index" width="50">
                    </el-table-column>
                    <el-table-column
                      sortable
                      width="100"
                      label="الكمية "
                      prop="pivot.qty"
                    >
                    </el-table-column>
                    <el-table-column
                      label="الصنف "
                      prop="name"
                    ></el-table-column>
                    <el-table-column
                      width="100"
                      label="المقاس "
                      prop="pivot.size"
                    ></el-table-column>
                    <el-table-column
                      width="100"
                      label="السعر "
                      prop="pivot.price"
                    ></el-table-column>
                    <el-table-column width="100" label="الاجمالي">
                      <template slot-scope="scope">
                        <span>{{
                          scope.row.pivot.qty * scope.row.pivot.price
                        }}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div v-else>
        <NoData />
      </div>
    </div>

  </div>
</template>

<script>
import axiosApi from "@/plugins/axios.js";
import NoData from "@/components/NoData.vue";
export default {
  components: {
    NoData,
  },
  data() {
    return {
          dateRange: [((this.$moment(new Date(), "DD-MM-YYYY")).locale("en").format("YYYY-MM-DD") + ' '+'6:00:00'), ((this.$moment(new Date(), "DD-MM-YYYY").add(1,'days')).locale("en").format("YYYY-MM-DD")+ ' '+'6:00:00')],
      format:'yyyy-MM-dd HH:mm A',
      valueFormat:'yyyy-MM-dd HH:mm:ss',
      currTabName:'ordersByArea',
      allDeliveries: [],
      state: "",
      allOrders: [],
      currDelivery: null,
      totalHeven: 0,
      totalDriver: 0,
      currTabName: "ordersDetails",
      tableData:[],
      lastPage:1,
      currPage:1
    };
  },
  created(){
   
  },
  mounted() {
    this.getAllDrivers();


    function getScrollTop(){
      if(typeof pageYOffset!= 'undefined'){
          //most browsers except IE before #9
          return pageYOffset;
      }
      else{
          var B= document.body; //IE 'quirks'
          var D= document.documentElement; //IE with doctype
          D= (D.clientHeight)? D: B;
          return D.scrollTop;
      }
    }

    window.onscroll = () => {

      console.log("first ", getScrollTop() )
      console.log("second ", window.innerHeight )
      console.log("thired ", document.getElementById('driverTable').clientHeight )
      


    
     
      if(getScrollTop() + window.innerHeight > document.getElementById('driverTable').clientHeight - 1000){
        console.log("hello there")
           if( this.lastPage > this.currPage){
                this.currPage += 1;
                this.getOrdersDetails(true);
            }
      }
    }


  },
  methods: {

    getDeliveryOrders(){

      console.log("call===========")
       this.getOrderToDelivery();
    this.getOrdersDetails();
    },
    

    getOrdersDetails(currPageIncreased) {
      const loading = this.$vs.loading();
  let url = `/orders-details/drivers/${this.currDelivery.id}?page=${this.currPage}`;
       if (this.dateRange != null) {
        url += "&start=" + this.dateRange[0];
        url += "&end=" + this.dateRange[1];
      }
      axiosApi
        .get(url)
        .then((res) => {
          console.log(res.data);
          if(currPageIncreased){
            this.tableData = [...this.tableData , ...res.data.data];
          }else{
            this.tableData = res.data.data;
          }
          this.lastPage = res.data.last_page;
          this.currPage = res.data.current_page;
        }).finally(() => loading.close());
    },

    handleSelect(item) {
      this.currDelivery = item;
      this.getOrdersDetails();
    },
    getOrderToDelivery() {
      const loading = this.$vs.loading();
      let link=`/orders/drivers/${this.currDelivery.id}`
       if (this.dateRange != null) {
        link += "?start=" + this.dateRange[0];
        link += "&end=" + this.dateRange[1];
      }
      axiosApi
        .get(link)
        .then((res) => {
          this.allOrders = res.data.data;

          this.totalHeven = 0;
          this.totalDriver = 0;


          this.allOrders.map((ele) => {
            this.totalHeven =
              Number(this.totalHeven) +
              Number(ele.total_restaurant_delivery_cost) +
              Number(ele.total_orders);
            this.totalDriver =
              Number(this.totalDriver) + Number(ele.total_driver_cost);
          });
        })
        .finally(() => loading.close());
    },
    querySearchAsync(queryString, cb) {
      return new Promise((resolve) => {
        if (queryString.length < 2) {
          return resolve([]);
        }
        cb(this.allDeliveries);
      });
    },

    getAllDrivers() {
      axiosApi.get(`/employees/drivers`).then((res) => {
        this.allDeliveries = res.data.data;
      });
    },

      getOrders() {
        if(this.selectedDelivery!=null){
      const loading = this.$vs.loading();
    //   /orders?area=1&employee=1&user=1&start_date=2021-05-01&end_date=2021-06-30
      let url = `/orders?page=1`;
     
     
        url += "&employee=" + this.selectedDelivery.id;
      
     
       if (this.dateRange != null) {
        url += "&start_date=" + this.dateRange[0];
        url += "&end_date=" + this.dateRange[1];
      }
      axiosApi
        .get(url)
        .then((res) => {
          this.orders = res.data.data;
          this.tableData = res.data.data;

        })
        .finally(() => loading.close());
      }
    },
   
  },
};
</script>

<style lang="scss">
.el-autocomplete-suggestion__list {
  margin: 0 !important;
  padding: 0 !important;
  text-align: right !important;
  font-family: "din" !important;
}

.driver-orders {
  padding-top: 20px;
  text-align: right;
  padding-right: 28px;

  .table-container {
    margin-top: 8px;
    width: 100%;
    table{
      width: 100%;
    }
  }

  table {
    width: 100% !important;
    font-family: "din";
    tr {
      &:nth-of-type(even) {
        background-color: #f9f9f9;
      }
    }
    tr,
    td {
      border: 1px solid #f1f1f1;
      text-align: center;
      padding: 5px 0;
    }
    thead {
      td {
        font-weight: 600;
        padding: 9px 0;
        background: #f9f9f9;
      }
    }
  }
}
</style>
