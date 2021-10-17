<template>
  <div class="authentication">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12 form-card" style="margin: auto">
          <div class="logo">
            <b-img :src="require('@/images/logo.png')"></b-img>
            <form>
              <div class="row text-right">
                <div class="col-md-12">
                  <div role="group">
                    <label for="name" style="text-align: right" class="mb-2">اسم المستخدم</label>
         

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
                        {{ x.name }}
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="col-md-12 mt-2">
                  <div role="group">
                    <label for="name" style="text-align: right" class="mb-2"> كلمة المرور</label>
                    <el-input
                      id="name"
                       @keydown.enter.native="makeLogin"
                      type="password"
                      v-model="form.password"
                    ></el-input>
                  </div>
                </div>
                <div class="col-md-12 mt-4">
                  <el-button @click.native="makeLogin" class="btn mt-3" type="submit">تسجيل دخول</el-button>
                </div>
              </div>
            </form>
          </div>
          <!-- <el-button style="color:#000" @click="printBarCode">طباعة</el-button> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axiosApi from "@/plugins/axios.js";
export default {
  name: "Login",
  data: () => ({
    form: {
      name: "",
      password: null,
    },
    printerName: "",
    users: [],
    printersOptions: [],
  }),
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("heavenDashboardToken")) {
      next({ name: "Home" });
    } else {
      next();
    }
  },

  created() {
    this.getUsers();
  },
  mounted() {
    let { remote } = require("electron");

    let webContents = remote.getCurrentWebContents();
    this.printersOptions = webContents.getPrinters();
  },
  methods: {
    printBarCode() {
      const { ipcRenderer } = require("electron");

      ipcRenderer.send("printBarCode", this.printerName);
    },

    getUsers() {
      const loading = this.$loading({
          lock: true,
          text: false,
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255,.7)',
          customClass: 'fullscreen-loading'
        });
      axiosApi.get(`/users`).then((res) => {
        this.users = res.data;
      }).finally(() => loading.close());
    },

    makeLogin() {
      // const loading = this.$vs.loading();
      const loading = this.$loading({
          lock: true,
          text: false,
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255,.7)',
          customClass: 'fullscreen-loading'
        });
      axiosApi
        .post("/login", this.form)
        .then((res) => {
          console.log(res);
          this.$store.commit("setUser", res.data.user);
          localStorage.setItem(
            "heavenDashboardUser",
            JSON.stringify(res.data.user)
          );
          localStorage.setItem("heavenDashboardToken", res.data.token);
          this.$store.commit("UpdateUserStatus", true);

          this.$notify({
            title: "مرحبا بعودتك",
            message: `تسجيل دخول ناجح `,
            type: "success",
          });

          this.$router.push("/");
          location.reload();
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            this.$notify.error({
              title: "خطأ",
              message: `تأكد من اسم المستخدم وكلمة المرور`,
              type: "danger",
            });
          } else {
            this.$notify.error({
              title: "خطأ",
              message: `حدث خطأ`,
              type: "danger",
            });
          }
        })
      .finally(() => loading.close());
    },
  },
};
</script>
<style lang="sass">

 @import "../../styles/authentication.scss"

 
</style>
