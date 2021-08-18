<template>
  <div class="stores-page">
    <div class="container">
      <div class="header d-flex justify-content-between">
          <div>
              <h3 class="header text-right">المخازن</h3>
          </div>
          <div>
              <el-button type="primary" @click="handleAddStorePopup()" plain icon="el-icon-plus" class="mt-3" circle></el-button>
          </div>
      </div>
      <div class="row">
        <div class="col-md-3" v-for="store in stores" :key="store.id">
          <div class="store" >
            <table>
              <tr>
                <td>الأسم:</td>
                <td>{{ store.name }}</td>
              </tr>
              <tr>
                <td>الموبايل:</td>

                <td>{{ store.phone }}</td>
              </tr>
              <tr>
                <td>العنوان:</td>
                <td>{{ store.address }}</td>
              </tr>
            </table>

            <div>
                <button class="btn emp-dept-update" @click="openUpdateStoreModel(store)"><img src="@/images/Icon-feather-edit-3.svg" alt=""></button>
                <button class="btn emp-dept-delete" @click="openDeleteModel(store)" > <img src="@/images/Icon-material-delete.svg" alt=""> </button>


            </div>
          </div>
        </div>
      </div>
    </div>


    <vs-dialog v-model="addNewStorePopup">
        <template #header>
            <h4>إضافة مخزن جديد</h4>
        </template>

        <el-form :model="addStore" ref="addStore">
          <el-form-item
            prop="name"
            label="اسم المخزن"
            :rules="[
            { required: true, message: ' الإجابة مطلوب'},
            ]"
          >
            <el-input v-model="addStore.name"></el-input>
          </el-form-item>

          <el-form-item
            prop="phone"
            label="رقم الموبايل"
            :rules="[
            { required: true, message: ' الإجابة مطلوب'},
            ]"
          >
            <el-input v-model="addStore.phone"></el-input>
          </el-form-item>


          <el-form-item
            prop="address"
            label="العنوان"
            :rules="[
            { required: true, message: ' الإجابة مطلوب'},
            ]"
          >
            <el-input v-model="addStore.address"></el-input>
          </el-form-item>


          <el-form-item
            prop="type"
            label="النوع"
            :rules="[
            { required: true, message: ' الإجابة مطلوب'},
            ]"
          >
            <el-select
              v-model="addStore.type"
              placeholder="النوع"
              value-key="val"
            >

            <el-option
              v-for="x in typeOptions" 
              :key="x.val"
              :label="x.name"
              :value="x.val"
            >
             {{x.name}} 
            </el-option>

            </el-select>
          </el-form-item>




          <el-form-item
            prop="branch_id"
            label="الفرع"
            :rules="[
            { required: true, message: ' الإجابة مطلوب'},
            ]"
          >
            <el-select
              v-model="addStore.branch_id"
              placeholder="الفرع"
              value-key="id"
            >

            <el-option
              v-for="x in branches" 
              :key="x.id"
              :label="x.name"
              :value="x.id"
            >
             {{x.name}} 
            </el-option>

            </el-select>
          </el-form-item>


         

          <span  class="dialog-footer mt-4">
                    

            <el-form-item
                
            >
                   <el-button @click="addNewStorePopup = false">إلغاء</el-button>
            </el-form-item>
            

            <el-form-item
                
            >
                    <el-button type="primary" @click="submitAddStoreForm('addStore')">إضافة</el-button>
            </el-form-item>

        </span>


        </el-form>

    </vs-dialog>



























    <!-- Update Store -->
    <vs-dialog v-model="updateStorePopup">
        <template #header>
            <h4>إضافة مخزن جديد</h4>
        </template>

        <el-form :model="updateStore" ref="updateStore">
          <el-form-item
            prop="name"
            label="اسم المخزن"
            :rules="[
            { required: true, message: ' الإجابة مطلوب'},
            ]"
          >
            <el-input v-model="updateStore.name"></el-input>
          </el-form-item>

          <el-form-item
            prop="phone"
            label="رقم الموبايل"
            :rules="[
            { required: true, message: ' الإجابة مطلوب'},
            
            ]"
          >
            <el-input v-model="updateStore.phone"></el-input>
          </el-form-item>


          <el-form-item
            prop="address"
            label="العنوان"
            :rules="[
            { required: true, message: ' الإجابة مطلوب'},
            ]"
          >
            <el-input v-model="updateStore.address"></el-input>
          </el-form-item>


          <el-form-item
            prop="type"
            label="النوع"
            :rules="[
            { required: true, message: ' الإجابة مطلوب'},
            ]"
          >
            <el-select
              v-model="updateStore.type"
              placeholder="النوع"
              value-key="val"
            >

            <el-option
              v-for="x in typeOptions" 
              :key="x.val"
              :label="x.name"
              :value="x.val"
            >
             {{x.name}} 
            </el-option>

            </el-select>
          </el-form-item>




          <el-form-item
            prop="branch_id"
            label="النوع"
            :rules="[
            { required: true, message: ' الإجابة مطلوب'},
            ]"
          >
            <el-select
              v-model="updateStore.branch_id"
              placeholder="الفرع"
              value-key="id"
            >

            <el-option
              v-for="x in branches" 
              :key="x.id"
              :label="x.name"
              :value="x.id"
            >
             {{x.name}} 
            </el-option>

            </el-select>
          </el-form-item>


         

          <span  class="dialog-footer mt-4">
                    

            <el-form-item
                
            >
                   <el-button @click="updateStorePopup = false">إلغاء</el-button>
            </el-form-item>
            

            <el-form-item
                
            >
                    <el-button type="primary" @click="submitUpdateStoreForm('updateStore')">تعديل</el-button>
            </el-form-item>

        </span>


        </el-form>

    </vs-dialog>





    <vs-dialog class="delete-dialog" width="550px" not-center v-model="showConfirmModelToDelete">
        


        <div class="con-content">
            <h6> <i class="el-icon-warning-outline"></i> </h6>
          <p >
            هل أنت متأكد من أتك تريد حذف ؟
          </p>


          <div class="btns d-flex justify-content-center">
              <vs-button color="danger" @click="showConfirmModelToDelete=false" >
              إلغاء
                </vs-button>
              <vs-button color="#675DEC" @click="deleteStore()">
                تأكيد
                </vs-button>
              
                
          </div>

        </div>

      
      </vs-dialog>


  </div>
</template>

<script>
import axiosApi from "@/plugins/axios.js";
export default {
  created() {
    this.getStores();
    this.getBranches();
  },
  data() {
    return {
      stores: [],
      updateStorePopup: false,
      updateStore:{},
      addNewStorePopup: false,
      addStore:{},
      currStore:{},
      branches:[],
      typeOptions:[
          {name:"تخزين", val:1},
          {name:"بستا", val:2},
          {name:"بيتزا", val:3},
      ],
      showConfirmModelToDelete: false,
    };
  },
  methods: {
    openDeleteModel(store){
      this.showConfirmModelToDelete = true;
      this.currStore = {...store}
    },
    openUpdateStoreModel(store){
      this.updateStorePopup = true;
      this.updateStore = {...store}
    },
    submitAddStoreForm(formName){
      this.$refs[formName].validate(valid => {
                if (valid) {
                    console.log("hi")
                    this.addNewStore();
                }
      });
    },
    submitUpdateStoreForm(formName){
      this.$refs[formName].validate(valid => {
                if (valid) {
                    console.log("hi")
                    this.updateTheStore();
                }
      });
    },
    getBranches(){
        axiosApi.get(`/branches`).then(res => {
            this.branches = res.data;
        })
    },
    addNewStore(){
      const loading = this.$vs.loading();

        axiosApi.post(`/inventories`, this.addStore).then(() => {
          this.$notify({
            title: "تم",
                  message:`تم إضافة المخزن بنجاح`,
                  type: 'success'
            });
              this.addNewStorePopup = false;
            this.addStore = {};
            this.getStores();
        }).finally(() => loading.close()).catch(() => {
            this.$notify.error({
                  title: "خطأ",
                  message:`حدث خطأ ما`,
            });
        })
    },
    updateTheStore(){
      const loading = this.$vs.loading();

        axiosApi.put(`/inventories/${this.updateStore.id}`, this.updateStore).then(() => {
          this.$notify({
            title: "تم",
                  message:`تم تعديل المخزن بنجاح`,
                  type: 'success'
            });
            this.updateStore = {};
              this.updateStorePopup = false;
            this.getStores();
        }).finally(() => loading.close()).catch(() => {
            this.$notify.error({
                  title: "خطأ",
                  message:`حدث خطأ ما`,
            });
        })
    },


    deleteStore(){
      const loading = this.$vs.loading();

        axiosApi.delete(`/inventories/${this.currStore.id}`).then(() => {
          this.$notify({
            title: "تم الحذف",
                  message:`تم حذف المخزن بنجاح`,
                  type: 'success'
            });
            this.currStore = {};
              this.showConfirmModelToDelete = false;
            this.getStores();
        }).finally(() => loading.close()).catch(() => {
            this.$notify.error({
                  title: "خطأ",
                  message:`حدث خطأ ما`,
            });
        })
    },
    
    handleAddStorePopup(){
        this.addNewStorePopup = true;
        this.addStore = {};
    },
    getStores() {
      const loading = this.$vs.loading();
      axiosApi
        .get(`/inventories`)
        .then((res) => {
          this.stores = res.data;
          console.log(res.data);
        })
        .finally(() => loading.close());
    },
  },
};
</script>

<style lang="scss" >
.stores-page{
    .header{
        padding:10px 0;
    }
    .store{
        background: #ebf9fc4d;
        padding: 15px;
        border-radius: 0;
        border-right: 2px solid #FE5634;
        margin-bottom: 15px;
        table{
            width: 100%;
            font-family: 'din';
        }
        
    }
}


.form-group{
    h6{
        text-align: right;
    }
    .custom-select{
        font-family: 'din';
        direction: rtl;
    }
}
</style>
