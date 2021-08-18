<template>
  <div class="workbooks mt-2">
    <h3 class="text-right mb-2 d-block">المصنفات</h3>
    <div class="content">


      <swiper class="swiper" v-if="showProducts()" :options="swiperOptionBestSeller">
          <swiper-slide v-for="category in categories" :key="category.id">
              <Category 
                  :class="{'selected-category': category.id == selectedCategory.id}"
                  @click.native="selectCategory(category)" 
                  :categorie="category" 
              />
          </swiper-slide>
          
          <div class="swiper-pagination" slot="pagination"></div>
          
      </swiper>



      <div class="products mt-3 pt-3" v-if="showProducts()">
            <b-row>
              <b-col md="12" lg="6" class="pb-0">
                <div class="d-flex">
                  <b-col md="7" ></b-col>
                  <b-col md="5" style="display: flex;place-content: flex-end;">
                    <div class="size">ك</div>
                    <div class="size">و</div>
                    <div class="size">ص</div>
                  </b-col>
                </div>
              </b-col>
              <b-col md="12" lg="6" class="d-lg-block d-none pb-0">
                <div class="d-flex">
                  <b-col md="7" ></b-col>

                  <b-col md="5" style="display: flex;place-content: flex-end;">
                    <div class="size">ك</div>
                    <div class="size">و</div>
                    <div class="size">ص</div>
                  </b-col>

                </div>
              </b-col>



              
              
              <b-col
                md="12"
                lg="6"
                v-for="(product, index) in products"
                :key="index"
                class="pt-0"
              >
                <div class="d-flex meunItem">
                  <b-col md="7" >
                    {{ product.name }}
                  </b-col>


                  <div class="prices" v-if="product && product.prices && product.prices.length > 0"> 

                      

                            <div 
                              v-if="product.prices.find(ele => ele.product_size_id == sizes[0].id)"
                              @click="addItem(product, product.prices.find(ele => ele.product_size_id == sizes[0].id))" 
                              class="price"
                            >
                                {{ product.prices.find(ele => ele.product_size_id == sizes[0].id).price }}
                            </div>
                            <div v-else  class="price null-price">
                                -
                            </div>


                            <div v-if="product.prices.find(ele => ele.product_size_id == sizes[1].id)" @click="addItem(product, product.prices.find(ele => ele.product_size_id == sizes[1].id))" class="price">
                                {{ product.prices.find(ele => ele.product_size_id == sizes[1].id).price }}
                            </div>
                            <div v-else  class="price null-price">
                                -
                            </div>

                            <div v-if="product.prices.find(ele => ele.product_size_id == sizes[2].id)" @click="addItem(product, product.prices.find(ele => ele.product_size_id == sizes[2].id))" class="price">
                                {{ product.prices.find(ele => ele.product_size_id == sizes[2].id).price }}
                            </div>
                            <div v-else  class="price null-price">
                                -
                            </div>


          

                  
                  </div>

                  <!-- <b-col md="2"
                    ><div class="price">
                      {{ product.pricelarge }}
                    </div></b-col
                  >
                  <b-col md="2"
                    ><div class="price" @click="(product)">
                      {{ product.priceMedium }}
                    </div></b-col
                  > -->
                </div>
              </b-col>
            </b-row>
          </div>

          <div v-else class="tables">
            <div class="row">
              <div class="col-md-4">
                <h6>المقاعد الممتلئة</h6>
                <div class="table-img complete">
                  <img src="@/images/table-1.png" alt="">
                </div>
                <h6>الإجمالي : {{$store.state.fullCount}} </h6>
                <vs-button transparent @click="getTables(2)"> أرقام المقاعد </vs-button>

                
              </div>

              <div class="col-md-4">
                 <h6>المقاعد المحجوزة</h6>
                <div class="table-img reserved">
                  <img src="@/images/table-3.png" alt="">
                </div>
                <h6>الإجمالي : {{$store.state.reservedCount}} </h6>
                <vs-button transparent @click="getTables(3)"> أرقام المقاعد </vs-button>

                

              </div>

              <div class="col-md-4">
                 <h6>المقاعد الفارغة</h6>
                <div class="table-img empty">
                  <img src="@/images/table-2.png" alt="">
                </div>
                <h6>الإجمالي : {{$store.state.emptyCount}} </h6>
                <vs-button transparent @click="getTables(1)"> أرقام المقاعد </vs-button>


               

              </div>

              




              <div class=" col-md-12" v-if=" tableStatus && currentTables.length > 0">
                  <div class="showAllTables">
                    <h6 v-if="tableStatus == 1" > المقاعد الفارغة </h6>
                    <h6 v-if="tableStatus == 2" > المقاعد الممتلئة  </h6>
                    <h6 v-if="tableStatus == 3" > المقاعد المحجوزة   </h6>
                    <span :class="{'table-active': selectedTable.id === table.id}" @click="setTableToOrder(table)" v-for="table in currentTables" :key="table.id"> {{table.name}} </span>
                  </div>
              </div>


            </div>
          </div>

          <!-- <div v-else>
            <div v-if="products.length == 0">
              <NoData msg="لا توجد منتجات متاحة " />
            </div>
            <div v-else>
              <NoData msg="قم بفتح اوردر جديد اولاً" />
            </div>
          </div> -->


      <!-- <b-tabs>
        <b-tab v-for="(item, index) in workbook" :key="index">
          <template #title>
            <b-img :src="item.img" small></b-img>
            <p>{{ item.text }}</p>
          </template>

          
        </b-tab>
      </b-tabs> -->
    </div>
  </div>
</template>
<script>
import Category from '@/components/Operations/Categorie/SelectableCategorie';
// import NoData from '@/components/NoData';
import axiosApi from '@/plugins/axios.js'

export default {
  props: {
    items: Array,
    toggleTablesNames: Boolean
  },
  components:{
    Category,
    // NoData
  },
  
  
  data: () => ({
    allTables:[],
    sizes:[],

    categories: [],
    selectedCategory:{},
    products:[],
    swiperOptionBestSeller: {
                slidesPerView: 8,
                spaceBetween: 5,
                slidesPerGroup: 1,
                loopFillGroupWithBlank: false,
                breakpoints: {
                1200: {
                    slidesPerView: 8,
                    spaceBetween: 5,
                },
                1024: {
                    slidesPerView: 6,
                    spaceBetween: 5,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 5,
                },
                350: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                320: {
                    slidesPerView: 1,
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
            currentTables:[],
            tableStatus:"",
            selectedTable:{},
            emptyCount:"",
            reservedCount:"",
            fullCount:"",
  }),
  created(){
    this.getAllCategories();
    this.getAllTables();
    this.getSizes();
  },
  mounted(){
        if(JSON.parse(localStorage.getItem("HevenSelectedCategory"))){
            this.selectCategory(JSON.parse(localStorage.getItem("HevenSelectedCategory")));
        }
  },
  methods: {
    getSizes(){
      const loading = this.$loading({
          lock: true,
          text: false,
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255,.7)',
          customClass: 'fullscreen-loading'
        });
      axiosApi.get(`/product-sizes`).then(res => {
        this.sizes = res.data;
      }).finally(() => {
        loading.close()
      })
    },
    showProducts(){
      let currOrder = this.$store.state.orders[this.$store.state.selectedOrder];
      console.log("obbbbb ", currOrder)
      if( (currOrder && currOrder.orderType.id != 3) || (currOrder && currOrder.orderType.id == 3 && currOrder.orderType.table && currOrder.orderType.table.id) ){
        return true;
      }else{
        // console.log(currOrder.orderType.id)
        return false;
      }
    },
    setTableToOrder(table){
      // if(table.status == 1 || table.status == 2){
        // console.log("hi")
        this.selectedTable = {...table};
        this.$store.commit("AddTableToOrder", table);
        this.currentTables = []
      // }
    },
    getTables(status){
      this.tableStatus = status;
      this.toggleTablesNames = true;
      this.currentTables = this.$store.state.allTables.filter(ele => ele.status === status);
    },
    getAllTables(){
      axiosApi.get(`/tables`).then(res => {

        this.allTables = res.data;
        this.allTables.splice(this.allTables.findIndex(ele => ele.id == 1), 1);
        this.$store.commit("updateTables",this.allTables);
        
      })
    },
    selectCategory(category){
        this.selectedCategory = category;
        this.$store.commit("UpdateSelectedCategory", {...category});

        this.getProductsByCategorie(category);
    },
    getProductsByCategorie(category){
        const loading = this.$loading({
          lock: true,
          text: false,
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255,.7)',
          customClass: 'fullscreen-loading'
        });
        axiosApi.get(`/product-categories/${category.id}/products`).then(res => {
            this.products = res.data;
        }).finally(() => {
          loading.close()
        });
    },
    getAllCategories(){
       const loading = this.$loading({
          lock: true,
          text: false,
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255,.7)',
          customClass: 'fullscreen-loading'
        });
        axiosApi.get('product-categories').then(res => {
            this.categories = res.data;
        }).finally(() =>{
           loading.close()
        });
    },
     addItem(item, price) {
      //push selected item with large size
      let product = {
        priceObject: price,
        price: price.price,
        qty: 1,
        name: item.name,
        id: item.id,
        type: 1,
        size: price.product_size.name,
        kitchen_type: this.categories.find(
          (ele2) => ele2.id == item.product_category_id
        ).kitchen_type,
        product_category_id: item.product_category_id,
        printer_id: this.categories.find(
          (ele2) => ele2.id == item.product_category_id
        ).printer_id,
      };


      if(this.$store.state.orders[this.$store.state.selectedOrder].orderType.id){

        console.log(document.querySelector('#idToScrollBottom'))
        this.$store.commit('AddProductToOrder', {...product})
        console.log("added")
         
      }else{
        this.$notify.error({
          title: 'خطأ!',
          message: 'قم بإختيار نوع للطلب أولاً',
          type: 'danger'
        });
      }
      console.log("scrolled")

      setTimeout(() => {
        const div =  document.querySelector('#idToScrollBottom');
      div.scrollTop = div.scrollHeight ;
      }, 0)

       
    },
  },
};
</script>
<style lang="scss">
@import "../styles/workbook.scss";
.tables{
  
  .col-md-4{
    >h6{
    margin-bottom:5px;
    margin-top: 15px;
  }
  }
  
  margin-top:10px;
  .table-img{
         padding: 50px 32px;
    border-radius: 50%;
    margin: 0 22px;
    width: 168px;
    height: 162px;
    margin: auto;
    text-align: center;
  }
  .table-img.complete{
    box-shadow:0px 3px 6px 0 #ff09091c;
  
  }
  .table-img.reserved{
    box-shadow:0px 3px 6px 0 #ffdd0040;
  }
  .table-img.empty{
    box-shadow: 0px 3px 6px 0 #00ff1124;
  }
  button{
    margin: auto;
    
  }
  

  .showAllTables{
    text-align: start;
    padding: 17px;
    margin-top: 20px;
    background: #EBF9FC;


    .table-active{
      background: #FE5634;
      color:#FFF;
    }
    


    h6{
              margin-right: 0;
    font-size: 17px;
    margin-bottom: 4px;
    }

    span{
        padding: 5px 14px;
        transition: all ease .4s;
        cursor: pointer;
        background: #FFF;
        border-radius: 50%;
        display: inline-block;
        margin:0 5px;
        text-align: center;
    }
  }
}
</style>