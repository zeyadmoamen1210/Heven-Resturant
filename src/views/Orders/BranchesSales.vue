<template>
  <div class="mt-5" dir="rtl">
    <b-container>
      <el-row :gutter="10">
        <el-col :xl="3" :lg="2" :md="12" :sm="12">
          <el-button
            :disabled="selectedBranches == null"
            @click="getBranchesReport"
            type="warning"
          >
            استخراج التقرير
          </el-button>
        </el-col>
        <el-col :xl="8" :lg="8" :md="12" :sm="12">
          <!-- @change="getSafeReport" -->
          <!-- <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="-"
            format="yyyy/MM/dd"
            value-format="yyyy-MM-dd"
            start-placeholder="بداية الفترة"
            end-placeholder="نهاية الفترة"
          >
          </el-date-picker> -->

          <el-date-picker
            :format="format"
            :value-format="valueFormat"
            v-model="dateRange"
            type="datetimerange"
            range-separator="إلي"
            start-placeholder="بداية الفترة"
            end-placeholder="نهاية الفترة">
          </el-date-picker>

        </el-col>

        <el-col :xl="8" :lg="8" :md="12" :sm="12">
          <el-select
            dir="ltr"
            multiple
            v-model="selectedBranches"
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
        </el-col>
      </el-row>

      {{ selectedBranchesReport.length }}
    </b-container>
  </div>
</template>

<script>
import axiosApi from "@/plugins/axios.js";

export default {
  data() {
    return {
      branches: [],
      selectedBranchesReport: [],
      selectedBranchesTotalSales: [],
      dateRange: [],
      selectedBranches: null,
      format:'yyyy-MM-dd HH:mm A',
      valueFormat:'yyyy-MM-dd HH:mm:ss',
    };
  },
  created() {
    this.getBranches();
  },
  methods: {
    getBranches() {
      axiosApi.get(`/branches`).then((res) => {
        this.branches = res.data;
      });
    },

    getBranchesSales(){
 this.selectedBranches.forEach((branch) => {
        let branchUrl = `branches/${branch}/statistics`;
        if (this.dateRange != null) {
          branchUrl += `?start_date=${this.dateRange[0]}`;
          branchUrl += `&end_date=${this.dateRange[1]}`;
        }
        axiosApi.get(branchUrl).then((res) => {
            let index=1;
            let oldSales=0;
           let report =res.data;
    let vm =this;
   report.map(function (value, key) {
        oldSales+=value['sales'];
       let dateSales= vm.selectedBranchesTotalSales.filter((item)=>{
            return (item.done_at==value['done_at'])
        })

         if (dateSales.length > 0) {
             value['percentage']=((value['sales']/dateSales[0].totalSales)*100).toFixed(2)
         }else{
              value['percentage']=0
         }

        value["avg"] = oldSales/index;
        index++;
      });
            
            this.selectedBranchesReport.push(report);
      
          console.log("report====",report)
        });
        //  console.log("============ branch ============",branch)
      });
    },
    getBranchesReport() {
      this.selectedBranchesReport = [];

         let branchesUrl = `branches-statistics?branches=${this.selectedBranches}`;
      if (this.dateRange != null) {
        branchesUrl += `&start_date=${this.dateRange[0]}`;
        branchesUrl += `&end_date=${this.dateRange[1]}`;
      }
      axiosApi.get(branchesUrl).then((res) => {
        this.selectedBranchesTotalSales = res.data;
        this.getBranchesSales();
      });
     

   
      if(this.selectedBranchesReport.length>0){

          
          this.selectedBranchesReport.forEach((branch)=>{
              
              branch.map((item)=>{
                  console.log("item==============",item.sales)
          });
      });
              }else{
                  console.log("==========no data==========")
              }
    },
  },
};
</script>

<style>
</style>