<template>
  <div class="users-accounts">
    <div class="container-fluid">
      <div>

          <h3 style="text-align:start" class="mb-2">
              عرض الحسابات
          </h3>
        <el-table
          class="mt-2"
          align="right"
          v-if="users.length > 0"
          :data="users"
          border
          style="width: 100%"
        >
          <el-table-column label="#" type="index" width="80"> </el-table-column>
          <el-table-column label="الاسم " prop="name"> </el-table-column>
          <!-- <el-table-column label="الموبايل " prop="phone"> </el-table-column> -->
          <el-table-column prop="role_id" label="نوع الحساب ">
            <template slot-scope="scope">
              <h6 v-if="scope.row.role_id == 1">أدمن</h6>
              <h6 v-if="scope.row.role_id == 2">كاشير</h6>
            </template>
          </el-table-column>
          <el-table-column label="تاريخ الإنشاء ">
            <template slot-scope="scope">
              <h6>
                {{ new Date(scope.row.created_at).toLocaleString("ar-EG") }}
              </h6>
            </template>
          </el-table-column>
          <el-table-column label="اخر تعديل ">
            <template slot-scope="scope">
              <h6>
                {{ new Date(scope.row.updated_at).toLocaleString("ar-EG") }}
              </h6>
            </template>
          </el-table-column>

          <el-table-column label="الاجراءات">
            <template slot-scope="scope">
              <el-button class="ml-2 mr-2" type="primary" plain @click="updateUser(scope.row)"> تعديل </el-button>
              <el-button class="ml-2 mr-2" type="danger" plain @click="deleteUser(scope.row)"> حذف </el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>
    </div>












    <!-- Update Store -->
    <vs-dialog v-model="updateUserPopup">
        <template #header>
            <h4>تعديل الحساب </h4>
        </template>

        <el-form :model="currUser" ref="currUser">
          <el-form-item
            prop="name"
            label="الاسم"
            :rules="[
            { required: true, message: ' الحقل مطلوب'},
            ]"
          >
            <el-input v-model="currUser.name"></el-input>
          </el-form-item>



          <el-form-item
            prop="password"
            label="كلمة المرور الجديدة"
           
          >
            <el-input v-model="currUser.password"></el-input>
          </el-form-item>




          <el-form-item
            prop="role_id"
            label="النوع"
            :rules="[
            { required: true, message: ' الإجابة مطلوب'},
            ]"
          >
            <el-select
              v-model="currUser.role_id"
              placeholder="النوع"
            >

            <el-option
              v-for="x in roles" 
              :key="x.role_id"
              :label="x.name"
              :value="x.role_id"
            >
             {{x.name}} 
            </el-option>

            </el-select>
          </el-form-item>



          <span  class="dialog-footer mt-4">
  
            <el-form-item
            
            >
                   <el-button class="ml-2" @click="updateUserPopup = false">إلغاء</el-button>
            </el-form-item>
            

            <el-form-item
            
            >
                    <el-button class="ml-2" type="primary" @click="submitUpdateUserForm('currUser')">تعديل</el-button>
            </el-form-item>

        </span>


        </el-form>

    </vs-dialog>






    <vs-dialog class="delete-dialog" width="550px" not-center v-model="showDeletePopup">
        


        <div class="con-content">
            <h6> <i class="el-icon-warning-outline"></i> </h6>
          <p >
            هل أنت متأكد من أتك تريد حذف ؟
          </p>


          <div class="btns d-flex justify-content-center">
              <vs-button color="danger" @click="showDeletePopup=false" >
              إلغاء
                </vs-button>
              <vs-button color="#675DEC" @click="saveDeleteUser()">
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
    this.getUsers();
  },
  data() {
    return {

        showDeletePopup: false,
        users: [],
        currUser:{
            password: ""
        },
        updateUserPopup: false,

        roles:[
            {name: 'أدمن', role_id: 1},
            {name: 'كاشير', role_id: 2}
        ]
    };
  },
  methods: {

    saveDeleteUser(){
        const loading = this.$vs.loading();
        axiosApi
            .delete(`/users/${this.currUser.id}`)
            .then((res) => {
                this.$notify({
                    message: "تم ",
                    message: "تم الحذف بنجاح",
                    type: "success"
                })
                this.showDeletePopup = false;
                this.currUser = {};
                this.getUsers();
            }).catch(err => {
                this.$notify.error({
                    message: "حدث خطأ ما",
                })
            })
            .finally(() => loading.close());
    },

    deleteUser(user){
        this.showDeletePopup = true;
        this.currUser = {...user};
    },

    getUsers() {
      const loading = this.$vs.loading();
      axiosApi
        .get(`/users`)
        .then((res) => {
          this.users = res.data;
        })
        .finally(() => loading.close());
    },

    submitUpdateUserForm(formName){
        this.$refs[formName].validate(valid => {
            if (valid) {
                this.saveUser();
            }
        });
    },

    saveUser(){
        const loading = this.$vs.loading();

        if(!this.currUser.password || (this.currUser.password && this.currUser.password.toString().trim().length === 0)){
            this.currUser.password = ""
        }

        axiosApi
        .put(`/users/${this.currUser.id}`, this.currUser)
            .then((res) => {
                this.$notify({
                    message: "تم التعديل بنجاح",
                    type: "success"
                })
                this.updateUserPopup = false;
                this.currUser = {};
                this.getUsers();
            }).catch(err => {
                this.$notify.error({
                    message: "حدث خطأ ما",
                })
            })
        .finally(() => loading.close());
    },

    updateUser(user){
        this.currUser = {...user};
        this.updateUserPopup = true;
    }

  },
};
</script>

<style></style>
