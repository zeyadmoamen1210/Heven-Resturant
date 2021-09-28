<template>
  <div class="receiving-orders">
    <div class="container">
      <div class="show-orders">
        <!-- <h6 class="text-right" style="color: #949494;font-size: 12px;">ابحث برقم الهاتف و المناطق و رقم الطلب</h6> -->

        <div class="filter-orders d-flex mb-4">
          <div>
            <el-select
              clearable
              @change="getMostSoldProducts"
              v-model="area"
              placeholder="ابحث بالمناطق"
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

          <div class="mr-2">
            <!-- range-separator="الي" -->
           

            <el-date-picker
            @change="getMostSoldProducts"
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

          <el-card class="box-card"   v-if="
                  mostSoldProducts.length > 0 &&
                  mostSoldOptions.labels.length == mostSold.length
                ">
  <div slot="header" class="clearfix">
    <span>المنتجات اﻷكثر مبيعاً</span>
  </div>

   <apexchart
               
                width="380"
                type="pie"
                :options="mostSoldOptions"
                :series="mostSold"
              ></apexchart>
          <apexchart
            v-if="mostSoldProducts.length > 0"
            type="bar"
            height="350"
            :options="mostSoldBarOptions"
            :series="mostSoldBar"
          ></apexchart>
  
</el-card>
             
                <el-card class="box-card mr-auto"  v-if="
                
                ordersByTypeOptions.labels.length ==ordersByType.length
                ">
  <div slot="header" class="clearfix">
    <span>المبيعات حسب انواع الطلبات</span>
  </div>

   <apexchart
               
                width="380"
                type="pie"
                :options="ordersByTypeOptions"
                :series="ordersByType"
              ></apexchart>
          <apexchart
            v-if="ordersByType.length > 0"
            type="bar"
            height="350"
            :options="ordersByTypeBarOptions"
            :series="ordersByTypeBar"
          ></apexchart>
  
</el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosApi from "@/plugins/axios.js";

export default {
  components: {},
  watch: {},
  data() {
    return {
      format:'yyyy-MM-dd HH:mm A',
      valueFormat:'yyyy-MM-dd HH:mm:ss',
      mostSoldOptions: {
        dataLabels: {
          enabled: true,
        },
        labels: [],
      },
      ordersByTypeOptions: {
        dataLabels: {
          enabled: true,
        },
        labels: [],
      },
      mostSoldBarOptions: {
        dataLabels: {
          enabled: true,
        },

        labels: [],
      },
   ordersByTypeBarOptions: {
        dataLabels: {
          enabled: true,
        },

        labels: [],
      },
      mostSold: [],
      mostSoldBar: [
        {
          data: [],
        },
      ],
     ordersByTypeBar: [
        {
          data: [],
        },
      ],
      mostSoldProducts: [],
      ordersByType: [],
      dateRange:localStorage.getItem('reportsInterval')?JSON.parse(localStorage.getItem('reportsInterval')): [((this.$moment(new Date(), "DD-MM-YYYY")).locale("en").format("YYYY-MM-DD") + ' '+'11:30:00'), ((this.$moment(new Date(), "DD-MM-YYYY").add(1,'days')).locale("en").format("YYYY-MM-DD")+ ' '+'11:30:00')],

      driverMobile: "",
      driverName: "",
      mobile: "",
      code: "",
      area: "",
      areas: [],
      tableData: [],

      currOrder: [],
      toggleOrderProducts: false,
      currOrderProducts: [],
      currDeliveryBoy: {},
      drivers: [],
      updateStatus: "",
      showDeliveryModel: false,
      statusOptions: [
        { label: "قيد الإنتظار", value: 1 },
        { label: "في الطريق", value: 2 },
        { label: "تم التوصيل", value: 3 },
        // { label: "تم الرفض", value: 4 },
      ],
      showModelToUpdateStatus: false,
      active: 0,
      selectedOrderType: {},
      types: [],
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
    this.getMostSoldProducts();
    this.getAllAreas();
  },

  methods: {
    getAllAreas() {
      axiosApi.get(`/areas`).then((res) => {
        this.areas = res.data;
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

    getMostSoldProducts() {
      const loading = this.$vs.loading();
      this.getOrdersStatisticsByType();
      //   /orders?area=1&employee=1&user=1&start=2021-05-01&end=2021-06-30
      let url = `/products/most-sold?limit=5`;
     
      if (this.area != "") {
        url += "&area=" + this.area;
      }
      if (this.dateRange != null) {localStorage.setItem('reportsInterval',JSON.stringify(this.dateRange));

        url += "&start=" + this.dateRange[0];
        url += "&end=" + this.dateRange[1];
      }
      this.mostSold = [];

      let labels = [];
      let qty = [];
      axiosApi
        .get(url)
        .then((res) => {
          this.mostSoldProducts = res.data;
          this.mostSoldProducts.map((product) => {
            this.mostSold.push(product.totalQty);
            qty.push(product.totalQty);
            labels.push(product.name + " - " + product.size);
          });

          this.mostSoldOptions = {
            labels: labels,
          };

          this.mostSoldBar = [
            {
              data: qty,
            },
          ];

          this.mostSoldBarOptions = {
            chart: {
              height: 350,
              type: "bar",
            },
            plotOptions: {
              bar: {
                columnWidth: "45%",
                distributed: true,
              },
            },
            dataLabels: {
              enabled: false,
            },
            legend: {
              show: false,
            },
            xaxis: {
              categories: labels,
              labels: {
                style: {
                  fontSize: "12px",
                },
              },
            },
          };
        })
        .finally(() => loading.close());
    },
    getOrdersStatisticsByType() {
      // const loading = this.$vs.loading();
      // /orders-by-type?area=1&employee=1&user=1&start=2021-05-01&end=2021-06-01
     let url = `/orders-by-type?limit=5`;
     
      if (this.area != "") {
        url += "&area=" + this.area;
      }
      if (this.dateRange != null) {localStorage.setItem('reportsInterval',JSON.stringify(this.dateRange));

        url += "&start=" + this.dateRange[0];
        url += "&end=" + this.dateRange[1];
      }
      this.ordersByType = [];

      let typeLabels = [];
      let cost = [];
      axiosApi
        .get(url)
        .then((res) => {
           res.data.map((type) => {
            this.ordersByType.push(type.totalCost);
            cost.push(type.totalCost);
            typeLabels.push(type.name);
          });

          this.ordersByTypeOptions = {
            labels: typeLabels,
          };

          this.ordersByTypeBar = [
            {
              data: cost,
            },
          ];

          this.ordersByTypeBarOptions = {
            chart: {
              height: 350,
              type: "bar",
            },
            plotOptions: {
              bar: {
                columnWidth: "45%",
                distributed: true,
              },
            },
            dataLabels: {
              enabled: false,
            },
            legend: {
              show: false,
            },
            xaxis: {
              categories: typeLabels,
              labels: {
                style: {
                  fontSize: "12px",
                },
              },
            },
          };
        })
        .finally();
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