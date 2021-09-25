<template>
  <div class="order">

    


    <el-dialog
      :visible.sync="orderSuccess"
      width="30%">

      <div class="text-center">
          <img
            style="width: 130px"
            src="@/images/payment_successful.gif"
            alt=""
          />
        </div>
      <h3 class="text-center">تم إتمام طلب الاوردر بنجاح</h3>
      
    </el-dialog>

    <el-dialog
      :visible.sync="determinePrintersFirst"
      width="30%">

      <div class="d-block text-center">
        <div class="text-center">
          <img
            style="width: 90px;margin-bottom: 10px;"
            src="@/assets/printer.svg"
            alt=""
          />
        </div>
        <h3 class="text-center">من فضلك حدد الطابعات علي الجهاز اولاً</h3>
      </div>
      
    </el-dialog>

    <el-dialog
      :visible.sync="determinePrinterSettingsFirst"
      width="30%">

      <div class="d-block text-center">
        <div class="text-center">
          <img
            style="width: 90px;margin-bottom: 10px;"
            src="@/assets/printer.svg"
            alt=""
          />
        </div>
        <h3 class="text-center">من فضلك حدد إعدادات الطابعة من صفحة العمليات اولاًً</h3>
      </div>
      
    </el-dialog>


    



    

    <div class="card">
      <button @click="newTab" class="plus">
        <i class="el-icon-plus"></i>
      </button>

      <div class="tabs-container" card>
        <div class="total-orders">
          <button
            :class="{
              'tab-btn': true,
              'active-tab': currentOrderIndex == index,
            }"
            v-for="(tab, index) in orders"
            :key="index"
            @click="changeCurrentOrder(index)"
          >
            {{ index + 1 }}
          </button>
        </div>
        <!-- Render Tabs, supply a unique `key` to each tab -->
        <div class="tab">
          <div class="order-type d-flex justify-content-between">
            <div class="d-flex" style="font-size:20px">
              <h6 class="mt-0 mb-0">نوع الطلب /</h6>
              <h6 class="mt-0 mb-0 text-success">{{ tab.orderType.name }}</h6>
            </div>
            <div
              class="d-flex justify-content-center"
              style="margin-top: -25px; margin-bottom: 10px"
            >
              <div style="margin-top: 14px">
                <!-- <vs-button @click="reservationTable(tab.orderType.table)" border  class="mb-4" success v-if="tab.orderType.table && tab.orderType.table.status == 1"> حجز </vs-button>
                <vs-button @click="getTableCheck(tab.orderType.table)" border  class="mb-4" primary v-else-if="tab.orderType.table && tab.orderType.table.status == 2"> الشيك </vs-button>
                <vs-button @click="cancelReservationTable(tab.orderType.table)" border class="mb-4" danger v-else-if="tab.orderType.table && tab.orderType.table.status == 3"> إلغاء الحجز </vs-button> -->

                <button
                  class="table-btn reservation"
                  @click="reservationTable(tab.orderType.table)"
                  v-if="tab.orderType.table && tab.orderType.table.status == 1"
                >
                  حجز
                </button>
                <button
                  class="table-btn check"
                  @click="getTableCheck(tab.orderType.table)"
                  v-else-if="
                    tab.orderType.table && tab.orderType.table.status == 2
                  "
                >
                  الشيك
                </button>
                <button
                  class="table-btn cancel"
                  @click="cancelReservationTable(tab.orderType.table)"
                  v-else-if="
                    tab.orderType.table && tab.orderType.table.status == 3
                  "
                >
                  إلغاء الحجز
                </button>
              </div>

              <div
                v-if="
                  tab.orderType.table &&
                    Object.keys(tab.orderType.table).length > 0
                "
              >
                <div class="table">
                  <h6>طاولة</h6>
                  <h6>{{ tab.orderType.table.name }}</h6>
                  <el-button
                    type="danger"
                    @click="resetOrderTable()"
                    transparent
                  >
                    <i class="el-icon-delete"></i>
                  </el-button>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 pr-3 d-flex"
              ><p class="sub-heading mt-0">الاوردر</p></div>
            <div class="col-md-8">
              <ul class="d-flex flex-row-reverse mt-0">
                <li @click="saveOrderInBackend()" class="icons save">
                  <svg style="width:15px;height:15px;margin-top:6px" xmlns="http://www.w3.org/2000/svg" id="Capa_1" enable-background="new 0 0 512.007 512.007" height="512" viewBox="0 0 512.007 512.007" width="512"><g><path d="m511.927 126.537c-.279-2.828-1.38-5.666-3.315-8.027-.747-.913 6.893 6.786-114.006-114.113-2.882-2.882-6.794-4.395-10.612-4.394-9.096 0-329.933 0-338.995 0-24.813 0-45 20.187-45 45v422c0 24.813 20.187 45 45 45h422c24.813 0 45-20.187 45-45 .001-364.186.041-339.316-.072-340.466zm-166.927-96.534v98c0 8.271-6.729 15-15 15h-19v-113zm-64 0v113h-139c-8.271 0-15-6.729-15-15v-98zm64 291h-218v-19c0-8.271 6.729-15 15-15h188c8.271 0 15 6.729 15 15zm-218 161v-131h218v131zm355-15c0 8.271-6.729 15-15 15h-92c0-19.555 0-157.708 0-180 0-24.813-20.187-45-45-45h-188c-24.813 0-45 20.187-45 45v180h-52c-8.271 0-15-6.729-15-15v-422c0-8.271 6.729-15 15-15h52v98c0 24.813 20.187 45 45 45h188c24.813 0 45-20.187 45-45v-98h2.787l104.213 104.214z"/></g></svg>
                  <p class="green">حفظ</p>
                </li>
                <li class="icons">
                  <el-popconfirm
                    class="mr-auto"
                    confirm-button-text="موافق"
                    cancel-button-text="إلغاء"
                    icon="el-icon-info"
                    icon-color="red"
                    :title="'هل تريد إلغاء الطلب ؟'"
                    @confirm="closeTab(currentOrderIndex)"
                  >
                    <div slot="reference">
                      <svg style="width:15px;height:15px;margin-top:6px" xmlns="http://www.w3.org/2000/svg" height="512pt" viewBox="-57 0 512 512" width="512pt"><path d="m156.371094 30.90625h85.570312v14.398438h30.902344v-16.414063c.003906-15.929687-12.949219-28.890625-28.871094-28.890625h-89.632812c-15.921875 0-28.875 12.960938-28.875 28.890625v16.414063h30.90625zm0 0"/><path d="m344.210938 167.75h-290.109376c-7.949218 0-14.207031 6.78125-13.566406 14.707031l24.253906 299.90625c1.351563 16.742188 15.316407 29.636719 32.09375 29.636719h204.542969c16.777344 0 30.742188-12.894531 32.09375-29.640625l24.253907-299.902344c.644531-7.925781-5.613282-14.707031-13.5625-14.707031zm-219.863282 312.261719c-.324218.019531-.648437.03125-.96875.03125-8.101562 0-14.902344-6.308594-15.40625-14.503907l-15.199218-246.207031c-.523438-8.519531 5.957031-15.851562 14.472656-16.375 8.488281-.515625 15.851562 5.949219 16.375 14.472657l15.195312 246.207031c.527344 8.519531-5.953125 15.847656-14.46875 16.375zm90.433594-15.421875c0 8.53125-6.917969 15.449218-15.453125 15.449218s-15.453125-6.917968-15.453125-15.449218v-246.210938c0-8.535156 6.917969-15.453125 15.453125-15.453125 8.53125 0 15.453125 6.917969 15.453125 15.453125zm90.757812-245.300782-14.511718 246.207032c-.480469 8.210937-7.292969 14.542968-15.410156 14.542968-.304688 0-.613282-.007812-.921876-.023437-8.519531-.503906-15.019531-7.816406-14.515624-16.335937l14.507812-246.210938c.5-8.519531 7.789062-15.019531 16.332031-14.515625 8.519531.5 15.019531 7.816406 14.519531 16.335937zm0 0"/><path d="m397.648438 120.0625-10.148438-30.421875c-2.675781-8.019531-10.183594-13.429687-18.640625-13.429687h-339.410156c-8.453125 0-15.964844 5.410156-18.636719 13.429687l-10.148438 30.421875c-1.957031 5.867188.589844 11.851562 5.34375 14.835938 1.9375 1.214843 4.230469 1.945312 6.75 1.945312h372.796876c2.519531 0 4.816406-.730469 6.75-1.949219 4.753906-2.984375 7.300781-8.96875 5.34375-14.832031zm0 0"/></svg>
                      <p class="red">حذف</p>
                    </div>
                  </el-popconfirm>
                </li>
              </ul>
            </div></div>

          <div style="text-align: left;color: #FE5634;">
              <img src="@/assets/alarm-clock.svg" style="width: 20px;" alt="">
              {{preparation_time}} دقيقة
            </div>

          <div class="selectedItem" id="idToScrollBottom">
            
            <el-tabs type="border-card" :value="$store.state.ordersTab" @tab-click="handleClickOrdersTab">
              
              <el-tab-pane label="الطلبات" name="orders">
                <table style="width: 100%">
                  <thead>
                    <tr>
                      <td>الصنف</td>
                      <td>الحجم</td>
                      <td>الكمية</td>
                      <td>السعر</td>
                      <td>حذف</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index2) in tab.products"
                      :key="index2"
                      class="yourOrder"
                    >
                      <td style="width: 188px;">
                        <div class="item">
                          <div v-if="item" class="itemName ">
                            {{ item.name }}
                          </div>
                          <p
                            v-if="item.type == 1"
                            @click="addAdditions(item, index2)"
                            class="additionHover"
                          >
                            اضافه
                          </p>
                        </div>
                      </td>

                      <td>
                        {{ item.priceObject.product_size.name }}
                      </td>

                      <td>
                        <div class="quantity">
                          <el-input-number
                            :disabled="item.offerId ? true: false"
                            size="mini"
                            v-model="item.qty"
                            :min="1"
                            @change="calcTotal"
                          ></el-input-number>
                        </div>
                      </td>

                      <td>
                        <var> {{ item.price }}</var>
                      </td>

                      <td>
                        <el-button
                          @click="deleteProduct(index2)"
                          style="padding: 5px; height: 26px; margin: 5px"
                          :type="'danger'"
                          :icon="'el-icon-close'"
                          circle
                        ></el-button>
                      </td>

                      <div>
                        <!------------------------------ Start Of Order Products Tab ------------------------>

                        <!------------------------------ End Of Products Tab ------------------------>
                      </div>
                    </tr>
                  </tbody>
                </table>
              </el-tab-pane>
              <el-tab-pane
                class="customer-info"
                 name="clients"
                v-if="
                  selectedOrder &&
                    selectedOrder.orderType &&
                    selectedOrder.orderType.id != 1 &&
                    selectedOrder.orderType.id != 3
                "
                label="بيانات العميل"
              >
                <template>
                  <label
                    v-if="
                      tab.selectedCustomer &&
                        tab.order_type_id != 4 &&
                        tab.order_type_id != 5
                    "
                  >
                    بحث بالهاتف
                  </label>
                  <el-input
                    v-if="
                      tab.selectedCustomer &&
                        tab.order_type_id != 4 &&
                        tab.order_type_id != 5
                    "
                    placeholder="تليفون 1"
                    class="form-control mb-4"
                    @keydown.enter.native="searchByPhone()"
                    v-model="tab.selectedCustomer.mobile"
                  />

                  <!-- Start Of employees order type => 4 -->

                  <div class="row">
                    <div class="col-md-6">
                      <div>
                        <label
                          class="mt-3"
                          v-if="tab.selectedCustomer && tab.order_type_id == 4"
                        >
                          أقسام العاملين
                        </label>
                        <el-select
                          v-if="tab.selectedCustomer && tab.order_type_id == 4"
                          v-model="tab.department"
                          clearable
                          filterable
                          value-key="id"
                          placeholder="أقسام العاملين"
                          size="md"
                          class="styled-select-box"
                          @change="getdeptEmployee(tab.department)"
                        >
                          <el-option
                            v-for="(x, index) in $store.state.employeesDepts"
                            :key="index"
                            :value="x"
                            :label="x.name"
                          >
                            {{ x.name }}
                          </el-option>
                        </el-select>
                      </div>

                     
                    </div>



                     <div class="col-md-6">
                        <div>
                          <label
                            class="mt-3 "
                            v-if="
                              tab.selectedCustomer && tab.order_type_id == 4
                            "
                          >
                            العاملين بالقسم
                          </label>
                          <el-select
                            v-if="
                              tab.selectedCustomer && tab.order_type_id == 4
                            "
                            v-model="tab.selectedCustomer.deptEmployee"
                            size="md"
                            filterable
                            placeholder="العاملين بالقسم"
                            value-key="id"
                            clearable
                            class="styled-select-box mb-3"
                            @change="
                              selectDeptEmp(tab.selectedCustomer.deptEmployee)
                            "
                          >
                            <el-option
                              v-for="(x,
                              index) in tab.departmentEmployees.employees"
                              :key="index"
                              :label="x.name"
                              :value="x"
                            >
                              {{ x.name }}
                            </el-option>
                          </el-select>
                        </div>
                      </div>



                  </div>

                  <!-- End Of employees order type => 4 -->

                  <!-- Start Of partners order type => 5 -->
                  <label
                    class="mt-3 mb-3 "
                    v-if="tab.selectedCustomer && tab.order_type_id == 5"
                  >
                    الشركاء
                  </label>
                  <el-select
                    v-if="tab.selectedCustomer && tab.order_type_id == 5"
                    v-model="tab.selectedCustomer.partener"
                    filterable
                    clearable
                    placeholder="الشركاء"
                    size="md"
                    value-key="id"
                    class="styled-select-box "
                    @change="setSelectedCustomer(tab.selectedCustomer.partener)"
                  >
                    <el-option
                      v-for="x in $store.state.partners"
                      :key="x.name"
                      :label="x.name"
                      :value="x"
                    >
                      {{ x.name }}
                    </el-option>
                  </el-select>

                  <!-- End Of partners order type => 5 -->

                  <form v-if="tab.selectedCustomer" action="" class=" ">
                    <b-row>
                      <b-col md="12" sm="12">
                        <label class="mb-1"> رقم التليفون </label>
                        <el-input
                          placeholder="تليفون 2"
                          class="form-control  mb-4"
                          v-model="tab.selectedCustomer.phone"
                        />
                      </b-col>

                      <b-col md="12">
                        <div class="row" v-if="tab.addresses.length > 0">
                          <div dir="ltr" class="old-new-address">
                            <el-radio
                              name="x"
                              @change="ResetSelectedAddress"
                              :label="false"
                              v-model="tab.selectFromOldAddresses"
                              >عنوان جديد</el-radio
                            >
                            <el-radio
                              @change="ResetSelectedAddress"
                              name="x"
                              :label="true"
                              v-model="tab.selectFromOldAddresses"
                              >عنوان قديم</el-radio
                            >
                          </div>
                          <div class="col-md-12">
                            <div>
                              <div v-if="tab.selectFromOldAddresses == true">
                                <label> العناوين السابقة </label>
                                <el-select
                                  filterable
                                  @change="setSelectedAddress(tab.selectedAddress)"
                                  v-model="tab.selectedAddress"
                                  placeholder="إختر عنوان"
                                  class="mt-3 styled-select-box"
                                  value-key="id"
                                >
                                  <el-option
                                    v-for="(x) in tab.addresses"
                                    :key="x.id"
                                    :label="x.description"
                                    :value="x"
                                  >
                                    {{ x.description }}
                                  </el-option>
                                </el-select>
                              </div>

                              <div v-else>
                                <div class="row">
                                  <div class="col-md-6">
                                    <div>
                                      <label> المُدن </label>
                                      <el-select
                                        class="styled-select-box"
                                        v-model="tab.city"
                                        value-key="id"
                                        filterable
                                        placeholder=" مدينة"
                                        @change="setCityInAddress(tab.city)"
                                      >
                                        <el-option
                                          v-for="(city, index) in cities"
                                          :key="index"
                                          :label="city.name"
                                          :value="city"
                                        >
                                        </el-option>
                                      </el-select>
                                    </div>
                                  </div>

                                  <div class="col-md-6">
                                    <div>
                                      <label> المناطق </label>
                                      <el-select
                                        class="styled-select-box"
                                        v-model="tab.selectedAddress.area"
                                        filterable
                                        placeholder=" المناطق"
                                        value-key="id"
                                        @change="setSelectedNewAddress()"
                                      >
                                        <el-option
                                          v-for="(area, index) in cityAreas"
                                          :key="index"
                                          :label="area.name"
                                          :value="area"
                                          v-if="area.id!=1"
                                        >
                                        </el-option>
                                      </el-select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
                            class="col-md-12 mt-4"
                            v-if="tab.selectFromOldAddresses == false"
                          >
                            <div class="row">
                              <div class="col-md-6">
                                <label> الشارع </label>
                                <el-input
                                 @input.native="updateLocalStorage"
                                  placeholder=" الشارع"
                                  class="address form-control"
                                  v-model="tab.selectedAddress.streat"
                                />
                              </div>
                              <div class="col-md-3">
                                <label> الشقة </label>
                                <el-input
                                  placeholder=" الشقة"
                                  @input.native="updateLocalStorage"
                                  class="address form-control"
                                  v-model="tab.selectedAddress.flat"
                                />
                              </div>
                              <div class="col-md-3">
                                <label> العمارة </label>
                                <el-input
                                  @input.native="updateLocalStorage"
                                  placeholder=" العمارة"
                                  class="address form-control"
                                  v-model="tab.selectedAddress.building"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div v-else>
                          <div
                            class="row mt-4"
                            style="display: flex; flex: 1"
                            v-if="tab.newUser"
                          >
                            <div class="col-md-12">
                              <div class="row">
                                <div class="col-md-6">
                                  <label> الشارع </label>
                                  <el-input
                                    placeholder=" الشارع"
                                    class="address form-control"
                                    v-model="tab.selectedAddress.streat"
                                    @input.native="updateLocalStorage"
                                  />
                                </div>
                                <div class="col-md-3">
                                  <label> الشقة </label>
                                  <el-input
                                    placeholder=" الشقة"
                                    class="address form-control"
                                    @input.native="updateLocalStorage"
                                    v-model="tab.selectedAddress.flat"
                                  />
                                </div>
                                <div class="col-md-3">
                                  <label> العمارة </label>
                                  <el-input
                                  @input.native="updateLocalStorage"
                                    placeholder=" العمارة"
                                    class="address form-control"
                                    v-model="tab.selectedAddress.building"
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="col-md-12 mt-4">


                               <div class="row">
                                  <div class="col-md-6">
                                    <div>
                                      <label> المُدن </label>
                                      <el-select
                                        class="styled-select-box"
                                        v-model="tab.city"
                                        value-key="id"
                                        filterable
                                        placeholder=" مدينة"
                                        @change="setCityInAddress(tab.city)"
                                      >
                                        <el-option
                                          v-for="(city, index) in cities"
                                          :key="index"
                                          :label="city.name"
                                          :value="city"
                                        >
                                        </el-option>
                                      </el-select>
                                    </div>
                                  </div>

                                  <div class="col-md-6">
                                    <div>
                                      <label> المناطق </label>
                                      <el-select
                                        class="styled-select-box"
                                        v-model="tab.selectedAddress.area"
                                        filterable
                                        placeholder=" المناطق"
                                        value-key="id"
                                        @change="setSelectedNewAddress()"
                                      >
                                        <el-option
                                          v-for="(area, index) in cityAreas"
                                          :key="index"
                                          :label="area.name"
                                          :value="area"
                                          v-if="area.id!=1"
                                        >
                                        </el-option>
                                      </el-select>
                                    </div>
                                  </div>
                                </div>


                              <!-- <select
                                v-model="tab.selectedAddress.area"
                                size="md"
                                class="mt-3 styled-select-box"
                              >
                                <option
                                  v-for="(item, index) in areas"
                                  :key="index"
                                  :value="item"
                                >
                                  {{ item.name }}
                                </option>
                              </select> -->
                            </div>
                          </div>
                        </div>
                      </b-col>
                    </b-row>
                    <b-row class="mt-4">
                      <b-col md="12">
                        <label>اسم العميل</label>
                        <el-input
                          placeholder=" اسم العميل"
                          class="address form-control"
                          v-model="tab.selectedCustomer.name"
                        />
                      </b-col>
                    </b-row>
                  </form> </template
              ></el-tab-pane>
            </el-tabs>
          </div>


          <b-row class="mt-3">
            <b-col md="12" >
              <el-input
                type="textarea"
                id="notes"
                class="form-control"
                placeholder="الملاحظات"
                :autosize="{ minRows: 2, maxRows: 4 }"
                v-model="tab.notes"
              />
            </b-col>
          </b-row>


          <table class="final-calc-table mt-2">
            <tr>
              <!-- <td><b>الكميه</b></td> -->

              <td v-if="tab.orderType.id != 1 && tab.orderType.id != 3 && tab.driver_cost">
                <b>سعر التوصيل</b>
              </td>
              <td v-if="tab.total"><b>الاجمالى</b></td>

              <td v-if="tab.discount"><b>الخصم</b></td>

              <td v-if="tab.afterDiscounts && tab.afterDiscounts != tab.total"><b>بعد الخصم</b></td>
            </tr>

            <tr>
              <!-- <td>{{ numOfQuantity(orders[index]) }}</td> -->

              <td v-if="tab.orderType.id != 1 && tab.orderType.id != 3 && tab.driver_cost">
                <var>
                  {{ tab.haven_cost + tab.driver_cost
                  }}<sup class="ml-1">LE</sup></var
                >
              </td>

              <td v-if="tab.total">
                <var> {{ tab.total }}<sup class="ml-1">LE</sup></var>
              </td>

              <td v-if="tab.discount">
                <var> {{ tab.discount }}<sup class="ml-1">LE</sup></var>
              </td>

              <td v-if="tab.afterDiscounts && tab.afterDiscounts != tab.total">
                <var> {{ tab.afterDiscounts }}<sup class="ml-1">LE</sup></var>
              </td>

            </tr>


            
          </table>
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="addAdditionsPopup" width="50%">
      <div class="addition">إضافات</div>
      <div class="bg-gray"></div>
      <b-row> </b-row>
      <b-row>
        <b-col
          lg="4"
          class="cardAddition"
          md="4"
          sm="12"
          v-for="product in additionsProducts"
          :key="product.id"
        >
          <b-row
            ><b-col md="7" sm="4" class="text">{{ product.name }}</b-col>
            <b-col
              md="5"
              sm="8"
              class="prices"
              style="display: flex;flex-direction: row-reverse;"
              v-if="product && product.prices && product.prices.length > 0"
            >
              <b-row>
                <b-col style="width: 100%" class="price">
                  <div
                    class="bg-white"
                    @click="
                      addAdditionToOrder(
                        {
                          ...product,
                          product_size_id:
                            selectedProductToAddAdditions.priceObject
                              .product_size_id,
                        },
                        product.prices.find(
                          (ele) =>
                            ele.product_size_id ==
                            selectedProductToAddAdditions.priceObject
                              .product_size_id
                        )
                      )
                    "
                    v-if="
                      product.prices.find(
                        (ele) =>
                          ele.product_size_id ==
                          selectedProductToAddAdditions.priceObject
                            .product_size_id
                      )
                    "
                  >
                    {{
                      product.prices.find(
                        (ele) =>
                          ele.product_size_id ==
                          selectedProductToAddAdditions.priceObject
                            .product_size_id
                      ).price
                    }}
                  </div>
                  <div v-else class="bg-white">-</div></b-col
                >
              </b-row></b-col
            ></b-row
          >
        </b-col>
      </b-row>
    </el-dialog>
  </div>
</template>
<script>
import axiosApi from "@/plugins/axios.js";

export default {
  activeName: "first",
  props: {
    items: Array,
    activeOrderTab: Boolean
  },
  data: () => ({
    printerSettings: null,
    orderSuccess: false,
    cityAreas: [],
    determinePrintersFirst: false,
    cities: [],
    activeTab: "orders",
    collapse: ["0"],
    categories: [],
    value: "",
    printers: [],
    tab: {
      departmentEmployees:{
        employees:[]
      },
      date: new Date().toISOString(),

      notes: "",
      products: [],
      newUser: "",
      selectedAddress: null,
      selectedCustomer: null,
      orderType: { table: {} },
      table_id: "",
      order_type_id: "",
      total: 0,
      selectFromExist: "",
    },

    addNewCustomer: false,
    pickerOptions: {
      shortcuts: [
        {
          text: "Today",
          onClick(picker) {
            picker.$emit("pick", new Date());
          },
        },
        {
          text: "Yesterday",
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit("pick", date);
          },
        },
        {
          text: "A week ago",
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit("pick", date);
          },
        },
      ],
    },

    additionsProducts: [],
    addAdditionsPopup: false,
    selectedProductToAddAdditions: {},
    areas: [],
    newUser: false,
    toggleNewAddress: false,
    form: {},
    currTab: {},
    preparation_time: "",
    determinePrinterSettingsFirst: false
    
  }),

  created() {
    this.getAllPrinters();
    this.getAreas();
    this.getAllCategories();
    this.getCities();
    this.getEmployeeDepartments();
    this.getPartenars();
    this.getPreparationTime();
    
  },
  watch: {
    // when toggle between ( new address and old address ) i will reset selected address
    


  },
  mounted() {
    if (localStorage.getItem("HevenOrders")) {
      this.$store.commit(
        "updateOrders",
        JSON.parse(localStorage.getItem("HevenOrders"))
      );
    }

    if (localStorage.getItem("defaultOrderIndex")) {
      this.tab = this.orders[Number(localStorage.getItem("defaultOrderIndex"))];
      this.$store.commit(
        "UpdateOrderTab",
        Number(localStorage.getItem("defaultOrderIndex"))
      );
    } else {
      this.tab = this.orders[0];

      this.$store.commit("UpdateOrderTab", 0);
    }

    this.$store.commit("calcPrice");
  },

  computed: {
    selectedOrder() {
      return this.$store.state.orders[this.$store.state.selectedOrder];
    },

    currentOrderIndex() {
      return this.$store.state.selectedOrder;
    },

    currOrder() {
      return (
        this.$store.state.orders[this.$store.state.selectedOrder] &&
        this.$store.state.orders[this.$store.state.selectedOrder]
      );
    },
    orders() {
      return this.$store.state.orders;
    },
    tabSelected: {
      get() {
        return this.$store.state.selectedOrder;
      },
      set(value) {
        this.$store.commit("UpdateOrderTab", value);
      },
    },
  },

  methods: {
    getPreparationTime(){
        axiosApi.get(`/settings`).then(res => {
          this.preparation_time = res.data.preparation_time
        })
    },
    calcTotal(){
      this.$store.commit("calcPrice");
    },
    ResetSelectedAddress(){
      console.log("Reset Selected Address");

      this.tab.selectedAddress = {
        area: {}
      };

      this.tab.city = {};

      
      this.updateLocalStorage();

    },
    updateLocalStorage()
    {
      this.$store.commit("updateOrder", this.tab);
      
      this.$store.commit("calcPrice");
    },

    setSelectedNewAddress(){
      this.tab.selectedAddress.area_id = this.tab.selectedAddress.area.id;
      this.$store.commit("updateOrder", this.tab);
      this.$store.commit("calcPrice");
      
    },  


    getEmployeeDepartments(){
      const loading = this.$loading({
          lock: true,
          text: false,
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255,.7)',
          customClass: 'fullscreen-loading'
        });
      axiosApi.get(`/departments`).then(res => {
        this.$store.commit("setEmployeeDepts" , res.data)
      }).finally(() => loading.close());
    },

    getPartenars(){
      const loading = this.$loading({
          lock: true,
          text: false,
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255,.7)',
          customClass: 'fullscreen-loading'
        });
      axiosApi.get(`/parteners`).then(res => {
        this.$store.commit("setPartenars" , res.data)
      }).finally(() => loading.close());
    },


    setSelectedAddress(address){
      console.log(address)
      this.updateLocalStorage();
    },

    handleClickOrdersTab(tab, event) {
      console.log(tab, event);
      // tab.name == 'clients'
      if(tab.name == 'clients'){
        this.$store.commit("setOrdersTabActive", false);
      }else if (tab.name == 'orders'){
        this.$store.commit("setOrdersTabActive", true);

      }
    },
    getCities() {
      const loading = this.$loading({
          lock: true,
          text: false,
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255,.7)',
          customClass: 'fullscreen-loading'
        });
      axiosApi
        .get(`/cities`)
        .then((res) => {
          this.cities = res.data;
        })
        .finally(loading.close());
    },
    setCityInAddress(city) {
      this.tab.selectedAddress.area = {};
      const loading = this.$loading({
          lock: true,
          text: false,
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255,.7)',
          customClass: 'fullscreen-loading'
        });
      axiosApi
        .get(`/cities/${city.id}`)
        .then((res) => {
          if (this.tab.order_type_id != 4 && this.tab.order_type_id != 5 && res.data.areas.findIndex((ele) => ele.id === 1) > -1 ){
            res.data.areas.splice(
              res.data.areas.findIndex((ele) => ele.id === 1)
              ,
              1
            );
          }
            

          this.cityAreas = res.data.areas;
        })
        .finally(loading.close());

        this.updateLocalStorage();
    },
    selectDeptEmp(emp) {
      if (!emp) {
        return;
      }

      const loading = this.$loading({
          lock: true,
          text: false,
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255,.7)',
          customClass: 'fullscreen-loading'
        });
      axiosApi
        .get(`/customers/${emp.customer_id}`)
        .then((res) => {
  

          this.tab.selectedCustomer = res.data;
          if(!this.tab.selectedCustomer.phone){
            this.tab.selectedCustomer.phone = " "
          }

          this.tab.selectedCustomer.deptEmployee = emp;

          
            this.tab.addresses = res.data.addresses;

          

          this.tab.newUser = false;

          this.tab.selectFromOldAddresses = true;
          this.tab.date = new Date().toISOString();
        })
        .catch((err) => {
          console.log(
            " =======> Reset addresses and customer information <========"
          );

          if (err && err.response.status == 404) {
            this.tab.newUser = true;

            this.tab.selectedAddress = {area: {}};
            this.tab.addresses = [];
            this.tab.selectedCustomer = {
              id: emp.customer_id,
              mobile: this.tab.selectedCustomer.mobile,
              deptEmployee: emp,
              name: emp.name,
              phone:""
            };
          }
        })
        .finally(() => loading.close());

      this.tab.selectedCustomer.deptEmployee = emp;
     this.updateLocalStorage()
    },

    setSelectedCustomer(partner) {
      if (!partner) {
        return;
      }

      const loading = this.$loading({
          lock: true,
          text: false,
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255,.7)',
          customClass: 'fullscreen-loading'
        });
      axiosApi
        .get(`/customers/${partner.customer_id}`)
        .then((res) => {
       

          this.tab.selectedCustomer = res.data;
          if(!this.tab.selectedCustomer.phone){
            this.tab.selectedCustomer.phone = " "
          }
          this.tab.selectedCustomer.partener = partner;

          this.tab.addresses = res.data.addresses;


          

          this.tab.newUser = false;

          this.tab.selectFromOldAddresses = true;
          this.tab.date = new Date().toISOString();
        })
        .catch((err) => {
          console.log(
            " =======> Reset addresses and customer information <========"
          );

          if (err && err.response.status == 404) {
            this.tab.newUser = true;

            this.tab.selectedAddress = {area: {}};
            this.tab.addresses = [];
            this.tab.selectedCustomer = {
              id: partner.customer_id,
              mobile: this.tab.selectedCustomer.mobile,
              partener: partner,
              name: partner.name,
              phone:""
            };
          }
        })
        .finally(() => loading.close());

      this.tab.selectedCustomer.partener = partner;
      this.updateLocalStorage()
    },

    getdeptEmployee(emp) {
      this.tab.selectedAddress = {area: {}};
      this.tab.selectedCustomer = {
        phone:""
      };
      if (!emp) {
        return;
      }
      console.log(emp);
      const loading = this.$loading({
          lock: true,
          text: false,
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255,.7)',
          customClass: 'fullscreen-loading'
        });
      axiosApi
        .get(`/departments/${emp.id}`)
        .then((res) => {
          if (res.data) {
            let ind = res.data.employees.findIndex((ele) => ele.customer_id === 0);
            if(ind > -1){
              res.data.employees.splice(ind,1);
            }
          }

          console.log(res.data);

          this.tab.departmentEmployees = res.data;
        })
        .finally(() => loading.close());

        this.updateLocalStorage()
    },

    changeCurrentOrder(index) {
      // this.$store.commit("updateOrder", this.tab);

      // this.currentOrderIndex = index;
      
      this.$store.commit("UpdateOrderTab", index);
      this.tab = this.orders[index];
    },

    cancelReservationTable(table) {
      const loading = this.$loading({
          lock: true,
          text: false,
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255,.7)',
          customClass: 'fullscreen-loading'
        });
      axiosApi
        .put(`/tables/${table.id}`, { status: 1 })
        .then((res) => {
          console.log(res.data);
          this.$notify({
            title: "تم بنجاح",
            message: "تم إلغاء حجز الطاولة بنجاح",
            type: "success",
          });
          res.data.splice(
            res.data.findIndex((ele) => ele.id == 1),
            1
          );
          this.$store.commit("AddTableToOrder", {});
          this.$store.commit("updateTables", res.data);
          // this.$emit("updateTables",false)
        })
        .finally(() => loading.close());
    },
    reservationTable(table) {
      const loading = this.$loading({
          lock: true,
          text: false,
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255,.7)',
          customClass: 'fullscreen-loading'
        });
      axiosApi
        .put(`/tables/${table.id}`, { status: 3 })
        .then((res) => {
          // console.log(res.data)
          this.$notify({
            title: "تم بنجاح",
            message: "تم حجز الطاولة بنجاح",
            type: "success",
          });

          res.data.splice(
            res.data.findIndex((ele) => ele.id == 1),
            1
          );

          this.$store.commit("AddTableToOrder", table);
          this.$store.commit("updateTables", res.data);
          // this.$emit("updateTables",false)
        })
        .finally(() => loading.close());
    },

    getTableCheck(table) {

      if(!this.printers || this.printers.length == 0){

        this.determinePrintersFirst = true;

        // setTimeout(() => {
        //   this.$bvModal.hide("determinePrintersFirst");
        // }, 2000);

        return;
      }

      
      console.log(table);
      const loading = this.$loading({
          lock: true,
          text: false,
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255,.7)',
          customClass: 'fullscreen-loading'
        });
      axiosApi
        .get(`/tables/${table.id}/check`)
        .then((res) => {
          console.log(res.data);

          if (
            res.data.invoice_details &&
            res.data.invoice_details.length > 0 &&
            res.data.invoice_details[0].products
          ) {
            this.printInvoiceDetails({
              products: [...res.data.invoice_details[0].products],
              invoice: res.data.invoice_details[0],
              kitchenPrinters: false,
            });
          }

          this.$store.commit("updateTables", res.data.tables);

          // this.printFinalCheck(res.data.invoice_details);

          // res.data.tables.splice(
          //   res.data.tables.findIndex((ele) => ele.id == 1),
          //   1
          // );
          // this.$store.commit("updateTables", res.data.tables);
          // this.$emit("updateTables",false)
        })
        .finally(() => loading.close());
    },
    resetOrderTable() {
      this.$store.commit("ResetOrderTable");
    },
    getAllPrinters() {

      
      if( JSON.parse(localStorage.getItem("printers")) ){
          let printers = JSON.parse(localStorage.getItem("printers"));
      

          if(printers.findIndex(ele => !ele.devicePrinter) > -1){
            console.log("printer hasn't device printer")
            this.printers = [];
            return;
          }
      }

      this.printers = JSON.parse(localStorage.getItem("printers"));
      console.log("printer has device printer")

      

    },
    getAllCategories() {
      axiosApi.get(`/product-categories`).then((res) => {
        this.categories = res.data;
        console.log(this.categories);
      });
    },

    validateOrder() {
      let targetOrder = this.tab;
      let customerInformation = this.tab.selectedCustomer;
      let addressInformation = this.tab.selectedAddress;

      // Check if orders at least one product

      if (targetOrder.products.length == 0) {
        this.$notify.error({
          title: "لا يوجد منتجات لأسكتمال الطلب !",
          message: `يجب ان يكون الطلب يحتوي علي الاقل علي منتج واحد`,
          type: "danger",
        });

        return false;
      }

      if (!customerInformation.name) {
        this.$notify.error({
          title: "بيانات العميل غير كاملة",
          message: `املأ بيانات العميل`,
          type: "danger",
        });

        return false;
      }

      if (
        targetOrder.order_type_id != 4 &&
        targetOrder.order_type_id != 5 &&
        !customerInformation.mobile
      ) {
        this.$notify.error({
          title: "بيانات العميل غير كاملة",
          message: `املأ بيانات العميل`,
          type: "danger",
        });

        return false;
      }

      if (
        targetOrder.order_type_id == 5 &&
        (!customerInformation.partener ||
          Object.keys(customerInformation.partener).length == 0)
      ) {
        this.$notify.error({
          title: "بيانات العميل غير كاملة",
          message: `املأ بيانات العميل`,
          type: "danger",
        });

        return false;
      }

      if (
        targetOrder.order_type_id == 4 &&
        (!customerInformation.deptEmployee ||
          Object.keys(customerInformation.deptEmployee).length == 0)
      ) {
        this.$notify.error({
          title: "بيانات العميل غير كاملة",
          message: `املأ بيانات العميل`,
          type: "danger",
        });

        return false;
      }

      if (!addressInformation.area_id || !addressInformation.description) {
        this.$notify.error({
          title: "بيانات العنوان غير كاملة",
          message: `املأ بيانات العنوان`,
          type: "danger",
        });

        return false;
      }

      return true;
    },
    saveOrderInBackend() {


      if(localStorage.getItem("printerSettings")){
        this.printerSettings = JSON.parse(localStorage.getItem("printerSettings"));
      }



      if(!this.printers || this.printers.length == 0){

        this.determinePrintersFirst = true;


        return;
      }

      if(!this.printerSettings){
        this.determinePrinterSettingsFirst = true;
        return;
      }

      
      // if validate function return false function will destroyed

      this.$store.commit("updateOrder", this.tab);

      if (
        this.tab.order_type_id == 1 ||
        (this.tab.order_type_id == 3 && this.tab.selectedAddress)
      ) {
        this.tab.selectedCustomer = {
          id: 1,
          mobile: "0125621552",
          name: "زياد مؤمن",
          payment_status: 1,
          phone: "0663726317",
        };
        this.tab.selectedAddress = {
          area_id: 1,
          description: "port said egypt",
          id: 1,
          area: {}
        };
      }

      if (!this.validateOrder()) {
        return;
      }

      const loading = this.$loading({
          lock: true,
          text: false,
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255,.7)',
          customClass: 'fullscreen-loading'
        });


      if(!this.tab.selectedCustomer.phone){
        this.tab.selectedCustomer.phone = ""
      }



      // if((this.tab.selectedAddress.building && this.tab.selectedAddress.flat && this.tab.selectedAddress.streat) && !this.tab.selectedAddress.description){
      //   this.tab.selectedAddress.description = 
      // }

            



      axiosApi
        .post(`/orders`, this.tab)
        .then((res) => {
          this.orderSuccess = true;

          setTimeout(() => {
            this.orderSuccess = false;
          }, 2000);

          let products = [];

          if (res.data.kitchen_invoice && res.data.invoice_details) {
            res.data.kitchen_invoice.forEach((ele) => {
              products.push(ele);
            });

            this.printInvoiceDetails({
              products: [...products],
              invoice: res.data.invoice_details,
              kitchenPrinters: true,
            });
          } else if ((!res.data.invoice || !res.data.invoice_details) && res.data.table_id ) {
            res.data.kitchen_invoice.forEach((ele) => {
              products.push(ele);
            });
            this.printInvoiceDetails({
              products: [...products],
              invoice: null,
              table_id: res.data.table_id,
              notes: res.data.notes,
              type_id: this.tab.order_type_id,
              kitchenPrinters: true,
            });
          }

          this.closeTab(this.currentOrderIndex);

          res.data.tables.shift();
          this.$store.commit("updateTables", res.data.tables);
          if (this.$store.state.orders.length == 0) {
            this.$store.commit("AddNewOrder");
          }

          this.activeTab = "orders";
          this.$store.commit("setOrdersTabActive", true);
        })
        .finally(() => loading.close());

      // this.$vs.loading();
      // axiosApi.post(`/`)
    },

    printInvoiceDetails(products) {

      
      
      let productsCategories = [];
      for (let i = 0; i < products.length; i++) {
        productsCategories.push(products[i].product_category_id);
      }

      productsCategories = [...new Set(productsCategories)];
      console.log(products);
      console.log(productsCategories);

      let productsPrinters = [];
      productsCategories.map((ele2, index) => {
        productsPrinters.push([]);
        products.map((ele) => {
          if (ele.product_category_id == ele2) {
            productsPrinters[index].push(ele);
          }
        });
      });

      console.log(productsPrinters);

      console.log(this.printers);

      const { ipcRenderer } = require("electron");

      console.log();
      ipcRenderer.send("printOrder", products);
      console.log("print order", products);
    },

    printSuccessOrder(products) {
      let productsCategories = [];
      products.map((ele) => {
        productsCategories.push(ele.product_category_id);
      });
      productsCategories = new Set(productsCategories);
      // console.log(productsCategories)
    },

    getAreas() {
      const loading = this.$loading({
          lock: true,
          text: false,
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255,.7)',
          customClass: 'fullscreen-loading'
        });
      axiosApi
        .get("areas")
        .then((res) => {
          this.areas = res.data;
          this.$store.commit("SetAreas", this.areas);
        })
        .finally(() => loading.close());
    },
    searchByPhone() {
      if (
        this.tab.selectedCustomer.mobile &&
        this.tab.selectedCustomer.mobile.toString().length != 11
      ) {
        this.$message.error({
          message: "رقم الهاتف يجب ان يكون 11 رقم",
        });
        return;
      }

      const loading = this.$loading({
          lock: true,
          text: false,
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255,.7)',
          customClass: 'fullscreen-loading'
        });

      let query = `/customers-search?`;

      if (this.tab.selectedCustomer.mobile) {
        query += "mobile=" + this.tab.selectedCustomer.mobile + "&";
      }

      if (this.tab && this.tab.orderType) {
        let orderTypeId = this.tab.order_type_id;

        if (orderTypeId.id == 4) {
          query += "type=" + 2 + "&";
        } else if (orderTypeId.id == 5) {
          query += "type=" + 3 + "&";
        }
      }

      axiosApi
        .get(query)
        .then((res) => {
          

          this.tab.selectedCustomer = res.data;
          if(!this.tab.selectedCustomer.phone){
            this.tab.selectedCustomer.phone = " "
          }
            this.tab.addresses = res.data.addresses;

         


          console.log("addresses",this.tab.addresses)

          

          
          this.tab.newUser = false;

          this.tab.selectFromOldAddresses = true;
          this.tab.date = new Date().toISOString();
        })
        .catch((err) => {
          console.log(
            " =======> Reset addresses and customer information <========"
          );

          if (err && err.response.status == 404) {
            this.tab.newUser = true;
            this.tab.selectedAddress = {area:{}};
            this.tab.addresses = [];
            this.tab.selectedCustomer = {
              id: 0,
              mobile: this.tab.selectedCustomer.mobile,
              phone:""
            };
          }
        })
        .finally(() => loading.close());

      this.updateLocalStorage()
    },
    deleteProduct(index) {
      this.$store.commit(`deleteProductInOrder`, index);
      this.$store.commit("updateOrder", this.tab);
      this.$store.commit("calcPrice");
      // this.$store.commit("calcDiscounts");
      
    },
    addAdditionToOrder(product, price) {
      // console.log(price);
      let productToAdd = {
        priceObject: price,
        price: price.price,
        qty: 1,
        name: product.name,
        id: product.id,
        type: 2,
        size: price.product_size.name,
        product_category_id: product.product_category_id,
        printer_id: this.categories.find(
          (ele2) => ele2.id == product.product_category_id
        ).printer_id,
      };

      this.$store.commit("AddAdditionsToProductInOrder", {
        ...productToAdd,
        index: this.selectedProductToAddAdditions.index,
      });

      this.addAdditionsPopup = false;

      this.$store.commit("calcPrice");
    },
    addAdditions(item, index) {
      this.addAdditionsPopup = true;
      const loading = this.$loading({
          lock: true,
          text: false,
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255,.7)',
          customClass: 'fullscreen-loading'
        });

      this.selectedProductToAddAdditions = item;
      this.selectedProductToAddAdditions.index = index;
      // console.log(item);

      axiosApi
        .get(`/product-categories/${item.product_category_id}/additions`)
        .then((res) => {
          console.log(this.selectedProductToAddAdditions);
          this.additionsProducts = res.data;

          // let arr = []

          // this.additionsProducts.forEach(ele => {
          //   ele.prices.forEach(ele2 => {
          //     if(ele2.product_size_id === ele.price.product_size_id){
          //       arr.push(ele2)
          //     }
          //   })
          // })

          // console.log()
        })
        .finally(() => loading.close());
    },
    numOfQuantity(item) {
      // console.log(item);

      let sum = 0;
      item.products.forEach((order) => {
        sum += Number(order.quantity);
      });

      return sum;
    },

    productTotalPrice(item) {
      item.totalPrice = Number(item.price.price) * Number(item.quantity);
      return item.totalPrice;
    },
    updateTab() {
      this.$store.commit("UpdateOrderTab", this.tabSelected);
    },

    closeTab(tabIndex) {
      this.$store.commit("CloseTab", tabIndex);

      this.tab = this.$store.state.orders[this.$store.state.selectedOrder];

      if (this.orders.length == 0) {
        this.newTab();
      }
    },

    newTab() {
      this.$store.commit("AddNewOrder");
      this.tab = this.$store.state.orders[this.$store.state.selectedOrder];
    },

    increase(item) {
      item.quantity++;
      item.price.price;
    },

    decrease(item) {
      item.price -= item.quantity;
      item.quantity--;
    },
  },
};
</script>
<style lang="scss">
@import "@/styles/order.scss";

.additions-popup {
  font-family: "din";
  .size {
    background: #ebf9fc;
    color: #404445;
    margin: 0 13px;
    width: 35px;
    height: 25px;
    padding: 2px 8px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
}



.order {
  min-height: 100vh;
  margin-top: 20px;
  .card-body {
    padding-top: 0;
  }
  .el-tabs__nav{
  float: right !important;
}
  .order-type {
    .table-btn {
      margin-left: 14px;
      background: none;
      color: #6d6d6d;
      border: 1px solid #333;
      border-radius: 5px;
      font-size: 15px;
      margin-top: 3px;
      margin-bottom: 16px;
      cursor: pointer;
      transition: all 0.5s ease;
      border: none !important;
      box-shadow: 0px 0px 3px 0px #cecece;
      padding: 5px 15px;
      font-size: 12px;

      &.check {
        &:hover {
          background: var(--primary) !important;
          color: #000 !important;
        }
      }

      &.reservation {
        &:hover {
          background: var(--success) !important;
          color: #fff !important;
        }
      }

      &.cancel {
        &:hover {
          background: var(--bs-danger) !important;
          color: #fff !important;
        }
      }
    }
    .table {
      box-shadow: 0 4px 25px 0 #0000000d;
      border-radius: 50%;
      margin-bottom: 16px;
      margin-top: -20px;
      position: relative;
      margin: 0 auto;
      margin-bottom: 13px;

      padding: 8px 17px 1px;
      margin-bottom: 0;
      h6 {
        color: #fe5634 !important;
        text-align: center;
        margin: 0;
        margin-bottom: 10px;

        &:first-of-type {
          font-weight: bold;
          margin-bottom: 0;
          font-size: 10px;
          padding-top: 4px;
        }
      }
      button {
        position: absolute;
        top: -10px;
        right: -24px;
        transform: translate(-50%);
        padding: 0;
        border-radius: 4px;
        padding: 3px;
        border-radius: 4px;
        margin: 0;
        border: 0.5px solid #dc35451a;
        border-radius: 50%;
        .vs-button__content {
          padding: 0;
        }
      }
    }
  }
}
.old-new-address {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin: 15px 0;
  .vs-radio-content {
    display: flex;
    flex-direction: row-reverse;
  }
}
#orderSuccess___BV_modal_outer_ {
  z-index: 99999 !important;
}
#determinePrintersFirst___BV_modal_outer_ {
  z-index: 99999 !important;
}
.final-calc-table {
  width: 100%;
  tr,
  td {
    border: 1px solid #ccc;
    text-align: center;
    padding: 5px;
  }
}

.additions-popup {
  .con-form {
    direction: rtl;
  }

  .meunItem {
    background: linear-gradient(-180deg, #edfafd, #ffffff);
    margin-bottom: 5px;
    font-size: 16px;
    font-family: "din";
    border-radius: 6px;
    height: 58px;
    align-items: center;
    padding-right: 13px;

    .price {
      text-align: center;
      background-color: #ffffff;
      width: 32px;
      text-align: center;
      height: 32px;
      border-radius: 50%;
      display: block;
      /* align-items: center; */
      padding: 8px 0;
      color: #1d1d1d;
      font-weight: 600;
      cursor: pointer;
      font-size: 12px;
      text-align: center;
      margin: auto;

      // &:hover {
      //     background-color: orange;
      //     color: #ffffff;
      // }
    }
  }

  table th,
  table td {
    padding: 7px 2px;
    border: 1px solid #333;
    font-weight: bold;
  }
}

.styled-select-box {
  width: 100%;
  height: 42px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

#idToScrollBottom{
  table{
    td, tr{
      border: 1px solid #d8d8d8;
      text-align: center;
    }
  }
}

</style>
