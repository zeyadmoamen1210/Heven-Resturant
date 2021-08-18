<template>
  <div class="new-product">
    <el-container fluid>
      <el-main>
        <el-tabs tab-position="right"  @tab-click="tabChanged" v-model="currTabName">
          <el-tab-pane label="المصروفات" color="#FE5634" name="expenses">
            <el-row>
              <el-button
                style="float: right"
                class="addNew mr-auto"
                @click="openAddModel = true"
                type="primary"
                plain
                icon="el-icon-plus"
                >إضافة مصروف</el-button
              >
            </el-row>
            <el-table
              class="mt-2"
              style="width: 60%; margin-right: 20%"
              align="center"
              v-if="tableData.length > 0"
              :data="tableData"
              border
            >
              <el-table-column label="#" type="index" width="50">
              </el-table-column>

              <el-table-column width="300" label="المصروف" prop="name">
              </el-table-column>
             
              <el-table-column width="100" label="المبلغ" prop="cost">
              </el-table-column>
              <el-table-column label="تفاصيل">
                <template slot-scope="scope">
                  <router-link
                    title=" تفاصيل"
                    class="btn btn-sm btn-success"
                    :to="{
                      path: `/expenses/details?category=${scope.row.expense_category_id}`,
                    }"
                  >
                    <i class="fa fa-eye ml-1"></i>

                    عرض التفاصيل
                  </router-link>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="وصف المصروف" color="#FE5634" name="category">
            <el-row>
              <el-button
                style="float: right"
                class="addNew mr-auto"
                @click="openAddCategoryModel = true"
                type="primary"
                plain
                icon="el-icon-plus"
                >إضافة وصف مصروف</el-button
              >
            </el-row>
            <div class="flex-grid mt-2">
              <div style="display:flex;margin:10px"  v-for="item in categories" :key="item.id">
                <Item :item="item" />
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane v-if="!notAdmin" label="الشركاء" color="#FE5634" name="parteners">
            <el-row>
              <el-button
                style="float: left"
                class="addNew mr-auto"
                @click="openAddPartenerModel = true"
                type="primary"
                plain
                icon="el-icon-plus"
                >إضافة شريك</el-button
              >
              <el-button
                style="float: right"
                class="addNew mr-auto"
                @click="openAddPartenerPaymentModel = true"
                type="primary"
                plain
                icon="el-icon-plus"
                >إضافة مسحوبات للشريك</el-button
              >
            </el-row>
            <div class="flex-grid mt-2">
              <div
                style="display:flex;margin:10px"
                v-for="item in parteners"
                @click="getSelectedPartenerReport(item)"
                :key="item.id"
              >
                <Item :item="item" />
              </div>
            </div>

            <el-table
              class="mt-2"
              style="width: 80%; margin-right: 10%"
              align="center"
              v-if="selectedPartenerReport.length > 0"
              :data="selectedPartenerReport"
              border
            >
              <el-table-column label="#" type="index" width="50">
              </el-table-column>

              <el-table-column sortable label="الشريك" prop="partener.name">
              </el-table-column>
              <el-table-column width="300" label="ملاحظة" prop="comment">
              </el-table-column>
              <el-table-column width="80" label="المبلغ" prop="cost">
              </el-table-column>
              <el-table-column label="بواسطة" prop="user.name">
              </el-table-column>
              <el-table-column label="التوقيت">
                <template slot-scope="scope">
                  <span>{{
                    scope.row.created_at
                      | moment("dddd | Do / MM / YYYY | h:mm A")
                  }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>


          <el-tab-pane label="المستلمين" color="#FE5634" name="recipients">
            <el-row>
              <el-button
                style="float: right"
                class="addNew mr-auto"
                @click="openAddRecipientsModel = true"
                type="primary"
                plain
                icon="el-icon-plus"
                >إضافة مستلم</el-button
              >
            </el-row>
            <div class="flex-grid mt-2">
              <div style="display:flex;margin:10px;padding: 10px 16px;background: #EBF9FC;border-radius: 6px;"  v-for="item in recipients" :key="item.id">
                <div>
                  {{item.name}}
                </div>
              </div>
            </div>
          </el-tab-pane>


          <!-- <el-tab-pane label=" تقرير المصروفات" color="#FE5634" name="report">
            <Report />
          </el-tab-pane> -->
        </el-tabs>
      </el-main>

      <vs-dialog
        title="إضافة"
        v-model="openAddCategoryModel"
        width="40%"
        class="add-operation-dialog"
      >
        <!-- center -->
        <template #header>
          <span>إضافة مصروف جديد</span>
        </template>

        <el-input
          placeholder="وصف المصروف"
          class="mt-2"
          @focus="$event.target.select()"
          v-model="categoryForm.name"
        ></el-input>

        <!-- This is Popup Footer -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="openAddCategoryModel = false">إلغاء</el-button>
          <el-button type="primary" @click="addNewExpenseCategory"
            >إضافة</el-button
          >
        </span>
      </vs-dialog>
      <!-- dir="rtl" -->
      <vs-dialog
        title="إضافة"
        v-model="openAddModel"
        width="40%"
        class="add-operation-dialog"
      >
        <!-- center -->
        <template #header>
          <span>إضافة مصروف جديد</span>
        </template>

        <el-row :gutter="10">
          <el-col :xl="8" :lg="8" :md="12" :sm="12">
            <el-input
              class="mt-2 input1"
              placeholder="المبلغ"
              id="cost"
              type="number"
              @focus="$event.target.select()"
              v-model="form.cost"
              controls-position="right"
              @keyup.enter.native="focusNext"
            ></el-input>
          </el-col>
          <el-col :xl="16" :lg="16" :md="12" :sm="12">
            <el-select
              searchable
              @focus="index = 0"
              class="mt-2"
              v-model="form.expense_category_id"
              placeholder="حدد الوصف"
              @change="focusNext"
            >
              <el-option
                v-for="item in categories"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <!-- <el-input
          placeholder="المُستلم"
          class="mt-2 input2"
          @focus="$event.target.select()"
          v-model="form.for_who"
          @keyup.enter.native="focusNext"
        ></el-input> -->

        <div class="row">

          <div class="col-md-6">
            <div>
               <!-- <el-select
                
                v-model="form.recipient"
                placeholder=" مستلم"
              >
                <el-option v-for="rec in recipients" :key="rec.id" :value="">
                  <div class="name">{{ rec.name }}</div>
                </el-option>
              </el-select> -->


              <el-select v-model="form.recipient" placeholder="اختر مستلم" class="mt-2">
                <el-option
                  v-for="rec in recipients" 
                  :key="rec.id" 
                  :label="rec.name"
                  :value="rec.name">
                </el-option>
              </el-select>

            </div>
          </div>
          <div class="col-md-6">
            <div>
              <el-input
              placeholder="ملاحظات"
              class="mt-2 input3"
              @focus="$event.target.select()"
              v-model="form.comment"
              @keyup.enter.native="focusNext"
            ></el-input>
            </div>
          </div>

          
        </div>

       

        

        <!-- This is Popup Footer -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="openAddModel = false">إلغاء</el-button>
          <el-button type="primary" @click="addNewExpense">إضافة</el-button>
        </span>
      </vs-dialog>
      <vs-dialog
        title="إضافة"
        v-model="openAddPartenerPaymentModel"
        width="40%"
        class="add-operation-dialog"
      >
        <!-- center -->
        <template #header>
          <span>إضافة مسحوبات للشركاء</span>
        </template>

        <el-row :gutter="10">
          <el-col :xl="8" :lg="8" :md="12" :sm="12">
            <el-input
              class="mt-2 input1"
              placeholder="المبلغ"
              id="cost"
              type="number"
              @focus="$event.target.select()"
              v-model="partenerPaymentForm.cost"
              controls-position="right"
              @keyup.enter.native="focusNext"
            ></el-input>
          </el-col>
          <el-col :xl="16" :lg="16" :md="12" :sm="12">
            <el-select
              searchable
              @focus="index = 0"
              class="mt-2"
              v-model="partenerPaymentForm.partener_id"
              placeholder="حدد الشريك"
              @change="focusNext"
            >
              <el-option
                v-for="item in parteners"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>

      

        <el-input
          placeholder="ملاحظات"
          class="mt-2 input3"
          @focus="$event.target.select()"
          v-model="partenerPaymentForm.comment"
          @keyup.enter.native="focusNext"
        ></el-input>

        <!-- This is Popup Footer -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="openAddPartenerPaymentModel = false">إلغاء</el-button>
          <el-button type="primary" @click="addNewPartenerPayment">إضافة</el-button>
        </span>
      </vs-dialog>

      <vs-dialog
        title="إضافة"
        v-model="openAddPartenerModel"
        width="40%"
        class="add-operation-dialog"
      >
        <!-- center -->
        <template #header>
          <span>إضافة شريك جديد</span>
        </template>

        <el-input
          placeholder="الاسم"
          class="mt-2 input1"
          @focus="$event.target.select()"
          v-model="partenerForm.name"
          @keyup.enter.native="focusNext"
        ></el-input>

        <el-input
          placeholder="رقم الهاتف"
          class="mt-2 input2"
          @focus="$event.target.select()"
          v-model="partenerForm.phone"
          @keyup.enter.native="focusNext"
        ></el-input>

        <!-- This is Popup Footer -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="openAddPartenerModel = false">إلغاء</el-button>
          <el-button type="primary" @click="addNewPartener">إضافة</el-button>
        </span>
      </vs-dialog>





       <vs-dialog
        title="إضافة"
        v-model="openAddRecipientsModel"
        width="40%"
        class="add-operation-dialog"
      >
        <!-- center -->
        <template #header>
          <span> إضافة مستلم جديد</span>
        </template>

        <el-input
          placeholder="الاسم"
          class="mt-2 input1"
          @focus="$event.target.select()"
          v-model="addRecipient.name"
          @keyup.enter.native="focusNext"
        ></el-input>

      

        <!-- This is Popup Footer -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="openAddPartenerModel = false">إلغاء</el-button>
          <el-button type="primary" @click="addNewRecipient">إضافة</el-button>
        </span>
      </vs-dialog>
      <!-- </el-main> -->
    </el-container>
  </div>
</template>
<script>
import axiosApi from "@/plugins/axios.js";
import Item from "@/components/Item";
// import Report from "./ReportDetails.vue";

export default {
  name: "NewCustomer",
  components: { Item },
  computed:{
    notAdmin(){
      let user = localStorage.getItem("heavenDashboardUser");
      if(JSON.parse(user).role_id != 1){
        return true;
      }else{
        return false;
      }
    }
  },
  data() {
    return {
      currTabName: "expenses",
      dateRange: [
        this.$moment().locale("en").format().substring(0, 16),
        this.$moment().locale("en").format().substring(0, 16),
      ],
      addRecipient:{},
      totalExpenses: 0,
      tableData: [],
      parteners: [],
      selectedPartenerReport: [],
      selectedPartener: null,
      
      state:'',
      openAddRecipientsModel: false,

      openAddCategoryModel: false,
      openAddModel: false,
      openAddPartenerModel: false,
      openAddPartenerPaymentModel: false,
      index: 0,
      false: false,
      recipients:[],

      currRecipients:{},

      categories: [],
      categoryForm: {
        name: "",
      },
      form: {
        cost: "",
        expense_category_id: null,
      },
      partenerPaymentForm: {
        comment: "",
        cost: "",
        partener_id: null,
      },
      partenerForm: {
        name: "",
        phone: "",
      },
    };
  },
  created() {
    this.getExpensesReport();
    this.getCategories();
    this.getRecipients();
    this.getParteners();
    
    // this.getSelectedPartenerReport(null);
  },
  mounted() {},

  methods: {

    querySearchAsync(queryString, cb) {
      return new Promise((resolve) => {
        if (queryString.length < 2) {
          return resolve([]);
        }
        cb(this.recipients);
      });
    },


    handleSelect(item) {
      this.currRecipients = item;
    },


    addNewRecipient(){

      const loading = this.$vs.loading()
      axiosApi.post(`/recipients`, {...this.addRecipient}).then(res => {

        this.$message({
          message: "تم إضافة المستلم بنجاح",
          type: "success"
        });

        this.openAddRecipientsModel = false;
        this.addRecipient = {};

        this.getRecipients();

      }).finally(() => loading.close());

    },
    

    tabChanged(tab){
      if(tab.name=="parteners"){
        this.getSelectedPartenerReport(null);
      }
    },
    focusNext() {
      if (this.index < 3) {
        this.index += 1;
      } else {
        this.index = 1;
      }

      let input = ".input" + this.index + " input";
      console.log(input);
      setTimeout(() => {
        document.querySelector(input).focus();
      }, 100);
    },
    getExpensesReport() {
      if (this.dateRange != null) {
        const loading = this.$vs.loading();

        let url = `expenses/category`;
        
        this.totalExpenses = 0;
        const vm = this;
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


    getRecipients(){
        axiosApi
        .get("/recipients")
        .then((res) => {
          this.recipients = res.data;
        })
        .catch((error) => console.log(error))
        .finally(() => {});
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
    getSelectedPartenerReport(selectedPartener) {
      const loading = this.$vs.loading()
      let url = `parteners-payments`;
      if (selectedPartener) {
        url += `?partener_id=${selectedPartener.id}`;
      }
      axiosApi
        .get(url)
        .then((res) => {
          this.selectedPartenerReport = res.data;
        })
        .catch((error) => console.log(error))
        .finally(() => {
          loading.close();
        });
    },
    getParteners() {
      axiosApi
        .get("parteners")
        .then((res) => {
          this.parteners = res.data;
        })
        .catch((error) => console.log(error))
        .finally(() => {});
    },

    addNewExpense() {
      axiosApi
        .post("expenses", this.form)
        .then(() => {
          this.$notify({
            title: "تمت العملية بنجاح",
            message: "تم حفظ بيانات المصروف بنجاح",
            type: "success",
            duration: 1500,
          });
          this.getExpensesReport();
          this.openAddModel = false;
        })
        .catch(() => {
          this.$notify({
            title: "حدث خطأ",
            message: "عفوا لم تتم العملية ",
            type: "error",
            duration: 1500,
          });
        });
    },
    addNewPartenerPayment() {
      axiosApi
        .post("parteners-payments", this.partenerPaymentForm)
        .then(() => {
          this.$notify({
            title: "تمت العملية بنجاح",
            message: "تم حفظ بيانات مسحوبات الشريك بنجاح",
            type: "success",
            duration: 1500,
          });
          this.getSelectedPartenerReport(null);
          this.openAddPartenerPaymentModel = false;
        })
        .catch(() => {
          this.$notify({
            title: "حدث خطأ",
            message: "عفوا لم تتم العملية ",
            type: "error",
            duration: 1500,
          });
        });
    },
    addNewPartener() {
      axiosApi
        .post("parteners", this.partenerForm)
        .then(() => {
          this.$notify({
            title: "تمت العملية بنجاح",
            message: "تم حفظ بيانات الشريك بنجاح",
            type: "success",
            duration: 1500,
          });
          this.getParteners();
          this.openAddPartenerModel = false;
        })
        .catch(() => {
          this.$notify({
            title: "حدث خطأ",
            message: "عفوا لم تتم العملية ",
            type: "error",
            duration: 1500,
          });
        });
    },
    addNewExpenseCategory() {
      axiosApi
        .post("expense-categories", this.categoryForm)
        .then(() => {
          this.$notify({
            title: "تمت العملية بنجاح",
            message: "تم حفظ بيانات وصف المصروف بنجاح",
            type: "success",
            duration: 1500,
          });

          this.getCategories();
          this.openAddCategoryModel = false;
        })
        .catch(() => {
          this.$notify({
            title: "حدث خطأ",
            message: "عفوا لم تتم العملية ",
            type: "error",
            duration: 1500,
          });
        });
    },
  },
};
</script>

<style lang="scss">
.addNew {
  padding: 7px;
}
</style>
