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

      <div class="row">
        <div class="col-md-4">
          <el-select
            style="max-width: 413px; margin-bottom: 20px"
            v-model="currDelivery"
            placeholder="ﺇﺑﺤﺚ ﻋﻦ ﺳﺎﺋﻖ"
            value-key="id"
            filterable
            @change="getDeliveryOrders()"
          >
            <el-option
              v-for="driver in allDeliveries"
              :key="driver.id"
              :label="driver.name"
              :value="driver"
            >
              {{ driver.name }}
            </el-option>
          </el-select>
        </div>
        <div class="col-md-4">
          <el-date-picker
            class="mr-2"
            @change="getDeliveryOrders"
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
        <div class="col-md-4">
          <el-form
            :model="taslimForm"
            :inline="true"
            ref="taslimForm"
            v-if="currDelivery"
          >
            <el-form-item
              prop="amount"
              :rules="[{ required: true, message: '  مطلوب' }]"
            >
              <el-input
                type="number"
                placeholder="المبلغ المُستلم"
                v-model="taslimForm.amount"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="addTaslim()"
                >حفظ عملية التحصيل</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>

      <table v-if="currDelivery">
        <tr>
          <td>الاسم</td>
          <td>{{ currDelivery.name }}</td>
        </tr>
        <tr>
          <td>الموبايل</td>
          <td>{{ currDelivery.mobile }}</td>
        </tr>
      </table>

      <el-tabs
        style="font-family: 'din'; margin-top: 20px"
        v-if="currDelivery"
        tab-position="right"
        v-model="currTabName"
      >
        <el-tab-pane
          label=" الاحصائيات للمناطق"
          color="#FE5634"
          name="ordersByArea"
        >
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
              </table>
              <table style="margin-top: 10px">
                <thead>
                  <tr>
                    <td>اجمالي الطلبات</td>
                    <td>اجمالي اللواغي</td>
                    <td>اجمالي مستحق المطعم</td>
                    <td>اجمالي مستحق السائق</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ totalHeven }}</td>
                    <td>{{ totalNotPaied }}</td>
                    <td>{{ totalHeven - totalNotPaied }}</td>
                    <td>{{ totalDriver }}</td>
                  </tr>
                </tbody>
              </table>

              <!-- <tfoot>
                  <tr>
                    <td>إجمالي مستحق المطعم:</td>
                    <td>{{ totalHeven }}</td>

                    <td>إجمالي مستحق السائق:</td>
                    <td>{{ totalDriver }}</td>
                  </tr>
                </tfoot> -->
            </div>
            <div v-else-if="allOrders.length == 0">
              <NoData />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label=" التسليمات" color="#FE5634" name="driverTaslims">
          <div class="flex-grid">
            <div
              class="table-container"
              v-if="
                Object.keys(currDelivery).length > 0 &&
                driverTaslims.length != 0
              "
            >
              <table>
                <thead>
                  <tr>
                    <td>المبلغ</td>
                    <td>بواسطة</td>
                    <td>التوقيت</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="taslim in driverTaslims" :key="taslim.id">
                    <td>{{ taslim.amount }}</td>
                    <td>{{ taslim.user.name }}</td>
                    <td>
                      {{
                        taslim.created_at
                          | moment("dddd | Do / MM / YYYY | h:mm A")
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table style="margin-top: 10px">
                <thead>
                  <tr>
                    <td>اجمالي مستحق المطعم</td>
                    <td>اجمالي التسليمات</td>
                    <td>المتبقي</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ totalHeven - totalNotPaied }}</td>
                    <td>{{ totalTaslims }}</td>
                    <td>{{ totalHeven - totalNotPaied - totalTaslims }}</td>
                  </tr>
                </tbody>
              </table>

              <!-- <tfoot>
                  <tr>
                    <td>إجمالي مستحق المطعم:</td>
                    <td>{{ totalHeven }}</td>

                    <td>إجمالي مستحق السائق:</td>
                    <td>{{ totalDriver }}</td>
                  </tr>
                </tfoot> -->
            </div>
            <div v-else-if="driverTaslims.length == 0">
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
              class="mt-2"
              align="right"
              v-if="tableData.length > 0"
              :data="tableData"
              border
              style="width: 100%"
            >
              <el-table-column width="100" sortable label="رقم " prop="order">
              </el-table-column>

              <el-table-column label="القيمة">
                <template slot-scope="scope">
                  {{
                    Number(scope.row.total) +
                    Number(scope.row.restaurant_cost) +
                    Number(scope.row.driver_cost)
                  }}
                </template>
              </el-table-column>

              <el-table-column label="الحالة">
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

              <el-table-column
                label="العميل"
                v-if="isAdmin"
                prop="customer.name"
              >
              </el-table-column>
              <el-table-column
                label="الفون"
                v-if="isAdmin"
                prop="customer.mobile"
              >
              </el-table-column>
              <el-table-column label="بواسطة" prop="user.name">
              </el-table-column>
              <el-table-column
                label="تم الاسناد"
                v-if="isAdmin"
                prop="assigned_by"
              >
              </el-table-column>
              <el-table-column sortable label="التوقيت">
                <template slot-scope="scope">
                  <span>{{
                    scope.row.updated_at | moment(" Do / MM / YYYY | h:mm A")
                  }}</span>
                </template>
              </el-table-column>

              <el-table-column type="expand">
                <template slot-scope="props">
                  <div class="row">
                    <div class="col-8">
                      <el-table
                        class="mt-2"
                        align="right"
                        :data="props.row.products"
                        border
                        style="width: 100%; margin: auto"
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
                    </div>
                    <div class="col-4">
                      <div class="row pr-2 mt-2" style="text-align: start">
                        <div class="col-4" style="border: 1px solid #ebeef5">
                          <p style="margin: 10px 0">اسم العميل</p>
                        </div>
                        <div class="col-8" style="border: 1px solid #ebeef5">
                          <p style="margin: 10px 0px">
                            {{ props.row.customer.name }}
                          </p>
                        </div>
                      </div>
                      <div class="row pr-2" style="text-align: start">
                        <div class="col-4" style="border: 1px solid #ebeef5">
                          <p style="margin: 10px 0">رقم العميل</p>
                        </div>
                        <div class="col-8" style="border: 1px solid #ebeef5">
                          <p style="margin: 10px 0px">
                            {{ props.row.customer.mobile }}
                          </p>
                        </div>
                      </div>
                      <div class="row pr-2" style="text-align: start">
                        <div class="col-4" style="border: 1px solid #ebeef5">
                          <p style="margin: 10px 0">العنوان</p>
                        </div>
                        <div class="col-8" style="border: 1px solid #ebeef5">
                          <p style="margin: 10px 0px">
                            {{ props.row.address }}
                          </p>
                        </div>
                      </div>
                      <div
                        class="row pr-2"
                        style="text-align: start"
                        v-if="props.row.notes"
                      >
                        <div class="col-4" style="border: 1px solid #ebeef5">
                          <p style="margin: 10px 0">* ﻣﻼﺣﻈﺎﺕ</p>
                        </div>
                        <div class="col-8" style="border: 1px solid #ebeef5">
                          <p style="margin: 10px 0px">
                            {{ props.row.notes }}
                          </p>
                        </div>
                      </div>
                      <div
                        class="row pr-2"
                        style="text-align: start"
                        v-if="props.row.rejected_reason"
                      >
                        <div class="col-4" style="border: 1px solid #ebeef5">
                          <p style="margin: 10px 0">* ﻣﻼﺣﻈﺎﺕ</p>
                        </div>
                        <div class="col-8" style="border: 1px solid #ebeef5">
                          <p style="margin: 10px 0px">
                            {{ props.row.rejected_reason }}
                          </p>
                        </div>
                      </div>
                      <div
                        class="row pr-2"
                        style="text-align: start"
                        v-if="
                          props.row.payment_type && props.row.payment_type == 1
                        "
                      >
                        <div class="col-4" style="border: 1px solid #ebeef5">
                          <p style="margin: 10px 0">نوع الدفع</p>
                        </div>
                        <div class="col-8" style="border: 1px solid #ebeef5">
                          <p style="margin: 10px 0px">نقدي</p>
                        </div>
                      </div>
                      <div
                        class="row pr-2"
                        style="text-align: start"
                        v-if="
                          props.row.payment_type && props.row.payment_type == 2
                        "
                      >
                        <div class="col-4" style="border: 1px solid #ebeef5">
                          <p style="margin: 10px 0">نوع الدفع</p>
                        </div>
                        <div class="col-8" style="border: 1px solid #ebeef5">
                          <p style="margin: 10px 0px">فيزا</p>
                        </div>
                      </div>
                      <div
                        class="row pr-2"
                        style="text-align: start"
                        v-if="props.row.preparated_at"
                      >
                        <div class="col-4" style="border: 1px solid #ebeef5">
                          <p style="margin: 10px 0">تاريخ الاستلام</p>
                        </div>
                        <div class="col-8" style="border: 1px solid #ebeef5">
                          <p style="margin: 10px 0px">
                            {{
                              new Date(props.row.preparated_at).toLocaleString(
                                "ar-EG"
                              )
                            }}
                          </p>
                        </div>
                      </div>
                      <div
                        class="row pr-2"
                        style="text-align: start"
                        v-if="props.row.rejected_reason"
                      >
                        <div class="col-4" style="border: 1px solid #ebeef5">
                          <p style="margin: 10px 0">سبب الرفض</p>
                        </div>
                        <div class="col-8" style="border: 1px solid #ebeef5">
                          <p style="margin: 10px 0px">
                            {{ props.row.rejected_reason }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p>{{ props.row.address }}</p>
                  <p>{{ props.row.notes }}</p>
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
      taslimForm: {
        amount: "",
        employee_id: null,
      },
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
      format: "yyyy-MM-dd HH:mm A",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
      currTabName: "ordersByArea",
      driverTaslims: [],
      allDeliveries: [],
      totalTaslims: 0,
      state: "",
      allOrders: [],
      currDelivery: null,
      totalHeven: 0,
      totalDriver: 0,
      totalNotPaied: 0,
      tableData: [],
      lastPage: 1,
      currPage: 1,
    };
  },
  created() {},
  computed: {
    isAdmin() {
      let user = localStorage.getItem("heavenDashboardUser");
      if (JSON.parse(user).role_id == 1) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.getAllDrivers();

    function getScrollTop() {
      if (typeof pageYOffset != "undefined") {
        //most browsers except IE before #9
        return pageYOffset;
      } else {
        var B = document.body; //IE 'quirks'
        var D = document.documentElement; //IE with doctype
        D = D.clientHeight ? D : B;
        return D.scrollTop;
      }
    }

    window.onscroll = () => {
      if (
        document.getElementById("driverTable") &&
        getScrollTop() + window.innerHeight >
          document.getElementById("driverTable").clientHeight - 1000
      ) {
        console.log("hello there");
        if (this.lastPage > this.currPage) {
          this.currPage += 1;
          this.getOrdersDetails(true);
        }
      }
    };
  },
  methods: {
    addTaslim() {
      if (this.taslimForm.amount > 0 && this.taslimForm.employee_id) {
        const loading = this.$vs.loading();

        axiosApi
          .post(`driver-taslims`, this.taslimForm)
          .then(() => {
            this.$notify({
              title: "تمت العملية بنجاح",
              message: "تم حفظ عمليةالتحصيل بنجاح",
              type: "success",
              duration: 1500,
            });
            this.getDriverTaslims();
          })
          .finally(() => loading.close());
      }
    },
    getDeliveryOrders() {
      this.taslimForm.employee_id = this.currDelivery.id;

      this.getOrderToDelivery();
      this.getOrdersDetails();
    },

    getOrdersDetails(currPageIncreased) {
      const loading = this.$vs.loading();
      let url = `/orders-details/drivers/${this.currDelivery.id}?page=${this.currPage}`;
      if (this.dateRange != null) {
        localStorage.setItem("reportsInterval", JSON.stringify(this.dateRange));

        url += "&start=" + this.dateRange[0];
        url += "&end=" + this.dateRange[1];
      }
      this.getDriverTaslims();
      axiosApi
        .get(url)
        .then((res) => {
          console.log(res.data);
          if (currPageIncreased) {
            this.tableData = [...this.tableData, ...res.data.data];
          } else {
            this.tableData = res.data.data;
          }
          this.lastPage = res.data.last_page;
          this.currPage = res.data.current_page;
        })
        .finally(() => loading.close());
    },
    getDriverTaslims() {
      const loading = this.$vs.loading();
      this.totalTaslims = 0;
      let url = `/driver-taslims/${this.currDelivery.id}`;
      if (this.dateRange != null) {
        localStorage.setItem("reportsInterval", JSON.stringify(this.dateRange));

        url += "&start=" + this.dateRange[0];
        url += "&end=" + this.dateRange[1];
      }
      axiosApi
        .get(url)
        .then((res) => {
          this.driverTaslims = res.data;
          this.driverTaslims.map((taslim) => {
            this.totalTaslims += Number(taslim.amount);
          });
        })
        .finally(() => loading.close());
    },

    handleSelect(item) {
      this.currDelivery = item;
      this.getOrdersDetails();
    },
    getOrderToDelivery() {
      const loading = this.$vs.loading();
      let link = `/orders/drivers/${this.currDelivery.id}`;
      if (this.dateRange != null) {
        localStorage.setItem("reportsInterval", JSON.stringify(this.dateRange));

        link += "?start=" + this.dateRange[0];
        link += "&end=" + this.dateRange[1];
      }
      axiosApi
        .get(link)
        .then((res) => {
          this.allOrders = res.data.orders;
          this.totalNotPaied = res.data.notPaiedOrders.total_canceled_orders
            ? res.data.notPaiedOrders.total_canceled_orders
            : 0;

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
      if (this.selectedDelivery != null) {
        const loading = this.$vs.loading();
        //   /orders?area=1&employee=1&user=1&start_date=2021-05-01&end_date=2021-06-30
        let url = `/orders?page=1`;

        url += "&employee=" + this.selectedDelivery.id;

        if (this.dateRange != null) {
          localStorage.setItem(
            "reportsInterval",
            JSON.stringify(this.dateRange)
          );

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
    table {
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
