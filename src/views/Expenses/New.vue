<template>
  <div class="new-product">
    <el-container fluid>
      <el-main>
        <el-tabs
          tab-position="right"
          @tab-click="tabChanged"
          v-model="currTabName"
        >
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

            <el-date-picker
              class="mt-3"
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
                  <el-button
                    @click="
                      goTo(
                        `/expenses/details?category=${scope.row.expense_category_id}`
                      )
                    "
                    type="primary"
                    >عرض التفاصيل</el-button
                  >
                  <!-- <router-link
                    title=" تفاصيل"
                    class="btn btn-sm btn-success"
                    :to="{
                      path: `/expenses/details?category=${scope.row.expense_category_id}`,
                    }"
                  >
                    <i class="fa fa-eye ml-1"></i>

                    عرض التفاصيل
                  </router-link> -->
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
            <div class="row">
              <div
                class="col-lg-2 col-md-4 col-sm-6"
                v-for="item in categories"
                :key="item.id"
              >
                <section class="baby-blue-section">
                  <div>
                    <h6>{{ item.name }}</h6>
                  </div>
                  <div class="edit-delete">
                    <button
                      class="btn emp-dept-update"
                      @click="openUpdateExpenseCategorie(item)"
                    >
                      <img src="@/images/Icon-feather-edit-3.svg" alt="" />
                    </button>
                    <button
                      class="btn emp-dept-delete"
                      @click="openDeleteCategory(item)"
                    >
                      <img src="@/images/Icon-material-delete.svg" alt="" />
                    </button>
                  </div>
                </section>
              </div>
            </div>
            <!-- <div class="d-flex mt-2">
              <div
                style="display: flex; margin: 10px"
                v-for="item in categories"
                :key="item.id"
              >
                <section class="baby-blue-section">
                  <div>
                    <h6>{{ item.name }}</h6>
                  </div>
                  <div class="edit-delete">
                    <button
                      class="btn emp-dept-update"
                      @click="openUpdateExpenseCategorie(item)"
                    >
                      <img src="@/images/Icon-feather-edit-3.svg" alt="" />
                    </button>
                    <button
                      class="btn emp-dept-delete"
                      @click="openDeleteCategory(item)"
                    >
                      <img src="@/images/Icon-material-delete.svg" alt="" />
                    </button>
                  </div>
                </section>
              </div>
            </div> -->
          </el-tab-pane>
          <el-tab-pane
            v-if="!notAdmin"
            label="الشركاء"
            color="#FE5634"
            name="parteners"
          >
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
                @click="
                  openAddPartenerPaymentModel = true;
                  editPartenerPayment = false;
                "
                type="primary"
                plain
                icon="el-icon-plus"
                >إضافة مسحوبات للشريك</el-button
              >
            </el-row>
            <div class="d-flex mt-2">
              <div
                style="margin: 10px"
                v-for="item in parteners"
                @click="getSelectedPartenerReport(item)"
                :key="item.id"
              >
                <section class="baby-blue-section">
                  <div>
                    <h6>{{ item.name }}</h6>
                  </div>
                  <div class="edit-delete">
                    <button
                      class="btn emp-dept-update"
                      @click="openUpdatePartner(item)"
                    >
                      <img src="@/images/Icon-feather-edit-3.svg" alt="" />
                    </button>
                    <button
                      class="btn emp-dept-delete"
                      @click="openDeletePartner(item)"
                    >
                      <img src="@/images/Icon-material-delete.svg" alt="" />
                    </button>
                  </div>
                </section>
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
                      title="هل تريد مسح مسحوبات الشريك؟"
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
                  <!-- <el-row>
                    <el-col :xl="6" :lg="6" :md="12" :sm="12">
                      <el-popconfirm
                        confirm-button-text="موافق"
                        cancel-button-text="إلغاء"
                        icon="el-icon-info"
                        icon-color="red"
                        title="هل تريد مسح مسحوبات الشريك؟"
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
                    </el-col>
                    <el-button
                      type="primary"
                      icon="el-icon-edit"
                      title="تعديل"
                      size="mini"
                      class="mr-2"
                      @click.native.prevent="editItem(scope)"
                    ></el-button>
                  </el-row> -->
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
            <div class="d-flex mt-2">
              <div style="" v-for="item in recipients" :key="item.id">
                <section class="baby-blue-section">
                  <div>
                    <h6>{{ item.name }}</h6>
                  </div>
                  <div class="edit-delete">
                    <button
                      class="btn emp-dept-update"
                      @click="openUpdateRecipients(item)"
                    >
                      <img src="@/images/Icon-feather-edit-3.svg" alt="" />
                    </button>
                    <button
                      class="btn emp-dept-delete"
                      @click="openDeleteRecipients(item)"
                    >
                      <img src="@/images/Icon-material-delete.svg" alt="" />
                    </button>
                  </div>
                </section>
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

              <el-select
                v-model="form.for_who"
                placeholder="اختر مستلم"
                class="mt-2"
              >
                <el-option
                  v-for="rec in recipients"
                  :key="rec.id"
                  :label="rec.name"
                  :value="rec.name"
                >
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
          <span v-if="editPartenerPayment"> تعديل </span>
          <span v-else> إضافة </span>
          <span> مسحوبات للشركاء</span>
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
              :disabled="editPartenerPayment"
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
          <el-button @click="openAddPartenerPaymentModel = false"
            >إلغاء</el-button
          >
          <el-button
            v-if="editPartenerPayment"
            type="primary"
            @click="updatePartenerPayment"
            >تعديل</el-button
          >
          <el-button v-else type="primary" @click="addNewPartenerPayment"
            >إضافة</el-button
          >
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

    <vs-dialog
      class="delete-dialog"
      width="550px"
      not-center
      v-model="showConfirmModelToDeleteCategory"
    >
      <div class="con-content">
        <h6><i class="el-icon-warning-outline"></i></h6>
        <p>هل أنت متأكد من أتك تريد حذف ؟</p>

        <div class="btns d-flex justify-content-center">
          <vs-button color="#675DEC" @click="deleteCategory()">
            تأكيد
          </vs-button>
          <vs-button
            color="danger"
            @click="showConfirmModelToDeleteCategory = false"
          >
            إلغاء
          </vs-button>
        </div>
      </div>
    </vs-dialog>

    <vs-dialog
      class="delete-dialog"
      width="550px"
      not-center
      v-model="showDeletePartner"
    >
      <div class="con-content">
        <h6><i class="el-icon-warning-outline"></i></h6>
        <p>هل أنت متأكد من أتك تريد حذف ؟</p>

        <div class="btns d-flex justify-content-center">
          <vs-button color="#675DEC" @click="deletePartner()">
            تأكيد
          </vs-button>
          <vs-button color="danger" @click="showDeletePartner = false">
            إلغاء
          </vs-button>
        </div>
      </div>
    </vs-dialog>

    <vs-dialog
      class="delete-dialog"
      width="550px"
      not-center
      v-model="showDeleteRecipients"
    >
      <div class="con-content">
        <h6><i class="el-icon-warning-outline"></i></h6>
        <p>هل أنت متأكد من أتك تريد حذف ؟</p>

        <div class="btns d-flex justify-content-center">
          <vs-button color="#675DEC" @click="deleteRecipients()">
            تأكيد
          </vs-button>
          <vs-button color="danger" @click="showDeleteRecipients = false">
            إلغاء
          </vs-button>
        </div>
      </div>
    </vs-dialog>

    <!-- Update category -->
    <vs-dialog v-model="updateExpenseCategorie">
      <template #header>
        <h4>تعديل وصف المصروف</h4>
      </template>

      <el-form :model="currExpenseCategory" ref="currExpenseCategory">
        <el-form-item
          prop="name"
          label=" وصف المصروف"
          :rules="[{ required: true, message: ' وصف المصروف مطلوب' }]"
        >
          <el-input v-model="currExpenseCategory.name"></el-input>
        </el-form-item>

        <span class="dialog-footer mt-4">
          <el-form-item>
            <el-button
              type="primary"
              @click="submitUpdateExpense('currExpenseCategory')"
              >تعديل</el-button
            >
          </el-form-item>
        </span>
      </el-form>
    </vs-dialog>

    <!-- Update recipients -->
    <vs-dialog v-model="showUpdateRecipients">
      <template #header>
        <h4>تعديل مستلم</h4>
      </template>

      <el-form :model="currRecipients" ref="recipients">
        <el-form-item
          prop="name"
          label="اسم المستلم"
          :rules="[{ required: true, message: 'اسم المستلم مطلوب' }]"
        >
          <el-input v-model="currRecipients.name"></el-input>
        </el-form-item>

        <span class="dialog-footer mt-4">
          <el-form-item>
            <el-button
              type="primary"
              @click="submitUpdateRecipients('recipients')"
              >تعديل</el-button
            >
          </el-form-item>
        </span>
      </el-form>
    </vs-dialog>

    <!-- Update partener -->
    <vs-dialog v-model="showUpdatePartner">
      <template #header>
        <h4>تعديل شريك</h4>
      </template>

      <el-form :model="currPartner" ref="updatePartnar">
        <el-form-item
          prop="name"
          label="الاسم"
          :rules="[{ required: true, message: 'اسم الشريك مطلوب' }]"
        >
          <el-input v-model="currPartner.name"></el-input>
        </el-form-item>

        <el-form-item
          prop="phone"
          label="الهاتف"
          :rules="[{ required: true, message: 'الهاتف مطلوب' }]"
        >
          <el-input v-model="currPartner.phone"></el-input>
        </el-form-item>

        <span class="dialog-footer mt-4">
          <el-form-item>
            <el-button
              type="primary"
              @click="submitUpdatePartner('updatePartnar')"
              >تعديل</el-button
            >
          </el-form-item>
        </span>
      </el-form>
    </vs-dialog>
  </div>
</template>
<script>
import axiosApi from "@/plugins/axios.js";
import Item from "@/components/Item";
// import Report from "./ReportDetails.vue";

export default {
  name: "NewExpense",
  components: { Item },
  computed: {
    notAdmin() {
      let user = localStorage.getItem("heavenDashboardUser");
      if (JSON.parse(user).role_id != 1) {
        return true;
      } else {
        return false;
      }
    },
  },
  data() {
    return {
      editPartenerPayment: false,
      format: "yyyy-MM-dd HH:mm A",
      valueFormat: "yyyy-MM-dd HH:mm:ss",

      currRecipients: {},
      showUpdateRecipients: false,
      currPartner: {},
      showUpdatePartner: false,
      currTabName: "expenses",
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
      addRecipient: {},
      totalExpenses: 0,
      tableData: [],
      parteners: [],
      selectedPartenerReport: [],
      selectedPartener: null,

      state: "",
      openAddRecipientsModel: false,

      openAddCategoryModel: false,
      openAddModel: false,
      openAddPartenerModel: false,
      showDeleteRecipients: false,
      openAddPartenerPaymentModel: false,
      index: 0,
      false: false,
      recipients: [],

      currRecipients: {},

      categories: [],
      categoryForm: {
        name: "",
      },
      form: {
        cost: "",
        for_who: "",
        expense_category_id: null,
      },
      showConfirmModelToDeleteCategory: false,
      partenerPaymentForm: {
        id: 0,
        comment: "",
        cost: "",
        partener_id: null,
      },
      updateExpenseCategorie: false,
      currExpenseCategory: {},
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
    goTo(path) {
      this.$router.push({ path: path });
    },
    deleteItem(scope) {
      const loading = this.$vs.loading();
      axiosApi
        .delete(`parteners-payments/${scope.row.id}`)
        .then(() => {
          this.getSelectedPartenerReport(null);

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
      this.partenerPaymentForm = scope.row;
      this.openAddPartenerPaymentModel = true;
      this.editPartenerPayment = true;
    },
    clearPartenerPaymentForm() {
      this.partenerPaymentForm.id = 0;
      this.partenerPaymentForm.cost = "";
      this.partenerPaymentForm.comment = "";
      this.partenerPaymentForm.partener_id = null;
    },
    updatePartenerPayment() {
      const loading = this.$vs.loading();
      axiosApi
        .put(
          `parteners-payments/${this.partenerPaymentForm.id}`,
          this.partenerPaymentForm
        )
        .then(() => {
          this.clearPartenerPaymentForm();
          this.getSelectedPartenerReport(null);
          this.openAddPartenerPaymentModel = false;
          this.editPartenerPayment = false;
          this.$notify({
            title: "تمت العملية بنجاح",
            message: "تم تحديث بيانات المسحوبات بنجاح",
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
    openDeletePartner(item) {
      this.showDeletePartner = true;
      this.currPartner = { ...item };
    },
    deletePartner() {
      const loading = this.$vs.loading();
      axiosApi
        .delete(`/parteners/${this.currPartner.id}`)
        .then((res) => {
          this.$message({
            message: "تم الحذف بنجاح",
            type: "success",
          });
          this.getParteners();
          this.showDeletePartner = false;
        })
        .catch((err) => {
          this.$message({
            message: "حدث خطأ ما !",
            type: "danger",
          });
        })
        .finally(() => loading.close());
    },
    openUpdatePartner(item) {
      this.showUpdatePartner = true;
      this.currPartner = { ...item };
    },
    deleteRecipients() {
      const loading = this.$vs.loading();
      axiosApi
        .delete(`/recipients/${this.currRecipients.id}`)
        .then((res) => {
          this.$message({
            message: "تم الحذف بنجاح",
            type: "success",
          });
          this.getRecipients();
          this.showDeleteRecipients = false;
        })
        .catch((err) => {
          this.$message({
            message: "حدث خطأ ما !",
            type: "danger",
          });
        })
        .finally(() => loading.close());
    },
    deleteCategory() {
      const loading = this.$vs.loading();
      axiosApi
        .delete(`/expense-categories/${this.currExpenseCategory.id}`)
        .then((res) => {
          this.$message({
            message: "تم الحذف بنجاح",
            type: "success",
          });
          this.getCategories();
          this.showConfirmModelToDeleteCategory = false;
        })
        .catch((err) => {
          this.$message({
            message: "حدث خطأ ما !",
            type: "danger",
          });
        })
        .finally(() => loading.close());
    },
    openDeleteCategory(category) {
      this.showConfirmModelToDeleteCategory = true;
      this.currExpenseCategory = { ...category };
    },
    openUpdateRecipients(recipients) {
      this.showUpdateRecipients = true;
      this.currRecipients = { ...recipients };
    },
    openDeleteRecipients(recipients) {
      this.showDeleteRecipients = true;
      this.currRecipients = { ...recipients };
    },
    submitUpdateRecipients(item) {
      this.showUpdateRecipients = true;
      this.currRecipients = { ...item };
    },
    openUpdateExpenseCategorie(item) {
      this.updateExpenseCategorie = true;
      this.currExpenseCategory = { ...item };
    },

    submitUpdateExpense(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("hi");
          this.saveExpenseCategory();
        }
      });
    },

    submitUpdateRecipients(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("hi");
          this.saveRecipients();
        }
      });
    },

    submitUpdatePartner(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("hi");
          this.saveUpdatePartner();
        }
      });
    },

    saveUpdatePartner() {
      const loading = this.$vs.loading();
      axiosApi
        .put(`/parteners/${this.currPartner.id}`, {
          name: this.currPartner.name,
          phone: this.currPartner.phone,
        })
        .then((res) => {
          this.$message({
            message: "تم التعديل بنجاح",
            type: "success",
          });
          this.getParteners();
          this.showUpdatePartner = false;
        })
        .catch((err) => {
          this.$message({
            message: "حدث خطأ ما !",
            type: "danger",
          });
        })
        .finally(() => loading.close());
    },

    saveRecipients() {
      const loading = this.$vs.loading();
      axiosApi
        .put(`/recipients/${this.currRecipients.id}`, {
          name: this.currRecipients.name,
        })
        .then((res) => {
          this.$message({
            message: "تم التعديل بنجاح",
            type: "success",
          });
          this.getRecipients();
          this.showUpdateRecipients = false;
        })
        .catch((err) => {
          this.$message({
            message: "حدث خطأ ما !",
            type: "danger",
          });
        })
        .finally(() => loading.close());
    },

    saveExpenseCategory() {
      const loading = this.$vs.loading();
      axiosApi
        .put(`/expense-categories/${this.currExpenseCategory.id}`, {
          name: this.currExpenseCategory.name,
        })
        .then((res) => {
          this.$message({
            message: "تم التعديل بنجاح",
            type: "success",
          });
          this.getCategories();
          this.updateExpenseCategorie = false;
        })
        .catch((err) => {
          this.$message({
            message: "حدث خطأ ما !",
            type: "danger",
          });
        })
        .finally(() => loading.close());
    },

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

    addNewRecipient() {
      const loading = this.$vs.loading();
      axiosApi
        .post(`/recipients`, { ...this.addRecipient })
        .then((res) => {
          this.$message({
            message: "تم إضافة المستلم بنجاح",
            type: "success",
          });

          this.openAddRecipientsModel = false;
          this.addRecipient = {};

          this.getRecipients();
        })
        .finally(() => loading.close());
    },

    tabChanged(tab) {
      if (tab.name == "parteners") {
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
        localStorage.setItem("reportsInterval", JSON.stringify(this.dateRange));

        const loading = this.$vs.loading();

        let url = `expenses/category`;
        if (this.dateRange != null) {
          localStorage.setItem(
            "reportsInterval",
            JSON.stringify(this.dateRange)
          );

          url += `?start=${this.dateRange[0]}`;
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
      }
    },

    getRecipients() {
      axiosApi
        .get("/recipients")
        .then((res) => {
          this.recipients = res.data;
        })
        .catch((error) => console.log(error))
        .finally(() => {});
    },

    getCategories() {
      let url = "/expense-categories";

      axiosApi
        .get(url)
        .then((res) => {
          this.categories = res.data;
        })
        .catch((error) => console.log(error))
        .finally(() => {});
    },
    getSelectedPartenerReport(selectedPartener) {
      const loading = this.$vs.loading();
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
          this.clearPartenerPaymentForm();
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
.baby-blue-section {
  padding: 5px 18px;
  margin-bottom: 27px;
  background: #ebf9fc;
  color: #333;
  border-radius: 8px;
  margin-right: 10px;
  h6 {
    text-align: center;
  }
}
</style>
