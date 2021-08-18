<template>
  <div class="authentication">
    <b-container>
      <b-row align-h="center">
        <b-col xl="8" lg="12" md="12" class="img-card">
          <b-img :src="require('@/images/authentication.png')"></b-img>
        </b-col>
        <b-col xl="4" lg="12" md="12" class="form-card">
          <div class="logo">
            <b-img :src="require('@/images/logo.png')"></b-img>
            <form action="/">
              <b-row class="text-right">
                <b-col md="12">
                  <div role="group">
                    <label for="name">اسم المستخدم</label>
                    <b-form-input
                      id="name"
                      type="text"
                      v-model="form.name"
                    ></b-form-input></div
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
                <b-col md="12" class="mt-2">
                  <div role="group">
                    <label for="name"> اختر الفرع</label>
                    <b-form-select
                      v-model="form.branch"
                      :options="branchs"
                    ></b-form-select></div
                ></b-col>
                <b-col md="12" class="mt-2">
                  <div role="group">
                    <label for="name"> الصلاحيات</label>
                    <b-form-select
                      v-model="form.branch"
                      :options="options"
                    ></b-form-select></div
                ></b-col>
                <b-col md="12" class="mt-4"
                  ><b-button type="submit">انشاء حساب </b-button></b-col
                >
              </b-row>
            </form>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    form: {
      name: "",
      password: null,
      branch: "",
    },
    branchs: [
      { value: "اسماعيليه", text: "اسماعيليه" },
      { value: "دمياط", text: "دمياط" },
    ],
    options: [
      { value: "مدير-الصاله", text: "مدير الصاله" },
      { value: "مدير-الصاله", text: "مدير الصاله" },
    ],
  }),
};
</script>
<style lang="sass" scoped>
@import "../../styles/authentication.scss"
</style>


