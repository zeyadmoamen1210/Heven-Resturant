<template>
  <div class="container">
    <div class="d-flex justify-content-center  mt-2 ">
      <div class="ml-2 mr-2 mb-3">
         <el-select
            dir="ltr"
            @change="getOrders"
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
          @change="getOrders"
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
    </div>

    <div class="row mt-2">
      <el-col :span="5"> </el-col>
      <el-col :span="6" :offset="2">
        <el-card shadow="hover">
          <span>نسبة الدليفري</span>
          <el-divider direction="vertical"></el-divider>
          <span>{{ totalDriverCost }}</span>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <span>صافي البيع</span>
          <el-divider direction="vertical"></el-divider>
          <span>{{
            totalSales -
              totalNotpaiedSales -
              totalExpenses -
              totalDriverCost -
              totalPartenersPayment
          }}</span>
        </el-card>
      </el-col>
    </div>
    <div class="row mt-2">
      <el-card
        style="width:48%"
        class="box-card"
        v-if="salesByCashier.length > 0"
      >
        <div slot="header" class="clearfix">
          <span>المبيعات حسب كل كاشير</span>
        </div>

        <el-table
          class="mt-2"
          align="right"
          v-if="salesByCashier.length > 0"
          :data="salesByCashier"
          border
          sum-text="الاجمالي "
          show-summary
          style="width: 100%"
        >
          <!--  -->
          <el-table-column label="#" type="index" width="80"> </el-table-column>
          <el-table-column label="الكاشير " prop="name"> </el-table-column>
          <el-table-column label="المبيعات " prop="totalCost">
          </el-table-column>
        </el-table>
      </el-card>
      <el-card
        style="width:50%;"
        class="box-card mr-2"
        v-if="salesByCashier.length > 0"
      >
        <div slot="header" class="clearfix">
          <span>اللوغي</span>
        </div>

        <el-table
          class="mt-2"
          align="right"
          v-if="notPaiedSales.length > 0"
          :data="notPaiedSales"
          border
          sum-text="الاجمالي "
          show-summary
          style="width: 100%"
        >
          <el-table-column label="#" type="index" width="80"> </el-table-column>
          <el-table-column label="البيان " prop="name"> </el-table-column>
          <el-table-column label="القيمة " prop="totalCost"> </el-table-column>
        </el-table>
      </el-card>

      <el-card
        style="width:45%;"
        class="box-card mt-2 mb-2"
        v-if="expenses.length > 0"
      >
        <div slot="header" class="clearfix">
          <span>المصروفات و المشتريات</span>
        </div>

        <el-table
          class="mt-2"
          align="right"
          v-if="expenses.length > 0"
          :data="expenses"
          border
          sum-text="الاجمالي "
          show-summary
          style="width: 100%"
        >
          <el-table-column label="#" type="index" width="80"> </el-table-column>
          <el-table-column label="البيان " prop="name"> </el-table-column>
          <el-table-column label="القيمة " prop="cost"> </el-table-column>
        </el-table>
      </el-card>

      <el-card style="width:45%;" class="box-card mr-auto mt-2 mb-2" v-if="partenersReport.length > 0">
        <div slot="header" class="clearfix">
          <span>مسحوبات اﻷونر</span>
        </div>

        <el-table
          class="mt-2"
          align="right"
          v-if="partenersReport.length > 0"
          :data="partenersReport"
          border
          sum-text="الاجمالي "
          show-summary
          style="width: 100%"
        >
          <el-table-column label="#" type="index" width="80"> </el-table-column>
          <el-table-column label="الاسم " prop="name"> </el-table-column>
          <el-table-column label="القيمة " prop="cost"> </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import axiosApi from "@/plugins/axios.js";

export default {
  name: "BranchAccount",

  data() {
    return {
      format: "yyyy-MM-dd HH:mm A",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
      dateRange: [((this.$moment(new Date(), "DD-MM-YYYY")).locale("en").format("YYYY-MM-DD") + ' '+'6:00:00'), ((this.$moment(new Date(), "DD-MM-YYYY").add(1,'days')).locale("en").format("YYYY-MM-DD")+ ' '+'6:00:00')],

      branch:null,
      branches:[],

      totalAccount: 0,
      salesByCashier: [],
      totalSales: 0,
      totalDriverCost: 0,
      notPaiedSales: [],
      totalNotpaiedSales: 0,
      expenses: [],
      totalExpenses: 0,
      partenersReport: [],
      totalPartenersPayment: 0,
    
    };
  },
  created() {
    this.getOrders();
    this.getBranches();
  },
  methods: {
    getBranches() {
      const loading = this.$vs.loading();
      axiosApi
        .get("branches")
        .then((res) => {
          this.branches = res.data;
        })
        .finally(() => loading.close());
    },

    getOrders() {
      this.getSalesByCashier();
    this.getExpenses();
    this.getSelectedPartenerReport();
    },

    getSelectedPartenerReport() {
      let url = `parteners-payments?groupBy=true`;

        if (this.branch != null) {
        url += "&branch=" + this.branch + "&";
      }
      if (this.dateRange != null) {
        url += "start=" + this.dateRange[0] + "&";
        url += "end=" + this.dateRange[1] + "&";
      }
      const vm = this;
      this.totalPartenersPayment = 0;
      axiosApi
        .get(url)
        .then((res) => {
          this.partenersReport = res.data;
          this.partenersReport.map(function(value) {
            vm.totalPartenersPayment += value["cost"];
          });
        })
        .catch((error) => console.log(error))
        .finally(() => {});
    },
    getSalesByCashier() {
      const loading = this.$vs.loading();

      let url = `orders-by-cashier?`;

        if (this.branch != null) {
        url += "branch=" + this.branch + "&";
      }
      if (this.dateRange != null) {
        url += "start=" + this.dateRange[0] + "&";
        url += "end=" + this.dateRange[1] + "&";
      }
      const vm = this;
      this.totalSales = 0;
      this.totalDriverCost = 0;
      axiosApi
        .get(url)
        .then((res) => {
          this.salesByCashier = res.data;
          this.salesByCashier.map(function(value) {
            vm.totalSales += value["totalCost"];
            vm.totalDriverCost += value["totalDriverCost"];
          });
          this.getNotPaiedSales();
        })
        .finally(() => loading.close());
    },
    getNotPaiedSales() {
      const loading = this.$vs.loading();

      this.totalNotpaiedSales = 0;
      let url = `not-paied-orders-by-type?`;
        if (this.branch != null) {
        url += "branch=" + this.branch + "&";
      }
      if (this.dateRange != null) {
        url += "start=" + this.dateRange[0] + "&";
        url += "end=" + this.dateRange[1] + "&";
      }
      const vm = this;
      axiosApi
        .get(url)
        .then((res) => {
          this.notPaiedSales = res.data;
          // this.notPaiedSales.map(function(value) {
          //   vm.totalNotpaiedSales += value["totalCost"];
          //   vm.totalDriverCost += value["totalDriverCost"];

          // });

          this.getRejectedOrders();
        })
        .finally(() => loading.close());
    },
    getRejectedOrders() {
      const loading = this.$vs.loading();

      
      let url = `rejected-orders?`;
        if (this.branch != null) {
        url += "branch=" + this.branch + "&";
      }
      if (this.dateRange != null) {
        url += "start=" + this.dateRange[0] + "&";
        url += "end=" + this.dateRange[1] + "&";
      }
      const vm = this;
      axiosApi
        .get(url)
        .then((res) => {
          this.notPaiedSales.push(res.data[0]);
          this.notPaiedSales.map(function(value) {
            vm.totalNotpaiedSales += value["totalCost"];
          });
         this.totalDriverCost -=res.data[0].totalDriverCost;
        })
        .finally(() => loading.close());
    },
    getExpenses() {
      const loading = this.$vs.loading();

      let url = `expenses/category?`;
         if (this.branch != null) {
        url += "branch=" + this.branch + "&";
      }
      if (this.dateRange != null) {
        url += "start=" + this.dateRange[0] + "&";
        url += "end=" + this.dateRange[1] + "&";
      }
   
      const vm = this;
      this.totalExpenses = 0;
      axiosApi
        .get(url)
        .then((res) => {
          this.expenses = res.data;
          this.expenses.map(function(value) {
            vm.totalExpenses += value["cost"];
          });
        })
        .finally(() => loading.close());
    },
  },
};
</script>
