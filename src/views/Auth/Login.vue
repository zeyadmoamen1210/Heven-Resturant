<template>
  <div class="authentication">
    <b-container>
      <div class="row">
        <div class="col-md-5 form-card" style="margin: auto">
           <div class="logo">
            <b-img :src="require('@/images/logo.png')"></b-img>
            <form @submit.prevent="makeLogin">
              <b-row class="text-right">
                <b-col md="12">
                  <div role="group">
                    <label for="name">اسم المستخدم</label>
                    <!-- <b-form-input
                      id="name"
                      type="text"
                      v-model="form.name"
                    ></b-form-input> -->
                    
                    
                    <el-select
                    class="usersname"
                    v-model="form.name"
                    filterable
                    clearable
                    placeholder="  "
                    value-key="id"
                  >

                    <el-option
                      v-for="x in users" 
                      :key="x.id"
                      :label="x.name"
                      :value="x.name"
                    >
                    {{x.name}} 
                    </el-option>

                  </el-select>
            
            </div
                ></b-col>
                <b-col md="12" class="mt-2">
                  <div role="group">
                    <label for="name"> كلمة المرور</label>
                    <b-form-input
                      id="name"
                      type="password"
                      v-model="form.password"
                    ></b-form-input></div
                ></b-col>
                <b-col md="12" class="mt-4"
                  ><b-button type="submit">تسجيل دخول</b-button></b-col
                >


                


              </b-row>
            </form>


            


            


          </div>
          <button style="color:#000" @click="printBarCode"> طباعة  </button>
        </div>


        

      

      </div>



      

    </b-container>


  

  </div>
</template>
<script>
import axiosApi from '@/plugins/axios.js';
export default {
  name: 'Login',
  data: () => ({
    form: {
      name: "",
      password: null,
    },
    printerName: "",
    users:[],
    printersOptions: []
  }),
  beforeRouteEnter(to, from, next){
    if (localStorage.getItem('heavenDashboardToken')){
      next({name: "Home"})
    }else{
      next();
    }
  },

  created(){
    this.getUsers()
  },
  mounted(){
    let { remote } = require("electron");

    let webContents = remote.getCurrentWebContents();
    this.printersOptions = webContents.getPrinters();
  },
  methods:{

    printBarCode(){
      const { ipcRenderer } = require("electron");

      ipcRenderer.send("printBarCode", this.printerName);
    },



    getUsers() {
      // const loading = this.$vs.loading();
      axiosApi
        .get(`/users`)
        .then((res) => {
          this.users = res.data;
        });
    },


    makeLogin(){
      // const loading = this.$vs.loading();
      axiosApi.post('/login', this.form).then(res => {
        console.log(res);
        this.$store.commit('setUser', res.data.user)
        localStorage.setItem("heavenDashboardUser", JSON.stringify(res.data.user));
        localStorage.setItem('heavenDashboardToken', res.data.token);
        this.$store.commit('UpdateUserStatus', true);
       

        this.$notify({
          title: "مرحبا بعودتك",
          message:`تسجيل دخول ناجح `,
          type: 'success'
        });

          this.$router.push('/');
          location.reload();
      }).catch((error) => {
        if(error.response && error.response.status === 401){
          
          this.$notify.error({
          title: "خطأ",
          message:`تأكد من اسم المستخدم وكلمة المرور`,
          type: 'danger'
        });
        }else{
          this.$notify.error({
          title: "خطأ",
          message:`حدث خطأ`,
          type: 'danger'
        });
        }

        

      })
      // .finally(() => loading.close());
    
    }
  }
};
</script>
<style lang="sass">

// @import "../../styles/authentication.scss"


</style>


