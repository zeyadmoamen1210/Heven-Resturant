<template>
  <div>
    <div class="container">
      <div class="categories-selection">
        <h6>التصنيفات</h6>
        <div class="addNewCategory">
          <el-button
            @click="openAddCategory()"
            type="primary"
            plain
            icon="el-icon-plus"
          >
            إضافة نوع</el-button
          >
        </div>

        <swiper class="swiper" :options="swiperOptionBestSeller">
          <swiper-slide v-for="category in categories" :key="category.id">
            <Category
              :class="{
                'selected-category': category.id == selectedCategory.id,
              }"
              @click.native="selectCategory(category)"
              :categorie="category"
            >

              <div slot="edit-delete"> 
                <button
                  class="btn emp-dept-update"
                  @click.stop="openUpdateCategoryModel(category)"
                >
                  <i class="el-icon-edit"></i>
                </button>

                <button
                  class="btn emp-dept-delete"
                  @click.stop="handleDeleteEmployeeDept(category)"
                >
                  <i class="el-icon-delete-solid"></i>
                </button>
              </div>

            </Category>
          </swiper-slide>

          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>

        <div
          class="products"
          v-if="selectedCategory && Object.keys(selectedCategory).length > 0"
        >
          <b-tabs v-model="selectedTab" pills card v-if="selectedCategory">
            <b-tab title="أساسي" active>
              <b-card-text>
                <AddProduct
                  v-if="operationStatus == 'add'"
                  @successProductAdded="
                    getProductsByCategorie(selectedCategory)
                  "
                  @changeOperationStatus="changeOperationStatus"
                  :type="1"
                  :sizes="sizes"
                  :selectedCategory="selectedCategory"
                />
                <EditProduct
                  @successProductUpdated="successUpdated(0)"
                  v-else-if="operationStatus == 'update'"
                  @changeOperationStatus="changeOperationStatus"
                  :product="currProduct"
                  :sizes="sizes"
                  :selectedCategory="selectedCategory"
                />

                <div class="row">
                  <div
                    class="col-md-4"
                    v-for="product in [...products]"
                    :key="product.id"
                  >
                    <div class="d-flex meunItem">
                      <b-col md="5">{{ product.name }}</b-col>
                      <div
                        class="prices d-flex"
                        v-if="
                          product && product.prices && product.prices.length > 0
                        "
                      >
                        <div
                          v-if="
                            product.prices.find(
                              (ele) => ele.product_size_id == sizes[0].id
                            )
                          "
                          class="price"
                        >
                          {{
                            product.prices.find(
                              (ele) => ele.product_size_id == sizes[0].id
                            ).price
                          }}
                        </div>
                        <div v-else class="price">
                          -
                        </div>

                        <div
                          v-if="
                            product.prices.find(
                              (ele) => ele.product_size_id == sizes[1].id
                            )
                          "
                          class="price"
                        >
                          {{
                            product.prices.find(
                              (ele) => ele.product_size_id == sizes[1].id
                            ).price
                          }}
                        </div>
                        <div v-else class="price">
                          -
                        </div>

                        <div
                          v-if="
                            product.prices.find(
                              (ele) => ele.product_size_id == sizes[2].id
                            )
                          "
                          class="price"
                        >
                          {{
                            product.prices.find(
                              (ele) => ele.product_size_id == sizes[2].id
                            ).price
                          }}
                        </div>
                        <div v-else class="price">
                          -
                        </div>
                      </div>
                      <b-col md="3">
                        <el-button
                          @click.native="handleUpdateProduct(product)"
                          type="primary"
                          style=" margin:2px;   padding: 3px;"
                          plain
                        >
                          <i class="el-icon-edit"></i>
                        </el-button>
                        <el-button
                          @click="handleDeleteProduct(product)"
                          type="danger"
                          style=" margin:2px;   padding: 3px;"
                          plain
                        >
                          <i class="el-icon-delete"></i>
                        </el-button>
                      </b-col>
                    </div>
                  </div>
                </div>
              </b-card-text>
            </b-tab>
            <b-tab title="إضافي">
              <AddProduct
                v-if="operationStatus == 'add'"
                @successAdditionAdded="
                  getAdditionsByCategorie(selectedCategory)
                "
                @changeOperationStatus="changeOperationStatus"
                :type="2"
                :sizes="sizes"
                :selectedCategory="selectedCategory"
              />
             

               <EditProduct
                  @successProductUpdated="successUpdated(1)"
                  v-else-if="operationStatus == 'update'"
                  @changeOperationStatus="changeOperationStatus"
                  :product="currProduct"
                  :sizes="sizes"
                  :selectedCategory="selectedCategory"
                />

              <div class="row">
                <div
                  class="col-md-4"
                  v-for="product in additions"
                  :key="product.id"
                >
                  <div class="d-flex meunItem">
                    <div class="name">{{ product.name }}</div>
                    <div
                      class="price-circle d-flex"
                      
                    >
                      <div
                          v-if="
                            product.prices.find(
                              (ele) => ele.product_size_id == sizes[0].id
                            )
                          "
                          class="price"
                        >
                          {{
                            product.prices.find(
                              (ele) => ele.product_size_id == sizes[0].id
                            ).price
                          }}
                        </div>
                        <div v-else class="price">
                          -
                        </div>

                        <div
                          v-if="
                            product.prices.find(
                              (ele) => ele.product_size_id == sizes[1].id
                            )
                          "
                          class="price"
                        >
                          {{
                            product.prices.find(
                              (ele) => ele.product_size_id == sizes[1].id
                            ).price
                          }}
                        </div>
                        <div v-else class="price">
                          -
                        </div>

                        <div
                          v-if="
                            product.prices.find(
                              (ele) => ele.product_size_id == sizes[2].id
                            )
                          "
                          class="price"
                        >
                          {{
                            product.prices.find(
                              (ele) => ele.product_size_id == sizes[2].id
                            ).price
                          }}
                        </div>
                        <div v-else class="price">
                          -
                        </div>
                    </div>

                    <div class="operations">
                      <el-button
                        @click.native="handleUpdateProduct(product)"
                        type="primary"
                        style=" margin:2px;   padding: 3px;"
                        plain
                      >
                        <i class="el-icon-edit"></i>
                      </el-button>
                      <el-button
                        @click="handleDeleteProduct(product)"
                        type="danger"
                        style=" margin:2px;   padding: 3px;"
                        plain
                      >
                        <i class="el-icon-delete"></i>
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </b-tab>
          </b-tabs>
        </div>
      </div>
    </div>

    



    <vs-dialog class="delete-dialog" width="550px" not-center v-model="confirmDeleteProduct">
        


        <div class="con-content">
            <h6> <i class="el-icon-warning-outline"></i> </h6>
          <p class="mb-3">
            هل أنت متأكد من أتك تريد حذف ؟
          </p>
          <span class="text-danger d-block"> {{ currProduct.name }} </span>


          <div class="btns d-flex justify-content-center">
              <vs-button color="danger" @click="confirmDeleteProduct=false" >
              إلغاء
                </vs-button>
              <vs-button color="#675DEC" @click="removeProduct()">
                تأكيد
                </vs-button>
              
                
          </div>

        </div>

      
      </vs-dialog>







     <!-- Model To Add Category -->

    <vs-dialog class="add-category" width="300" v-model="addCategoryModel">
      <template #header>
        <h4 class="not-margin">
          إضافة قسم جديد
        </h4>
      </template>

      <div class="con-form">



        <el-form :model="add" status-icon ref="add" class="demo-ruleForm">

          <el-form-item
            prop="name"
            label="أسم القسم"
            :rules="[
              { required: true, message: 'اسم القسم مطلوب', trigger: 'blur' },
            ]"
          >
            <el-input placeholder="الاسم " v-model="add.name"></el-input>
          </el-form-item>


          <el-form-item
            prop="printer_id"
            label="إختر طابعة للقسم"
            :rules="[
              { required: true, message: 'اسم الطابعة مطلوب', trigger: 'blur' },
            ]"
          >
            <el-select filterable v-model="add.printer_id" value-key="id" placeholder="طابعة القسم">
              <el-option
                v-for="printer in printers"
                :key="printer.id"
                :label="printer.name"
                :value="printer.id"
              >
              </el-option>
            </el-select>
          </el-form-item>



          <el-form-item
            prop="kitchen_type"
            label="نوع المطبخ"
            :rules="[
              { required: true, message: 'تحديد نوع المطبخ مطلوب', trigger: 'blur' },
            ]"
          >
            <el-select filterable v-model="add.kitchen_type" value-key="val" placeholder=" نوع مطبخ للقسم">
              <el-option
                v-for="kitchen in kitchens"
                :key="kitchen.val"
                :label="kitchen.name"
                :value="kitchen.val"
              >
              </el-option>
            </el-select>
          </el-form-item>


          <el-form-item label="أضف ايقون للقسم">

              <el-upload
                class="avatar-uploader"
                list-type="picture-card"
                action="#"
                :show-file-list="true"
                :auto-upload="false"
                :on-change="handlePictureCardPreview"
                :on-preview="handlePreview"
                :limit="1"
                :on-remove="handleRemove"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>

          </el-form-item>


          <el-form-item>
            <div class="footer-dialog">
              <el-button type="primary" plain block @click="validateAddCategory('add')">
                إضافة
              </el-button>
            </div>
          </el-form-item>


        </el-form>
        
        

        

       
      
      </div>

      

    </vs-dialog>

    <!-- <vs-dialog class="add-category" v-model="addCategoryModel">
      <template #header>
        <h4 class="not-margin">
          إضافة قسم جديد
        </h4>
      </template>

      <div class="con-form">
        <label class="text-right d-block"> أسم الصنف </label>
        <el-input placeholder="اسم الصنف" v-model="add.name"></el-input>

        <label class="text-right d-block"> إختر طابعة الصنف </label>
        <el-select v-model="add.printer_id" placeholder="إختر الحالة">
          <el-option
            v-for="printer in printers"
            :key="printer.id"
            :label="printer.name"
            :value="printer.id"
          >
          </el-option>
        </el-select>


        <label class="text-right d-block"> إختر مطبخ </label>
        <el-select v-model="add.kitchen_type" placeholder="إختر مطبخ">
          <el-option
            v-for="kitchen in kitchens"
            :key="kitchen.val"
            :label="kitchen.name"
            :value="kitchen.val"
          >
          </el-option>
        </el-select>

        <label class="text-right d-block"> أضف ايقون </label>
        <el-upload
          class="avatar-uploader"
          list-type="picture-card"
          action="#"
          :show-file-list="true"
          :auto-upload="false"
          :on-change="handlePictureCardPreview"
          :on-preview="handlePreview"
          :limit="1"
          :on-remove="handleRemove"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img class="dialog-image-preview" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button color="#EBF9FC" block @click="addNewCategorie">
            إضافة
          </vs-button>
        </div>
      </template>
    </vs-dialog> -->




    <!-- Model To Update Category -->

    <vs-dialog class="add-category" width="300" v-model="updateCategoryModel">
      <template #header>
        <h4 class="not-margin">
          تعديل قسم 
        </h4>
      </template>

      <div class="con-form">



        <el-form :model="updateCategory" status-icon ref="updateCategory" class="demo-ruleForm">

          <el-form-item
            prop="name"
            label="أسم القسم"
            :rules="[
              { required: true, message: 'اسم القسم مطلوب', trigger: 'blur' },
            ]"
          >
            <el-input placeholder="الأسم" v-model="updateCategory.name"></el-input>
          </el-form-item>


          <el-form-item
            prop="printer_id"
            label="إختر طابعة للقسم "
            :rules="[
              { required: true, message: 'اسم الطابعة مطلوب', trigger: 'blur' },
            ]"
          >
            <el-select filterable v-model="updateCategory.printer_id" value-key="id" placeholder="طابعة القسم">
              <el-option
                v-for="printer in printers"
                :key="printer.id"
                :label="printer.name"
                :value="printer.id"
              >
              </el-option>
            </el-select>
          </el-form-item>



          <el-form-item
            prop="kitchen_type"
            label="نوع المطبخ"
            :rules="[
              { required: true, message: 'تحديد نوع المطبخ مطلوب', trigger: 'blur' },
            ]"
          >
            <el-select filterable v-model="updateCategory.kitchen_type" value-key="val" placeholder=" نوع المطبخ">
              <el-option
                v-for="kitchen in kitchens"
                :key="kitchen.val"
                :label="kitchen.name"
                :value="kitchen.val"
              >
              </el-option>
            </el-select>
          </el-form-item>


          <!-- <el-form-item label="أضف ايقون للقسم">

              <el-upload
                class="avatar-uploader"
                list-type="picture-card"
                action="#"
                :show-file-list="true"
                :auto-upload="false"
                :on-change="handlePictureCardPreview"
                :on-preview="handlePreview"
                :limit="1"
                :on-remove="handleRemove"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>

          </el-form-item> -->


          <el-form-item>
            <div class="footer-dialog">
              <el-button type="primary" plain block @click="validateUpdateCategory('updateCategory')">
                تعديل
              </el-button>
            </div>
          </el-form-item>


        </el-form>
        
        

        

       
      
      </div>

      

    </vs-dialog>











    <vs-dialog class="delete-dialog" width="550px" not-center v-model="showDeleteCategoryModel">
        


        <div class="con-content">
            <h6> <i class="el-icon-warning-outline"></i> </h6>
          <p >
            هل أنت متأكد من أتك تريد حذف ؟
          </p>


          <div class="btns d-flex justify-content-center">
              <vs-button color="danger" @click="showDeleteCategoryModel=false" >
              إلغاء
                </vs-button>
              <vs-button color="#675DEC" @click="deleteCategory()">
                تأكيد
                </vs-button>
              
                
          </div>

        </div>

      
      </vs-dialog>




    


  </div>
</template>

<script>
import axiosApi from "@/plugins/axios.js";
import Category from "@/components/Operations/Categorie/SelectableCategorie";
import AddProduct from "@/components/Products/add";
import EditProduct from "@/components/Products/update";

export default {
  components: {
    Category,
    AddProduct,
    EditProduct,
  },
  created() {
    this.getAllCategories();
    this.getAllPrinters();
    this.getSizes();
  },

  watch: {
    selectedTab(val) {
      if (val == 0) {
        this.getProductsByCategorie(this.selectedCategory);
      } else if (val == 1) {
        this.getAdditionsByCategorie(this.selectedCategory);
      }
    },
  },
  methods: {
    deleteCategory(){
      const loading = this.$vs.loading();
      axiosApi.delete(`/product-categories/${this.currCategory.id}`).then(res => {
        this.$notify({
            title: "تم",
            message: `تم إضافة الصنف بنجاح `,
            type: "success",
          });
        this.showDeleteCategoryModel = false;
        this.getCategories();
      }).catch(error => {
        this.$notify.error({
          title: "خطأ",
          message: `حدث خطأ ما`,
        });
      }).finally(() => loading.close());
    },
    handleDeleteEmployeeDept(cate){
      this.showDeleteCategoryModel = true;
      this.currCategory = {...cate}
    },
    getSizes(){
      const loading = this.$vs.loading()
      axiosApi.get(`/product-sizes`).then(res => {
        this.sizes = res.data;
      }).finally(() => loading.close())
    },
    validateUpdateCategory(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.updateProductCategory();
          } else {
            return false;
          }
      });
    },
    validateAddCategory(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addNewCategorie();
          } else {
            return false;
          }
      });
    },
    updateProductCategory(){
      let loading = this.$vs.loading();
      this.updateCategoryModel = false;
      // let formData = new FormData();

      let updatedCategory = {};
      updatedCategory.name = this.updateCategory.name;
      updatedCategory.kitchen_type = this.updateCategory.kitchen_type;
      updatedCategory.printer_id = this.updateCategory.printer_id;

      // formData.append("name", this.updateCategory.name);
      // formData.append("image", this.categoryIcon);
      // formData.append("printer_id", this.updateCategory.printer_id);
      // formData.append("kitchen_type", this.updateCategory.kitchen_type);

      
      axiosApi
        .put(`/product-categories/${this.updateCategory.id}`, updatedCategory)
        .then(() => {
          this.updateCategory = {};
          this.categoryIcon = this.imageUrl = "";

          this.$notify({
            title: "تم",
            message: `تم إضافة الصنف بنجاح `,
            type: "success",
          });
          this.getCategories();
        }).catch(err => {
          console.log(err.response.status)
          if(err.response.status === 422){
            this.$notify.error({
              title: "خطأ",
              message: `اسم الصنف موجود مسبقا`,
            });
          }else{
            this.$notify.error({
              title: "خطأ",
              message: `حدث خطأ ما`,
            });
          }
          
        })
        .finally(() => loading.close());
    },
    openUpdateCategoryModel(category){
      console.log(category)
      this.imageUrl = this.categoryIcon = this.$store.state.url + category.image;
      this.updateCategory = {...category};
      this.updateCategoryModel = true;
    },
    successUpdated(type) {

      if(type == 0){
        // console.log("hey , products")
        this.getProductsByCategorie(this.selectedCategory);
      }else{
        // console.log("hey , additions")

        this.getAdditionsByCategorie(this.selectedCategory);
      }
     
      this.isUserNowUpdate = false;
      
    },
    getAllPrinters() {
      const loading = this.$vs.loading();
      axiosApi
        .get(`/printers`)
        .then((res) => {
          this.printers = res.data;
        })
        .finally(() => loading.close());
    },
    handlePictureCardPreview(file) {
      console.log(file);
      this.categoryIcon = file.raw;
      this.imageUrl = ""
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove() {
      this.categoryIcon = "";
    },
    openAddCategory() {
      this.dialogImageUrl = {};
      this.categoryIcon = "";
      this.imageUrl = ""
      this.addCategoryModel = true;
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
    addNewCategorie() {
      
      if (!this.categoryIcon) {
        this.$notify.error({
          title: "خطأ!",
          message: `قم بإرفاق أيقون لهذا الصنف`,
          type: "danger",
        });

        return;
      }
      let loading = this.$vs.loading();
      this.openAddModel = false;
      let formData = new FormData();
      formData.append("name", this.add.name);
      if(this.categoryIcon){
        formData.append("image", this.categoryIcon);
      }
      formData.append("printer_id", this.add.printer_id);
      formData.append("kitchen_type", this.add.kitchen_type);

      
      axiosApi
        .post(`/product-categories`, formData)
        .then(() => {
          this.add = {};
          this.categoryIcon = "";

          this.$notify({
            title: "تم",
            message: `تم إضافة الصنف بنجاح `,
            type: "success",
          });
          this.addCategoryModel = false;
          this.getCategories();
        }).catch(err => {
          console.log(err.response.status)
          if(err.response.status === 422){
            this.$notify.error({
              title: "خطأ",
              message: `اسم الصنف موجود مسبقا`,
            });
          }else{
            this.$notify.error({
              title: "خطأ",
              message: `حدث خطأ ما`,
            });
          }
          
        })
        .finally(() => loading.close());
    },

    handleDeleteProduct(product) {
      this.confirmDeleteProduct = true;
      this.currProduct = { ...product };
    },
    handleUpdateProduct(product) {
      
      this.currProduct = {  };
      this.operationStatus = 'add';

      setTimeout(() => {
        this.currProduct = { ...product };
        this.operationStatus = 'update';
      }, 50);

    },
    changeOperationStatus(e){
      this.operationStatus = e;
    },
    removeProduct() {
      this.confirmDeleteProduct = false;
      const loading = this.$vs.loading();
      axiosApi
        .delete(`/products/${this.currProduct.id}`)
        .then(() => {
          this.$notify({
            title: "تم",
            message: `تم حذف المنتج بنجاح `,
            type: "success",
          });
          if (this.currProduct.type == 1) {
            this.selectedTab = 0;
            console.log("selcted cat ", this.selectedCategory);
            this.getProductsByCategorie(this.selectedCategory);
          } else {
            this.selectedTab = 1;
            this.getAdditionsByCategorie(this.selectedCategory);
          }
          this.operationStatus = 'add';
        })
        .finally(() => loading.close());
    },

    selectCategory(category) {
      this.selectedTab = {};
      this.selectedCategory = category;
      // this.$store.commit("UpdateSelectedCategory", {...category});
      this.getProductsByCategorie(category);
    },

    getProductsByCategorie(category) {
      this.isUserNowUpdate = false;
      console.log("false ", this.isUserNowUpdate);
      let loading = this.$vs.loading();
      axiosApi
        .get(`/product-categories/${category.id}/products`)
        .then((res) => {
          this.products = res.data;
        })
        .finally(() => loading.close());
    },
    getAdditionsByCategorie(category) {
      this.isUserNowUpdate = false;
      this.additions = [];
      let loading = this.$vs.loading();
      axiosApi
        .get(`/product-categories/${category.id}/additions`)
        .then((res) => {
          this.additions = res.data;
        })
        .finally(() => loading.close());
    },

    getAllCategories() {
      const loading = this.$vs.loading();
      axiosApi
        .get("product-categories")
        .then((res) => {
          this.categories = res.data;
          if(this.categories.length > 0){
            this.selectCategory(this.categories[0])
          }
          
        })
        .finally(() => loading.close());
    },
  },
  data() {
    return {
      sizes:[],
      showDeleteCategoryModel:false,
      currCategory: {},
      kitchens:[
        // {name: "نخزين", val: 1},
        {name: "بيتزا", val: 2},
        {name: "بستا", val: 3},
      ],
      operationStatus: 'add',
      updateCategory:{},
      printers: [],
      updateCategoryModel:false,
      add: {},
      categoryIcon: "",
      imageUrl: "",
      dialogVisible: false,
      dialogImageUrl: false,
      addCategoryModel: false,
      confirmDeleteProduct: false,
      selectedTab: 0,
      isUserNowUpdate: false,
      currProduct: {},
      selectedCategory: {},
      additions: [],
      products: [],
      categories: [],
      swiperOptionBestSeller: {
        slidesPerView: 12,
        spaceBetween: 5,
        slidesPerGroup: 1,
        loopFillGroupWithBlank: false,
        breakpoints: {
          1200: {
            slidesPerView: 12,
            spaceBetween: 5,
          },
          1024: {
            slidesPerView: 11,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 6,
            spaceBetween: 5,
          },
          350: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          0: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
};
</script>

<style lang="scss">
.add-category {
  .footer-dialog {
    button {
      color: var(--primary);
    }
  }
}

.categories-selection {
  .addNewCategory {
    text-align: right;
    margin-bottom: 15px;
    button {
      padding: 7px;
    }
  }

  > h6 {
    text-align: right;
    font-size: 25px;
    font-family: "din";
  }
  padding-top: 50px;

  .selected-category {
    background: #fe5634 !important;
    color: #fff !important;
  }

  .products {
    font-family: "din";
  }

  .nav-pills .nav-link.active,
  .nav-pills .show > .nav-link {
    background: #ebf9fc;
    color: var(--primary);
  }
  .nav-pills .nav-link {
    border-radius: 0.25rem;
    color: var(--primary);
  }

  .meunItem {
    display: flex;
    justify-content: space-around;
    background: linear-gradient(-180deg, #edfafd, #ffffff);
    margin-bottom: 5px;
    font-size: 16px;
    font-family: "din";
    border-radius: 6px;
    height: 58px;
    align-items: center;
    padding-right: 13px;

    .operations{
      padding-top: 0 !important;
    }

    .price {
      background-color: #ffffff;
      width: 32px;
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
  .nav.nav-pills.card-header-pills {
    padding: 0;
  }

  
  .card-header {
    margin-bottom: 0;
    background-color: transparent !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    
  }
  .tab-content{
    height: 100vh;
  }
  .tab-content > .active {
    display: block;
    padding: 0;
  }
}

.add-category {
  label {
    margin-top: 5px;
  }
}

.dialog-image-preview {
  width: 100%;
  max-width: 335px;
}



// Global Style For Dialog Form

.el-form{
  .el-input__suffix{
    left: 5px ;
    right: auto !important
  }
  .el-form-item__error{
    right: 0 !important;
    left: auto !important;
  }
  .el-form-item__label{
    float: right !important;
        display: block;
    width: 100%;
  }
  label{
    text-align: right;
  }
  .el-upload--picture-card{
  }
  .el-form-item__content{
    .footer-dialog{
      button{
        display: block;
        width: 100%;
      }
    }
  }
}
.el-form-item {
    margin-bottom: 10px !important;
}


.el-upload.el-upload--picture-card{
  img{
    max-width: 200px;
  }
}
</style>
