<template>
  <div class="operations" dir="rtl">
    <b-container fluid>
      <el-tabs
        tab-position="right"
        v-model="currTabName"
        @tab-click="getTabContent"
      >
        <el-tab-pane label="المقاسات" color="#FE5634" name="productsSizes">
          <div class="add-button">
            <el-button
              class="addNew"
              @click="openAddModelFunction('size')"
              type="primary"
              plain
              icon="el-icon-plus"
              >إضافة مقاس</el-button
            >
          </div>
          <div class="flex-grid">
            <div v-for="size in sizes" :key="size.id">
              <Size :size="size">
                <div slot="edit-delete">
                  <button
                    class="btn emp-dept-update"
                    @click="openUpdateModel('size', size)"
                  >
                    <img src="@/images/Icon-feather-edit-3.svg" alt="" />
                  </button>
                  <button
                    class="btn emp-dept-delete"
                    @click="handleDelete('size', size)"
                  >
                    <img src="@/images/Icon-material-delete.svg" alt="" />
                  </button>
                </div>
              </Size>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="الطرابيزات" color="#FE5634" name="tables">
          <div class="add-button">
            <el-button
              class="addNew"
              @click="addNewTable()"
              type="primary"
              plain
              icon="el-icon-plus"
              >إضافة منضدة</el-button
            >
          </div>
          <div class="flex-grid">
            <div v-for="table in tables" :key="table.id">
              <Tables :table="table"> </Tables>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="أنواع الطلبات" name="ordersTypes">
          <div class="add-button">
            <el-button
              class="addNew"
              @click="openAddModelFunction('type')"
              type="primary"
              plain
              icon="el-icon-plus"
              >إضافة نوع</el-button
            >
          </div>
          <div class="flex-grid">
            <div v-for="type in types" :key="type.id">
              <Type :type="type">
                <div slot="edit-delete">
                  <button
                    class="btn emp-dept-update"
                    @click="openUpdateModel('type', type)"
                  >
                    <img src="@/images/Icon-feather-edit-3.svg" alt="" />
                  </button>
                  <button
                    class="btn emp-dept-delete"
                    @click="handleDelete('type', type)"
                  >
                    <img src="@/images/Icon-material-delete.svg" alt="" />
                  </button>
                </div>
              </Type>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="المناطق" name="areas">
          <div class="add-button">
            <el-button
              class="addNew"
              @click="openAddModelFunction('area')"
              type="primary"
              plain
              icon="el-icon-plus"
              >إضافة منطقة / حي</el-button
            >
          </div>
          <div class="flex-grid">
            <div v-for="area in areas" :key="area.id">
              <Area :area="area">
                <div slot="edit-delete">
                  <button
                    class="btn emp-dept-update"
                    @click="openUpdateModel('area', area)"
                  >
                    <img src="@/images/Icon-feather-edit-3.svg" alt="" />
                  </button>
                  <button
                    class="btn emp-dept-delete"
                    @click="handleDelete('area', area)"
                  >
                    <img src="@/images/Icon-material-delete.svg" alt="" />
                  </button>
                </div>
              </Area>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="المدن" name="cities">
          <div class="add-button">
            <el-button
              class="addNew"
              @click="openAddModelFunction('city')"
              type="primary"
              plain
              icon="el-icon-plus"
            >
              إضافة مدينة</el-button
            >
          </div>
          <div class="flex-grid">
            <div v-for="city in cities" :key="city.id">
              <City :city="city">
                <div slot="edit-delete">
                  <button
                    class="btn emp-dept-update"
                    @click="openUpdateModel('city', city)"
                  >
                    <img src="@/images/Icon-feather-edit-3.svg" alt="" />
                  </button>
                  <button
                    class="btn emp-dept-delete"
                    @click="handleDelete('city', city)"
                  >
                    <img src="@/images/Icon-material-delete.svg" alt="" />
                  </button>
                </div>
              </City>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="الأفرع" name="branches">
          <div class="add-button">
            <el-button
              class="addNew"
              @click="openAddModelFunction('branch')"
              type="primary"
              plain
              icon="el-icon-plus"
              >إضافة فرع</el-button
            >
          </div>
          <div class="flex-grid">
            <div v-for="branch in branchs" :key="branch.id">
              <Branch :branch="branch">
                <div slot="edit-delete">
                  <button
                    class="btn emp-dept-update"
                    @click="openUpdateModel('branch', branch)"
                  >
                    <img src="@/images/Icon-feather-edit-3.svg" alt="" />
                  </button>
                  <button
                    class="btn emp-dept-delete"
                    @click="handleDelete('branch', branch)"
                  >
                    <img src="@/images/Icon-material-delete.svg" alt="" />
                  </button>
                </div>
              </Branch>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="الطباعات" name="printer">
          <div class="add-button">
            <el-button
              class="addNew"
              @click="openAddPrinterFunction('printer')"
              type="primary"
              plain
              icon="el-icon-plus"
            >
              إضافة طابعة</el-button
            >
          </div>
          <!-- 
          <h6 style="text-align:start">الطابعات المتصلة بالجهاز</h6>
          <div class="d-flex">
            <div v-for="printer in printersOptions" :key="printer.name">
              <Printer style="margin-bottom: 0" :printer="printer"> </Printer>
            </div>
          </div> -->

          <el-button class="d-flex" @click="openAssingPrinter = true"
            >إسناد الطابعات بالأجهزة</el-button
          >

          <hr />

          <br />

          <div class="flex-grid">
            <div v-for="printer in printers" :key="printer.id">
              <Printer :printer="printer">
                <div slot="edit-delete">
                  <button
                    class="btn emp-dept-update"
                    @click="openUpdateModel('printer', printer)"
                  >
                    <img src="@/images/Icon-feather-edit-3.svg" alt="" />
                  </button>
                  <button
                    class="btn emp-dept-delete"
                    @click="handleDelete('printer', printer)"
                  >
                    <img src="@/images/Icon-material-delete.svg" alt="" />
                  </button>
                </div>
              </Printer>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="  إضافة موظف" name="emp">
          <div class="add-button">
            <el-button
              class="addNew"
              @click="openAddPrinterFunction('emp')"
              type="primary"
              plain
              icon="el-icon-plus"
            >
              إضافة موظف</el-button
            >
          </div>
          <div class="flex-grid">
            <div v-for="emp in emps" :key="emp.id">
              <Emp :driver="emp">
                <div slot="edit-delete">
                  <button
                    class="btn emp-dept-update"
                    @click="openUpdateModel('emp', emp)"
                  >
                    <img src="@/images/Icon-feather-edit-3.svg" alt="" />
                  </button>
                  <button
                    class="btn emp-dept-delete"
                    @click="handleDelete('emp', emp)"
                  >
                    <img src="@/images/Icon-material-delete.svg" alt="" />
                  </button>
                </div>
              </Emp>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="أسباب رفض الطلب" name="reject-reasons">
          <div class="add-button">
            <el-button
              class="addNew"
              @click="openAddPrinterFunction('reject-reasons')"
              type="primary"
              plain
              icon="el-icon-plus"
            >
              إضافة سبب</el-button
            >
          </div>
          <div class="flex-grid">
            <div v-for="reason in rejectedReasons" :key="reason.id">
              <RejectReasons :reason="reason">
                <div slot="edit-delete">
                  <button
                    class="btn emp-dept-delete"
                    @click="handleDelete('reject-reasons', reason)"
                  >
                    <img src="@/images/Icon-material-delete.svg" alt="" />
                  </button>
                  <button
                    class="btn emp-dept-update"
                    @click="openUpdateModel('reject-reasons', reason)"
                  >
                    <img src="@/images/Icon-feather-edit-3.svg" alt="" />
                  </button>
                </div>
              </RejectReasons>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="أقسام الموظفين  " name="employee_dept">
          <div class="add-button">
            <el-button
              class="addNew"
              @click="openAddPrinterFunction('employee_dept')"
              type="primary"
              plain
              icon="el-icon-plus"
              >إضافة قسم
            </el-button>
          </div>
          <div class="flex-grid">
            <div v-for="dept in employeeDepts" :key="dept.id">
              <EmployeeDepts :dept="dept">
                <div slot="edit-delete">
                  <button
                    class="btn emp-dept-delete"
                    @click="handleDelete('employee_dept', dept)"
                  >
                    <i class="el-icon-delete-solid"></i>
                  </button>
                  <button
                    class="btn emp-dept-update"
                    @click="openUpdateModel('employee_dept', dept)"
                  >
                    <i class="el-icon-edit"></i>
                  </button>
                </div>
              </EmployeeDepts>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="الاعدادات" color="#FE5634" name="settings">
          <el-form :model="setting" ref="settingForm">
            <el-form-item
              label="وقت التجهيز"
              prop="preparation_time"
              :rules="[{ required: true, message: '  مطلوب' }]"
            >
              <el-input
                placeholder="وقت التجهيز"
                v-model="setting.preparation_time"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" class="mt-2" @click="updateSetting()"
                >تعديل الاعدادات</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>






        <el-tab-pane label="اعدادات الطابعة" color="#FE5634" name="printerSettings">
          <el-form :model="printerSettings" ref="printerSettings">

            <div class="row">
              <div class="col-md-6">
                <el-form-item
                  label="عدد مرات طباعة الشيك للعميل"
                  prop="numberOfMainReset"
                  :rules="[{ required: true, message: '  مطلوب' }, { type: 'number', message: 'يجب ان يكون رقم صحيح'}]"
                >
                  <el-input
                      type="number"
                      placeholder="عدد مرات طباعة الشيك للعميل"
                      v-model.number="printerSettings.numberOfMainReset"
                  ></el-input>
                </el-form-item>
              </div>

              <div class="col-md-6">
                <el-form-item
                  label="عدد مرات طباعة الشيك للمطبخ"
                  prop="numberOfKitchenReset"
                  :rules="[{ required: true, message: '  مطلوب' }, { type: 'number', message: 'يجب ان يكون رقم صحيح'}]"
                >
                  <el-input
                    type="number"
                      placeholder="عدد مرات طباعة الشيك للمطبخ"
                      v-model.number="printerSettings.numberOfKitchenReset"
                  ></el-input>
                </el-form-item>
              </div>

              <el-form-item>
                <el-button type="primary" class="mt-2 text-center" @click="savePrinterSettings()"
                  >حفظ اعدادات الطابعة</el-button
                >
              </el-form-item>

            </div>
            


            

            
          </el-form>


        </el-tab-pane>


      </el-tabs>
    </b-container>

    <!-- This Popup For Adding New Operation (type - area - branch - size - employee department) -->
    <vs-dialog
      title="إضافة"
      v-model="openAddModel"
      width="30%"
      class="add-operation-dialog"
      center
    >
      <template #header>
        <span v-if="addType == 'type'">إضافة نوع جديد</span>
        <span v-else-if="addType == 'area'">إضافة حي جديد</span>
        <span v-else-if="addType == 'printer'">إضافة طابعة جديدة</span>
        <span v-else-if="addType == 'branch'">إضافة فرع جديد</span>
        <span v-else-if="addType == 'size'">إضافة مقاس جديد</span>
        <span v-else-if="addType == 'categories'">إضافة صنف جديد</span>
        <span v-else-if="addType == 'emp'">إضافة موظف جديد</span>
        <span v-else-if="addType == 'employee_dept'"> إضافة قسم جديد</span>
        <span v-else-if="addType == 'reject-reasons'">إضافة سبب جديد</span>
        <span v-else-if="addType == 'city'">إضافة مدينة جديدة</span>
      </template>

      <div class="form-group">
        <!-- Name With Differnet placeholder -->
        <el-form :model="add" ref="addOperation">
          <el-form-item
            label="اسم النوع"
            v-if="addType == 'type'"
            prop="name"
            :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
          >
            <el-input placeholder="اسم النوع" v-model="add.name"></el-input>
          </el-form-item>

          <el-form-item
            label="اسم الحي"
            v-if="addType == 'area'"
            prop="name"
            :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
          >
            <el-input placeholder="اسم الحي" v-model="add.name"></el-input>
          </el-form-item>

          <el-form-item
            v-if="addType == 'city'"
            label="اسم المدينة"
            prop="name"
            :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
          >
            <el-input placeholder="اسم المدينة" v-model="add.name"></el-input>
          </el-form-item>

          <el-form-item
            v-if="addType == 'branch'"
            label="اسم الفرع"
            prop="name"
            :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
          >
            <el-input placeholder="اسم الفرع" v-model="add.name"></el-input>
          </el-form-item>

          <el-form-item
            v-if="addType == 'size'"
            label="اسم المقاس"
            prop="name"
            :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
          >
            <el-input placeholder="اسم المقاس" v-model="add.name"></el-input>
          </el-form-item>

          <el-form-item
            v-if="addType == 'categories'"
            label="اسم الصنف"
            prop="name"
            :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
          >
            <el-input placeholder="اسم الصنف" v-model="add.name"></el-input>
          </el-form-item>

          <el-form-item
            v-if="addType == 'employee_dept'"
            label="اسم قسم"
            prop="name"
            :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
          >
            <el-input placeholder="اسم قسم" v-model="add.name"></el-input>
          </el-form-item>

          <el-form-item
            v-if="addType == 'reject-reasons'"
            label="سبب رفض الطلب"
            prop="reason"
            :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
          >
            <el-input
              placeholder="سبب رفض الطلب"
              v-model="add.reason"
            ></el-input>
          </el-form-item>

          <!-- Add Area Costs And City -->
          <section v-if="addType == 'area'" class="add-area">
            <div class="form-group mb-2">
              <el-form-item
                label="المدن"
                prop="city_id"
                :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
              >
                <el-select
                  v-model="add.city_id"
                  value-key="id"
                  filterable
                  placeholder="المدن"
                >
                  <el-option
                    v-for="x in cities"
                    :key="x.id"
                    :value="x.id"
                    :label="x.name"
                  >
                    {{ x.name }}
                  </el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="area-number">
                  <el-form-item
                    label="  سعر السائق  "
                    prop="driver_cost"
                    :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
                  >
                    <el-input-number
                      size="mini"
                      v-model="add.driver_cost"
                      :min="0"
                    ></el-input-number>
                  </el-form-item>
                </div>
              </div>

              <div class="col-md-6">
                <div class="area-number">
                  <el-form-item
                    label=" سعر هيفين "
                    prop="haven_cost"
                    :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
                  >
                    <el-input-number
                      size="mini"
                      v-model="add.haven_cost"
                      :min="0"
                    ></el-input-number>
                  </el-form-item>
                </div>
              </div>
            </div>
          </section>

          <!-- Add New Driver -->
          <section v-if="addType == 'emp'">
            <div class="row">
              <div class="col-md-6">
                <div>
                  <el-form-item
                    prop="name"
                    label="اسم الموظف"
                    :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
                  >
                    <el-input
                      class="mb-2"
                      placeholder="اسم السائق"
                      v-model="add.name"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <div class="col-md-6">
                <div>
                  <el-form-item
                    prop="mobile"
                    label="رقم الموبايل"
                    :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
                  >
                    <el-input
                      class="mb-2"
                      placeholder="رقم الموبايل"
                      v-model="add.mobile"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <div class="col-md-6">
                <div>
                  <el-form-item prop="phone" label="رقم الهاتف">
                    <el-input
                      class="mb-2"
                      placeholder="رقم الهاتف"
                      v-model="add.phone"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <div class="col-md-6">
                <div>
                  <el-form-item prop="address" label="العنوان">
                    <el-input
                      class="mb-2"
                      placeholder="العنون"
                      v-model="add.address"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <div class="col-md-12">
                <div>
                  <el-form-item prop="national_id" label="الرقم القومي">
                    <el-input
                      class="mb-2"
                      placeholder="الرقم القومي"
                      v-model="add.national_id"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <div class="col-md-12">
                <div class="d-flex justify-content-center mt-2 mb-2">
                  <el-form-item label="الراتب" prop="salary">
                    <el-input-number
                      style="width:150px !important"
                      size="md"
                      v-model="add.salary"
                      :min="0"
                    ></el-input-number>
                  </el-form-item>
                </div>
              </div>

              <div class="col-md-6">
                <div>
                  <el-form-item
                    prop="branch_id"
                    label="الفرع"
                    :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
                  >
                    <el-select
                      v-model="add.branch_id"
                      value-key="id"
                      filterable
                      placeholder="الفرع"
                    >
                      <el-option
                        v-for="x in branchs"
                        :key="x.id"
                        :value="x.id"
                        :label="x.name"
                      >
                        {{ x.name }}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <el-form-item
                    prop="department_id"
                    label="القسم"
                    :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
                  >
                    <el-select
                      placeholder="القسم"
                      value-key="id"
                      filterable
                      v-model="add.department_id"
                      size="md"
                    >
                      <el-option
                        v-for="x in employeeDepts"
                        :key="x.id"
                        :value="x.id"
                        :label="x.name"
                      >
                        {{ x.name }}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
            </div>
          </section>

          <!-- Add Branch Data -->
          <section v-if="addType == 'branch'" class="add-branch">
            <div class="form-group">
              <el-form-item
                prop="phone"
                label="الهاتف"
                :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
              >
                <el-input placeholder="الهاتف" v-model="add.phone"> </el-input>
              </el-form-item>
            </div>
            <div class="form-group">
              <el-form-item
                prop="address"
                label="العنوان"
                :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
              >
                <el-input placeholder="العنوان" v-model="add.address">
                </el-input>
              </el-form-item>
            </div>
          </section>

          <section v-if="addType == 'printer'" class="add-printer">
            <div class="form-group">
              <el-form-item
                prop="name"
                label="أسم الطابعة"
                :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
              >
                <el-input
                  placeholder="أسم الطابعة"
                  prefix-icon="el-icon-printer"
                  v-model="add.name"
                >
                </el-input>
              </el-form-item>
            </div>

            <div class="device-printers mt-2">
              <el-form-item
                prop="devicePrinter"
                label="أسم الطابعة علي الجهاز"
                :rules="[{ required: true, message: '  مطلوب' }]"
              >
                <el-select
                  v-model="add.devicePrinter"
                  filterable
                  clearable
                  placeholder="الطابعات المتصلة بالجهاز"
                >
                  <el-option
                    v-for="x in printersOptions"
                    :key="x.name"
                    :value="x.name"
                    :label="x.name"
                  >
                    {{ x.name }}
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </section>

          <span class="dialog-footer mt-4">
            <el-form-item>
              <el-button @click="openAddModel = false">إلغاء</el-button>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitAddForm('addOperation')"
                >إضافة</el-button
              >
            </el-form-item>
          </span>
        </el-form>
      </div>
    </vs-dialog>

    <vs-dialog
      class="delete-dialog"
      width="550px"
      not-center
      v-model="showConfirmModelToDelete"
    >
      <div class="con-content">
        <h6><i class="el-icon-warning-outline"></i></h6>
        <p>
          هل أنت متأكد من أتك تريد حذف ؟
        </p>

        <div class="btns d-flex justify-content-center">
          <vs-button color="danger" @click="showConfirmModelToDelete = false">
            إلغاء
          </vs-button>
          <vs-button color="#675DEC" @click="deleteOperation()">
            تأكيد
          </vs-button>
        </div>
      </div>
    </vs-dialog>

    <vs-dialog
      width="550px"
      not-center
      v-model="showConfirmModelToUpdate"
      class="add-operation-dialog"
      center
    >
      <!-- This Popup For Adding New Operation (type - area - branch - size - employee department) -->

      <template #header>
        <span v-if="currUpdateStatus == 'type'">تعديل نوع </span>
        <span v-else-if="currUpdateStatus == 'area'">تعديل حي </span>
        <span v-else-if="currUpdateStatus == 'printer'">تعديل طابعة </span>
        <span v-else-if="currUpdateStatus == 'branch'">تعديل فرع </span>
        <span v-else-if="currUpdateStatus == 'size'">تعديل مقاس </span>
        <span v-else-if="currUpdateStatus == 'categories'">تعديل صنف </span>
        <span v-else-if="currUpdateStatus == 'emp'">تعديل موظف </span>
        <span v-else-if="currUpdateStatus == 'employee_dept'"> تعديل قسم </span>
        <span v-else-if="currUpdateStatus == 'reject-reasons'">تعديل سبب </span>
        <span v-else-if="currUpdateStatus == 'city'">تعديل مدينة </span>
      </template>

      <div class="form-group">
        <!-- Name With Differnet placeholder -->

        <el-form :model="update" ref="updateOperation">
          <el-form-item
            label="اسم النوع"
            v-if="currUpdateStatus == 'type'"
            prop="name"
            :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
          >
            <el-input placeholder="اسم النوع" v-model="update.name"></el-input>
          </el-form-item>

          <el-form-item
            label="اسم الحي"
            v-if="currUpdateStatus == 'area'"
            prop="name"
            :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
          >
            <el-input placeholder="اسم الحي" v-model="update.name"></el-input>
          </el-form-item>

          <el-form-item
            v-if="currUpdateStatus == 'city'"
            label="اسم المدينة"
            prop="name"
            :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
          >
            <el-input
              placeholder="اسم المدينة"
              v-model="update.name"
            ></el-input>
          </el-form-item>

          <el-form-item
            v-if="currUpdateStatus == 'branch'"
            label="اسم الفرع"
            prop="name"
            :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
          >
            <el-input placeholder="اسم الفرع" v-model="update.name"></el-input>
          </el-form-item>

          <el-form-item
            v-if="currUpdateStatus == 'size'"
            label="اسم المقاس"
            prop="name"
            :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
          >
            <el-input placeholder="اسم المقاس" v-model="update.name"></el-input>
          </el-form-item>

          <el-form-item
            v-if="currUpdateStatus == 'categories'"
            label="اسم الصنف"
            prop="name"
            :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
          >
            <el-input placeholder="اسم الصنف" v-model="update.name"></el-input>
          </el-form-item>

          <el-form-item
            v-if="currUpdateStatus == 'employee_dept'"
            label="اسم قسم"
            prop="name"
            :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
          >
            <el-input placeholder="اسم قسم" v-model="update.name"></el-input>
          </el-form-item>

          <el-form-item
            v-if="currUpdateStatus == 'reject-reasons'"
            label="سبب رفض الطلب"
            prop="reason"
            :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
          >
            <el-input
              placeholder="سبب رفض الطلب"
              v-model="update.reason"
            ></el-input>
          </el-form-item>

          <!-- Add Area Costs And City -->
          <section v-if="currUpdateStatus == 'area'" class="add-area">
            <div class="form-group mb-2">
              <el-form-item
                label="المدن"
                prop="city_id"
                :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
              >
                <el-select
                  v-model="update.city_id"
                  value-key="id"
                  filterable
                  placeholder="المدن"
                >
                  <el-option
                    v-for="x in cities"
                    :key="x.id"
                    :value="x.id"
                    :label="x.name"
                  >
                    {{ x.name }}
                  </el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="area-number">
                  <el-form-item
                    label="  سعر السائق  "
                    prop="driver_cost"
                    :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
                  >
                    <el-input-number
                      size="mini"
                      v-model="update.driver_cost"
                      :min="0"
                    ></el-input-number>
                  </el-form-item>
                </div>
              </div>

              <div class="col-md-6">
                <div class="area-number">
                  <el-form-item
                    label=" سعر هيفين "
                    prop="haven_cost"
                    :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
                  >
                    <el-input-number
                      size="mini"
                      v-model="update.haven_cost"
                      :min="0"
                    ></el-input-number>
                  </el-form-item>
                </div>
              </div>
            </div>
          </section>

          <!-- Add New Driver -->
          <section v-if="currUpdateStatus == 'emp'">
            <div class="row">
              <div class="col-md-6">
                <div>
                  <el-form-item
                    prop="name"
                    label="اسم السائق"
                    :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
                  >
                    <el-input
                      class="mb-2"
                      placeholder="اسم السائق"
                      v-model="update.name"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <div class="col-md-6">
                <div>
                  <el-form-item
                    prop="mobile"
                    label="رقم الموبايل"
                    :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
                  >
                    <el-input
                      class="mb-2"
                      placeholder="رقم الموبايل"
                      v-model="update.mobile"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <div class="col-md-6">
                <div>
                  <el-form-item prop="phone" label="رقم الهاتف">
                    <el-input
                      class="mb-2"
                      placeholder="رقم الهاتف"
                      v-model="update.phone"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <div class="col-md-6">
                <div>
                  <el-form-item prop="address" label="العنوان">
                    <el-input
                      class="mb-2"
                      placeholder="العنون"
                      v-model="update.address"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <div class="col-md-12">
                <div>
                  <el-form-item prop="national_id" label="الرقم القومي">
                    <el-input
                      class="mb-2"
                      placeholder="الرقم القومي"
                      v-model="update.national_id"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <div class="col-md-12">
                <div class="d-flex justify-content-center mt-2 mb-2">
                  <el-form-item label="الراتب" prop="salary">
                    <el-input-number
                      style="width:150px !important"
                      size="md"
                      v-model="update.salary"
                      :min="0"
                    ></el-input-number>
                  </el-form-item>
                </div>
              </div>

              <div class="col-md-6">
                <div>
                  <el-form-item
                    prop="branch_id"
                    label="الفرع"
                    :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
                  >
                    <el-select
                      v-model="update.branch_id"
                      value-key="id"
                      filterable
                      placeholder="الفرع"
                    >
                      <el-option
                        v-for="x in branchs"
                        :key="x.id"
                        :value="x.id"
                        :label="x.name"
                      >
                        {{ x.name }}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <el-form-item
                    prop="department_id"
                    label="القسم"
                    :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
                  >
                    <el-select
                      placeholder="القسم"
                      value-key="id"
                      filterable
                      v-model="update.department_id"
                      size="md"
                    >
                      <el-option
                        v-for="x in employeeDepts"
                        :key="x.id"
                        :value="x.id"
                        :label="x.name"
                      >
                        {{ x.name }}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
            </div>
          </section>

          <!-- Add Branch Data -->
          <section v-if="currUpdateStatus == 'branch'" class="add-branch">
            <div class="form-group">
              <el-form-item
                prop="phone"
                label="الهاتف"
                :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
              >
                <el-input
                  placeholder="الهاتف"
                  prefix-icon="el-icon-location-information"
                  v-model="update.phone"
                >
                </el-input>
              </el-form-item>
            </div>
            <div class="form-group">
              <el-form-item
                prop="address"
                label="العنوان"
                :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
              >
                <el-input placeholder="العنوان" v-model="update.address">
                </el-input>
              </el-form-item>
            </div>
          </section>

          <section v-if="currUpdateStatus == 'printer'" class="add-printer">
            <div class="form-group">
              <el-form-item
                prop="name"
                label="أسم الطابعة"
                :rules="[{ required: true, message: ' الإجابة مطلوب' }]"
              >
                <el-input
                  placeholder="أسم الطابعة"
                  prefix-icon="el-icon-printer"
                  v-model="update.name"
                >
                </el-input>
              </el-form-item>
            </div>
          </section>

          <span class="dialog-footer mt-4">
            <el-form-item>
              <el-button @click="showConfirmModelToUpdate = false"
                >إلغاء</el-button
              >
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                @click="submitUpdateForm('updateOperation')"
                >تعديل</el-button
              >
            </el-form-item>
          </span>
        </el-form>
      </div>

      <!-- This is Popup Footer -->
    </vs-dialog>

    <vs-dialog v-model="openAssingPrinter" width="550px">
      <h4 class="mb-4">ربط الطابعات بالأجهزة</h4>

      <div>
        <div v-for="(printer, index) in printersForAssigned" :key="printer.id">
          <div class="printer-device mb-3">
            <div class="row">
              <div class="col-md-6">
                <h6>الطابعة</h6>
                <Printer style="margin-bottom: 0" :printer="printer"></Printer>
              </div>

              <div class="col-md-6">
                <div class="device-printers">
                  <h6>الطابعات المتصلة بالجهاز</h6>
                  <el-select
                    v-model="printer.printerVal"
                    filterable
                    clearable
                    @change="cachePrintersInLocalStorage(index, $event)"
                    placeholder="الطابعات المتصلة بالجهاز"
                  >
                    <el-option
                      v-for="x in printersOptions"
                      :key="x.name"
                      :value="x.name"
                      :label="x.name"
                    >
                      {{ x.name }}
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </vs-dialog>
  </div>
</template>

<script>
import axiosApi from "@/plugins/axios.js";

import Size from "@/components/Operations/Size";
import Type from "@/components/Operations/Type";

import Area from "@/components/Operations/Area";
import City from "@/components/Operations/City";
import Printer from "@/components/Operations/Printer";
import Branch from "@/components/Operations/Branch";
import Tables from "@/components/Operations/Tables";
import Emp from "@/components/Operations/Driver";
import EmployeeDepts from "@/components/Operations/EmployeeDepts";

import RejectReasons from "@/components/Operations/RejectReasons.vue";

export default {
  components: {
    RejectReasons,
    Size,
    Emp,
    Printer,
    Type,
    Area,
    Tables,
    Branch,
    EmployeeDepts,
    City,
  },
  created() {
    this.getProductsSizes();
    this.getBranches();
    this.getPrintersForAssigned();
    this.getEmployeeDepts();


    if(localStorage.getItem("printerSettings")){
      this.printerSettings = JSON.parse(localStorage.getItem("printerSettings"))
    }


  },
  data() {
    return {
      printerSettings: {},
      setting: {
        preparation_time: 45,
      },
      cities: [],
      emps: [],
      printers: [],
      dialogImageUrl: "",
      dialogVisible: false,
      imageUrl: "",
      add: {
        driver_cost: 0,
        haven_cost: 0,
        department_id: null,
        branch_id: null,
      },
      currTabName: "productsSizes",
      sizes: [],
      rejectedReasons: [],
      types: [],
      areas: [],
      employeeDepts: [],
      employeeDeptsOptions: [],
      branchs: [],
      branchsOptions: [],
      categories: [],
      tables: [],
      openAddModel: false,
      addType: "",
      categoryIcon: "",
      printersOptions: [],
      update: {},
      currDeleteStatus: "",

      showConfirmModelToDelete: false,
      showConfirmModelToUpdate: false,
      currEmployeeDept: {},
      currUpdateStatus: "",
      currObject: {},
      currObjectToDelete: {},
      openAssingPrinter: false,
      printersForAssigned: [],
      printerValue: {},
    };
  },
  methods: {
    savePrinterSettings(){

      this.$refs["printerSettings"].validate((valid) => {
        if (valid){
            if(this.printerSettings.numberOfMainReset < 0 || this.printerSettings.numberOfKitchenReset < 0){
              this.$notify.error({
                      title: "خطأ!",
                      message: "القيم يجب ان تكون اكبر من او يساوي الصفر",
                      duration: 1500,
              });
            }else{
              const loading = this.$vs.loading();
              localStorage.setItem("printerSettings", JSON.stringify(this.printerSettings));
              this.$notify({
                      title: "تمت العملية بنجاح",
                      message: "تم حفظ اعدادات الطابعة بنجاح",
                      type: "success",
                      duration: 1500,
              });
              loading.close();
            }
        }
      });

      
    },
    submitAddForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addOperation();
        }
      });
    },

    cachePrintersInLocalStorage(val, e) {
      console.log(val, e);
      this.printersForAssigned[val].devicePrinter = e;

      localStorage.setItem(
        "printers",
        JSON.stringify(this.printersForAssigned)
      );
    },
    getPrintersForAssigned() {
      const loading = this.$vs.loading();
      axiosApi
        .get("printers")
        .then((res) => {
          this.printersForAssigned = res.data;

          if (JSON.parse(localStorage.getItem("printers"))) {
            this.printersForAssigned = JSON.parse(
              localStorage.getItem("printers")
            );
          }

          let { remote } = require("electron");

          let webContents = remote.getCurrentWebContents();
          this.printersOptions = webContents.getPrinters(); //list the printers
        })
        .finally(() => loading.close());
    },
    getSetting() {
      axiosApi.get("settings").then((res) => {
        this.setting = res.data;
      });
    },
    updateSetting() {
      this.$refs["settingForm"].validate((valid) => {
        if (valid) {
          axiosApi.put("settings/1", this.setting).then((res) => {
            this.setting = res.data;

            this.$notify({
              title: "تمت العملية بنجاح",
              message: "تم تعديل الاعدادات العامة بنجاح",
              type: "success",
              duration: 1500,
            });
          });
        }
      });
    },

    handleDelete(type, theObject) {
      this.currDeleteStatus = type;

      this.showConfirmModelToDelete = true;
      this.currObject = { ...theObject };
    },
    submitUpdateForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("hi");
          this.updateOperation();
        }
      });
    },
    addNewTable() {
      const loading = this.$vs.loading();
      axiosApi
        .post(`/tables`)
        .then(() => {
          this.getTables();
        })
        .finally(() => loading.close());
    },
    openAddPrinterFunction(printer) {
      this.openAddModel = true;
      this.addType = printer;
    },

    handleUpdateEmployeeDept(dept) {
      this.showConfirmModelToUpdate = true;
      this.currUpdateStatus = "employeeDept";
      this.currObject = { ...dept };
    },
    openUpdateModel(type, theObject) {
      this.showConfirmModelToUpdate = true;
      this.currUpdateStatus = type;
      this.update = { ...theObject };
    },

    handleDeleteEmployeeDept(dept) {
      this.showConfirmModelToDelete = true;
      this.currObject = { ...dept };
    },
    removeEmployeeDept() {
      this.showConfirmModelToDelete = false;
      const loading = this.$vs.loading();
      axiosApi
        .delete(`/departments/${this.currEmployeeDept.id}`)
        .then(() => {
          this.$notify({
            title: "تم",
            message: `تم حذف القسم بنجاح `,
            type: "success",
          });
          this.getEmployeeDepts();
        })
        .finally(() => loading.close());
    },
    updateEmployeeDept() {
      this.showConfirmModelToUpdate = false;
      const loading = this.$vs.loading();
      axiosApi
        .put(`/departments/${this.currEmployeeDept.id}`, {
          name: this.currEmployeeDept.name,
        })
        .then(() => {
          this.$notify({
            title: "تم",
            message: `تم التعديل القسم بنجاح `,
            type: "success",
          });

          this.getEmployeeDepts();
        })
        .finally(() => loading.close());
    },
    handlePictureCardPreview(file) {
      console.log(file);
      this.categoryIcon = file.raw;
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove() {
      this.categoryIcon = "";
    },
    openAddModelFunction(typeOfAdd) {
      this.openAddModel = true;
      this.addType = typeOfAdd;
    },
    addOperation() {
      switch (this.addType) {
        case "size":
          this.addNewSize();
          break;
        case "type":
          this.addNewType();
          break;
        case "branch":
          this.addNewBranch();
          break;
        case "area":
          this.addNewArea();
          break;
        case "city":
          this.addNewCity();
          this.add = {};
          break;
        case "categories":
          this.addNewCategorie();
          break;
        case "employee_dept":
          this.addEmployeeDept();
          break;
        case "printer":
          this.addPrinter();
          break;
        case "tables":
          this.addTable();
          break;
        case "emp":
          this.addDriver();
          break;
        case "reject-reasons":
          this.addRejectReason();
          break;
      }
    },
    updateOperation() {
      switch (this.currUpdateStatus) {
        case "size":
          this.updateSize();
          this.add = {};
          break;
        case "type":
          this.updateType();
          this.add = {};
          break;
        case "branch":
          this.updateBranch();
          this.add = {};
          break;
        case "area":
          this.updateArea();
          this.add = {};
          break;
        case "city":
          this.updateCity();
          this.add = {};
          break;

        case "employee_dept":
          this.updateEmployeeDept();
          this.add = {};
          break;
        case "printer":
          this.updatePrinter();
          this.add = {};
          break;

        case "emp":
          this.updateDriver();
          break;
        case "reject-reasons":
          this.updateRejectReason();
          break;
      }
    },

    deleteOperation() {
      switch (this.currDeleteStatus) {
        case "size":
          this.deleteSize();

          break;
        case "type":
          this.deleteType();
          break;
        case "branch":
          this.deleteBranch();
          break;
        case "area":
          this.deleteArea();
          break;
        case "city":
          this.deleteCity();
          break;
        case "employee_dept":
          this.deleteEmployeeDept();
          break;
        case "printer":
          this.deletePrinter();
          break;
        case "emp":
          this.deleteDriver();
          break;
        case "reject-reasons":
          this.deleteRejectReason();
          break;
      }
    },

    addDriver() {
      let loading = this.$vs.loading();

      axiosApi
        .post(`/employees`, {
          name: this.add.name,
          mobile: this.add.mobile,
          phone: this.add.phone,
          address: this.add.address,
          national_id: this.add.national_id,
          salary: this.add.salary,
          hour_cost: 0,
          department_id: this.add.department_id,
          branch_id: this.add.branch_id,
        })
        .then(() => {
          this.$notify({
            title: "تم بنجاح",
            message: "تم إضافة الموظف بنجاح",
            type: "success",
          });
          this.add = {};
          this.openAddModel = false;
          this.getDrivers();
        })
        .catch((err) => {
          if (err.response.status === 422) {
            this.$notify.error({
              title: "خطأ !",
              message: "رقم الموبايل موجود بالفعل من قبل!",
            });
            return;
          }

          this.$notify.error({
            title: "خطأ !",
            message: "حدث خطأ ما !",
          });
        })
        .finally(() => loading.close());
    },
    addNewSize() {
      let loading = this.$vs.loading();

      axiosApi
        .post(`/product-sizes`, { name: this.add.name })
        .then(() => {
          this.$notify({
            title: "تم بنجاح",
            message: "تم إضافة المقاس بنجاح",
            type: "success",
          });
          this.add = {};
          this.openAddModel = false;
          this.getProductsSizes();
        })
        .catch((err) => {
          if (err.response.status === 422) {
            this.$notify.error({
              title: "خطأ !",
              message: "هذا المقاس موجود من قبل",
            });
            return;
          }

          this.$notify.error({
            title: "خطأ !",
            message: "حدث خطأ ما !",
          });
        })
        .finally(() => loading.close());
    },
    addEmployeeDept() {
      let loading = this.$vs.loading();

      axiosApi
        .post(`/departments`, { name: this.add.name })
        .then(() => {
          this.$notify({
            title: "تم بنجاح",
            message: "تم إضافة القسم بنجاح",
            type: "success",
          });
          this.add = {};
          this.openAddModel = false;
          this.getEmployeeDepts();
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.$notify.error({
              title: "خطأ !",
              message: "هذا القسم موجود من قبل",
            });
            return;
          }

          this.$notify.error({
            title: "خطأ !",
            message: "حدث خطأ ما !",
          });
        })
        .finally(() => loading.close());
    },
    addNewCategorie() {
      if (!this.categoryIcon) {
        this.$notify({
          title: "خطأ!",
          message: "قم بإرفاق ايقون للصنف",
          type: "danger",
        });
        return;
      }
      let loading = this.$vs.loading();

      let formData = new FormData();
      formData.append("name", this.add.name);
      formData.append("image", this.categoryIcon);
      axiosApi
        .post(`/product-categories`, formData)
        .then(() => {
          this.$notify({
            title: "تم بنجاح",
            message: "تم إضافة الصنف بنجاح",
            type: "success",
          });
          this.add = {};
          this.openAddModel = false;
          this.getCategories();
        })
        .catch((error) => {
          this.$notify.error({
            title: "خطأ !",
            message: "حدث خطأ ما !",
          });
        })
        .finally(() => loading.close());
    },
    addNewBranch() {
      let loading = this.$vs.loading();

      axiosApi
        .post(`/branches`, {
          name: this.add.name,
          phone: this.add.phone,
          address: this.add.address,
        })
        .then(() => {
          this.$notify({
            title: "تم بنجاح",
            message: "تم إضافة الفرع بنجاح",
            type: "success",
          });
          this.add = {};
          this.openAddModel = false;
          this.getBranches();
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.$notify.error({
              title: "خطأ !",
              message: "هذا الفرع موجود من قبل",
            });
            return;
          }

          this.$notify.error({
            title: "خطأ !",
            message: "حدث خطأ ما !",
          });
        })
        .finally(() => loading.close());
    },
    addPrinter() {
      let loading = this.$vs.loading();

      axiosApi
        .post(`/printers`, { name: this.add.name })
        .then((res) => {
          this.$notify({
            title: "تم بنجاح",
            message: "تم إضافة الطابعة بنجاح",
            type: "success",
          });

          if (JSON.parse(localStorage.getItem("printers"))) {
            let printersForAssigned = JSON.parse(
              localStorage.getItem("printers")
            );
            printersForAssigned.push({
              ...res.data[res.data.length - 1],
              devicePrinter: this.add.devicePrinter,
              printerVal: this.add.devicePrinter,
            });
            localStorage.setItem(
              "printers",
              JSON.stringify(printersForAssigned)
            );
          }

          this.getPrintersForAssigned();
          this.getPrinters();

          this.add = {};
          this.openAddModel = false;
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.$notify.error({
              title: "خطأ !",
              message: "هذه الطابعة موجودة من قبل",
            });
            return;
          }

          this.$notify.error({
            title: "خطأ !",
            message: "حدث خطأ ما !",
          });
        })
        .finally(() => loading.close());
    },

    addRejectReason() {
      let loading = this.$vs.loading();

      axiosApi
        .post(`/reject-reasons`, { reason: this.add.reason })
        .then(() => {
          this.$notify({
            title: "تم بنجاح",
            message: "تم إضافة السبب بنجاح",
            type: "success",
          });
          this.add = {};
          this.openAddModel = false;
          this.getRejectReasons();
        })
        .catch((error) => {
          this.$notify.error({
            title: "خطأ !",
            message: "حدث خطأ ما !",
          });
        })
        .finally(() => loading.close());
    },

    addNewType() {
      let loading = this.$vs.loading();

      axiosApi
        .post(`/order-types`, { name: this.add.name })
        .then(() => {
          this.$notify({
            title: "تم بنجاح",
            message: "تم إضافة النوع بنجاح",
            type: "success",
          });
          this.add = {};
          this.openAddModel = false;
          this.getOrdersTypes();
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.$notify.error({
              title: "خطأ !",
              message: "هذا النوع موجود من قبل",
            });
            return;
          }

          this.$notify.error({
            title: "خطأ !",
            message: "حدث خطأ ما !",
          });
        })
        .finally(() => loading.close());
    },

    addNewCity() {
      let loading = this.$vs.loading();

      axiosApi
        .post(`/cities`, {
          name: this.add.name,
        })
        .then(() => {
          this.$notify({
            title: "تم بنجاح",
            message: "تم إضافة الحي بنجاح",
            type: "success",
          });
          this.add = {};
          this.openAddModel = false;
          this.getCities();
        })
        .finally(() => loading.close())
        .catch((error) => {
          if (error.response.data.status == 422) {
            this.$notify.error({
              title: "خطأ!",
              message: "هذا الإسم موجود مسبقاٌ",
              type: "danger",
            });
          }
        });
    },

    addNewArea() {
      let loading = this.$vs.loading();

      axiosApi
        .post(`/areas`, {
          name: this.add.name,
          city_id: this.add.city_id,
          driver_cost: this.add.driver_cost,
          haven_cost: this.add.haven_cost,
        })
        .then(() => {
          this.$notify({
            title: "تم بنجاح",
            message: "تم إضافة الحي بنجاح",
            type: "success",
          });

          this.add = {};
          this.getAreas();
          console.log("close model");
          this.openAddModel = false;
        })
        .finally(() => loading.close())
        .catch((error) => {
          if (error.response.status == 422) {
            this.$notify.error({
              title: "خطأ!",
              message: "هذا الإسم موجود مسبقاٌ",
              type: "danger",
            });
          }
        });
    },
    getTabContent(tab) {
      switch (tab.name) {
        case "productsSizes":
          this.getProductsSizes();
          break;
        case "ordersTypes":
          this.getOrdersTypes();
          break;
        case "areas":
          this.getAreas();
          this.getCities();
          break;
        case "cities":
          this.getCities();
          break;
        case "branches":
          this.getBranches();
          break;
        case "categories":
          this.getCategories();
          break;
        case "employee_dept":
          this.getEmployeeDepts();
          break;
        case "printer":
          this.getPrinters();
          break;
        case "tables":
          this.getTables();
          break;
        case "emp":
          this.getDrivers();
          break;
        case "reject-reasons":
          this.getRejectReasons();
          break;
      }
    },

    getDrivers() {
      const loading = this.$vs.loading();
      axiosApi
        .get("employees")
        .then((res) => {
          this.emps = res.data;
        })
        .finally(() => loading.close());
    },

    getRejectReasons() {
      const loading = this.$vs.loading();
      axiosApi
        .get("reject-reasons")
        .then((res) => {
          this.rejectedReasons = res.data;
        })
        .finally(() => loading.close());
    },

    getPrinters() {
      const loading = this.$vs.loading();
      axiosApi
        .get("printers")
        .then((res) => {
          this.printers = res.data;
          let { remote } = require("electron");

          let webContents = remote.getCurrentWebContents();
          this.printersOptions = webContents.getPrinters(); //list the printers
        })
        .finally(() => loading.close());
    },

    getTables() {
      const loading = this.$vs.loading();
      axiosApi
        .get("/tables")
        .then((res) => {
          this.tables = res.data;
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
    getEmployeeDepts() {
      const loading = this.$vs.loading();
      axiosApi
        .get("departments")
        .then((res) => {
          this.employeeDepts = res.data;
          this.employeeDeptsOptions = [
            ...res.data,
            { id: null, name: "القسم" },
          ];
        })
        .finally(() => loading.close());
    },
    getCategories() {
      const loading = this.$vs.loading();
      axiosApi
        .get("product-categories")
        .then((res) => {
          this.categories = res.data;
        })
        .finally(() => loading.close());
    },
    getOrdersTypes() {
      const loading = this.$vs.loading();
      axiosApi
        .get("order-types")
        .then((res) => {
          this.types = res.data;
        })
        .finally(() => loading.close());
    },
    getAreas() {
      const loading = this.$vs.loading();
      axiosApi
        .get("areas")
        .then((res) => {
          this.areas = res.data;
        })
        .finally(() => loading.close());
    },
    getCities() {
      const loading = this.$vs.loading();
      axiosApi
        .get("cities")
        .then((res) => {
          this.cities = res.data;
        })
        .finally(() => loading.close());
    },
    getBranches() {
      const loading = this.$vs.loading();
      axiosApi
        .get("branches")
        .then((res) => {
          this.branchs = res.data;
          this.branchsOptions = [...res.data, { id: null, name: "الفرع" }];
        })
        .finally(() => loading.close());
    },

    // Update
    updateDriver() {
      let loading = this.$vs.loading();

      axiosApi
        .put(`/employees/${this.update.id}`, {
          name: this.update.name,
          mobile: this.update.mobile,
          phone: this.update.phone,
          address: this.update.address,
          national_id: this.update.national_id,
          salary: this.update.salary,
          hour_cost: 0,
          department_id: this.update.department_id,
          branch_id: this.update.branch_id,
        })
        .then(() => {
          this.$notify({
            title: "تم بنجاح",
            message: "تم تعديل الموظف بنجاح",
            type: "success",
          });
          this.update = {};
          this.showConfirmModelToUpdate = false;
          this.getDrivers();
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.$notify.error({
              title: "خطأ !",
              message: "الموظف موجود من قبل",
            });
            return;
          }

          this.$notify.error({
            title: "خطأ !",
            message: "حدث خطأ ما !",
          });
        })
        .finally(() => loading.close());
    },
    updateSize() {
      let loading = this.$vs.loading();

      axiosApi
        .put(`/product-sizes/${this.update.id}`, { name: this.update.name })
        .then(() => {
          this.$notify({
            title: "تم بنجاح",
            message: "تم تعديل المقاس بنجاح",
            type: "success",
          });
          this.update = {};
          this.showConfirmModelToUpdate = false;
          this.getProductsSizes();
        })
        .catch((err) => {
          if (err.response.status === 422) {
            this.$notify.error({
              title: "خطأ !",
              message: "هذا المقاس موجود من قبل",
            });
            return;
          }
          this.$notify.error({
            title: "خطأ !",
            message: "حدث خطأ ما !",
          });
        })
        .finally(() => loading.close());
    },
    updateEmployeeDept() {
      let loading = this.$vs.loading();

      axiosApi
        .put(`/departments/${this.update.id}`, { name: this.update.name })
        .then(() => {
          this.$notify({
            title: "تم بنجاح",
            message: "تم تعديل القسم بنجاح",
            type: "success",
          });
          this.update = {};
          this.showConfirmModelToUpdate = false;
          this.getEmployeeDepts();
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.$notify.error({
              title: "خطأ !",
              message: "القسم موجود من قبل",
            });
            return;
          }

          this.$notify.error({
            title: "خطأ !",
            message: "حدث خطأ ما !",
          });
        })
        .finally(() => loading.close());
    },

    updateBranch() {
      let loading = this.$vs.loading();

      axiosApi
        .put(`/branches/${this.update.id}`, {
          name: this.update.name,
          phone: this.update.phone,
          address: this.update.address,
        })
        .then(() => {
          this.$notify({
            title: "تم بنجاح",
            message: "تم تعديل الفرع بنجاح",
            type: "success",
          });
          this.update = {};
          this.showConfirmModelToUpdate = false;
          this.getBranches();
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.$notify.error({
              title: "خطأ !",
              message: "الفرع موجود من قبل",
            });
            return;
          }

          this.$notify.error({
            title: "خطأ !",
            message: "حدث خطأ ما !",
          });
        })
        .finally(() => loading.close());
    },
    updatePrinter() {
      let loading = this.$vs.loading();

      axiosApi
        .put(`/printers/${this.update.id}`, { name: this.update.name })
        .then(() => {
          this.$notify({
            title: "تم بنجاح",
            message: "تم تعديل الطابعة بنجاح",
            type: "success",
          });

          if (JSON.parse(localStorage.getItem("printers"))) {
            let printersForAssigned = JSON.parse(
              localStorage.getItem("printers")
            );
            let printerIndex = printersForAssigned.findIndex(
              (ele) => ele.id === this.update.id
            );
            printersForAssigned[printerIndex].name = this.update.name;
            localStorage.setItem(
              "printers",
              JSON.stringify(printersForAssigned)
            );
          }

          this.getPrintersForAssigned();

          this.update = {};
          this.showConfirmModelToUpdate = false;
          this.getPrinters();
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.$notify.error({
              title: "خطأ !",
              message: "الطابعة موجودة من قبل",
            });
            return;
          }

          this.$notify.error({
            title: "خطأ !",
            message: "حدث خطأ ما !",
          });
        })
        .finally(() => loading.close());
    },

    updateRejectReason() {
      let loading = this.$vs.loading();

      axiosApi
        .put(`/reject-reasons/${this.update.id}`, {
          reason: this.update.reason,
        })
        .then(() => {
          this.$notify({
            title: "تم بنجاح",
            message: "تم تعديل السبب بنجاح",
            type: "success",
          });
          this.showConfirmModelToUpdate = false;
          this.update = {};
          this.getRejectReasons();
        })
        .catch((error) => {
          this.$notify.error({
            title: "خطأ !",
            message: "حدث خطأ ما !",
          });
        })
        .finally(() => loading.close());
    },

    updateType() {
      let loading = this.$vs.loading();

      axiosApi
        .put(`/order-types/${this.update.id}`, { name: this.update.name })
        .then(() => {
          this.$notify({
            title: "تم بنجاح",
            message: "تم تعديل النوع بنجاح",
            type: "success",
          });
          this.update = {};
          this.showConfirmModelToUpdate = false;
          this.getOrdersTypes();
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.$notify.error({
              title: "خطأ !",
              message: "النوع موجودة من قبل",
            });
            return;
          }

          this.$notify.error({
            title: "خطأ !",
            message: "حدث خطأ ما !",
          });
        })
        .finally(() => loading.close());
    },

    updateCity() {
      let loading = this.$vs.loading();

      axiosApi
        .put(`/cities/${this.update.id}`, {
          name: this.update.name,
        })
        .then(() => {
          this.$notify({
            title: "تم بنجاح",
            message: "تم تعديل الحي بنجاح",
            type: "success",
          });
          this.update = {};
          this.showConfirmModelToUpdate = false;
          this.getCities();
        })
        .finally(() => loading.close())
        .catch((error) => {
          if (error.response.status == 422) {
            this.$notify.error({
              title: "خطأ!",
              message: "هذا الإسم موجود مسبقاٌ",
              type: "danger",
            });
          }
        });
    },

    updateArea() {
      let loading = this.$vs.loading();

      axiosApi
        .put(`/areas/${this.update.id}`, {
          name: this.update.name,
          city_id: this.update.city_id,
          driver_cost: this.update.driver_cost,
          haven_cost: this.update.haven_cost,
        })
        .then(() => {
          this.$notify({
            title: "تم بنجاح",
            message: "تم تعديل الحي بنجاح",
            type: "success",
          });
          this.showConfirmModelToUpdate = false;
          this.update = {};
          this.getAreas();
        })
        .finally(() => loading.close())
        .catch((error) => {
          if (error.response.status == 422) {
            this.$notify.error({
              title: "خطأ!",
              message: "هذا الإسم موجود مسبقاٌ",
              type: "danger",
            });
          }
        });
    },

    // delete
    deleteDriver() {
      let loading = this.$vs.loading();

      axiosApi
        .delete(`/employees/${this.currObject.id}`)
        .then(() => {
          this.$notify({
            title: "تم الحذف",
            message: "تم حذف الموظف بنجاح",
            type: "success",
          });
          this.showConfirmModelToDelete = false;

          this.getDrivers();
        })
        .catch(() => {
          this.$notify.error({
            title: "خطأ !",
            message: "حدث خطأ ما !",
          });
        })
        .finally(() => loading.close());
    },
    deleteSize() {
      let loading = this.$vs.loading();

      axiosApi
        .delete(`/product-sizes/${this.currObject.id}`)
        .then(() => {
          this.$notify({
            title: "تم الحذف",
            message: "تم حذف المقاس بنجاح",
            type: "success",
          });
          this.showConfirmModelToDelete = false;

          this.getProductsSizes();
        })
        .catch((err) => {
          if (err.response.status === 422) {
            this.$notify.error({
              title: "خطأ !",
              message: "هذا المقاس موجود من قبل",
            });
            return;
          }
          this.$notify.error({
            title: "خطأ !",
            message: "حدث خطأ ما !",
          });
        })
        .finally(() => loading.close());
    },
    deleteEmployeeDept() {
      let loading = this.$vs.loading();

      axiosApi
        .delete(`/departments/${this.currObject.id}`)
        .then(() => {
          this.$notify({
            title: "تم الحذف",
            message: "تم حذف القسم بنجاح",
            type: "success",
          });

          this.showConfirmModelToDelete = false;

          this.getEmployeeDepts();
        })
        .catch((error) => {
          this.$notify.error({
            title: "خطأ !",
            message: "حدث خطأ ما !",
          });
        })
        .finally(() => loading.close());
    },

    deleteBranch() {
      let loading = this.$vs.loading();

      axiosApi
        .delete(`/branches/${this.currObject.id}`)
        .then(() => {
          this.$notify({
            title: "تم الحذف",
            message: "تم حذف الفرع بنجاح",
            type: "success",
          });

          this.showConfirmModelToDelete = false;

          this.getBranches();
        })
        .catch((error) => {
          this.$notify.error({
            title: "خطأ !",
            message: "حدث خطأ ما !",
          });
        })
        .finally(() => loading.close());
    },
    deletePrinter() {
      let loading = this.$vs.loading();

      axiosApi
        .delete(`/printers/${this.currObject.id}`)
        .then(() => {
          this.$notify({
            title: "تم الحذف",
            message: "تم حذف الطابعة بنجاح",
            type: "success",
          });

          if (JSON.parse(localStorage.getItem("printers"))) {
            let printers = JSON.parse(localStorage.getItem("printers"));
            printers.splice(
              printers.findIndex((ele) => ele.id === this.currObject.id),
              1
            );
            localStorage.setItem("printers", JSON.stringify(printers));
          }
          this.getPrintersForAssigned();

          this.showConfirmModelToDelete = false;
          this.getPrinters();
        })
        .catch((error) => {
          this.$notify.error({
            title: "خطأ !",
            message: "حدث خطأ ما !",
          });
        })
        .finally(() => loading.close());
    },

    deleteRejectReason() {
      let loading = this.$vs.loading();

      axiosApi
        .delete(`/reject-reasons/${this.currObject.id}`)
        .then(() => {
          this.$notify({
            title: "تم الحذف",
            message: "تم حذف السبب بنجاح",
            type: "success",
          });

          this.showConfirmModelToDelete = false;
          this.getRejectReasons();
        })
        .catch((error) => {
          this.$notify.error({
            title: "خطأ !",
            message: "حدث خطأ ما !",
          });
        })
        .finally(() => loading.close());
    },

    deleteType() {
      let loading = this.$vs.loading();
      axiosApi
        .delete(`/order-types/${this.currObject.id}`)
        .then(() => {
          this.$notify({
            title: "تم الحذف",
            message: "تم حذف النوع بنجاح",
            type: "success",
          });

          this.showConfirmModelToDelete = false;
          this.getOrdersTypes();
        })
        .catch((error) => {
          this.$notify.error({
            title: "خطأ !",
            message: "حدث خطأ ما !",
          });
        })
        .finally(() => loading.close());
    },

    deleteCity() {
      let loading = this.$vs.loading();
      axiosApi
        .delete(`/cities/${this.currObject.id}`)
        .then(() => {
          this.$notify({
            title: "تم الحذف",
            message: "تم تعديل الحي بنجاح",
            type: "success",
          });

          this.showConfirmModelToDelete = false;
          this.getCities();
        })
        .finally(() => loading.close())
        .catch((error) => {
          this.$notify.error({
            title: "خطأ!",
            message: "حدث خطأ ما !",
          });
        });
    },

    deleteArea() {
      let loading = this.$vs.loading();
      axiosApi
        .delete(`/areas/${this.currObject.id}`)
        .then(() => {
          this.$notify({
            title: "تم الحذف",
            message: "تم حذف الحي بنجاح",
            type: "success",
          });

          this.showConfirmModelToDelete = false;
          this.getAreas();
        })
        .finally(() => loading.close())
        .catch((error) => {
          this.$notify.error({
            title: "خطأ!",
            message: "حدث خطأ ما !",
          });
        });
    },
  },
};
</script>

<style lang="scss">
.operations {
  padding-top: 20px;
  .el-tabs__item {
    font-family: "din-bold";
  }
  .addNew {
    padding: 7px;
  }
  .add-button {
    text-align: right;
    margin-bottom: 17px;
  }
  .flex-grid {
    display: flex;
    flex-wrap: wrap;
  }

  .dialog-image-preview {
    max-width: 450px;
    margin: auto;
    text-align: center;
    display: block;
    border: 1px solid #ccc;
    padding: 5px;
  }
}
.add-operation-dialog {
  .category-upload {
    margin-top: 10px;
  }
}
.add-area {
  margin-top: 10px;
  .area-number {
    text-align: center;
    margin-bottom: 5px;
    label {
      margin: 0 10px;
    }
  }
}

.add-branch {
  .form-group {
    &:first-of-type {
      margin-top: 15px;
    }
  }
}
.add-printer {
  display: block;
  text-align: right;
}

.delete-dialog {
  .con-content {
    p {
      margin-bottom: 10px;
    }

    i {
      color: #fe5634;
      font-size: 32px;
      margin-top: 27px;
    }
  }
  .btns {
    button {
      border-radius: 5px;
      padding: 0 15px;
    }
  }
}
.el-tabs__item.is-active {
  color: #fe5634 !important;
}
.el-tabs__active-bar {
  background-color: #fe5634 !important;
}
.el-tabs__item:hover {
  color: #fe5634 !important;
}

.add-operation-dialog {
  .el-input-number--mini {
    width: 96px !important;
  }
  .area-number {
    display: flex;
    justify-content: center;
    > div {
      &:last-of-type {
        width: 120px;
      }
    }
  }
}
.btn.emp-dept-update,
.btn.emp-dept-delete {
  background: #fff;
  padding: 2px 11px;
  margin: 5px 3px 0;
}
.el-input--mini .el-input__inner {
  text-align: center !important;
}

.el-form {
  direction: rtl !important;
  .dialog-footer {
    display: flex;
    justify-content: center;
    .el-button {
      margin: 0 5px;
    }
  }
  .el-input {
    input {
      direction: rtl !important;
    }
  }
}
</style>
