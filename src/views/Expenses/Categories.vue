<template>
  <div class="new-product">
    <el-container>

      <el-main>
        <div class="bg-White p-3 mt-2">
          <el-row :gutter="10">
            <el-col :xl="10" :lg="10" :md="24" :sm="24">
              <div class="searchForm">
                <label for="">وصف مصروف </label>
                <el-input
                  class="mt-2 input1"
                  @focus="$event.target.select()"
                  v-model="form.name"
                  @keyup.enter.native="addNewCategory"
                ></el-input>
              </div>
            </el-col>
            <el-col :xl="4" :lg="4" :md="12" :sm="12">
              <br />
              <el-button
                class="mt-2"
                type="warning"
                @click="addNewCategory()"
              >
                تسجيل</el-button
              >
            </el-col>
          </el-row>
        </div>
        <el-card class="box-card mt-2">
          <div slot="header" class="clearfix">
            <span>تصنيفات المصروفات</span>
          </div>
          <el-tag
            class="mr-3"
            v-for="category in categories"
            :key="category.id"
            type="warning"
            >{{ category.name }}</el-tag
          >
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import axiosApi from "@/plugins/axios.js";

export default {
  name: "NewCategory",
  data() {
    return {
      index: 1,
      false: false,
      categories: [],
      form: {
        name: "",
      },
    };
  },
  created() {
    this.getCategories();
  },
  mounted() {},

  methods: {
    getCategories() {
      axiosApi
        .get("categories")
        .then((res) => {
          this.categories = res.data;
        })
        .catch((error) => console.log(error))
        .finally(() => {});
    },

    addNewCategory() {
      axiosApi
        .post("categories", this.form)
        .then((res) => {
          this.$notify({
            title: "تمت العملية بنجاح",
            message: "تم حفظ بيانات الوصف بنجاح",
            type: "success",
            duration: 1500,
          });
          this.form.name = "";
          this.categories = res.data;
        })
        .catch(() => {
          this.$notify({
            title: "حدث خطأ",
            message: "عفوا لم تتم العملية ",
            type: "error",
            duration: 1500,
          });
        });
    },
  },
};
</script>
