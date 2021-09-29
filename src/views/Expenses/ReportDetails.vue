<template>
  <div class="expense-report">
    <el-container>
      <el-main>
        <el-row type="flex" :gutter="10">
          <el-col :xl="6" :lg="6" :md="12" :sm="12">
            <div class="bg-White mt-2 p-3">
              <el-select
                clearable
                v-model="category"
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
            <div class="bg-White mt-2">
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
                  end-placeholder="نهاية الفترة"
                >
                </el-date-picker>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-table
          class="mt-2"
          style="width: 100%"
          align="center"
          v-if="tableData.length > 0"
          :data="tableData"
          border
        >
          <el-table-column label="#" type="index" width="50"> </el-table-column>

          <el-table-column
            width="300"
            label="المصروف"
            prop="expense_category.name"
          >
          </el-table-column>
          <el-table-column width="150 " label="المبلغ" prop="cost">
          </el-table-column>
          <el-table-column width="200" label="بواسطة" prop="user.name">
          </el-table-column>
          <el-table-column width="150" label="المُستلم" prop="for_who">
          </el-table-column>
          <el-table-column width="200" label="تعليق" prop="comment">
          </el-table-column>
          <el-table-column label="التوقيت">
            <template slot-scope="scope">
              <span>{{
                scope.row.created_at | moment("dddd | Do / MM / YYYY | h:mm A")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column width="150" label="الاجراء">
            <template slot-scope="scope">
              <div class="row" style="justify-content: center">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  title="تعديل"
                  size="mini"
                  class="ml-2"
                  @click.native.prevent="editItem(scope)"
                ></el-button>
                <el-popconfirm
                  confirm-button-text="موافق"
                  cancel-button-text="إلغاء"
                  icon="el-icon-info"
                  icon-color="red"
                  title="هل تريد مسح المصروف؟"
                  @confirm="deleteItem(scope)"
                >
                  <div slot="reference">
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      title="مسح"
                      size="mini"
                    ></el-button>
                  </div>
                </el-popconfirm>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-dialog title="تعديل بيانات المصروف" :visible.sync="editFormVisible" v-if="selectedExpenses">
         
        </el-dialog> -->

        <vs-dialog
          v-if="selectedExpenses"
          title="إضافة"
          v-model="editFormVisible"
          width="40%"
          class="add-operation-dialog"
        >
          <!-- center -->
          <template #header>
            <span>تعديل بيانات المصروف</span>
          </template>

          <el-form :model="selectedExpenses">
            <el-row dir="rtl" :gutter="10">
              <el-col :xl="10" :lg="10" :md="6" :sm="10">
                <el-form-item label="التعليق ">
                  <el-input
                    class="form-control"
                    v-model="selectedExpenses.comment"
                    autocomplete="off"
                    @focus="$event.target.select()"
                  />
                </el-form-item>
              </el-col>
              <el-col :xl="10" :lg="10" :md="6" :sm="12">
                <el-form-item label="المستلم ">
                  <el-input
                    v-model="selectedExpenses.for_who"
                    autocomplete="off"
                    @focus="$event.target.select()"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xl="4" :lg="4" :md="6" :sm="12">
                <el-form-item label="المبلغ">
                  <el-input
                    type="number"
                    v-model="selectedExpenses.cost"
                    autocomplete="off"
                    @focus="$event.target.select()"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <!-- This is Popup Footer -->
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="update">حفظ التعديلات</el-button>
            <el-button class="mr-3" @click="editFormVisible = false"
              >إلغاء</el-button
            >
          </span>
        </vs-dialog>
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
      editFormVisible: false,
      selectedExpenses: null,
      category: "",

      totalExpenses: 0,
      tableData: [],

      format: "yyyy-MM-dd HH:mm A",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
      dateRange: localStorage.getItem("reportsInterval")
        ? JSON.parse(localStorage.getItem("reportsInterval"))
        : [
            this.$moment(new Date(), "DD-MM-YYYY")
              .locale("en")
              .format("YYYY-MM-DD") +
              " " +
              "11:30:00",
            this.$moment(new Date(), "DD-MM-YYYY")
              .add(1, "days")
              .locale("en")
              .format("YYYY-MM-DD") +
              " " +
              "11:30:00",
          ],
    };
  },

  created() {
    this.getCategories();
  },
  methods: {
    deleteItem(scope) {
      const loading = this.$vs.loading();
      axiosApi
        .delete(`expenses/${scope.row.id}`)
        .then(() => {
          this.getExpensesReport();
          this.$notify({
            title: "تمت العملية بنجاح",
            message: "تم مسح بيانات المنتج بنجاح",
            type: "success",
            duration: 1500,
          });
        })
        .catch((e) => {
          this.$notify.error({
            title: "حدث خطأ",
            message: "عفوا تأكد من بيانات المطلوبة",
            duration: 1500,
          });
          console.log(e);
        })
        .finally(() => loading.close());
      console.log("delete", scope.row);
    },
    editItem(scope) {
      this.selectedExpenses = scope.row;
      this.editFormVisible = true;
    },
    update() {
      const loading = this.$vs.loading();
      axiosApi
        .put(`expenses/${this.selectedExpenses.id}`, this.selectedExpenses)
        .then(() => {
          this.getExpensesReport();
          this.editFormVisible = false;
          this.$notify({
            title: "تمت العملية بنجاح",
            message: "تم تحديث بيانات المنتج بنجاح",
            type: "success",
            duration: 1500,
          });
        })
        .catch((e) => {
          if (e.response.data.code) {
            this.$notify.error({
              title: "حدث خطأ",
              message: "عفوا تأكد من عدم تكرار كود المنتج  ",
              duration: 1500,
            });
          } else {
            this.$notify.error({
              title: "حدث خطأ",
              message: "عفوا تأكد من بيانات المطلوبة",
              duration: 1500,
            });
          }
        })
        .finally(() => loading.close());
    },
    numberToFixed(number) {
      return Math.floor(number * 100) / 100;
    },
    getCategories() {
      axiosApi
        .get("expense-categories")
        .then((res) => {
          this.categories = res.data;
          this.category = this.$route.query.category
            ? Number(this.$route.query.category)
            : "";
          this.getExpensesReport();
        })
        .catch((error) => console.log(error))
        .finally(() => {});
    },

    getExpensesReport() {
      const loading = this.$loading({
        lock: true,
        text: "جاري تحميل البيانات",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      let url = `expenses?limit=5`;
      if (this.category != "") {
        url += `&category=${this.category}`;
      }

      if (this.dateRange != null) {
        localStorage.setItem("reportsInterval", JSON.stringify(this.dateRange));

        url += `&start=${this.dateRange[0]}`;
        url += `&end=${this.dateRange[1]}`;
      }

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
    },
  },
};
</script>

<style lang="scss" scoped>
.cell-flex {
  .cell {
    display: flex;
  }
}
</style>
