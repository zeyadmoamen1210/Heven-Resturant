<template>
  <div class="receiving-orders">
    <div class="container-fluid">
        <!-- style="width:48%" -->
      <div class="d-flex justify-content-center  mt-2 ">
      <div class="ml-2 mr-2 mb-3">
         <el-select
            dir="ltr"
            @change="getMostSoldProducts"
            v-model="branch"
            clearable
            placeholder="حدد الفروع"
          >
            <!-- @change="getProducts" -->
            <el-option
              v-for="item in branches"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
      </div>

      <div>
        <el-date-picker
          @change="getMostSoldProducts"
          :format="format"
          :value-format="valueFormat"
          v-model="dateRange"
          type="datetimerange"
          range-separator="إلي"
          start-placeholder="بداية الفترة"
          end-placeholder="نهاية الفترة"
        >
        </el-date-picker>
      </div>

            <div class="ml-2 mr-2 mb-3">
         <el-select
            dir="ltr"
            @change="getMostSoldProducts"
            v-model="category"
            clearable
            placeholder="حدد التصنيف"
          >
            <!-- @change="getProducts" -->
            <el-option
              v-for="item in categories"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
      </div>
            <div class="ml-2 mr-2 mb-3">
         <el-select
            dir="ltr"
            @change="getMostSoldProducts"
            v-model="size"
            clearable
            placeholder="حدد المقاس"
          >
            <!-- @change="getProducts" -->
            <el-option
              v-for="item in sizes"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
      </div>
    </div>
  
     <el-card
        class="box-card"
      >
        <!-- v-if="mostSoldProducts.length > 0" -->
        <div slot="header" class="clearfix">
          <span>  مبيعات الأصناف </span>
        </div>

        <el-table
          class="mt-2"
          align="right"
          v-if="mostSoldProducts.length > 0"
          :data="mostSoldProducts"
          border
            sum-text="الاجمالي "
          show-summary
          style="width: 100%"
        >
          <!--  -->
          <el-table-column label="#" type="index" width="80"> </el-table-column>
          <el-table-column label="المنتج " prop="name"> </el-table-column>
          <el-table-column label="المقاس " prop="size"> </el-table-column>
          <el-table-column label="اجمالي الكمية " prop="totalQty"> </el-table-column>
          <el-table-column label="اجمالي المبيعات " prop="totalCost">
          </el-table-column>
        </el-table>
      </el-card>
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
        format: "yyyy-MM-dd HH:mm A",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
      dateRange:localStorage.getItem('reportsInterval')?JSON.parse(localStorage.getItem('reportsInterval')): [((this.$moment(new Date(), "DD-MM-YYYY")).locale("en").format("YYYY-MM-DD") + ' '+'11:30:00'), ((this.$moment(new Date(), "DD-MM-YYYY").add(1,'days')).locale("en").format("YYYY-MM-DD")+ ' '+'11:30:00')],

      category:null,
      categories:[],
      size:null,
      sizes:[],
      branch:null,
      branches:[],
      mostSoldProducts: [],
      dateRange:localStorage.getItem('reportsInterval')?JSON.parse(localStorage.getItem('reportsInterval')): [((this.$moment(new Date(), "DD-MM-YYYY")).locale("en").format("YYYY-MM-DD") + ' '+'11:30:00'), ((this.$moment(new Date(), "DD-MM-YYYY").add(1,'days')).locale("en").format("YYYY-MM-DD")+ ' '+'11:30:00')],

      tableData: [],

     
    };
  },

  created() {
    this.getMostSoldProducts();
    this.getBranches();
    this.getProductsCategories()
    this.getProductsSizes()
  },

  methods: {
     getProductsCategories() {
      const loading = this.$vs.loading();
      axiosApi
        .get("product-categories")
        .then((res) => {
          this.categories = res.data;
        })
        .finally(() => loading.close());
    },
     getProductsSizes() {
      const loading = this.$vs.loading();
      axiosApi
        .get("product-sizes")
        .then((res) => {
          this.sizes = res.data;
        })
        .finally(() => loading.close());
    },
     getBranches() {
      const loading = this.$vs.loading();
      axiosApi
        .get("branches")
        .then((res) => {
          this.branches = res.data;
        })
        .finally(() => loading.close());
    },

  

    getMostSoldProducts() {
      const loading = this.$vs.loading();
      //   /orders?area=1&employee=1&user=1&start=2021-05-01&end=2021-06-30
      let url = `/products/most-sold?limit=1000`;
     
     
      if (this.branch != null) {
        url += "&branch=" + this.branch;
      }
      if (this.category >0 ) {
        url += "&category=" + this.category;
      }
      if (this.size != null && this.size != "") {
        url += "&size=" + this.size;
      }
      if (this.dateRange != null) {localStorage.setItem('reportsInterval',JSON.stringify(this.dateRange));

        url += "&start=" + this.dateRange[0];
        url += "&end=" + this.dateRange[1];
      }

      axiosApi
        .get(url)
        .then((res) => {
          this.mostSoldProducts = res.data;
          // this.mostSoldProducts.map((product) => {
           
          // });

       
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