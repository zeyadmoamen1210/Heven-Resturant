<template>
  <div class="register-page">
    <div class="container-fluid">
      <div class="header d-flex justify-content-between">
        <div>
          <h2 class="header text-right">إنشاء حساب جديد</h2>
        </div>
        
      </div>

      <div class="new-acc">
        <div class="row">
          <div class="col-md-6 mt-2">
            <div class="form-group">
                <h6 for="">الإسم</h6>
              <el-input v-model="addUser.name"></el-input>
            </div>
          </div>

          <!-- <div class="col-md-6 mt-2">
            <div class="form-group">
                <h6 for="">الموبايل</h6>
              <el-input type="text" v-model="addUser.phone"></el-input>
            </div>
          </div> -->

          <!-- <div class="col-md-6 mt-2">
            <div class="form-group">
                <h6 for="">البريد الإلكتروني</h6>
              <el-input v-model="addUser.email"></el-input>
            </div>
          </div> -->

          <div class="col-md-6 mt-2">
            <div class="form-group">
                <h6 for="">كلمة المرور</h6>
              <el-input type="password" v-model="addUser.password"></el-input>
            </div>
          </div>

       

          <div class="col-md-6 mt-2" >
            <div class="form-group">
              <h6 for="">نوع الحساب</h6>
              <el-select v-model="addUser.role_id" value-key="val" placeholder="اختر نوع">
                <el-option
                  v-for="x in accTypes"
                  :key="x.val"
                  :value="x.val"
                  :label="x.name"
                >
                  {{ x.name }}
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="col-md-6 mt-2">
            <div class="form-group">
              <h6 for="">الفرع</h6>
              <el-select v-model="addUser.branch_id" value-key="id" placeholder="اختر فرع">
                <el-option
                  v-for="x in branches"
                  :key="x.id"
                  :value="x.id"
                  :label="x.name"
                >
                  {{ x.name }}
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="col-md-12 text-right mt-4">
              <el-button
                type="primary"
                plain
                icon="el-icon-plus"
                class="mt-3"
                @click="addNewAcc()"
                
            >
                إضافة الحساب
            </el-button>
          </div>

          <div>
          
        </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosApi from '@/plugins/axios.js';
export default {
    data(){
        return{
            addUser:{},
            accTypes:[
                {name:"أدمن", val:1},
                {name:"كاشير", val:2},
                {name:"مشرف", val:3},
            ],
            branches:[]
        }
    },
    created(){
        this.getBranches();
    },
    methods:{
       
        addNewAcc(){
             if(Object.keys(this.addUser).length == 0 || !this.addUser.name || !this.addUser.password || !this.addUser.branch_id || !this.addUser.role_id){
                 this.$notify.error({
                  title: "خطأ",
                  message:`جميع البيانات مطلوبة !`,
                });
                 return ;
             }

            const loading = this.$vs.loading();
            axiosApi.post(`/register`, this.addUser).then(() => {
                this.$notify({
                  title: "تم",
                  message:`تم إضافة الحساب بنجاح`,
                  type: 'success'
                });
                this.addUser = {};
            }).finally(() => loading.close()).catch(() => {
                this.$notify.error({
                  title: "خطأ",
                  message:`حدث خطأ ما`,
                });
            });
        },
        getBranches(){
            axiosApi.get(`/branches`).then(res => {
                this.branches = res.data;
            })
        },
    }
};
</script>

<style lang="scss">
.register-page{
    .header{
        padding-top: 10px;
        margin-bottom: 10px;
    }
}
</style>
