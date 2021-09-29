<template>
  <div class="products-add">
    <div class="add" v-if="toggleAddProduct">
      <div class="form-group">
        <label for="">نوع المنتج</label>
        <el-select disabled :value="type" placeholder="Select">
          <el-option
            v-for="item in productTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <div class="form-group">
        <label>إسم المنتج</label>
        <el-input class="product-name" v-model="addProduct.name"></el-input>
      </div>

      <div>
        <div v-for="(price, index) in prices" :key="index" class="prices mb-2">
          <div class="form-group" v-if="price.size">
            <label for="">الحجم</label>
            <el-input v-model="price.size.name" :disabled="true"> </el-input>
          </div>
          <div class="form-group">
            <label for="">السعر</label>
            <el-input v-model="price.price"> </el-input>
          </div>

          <!-- <el-button
            class="remove-price"
            @click="prices.splice(index, 1)"
            v-if="index != 0"
            type="danger"
            icon="el-icon-delete"
          ></el-button> -->
        </div>
      </div>
      <!-- <el-button
        class="add-new-price"
        @click="pushNewPrice"
        v-if="sizes.length > prices.length"
        icon="el-icon-plus"
      ></el-button> -->

      <vs-button @click="sendProductToBackend" flat class="save mr-2 ml-2"
        >حفظ</vs-button
      >
      <vs-button
        @click="changeOperationStatus('add'), (toggleAddProduct = false)"
        v-if="Object.keys(selectedCategory).length > 0 && toggleAddProduct"
        flat
        danger
        class="save mr-2 ml-2"
        >إلغاء</vs-button
      >
    </div>
    <div>
      <el-button
        @click="changeOperationStatus('add'), (toggleAddProduct = true)"
        v-if="Object.keys(selectedCategory).length > 0 && !toggleAddProduct"
        icon="el-icon-plus"
        type="text"
        >إضافة منتج</el-button
      >
    </div>
  </div>
</template>

<script>
import axiosApi from "@/plugins/axios.js";

export default {
  props: ["selectedCategory", "type", "sizes"],
  created() {
    if (this.prices.length >= 0 && this.sizes.length >= 0) {
      this.prices[0].size_id = this.sizes[0].id;
      this.prices[0].size = this.sizes[0];

      while (this.sizes.length > this.prices.length) {
        this.pushNewPrice();
      }
    }
  },
  watch: {
    toggleAddProduct(val) {
      if (val == true) {
        while (this.sizes.length > this.prices.length) {
          this.pushNewPrice();
        }
      }
    },
  },
  data() {
    return {
      prices: [
        
      ],
      productTypes: [
        { label: "أساسي", value: 1 },
        { label: "إضافي", value: 2 },
      ],
      addProduct: {},
      toggleAddProduct: false,
      products: [],
    };
  },
  methods: {
    changeOperationStatus(status) {
      this.$emit("changeOperationStatus", status);
    },
    sendProductToBackend() {
      if (this.addProduct && !this.addProduct.name) {
        this.$notify.error({
          title: "خطأ!",
          message: "اسم المنتج مطلوب",
          type: "danger",
        });
        return;
      }

      let filterdPrices = [];

      this.prices.map((ele) => {
        if (ele.price) {
          filterdPrices.push({ price: ele.price, size_id: ele.size_id });
        }
      });

      console.log(filterdPrices);

      if (filterdPrices.length == 0) {
        this.$notify.error({
          title: "خطأ!",
          message: "لا يوجد اسعار للمنتج اضف سعر علي الاقل",
          type: "danger",
        });
        return;
      }

      if (filterdPrices.findIndex((ele) => isNaN(Number(ele.price))) > -1) {
        this.$notify.error({
          title: "خطأ!",
          message: "قيمة السعر غير صالحة",
          type: "danger",
        });
        return;
      }

      const loading = this.$vs.loading();
      axiosApi
        .post(`/products`, {
          name: this.addProduct.name,
          type: this.type,
          product_category_id: this.selectedCategory.id,
          prices: filterdPrices,
        })
        .then(() => {
          this.$notify({
            title: "تم",
            message: `تم إضافة المنتج بنجاح `,
            type: "success",
          });

          this.toggleAddProduct = false;
          this.addProduct = {};

          this.prices = [
            {
              size_id: "",
              price: "",
            },
          ];
          this.prices[0].size_id = this.sizes[0].id;
          this.prices[0].size = this.sizes[0];

          if (this.type == 1) {
            this.$emit("successProductAdded");
          } else if (this.type == 2) {
            this.$emit("successAdditionAdded");
          }
        })
        .finally(() => loading.close())
        .catch((error) => {
          if (error.response.status == 422) {
            this.$notify.error({
              title: "خطأ!",
              message: "هذا الإسم موجود مسبقاٌ",
              type: "danger",
            });
          } else if (error.response.status == 400) {
            this.$notify.error({
              title: "خطأ!",
              message: "ادخل علي الأقل سعر",
              type: "danger",
            });
          }
        });
    },
    getAllSizes() {
      const loading = this.$vs.loading();
      axiosApi
        .get("product-sizes")
        .then((res) => {
          this.sizes = res.data;

          this.prices[0].size_id = this.sizes[0].id;
          this.prices[0].size = this.sizes[0];

          while (this.sizes.length > this.prices.length) {
            this.pushNewPrice();
          }
        })
        .finally(() => loading.close());
    },
    pushNewPrice() {
      let sizesNextIndex = this.prices.length;
      this.prices.push({
        size_id: this.sizes[sizesNextIndex].id,
        size: this.sizes[sizesNextIndex],
      });
    },
  },
};
</script>

<style lang="scss">
.products-add {
  display: flex;
  flex-wrap: wrap;
  .add {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    text-align: left;
    padding-top: 14px;
    .prices {
      display: flex;
      flex-wrap: wrap;
    }
    .form-group {
      display: flex;
      flex-wrap: wrap;
      label {
        margin: 0 11px;
        color: #fe5634;
      }
      .el-input {
        width: 95px;
        height: 30px;
      }
      .el-select {
        width: auto !important;
      }
      .product-name {
        width: 200px;
      }
      .el-input__inner {
        height: 30px !important;
      }
    }
    .add-new-price {
      padding: 2px;
      margin: 4px 6px;
      height: 24px;
      background: #f7f7f7;
      font-weight: bold;
      color: var(--primary);
      font-size: 17px;
    }
    .remove-price {
      padding: 2px;
      margin: 4px 6px;
      height: 24px;
    }
  }
  .save {
    height: 30px;
    border-radius: 8px;
    margin: 0;
  }
}
</style>
