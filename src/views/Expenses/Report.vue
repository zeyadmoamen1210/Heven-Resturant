<template>
  <div class="expense-report">
    <el-container>
      <el-main>
        <el-row type="flex" :gutter="10">
       

         
          <el-col :xl="16" :lg="16" :md="6" :sm="12">
            <div class="bg-White mt-2" style="margin-right:300px;">
              <div class="block p-3">
                <!-- <span class="demonstration">Default</span> -->
                

                <el-date-picker
                @change="getExpensesReport"
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
          </el-col>
        </el-row>

        <el-table
        class="mt-2"
          style="width: 80%; margin-right:10%"

          align="center"
          v-if="tableData.length > 0"
          :data="tableData"
          border
        >
          <el-table-column label="#" type="index" width="50"> </el-table-column>
        
          <el-table-column width="300" label="المصروف" prop="name">
          </el-table-column>
          <el-table-column  width="200"  label="المبلغ" prop="cost"> </el-table-column>
          <el-table-column label="تفاصيل">
            <template slot-scope="scope">
                <router-link
                  

                        title=" تفاصيل"
                        class="btn btn-sm btn-success"
                        :to="{ path: `/expenses/details?category=${scope.row.expense_category_id}&start_date=${dateRange[0]}&end_date=${dateRange[1]}`}"
                      >
                        <i class="fa fa-eye ml-1"></i>

                     عرض التفاصيل
                      
                      </router-link>
            </template>
          </el-table-column>
        
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import axiosApi from "@/plugins/axios.js";

export default {
  name: "ExpenseReport",
  data() {
    return {

      format:'yyyy-MM-dd HH:mm A',
      valueFormat:'yyyy-MM-dd HH:mm:ss',
      dateRange:localStorage.getItem('reportsInterval')?JSON.parse(localStorage.getItem('reportsInterval')): [((this.$moment(new Date(), "DD-MM-YYYY")).locale("en").format("YYYY-MM-DD") + ' '+'11:30:00'), ((this.$moment(new Date(), "DD-MM-YYYY").add(1,'days')).locale("en").format("YYYY-MM-DD")+ ' '+'11:30:00')],
      false: false,
      true: true,
 
      totalExpenses:0,
      tableData: [],
    };
  },

  methods: {
  
    numberToFixed(number) {
      return Math.floor(number * 100) / 100;
    },
    getExpensesReport() {
      if (this.dateRange != null) {localStorage.setItem('reportsInterval',JSON.stringify(this.dateRange));

        const loading = this.$loading({
          lock: true,
          text: "جاري تحميل البيانات",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });


        let url = `expenses/category`;
        if (this.dateRange != null) {localStorage.setItem('reportsInterval',JSON.stringify(this.dateRange));

          url += `?start=${this.dateRange[0]}`;
          url += `&end=${this.dateRange[1]}`;
        }
        this.totalExpenses=0;
  const vm =this;
        axiosApi
          .get(url)
          .then((response) => {
             this.tableData = response.data;
         
            this.tableData.map(function (value) {
              
                vm.totalExpenses += value["cost"];
              
            });
         
          })
          .catch((e) => {
            console.log(e);
          })
          .finally(() => {
            loading.close();
          });
      }
    },
  },
};
</script>
