<template>
  <div class="expense-report">
    <el-container>
      <el-main>
        <el-row type="flex" :gutter="10">
       
  <el-col :xl="6" :lg="6" :md="12" :sm="12">
    
            <div class="bg-White mt-2 p-3" >

                <el-select
                clearable
                  class="mt-2"
                  v-model="category_id"
                  placeholder="حدد الوصف"
                  @change="getExpensesReport"
                >
                  <el-option
                    v-for="item in categories"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-col>
         
          <el-col :xl="16" :lg="16" :md="6" :sm="12">
            <div class="bg-White mt-2" >
              <div class="block p-3">
                <!-- <span class="demonstration">Default</span> -->
                <!-- <el-date-picker
                  @change="getExpensesReport"
                  v-model="dateRange"
                  type="daterange"
                  range-separator="الي"
                  format="yyyy/MM/dd"
                  value-format="yyyy-MM-dd"
                  start-placeholder="بداية الفترة"
                  end-placeholder="نهاية الفترة"
                >
                </el-date-picker> -->

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
          style="width: 100%;"

          align="center"
          v-if="tableData.length > 0"
          :data="tableData"
          border
        >
          <el-table-column label="#" type="index" width="50"> </el-table-column>
        
          <el-table-column width="300" label="المصروف" prop="expense_category.name">
          </el-table-column>
          <el-table-column    label="المبلغ" prop="cost"> </el-table-column>
          <el-table-column  width="200"  label="بواسطة" prop="user.name"> </el-table-column>
          <el-table-column  width="200"  label="المُستلم" prop="for_who"> </el-table-column>
          <el-table-column  width="200"  label="تعليق" prop="comment"> </el-table-column>
          <el-table-column  width="200"  label="التوقيت" >
             <template slot-scope="scope">
              <span>{{scope.row.created_at | moment("dddd | Do / MM / YYYY | h:mm A")}}</span>
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
      false: false,
      true: true,
      categories: [],

      category_id:null,
      dateRange: null,
      totalExpenses:0,
      tableData: [],

      format:'yyyy-MM-dd HH:mm A',
      valueFormat:'yyyy-MM-dd HH:mm:ss',
    };
  },

created() {
  
  if(this.$route.query.category){
    console.log("this.$route.query.category",this.$route.query.category)
    this.category_id=this.$route.query.category;
    } 
  
    

    this.getExpensesReport();
      this.getCategories();
},
  methods: {
  
    numberToFixed(number) {
      return Math.floor(number * 100) / 100;
    },
      getCategories() {
      axiosApi
        .get("expense-categories")
        .then((res) => {
          this.categories = res.data;
        })
        .catch((error) => console.log(error))
        .finally(() => {});
    },

    getExpensesReport() {
      if (this.dateRange != null) {
        const loading = this.$loading({
          lock: true,
          text: "جاري تحميل البيانات",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });



        let url = `expenses?limit=5`;
        if (this.category_id != "") {
          url+=`&category=${this.category_id}`
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
