<template>
  <div class="products-add">
    <div class="add">
      <div class="form-group">
        <label for="">نوع المنتج</label>
        <el-select v-model="addProduct.type" placeholder="نوع المنتج" value-key="value">
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
          <div class="form-group" >
            <label for="">الحجم</label>
            <el-input v-model="price.name" :disabled="true"> </el-input>
          </div>
          <div class="form-group">
            <label for="">السعر</label>
            <el-input v-model="price.price.price"> </el-input>
          </div>

          <!-- <el-button
            class="remove-price"
            @click="product.prices.splice(index, 1)"
            v-if="index != 0"
            type="danger"
            icon="el-icon-delete"
          ></el-button> -->
        </div>
      </div>
      <!-- <el-button
        class="add-new-price"
        @click="pushNewPrice"
        v-if="sizes.length > product.prices.length"
        icon="el-icon-plus"
      ></el-button> -->

      <vs-button @click="sendProductToBackend" flat class="save mr-2 ml-2">تعديل</vs-button>
      <vs-button @click="closeUpdate" flat class="save mr-2 ml-2" danger>إلغاء</vs-button>
    </div>
    <div>
     
    </div>
  </div>
</template>

<script>
import axiosApi from '@/plugins/axios.js';

export default {
    props:['selectedCategory', 'product', 'sizes'],
    created(){
        this.addProduct = this.product;
        
        this.mySizes = [...this.sizes];

      if(this.mySizes.length >= 0){
        this.mySizes.forEach(size => {
          this.prices.push({size_id: size.id, name: size.name, price: this.product.prices[this.product.prices.findIndex(ele => ele.product_size_id == size.id)] || {}})
        })
      }

        

        console.log("my sizes ", this.prices)

    },
    data(){
        return{
            mySizes:[],
            prices:[],
            productTypes:[
                {label: "أساسي", value:1},
                {label: "إضافي", value:2},
            ],
            addProduct:{
                
            },
            toggleAddProduct: false,
            products: [],
        }
    },
    
    methods:{
      closeUpdate(){
        this.$emit("changeOperationStatus", 'add');
      },
        sendProductToBackend(){


          if(this.addProduct && !this.addProduct.name){
              this.$notify.error({
                    title: 'خطأ!',
                    message: 'اسم المنتج مطلوب',
                    type: 'danger'
              });
              return;
          }

          
          let myPrices = [];
          this.prices.forEach(ele => {
            if(Object.keys(ele.price).length > 0 && ele.price.price.toString().trim() != ''){
              myPrices.push({size_id: ele.size_id , price: ele.price.price})
            }
          })



          if(myPrices.length == 0){
              this.$notify.error({
                    title: 'خطأ!',
                    message: 'لا يوجد اسعار للمنتج اضف سعر علي الاقل',
                    type: 'danger'
              });
              return;
            }


            if(myPrices.findIndex(ele => isNaN(Number(ele.price))) > -1){
              this.$notify.error({
                    title: 'خطأ!',
                    message: 'قيمة السعر غير صالحة',
                    type: 'danger'
              });
              return;
            }


            

            const loading = this.$vs.loading();
            axiosApi.put(`/products/${this.product.id}`, {
                name: this.addProduct.name,
                type: this.addProduct.type,
                product_category_id: this.selectedCategory.id,
                prices: myPrices
            }).then(() => {
               
                this.$notify({
                  title: "تم",
                  message:`تم تعديل المنتج بنجاح `,
                  type: 'success'
                });
                

                this.prices = [{
                size_id: '',
                price: ''
                }];
                this.prices[0].size_id = this.sizes[0].id;
                this.prices[0].size = this.sizes[0];
                
                this.$emit('changeOperationStatus', 'add');
                this.$emit('successProductUpdated', 'add');

                this.addProduct = {};
            }).finally(() => loading.close()).catch(error => {
               if(error.response.status == 422){
                    this.$notify.error({
                    title: 'خطأ!',
                    message: 'هذا الإسم موجود مسبقاٌ',
                    type: 'danger'
                    });
                }
            });
        },
        getAllSizes(){
            const loading = this.$vs.loading();
            axiosApi.get('product-sizes').then(res => {
                this.sizes = [...res.data];
                this.mySizes = [...this.sizes];
                // this.prices[0].size_id = this.sizes[0].id;
                // this.prices[0].size = this.sizes[0];

                // console.log("sizes ", this.sizes)
                // console.log("prices ", this.product.prices)
                // console.log("prices ", this.product)

                

                this.mySizes.forEach(size => {
                  this.prices.push({size_id: size.id, name: size.name, price: this.product.prices[this.product.prices.findIndex(ele => ele.product_size_id == size.id)] || {}})
                })

                console.log("my sizes ", this.prices)

                // while(this.sizes.length > this.prices.length){
                //     this.pushNewPrice()
                // }

            }).finally(() => loading.close());
        },
        pushNewPrice(){
            let sizesNextIndex = this.product.prices.length;
            this.product.prices.push({product_size: this.sizes[sizesNextIndex], size: this.sizes[sizesNextIndex]})
        },
    }
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
        padding-top: 8px;
        margin: 0 11px;
        color: #fe5634;
      }
      .el-input {
        width: 95px;
        height: 30px;
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
    margin: 0 10px;
  }
}
</style>
