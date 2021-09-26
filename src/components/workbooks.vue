<template>
  <div class="workbooks mt-2">
    <div class="toggle-offer-product">
      <el-button @click="toggleOffers = !toggleOffers" v-if="toggleOffers">
        المنتجات
      </el-button>
      <el-button @click="toggleOffers = !toggleOffers" v-else>
        العروض
      </el-button>
    </div>

    <template v-if="!toggleOffers">
      <h3 class="text-right mb-2 d-block">المصنفات</h3>
      <div class="content">
        <swiper
          class="swiper"
          v-if="showProducts()"
          :options="swiperOptionBestSeller"
        >
          <swiper-slide v-for="category in categories" :key="category.id">
            <Category
              :class="{
                'selected-category': category.id == selectedCategory.id,
              }"
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
                <b-col md="7"></b-col>
                <b-col md="5" style="display: flex;place-content: flex-end;">
                  <div class="size">ك</div>
                  <div class="size">و</div>
                  <div class="size">ص</div>
                </b-col>
              </div>
            </b-col>
            <b-col md="12" lg="6" class="d-lg-block d-none pb-0">
              <div class="d-flex">
                <b-col md="7"></b-col>

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
                <b-col md="7">
                  {{ product.name }}
                </b-col>

                <div
                  class="prices"
                  v-if="product && product.prices && product.prices.length > 0"
                >
                  <div
                    v-if="
                      product.prices.find(
                        (ele) => ele.product_size_id == sizes[0].id
                      )
                    "
                    @click="
                      addItem(
                        product,
                        product.prices.find(
                          (ele) => ele.product_size_id == sizes[0].id
                        )
                      )
                    "
                    class="price"
                  >
                    {{
                      product.prices.find(
                        (ele) => ele.product_size_id == sizes[0].id
                      ).price
                    }}
                  </div>
                  <div v-else class="price null-price">
                    -
                  </div>

                  <div
                    v-if="
                      product.prices.find(
                        (ele) => ele.product_size_id == sizes[1].id
                      )
                    "
                    @click="
                      addItem(
                        product,
                        product.prices.find(
                          (ele) => ele.product_size_id == sizes[1].id
                        )
                      )
                    "
                    class="price"
                  >
                    {{
                      product.prices.find(
                        (ele) => ele.product_size_id == sizes[1].id
                      ).price
                    }}
                  </div>
                  <div v-else class="price null-price">
                    -
                  </div>

                  <div
                    v-if="
                      product.prices.find(
                        (ele) => ele.product_size_id == sizes[2].id
                      )
                    "
                    @click="
                      addItem(
                        product,
                        product.prices.find(
                          (ele) => ele.product_size_id == sizes[2].id
                        )
                      )
                    "
                    class="price"
                  >
                    {{
                      product.prices.find(
                        (ele) => ele.product_size_id == sizes[2].id
                      ).price
                    }}
                  </div>
                  <div v-else class="price null-price">
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
            <div class="col-md-4 text-center">
              <h5>المقاعد الممتلئة</h5>
              <div class="table-img complete">
                <img src="@/images/table-1.png" alt="" />
              </div>
              <h6>الإجمالي : {{ $store.state.fullCount }}</h6>
              <vs-button transparent @click="getTables(2)">
                أرقام المقاعد
              </vs-button>
            </div>

            <div class="col-md-4 text-center">
              <h5>المقاعد المحجوزة</h5>
              <div class="table-img reserved">
                <img src="@/images/table-3.png" alt="" />
              </div>
              <h6>الإجمالي : {{ $store.state.reservedCount }}</h6>
              <vs-button transparent @click="getTables(3)">
                أرقام المقاعد
              </vs-button>
            </div>

            <div class="col-md-4 text-center">
              <h5>المقاعد الفارغة</h5>
              <div class="table-img empty">
                <img src="@/images/table-2.png" alt="" />
              </div>
              <h6>الإجمالي : {{ $store.state.emptyCount }}</h6>
              <vs-button transparent @click="getTables(1)">
                أرقام المقاعد
              </vs-button>
            </div>

            <div
              class=" col-md-12"
              v-if="tableStatus && currentTables.length > 0"
            >
              <div class="showAllTables">
                <h6 v-if="tableStatus == 1">المقاعد الفارغة</h6>
                <h6 v-if="tableStatus == 2">المقاعد الممتلئة</h6>
                <h6 v-if="tableStatus == 3">المقاعد المحجوزة</h6>
                <span
                  :class="{ 'table-active': selectedTable.id === table.id }"
                  @click="setTableToOrder(table)"
                  v-for="table in currentTables"
                  :key="table.id"
                >
                  {{ table.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <h3 class="text-right mb-2 d-block">العروض</h3>
      <div class=" offers-section">
        <div>
          <el-collapse accordion>
            <div class="row">
              <div class="col-md-6" v-for="offer in offers"
                  :key="offer.id"
                  :name="offer.id">
                <el-collapse-item
                  class="mb-3"
                >
                  <template slot="title">
                    <div class="d-flex justify-content-between collapse-title">
                      <h6>{{ offer.name }}</h6>
                      <h6>
                        <span
                          ><el-button @click.stop="addOfferToCart(offer)">{{
                            offer.price
                          }}</el-button></span
                        >
                      </h6>
                    </div>
                  </template>
                  <div
                    class="offer-product"
                    v-for="product in offer.products"
                    :key="product.id"
                  >
                    <div class="d-flex">
                      <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        id="Layer_1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 512 512"
                        style="enable-background:new 0 0 512 512;"
                        xml:space="preserve"
                        width="20"
                        height="20"
                        
                      >
                        <g>
                          <g>
                            <path
                              d="M454.976,43.056c-3.591-3.588-9.411-3.591-13.003,0l-95.329,95.326c-3.592,3.591-3.592,9.411-0.001,13.003    c1.796,1.795,4.148,2.692,6.502,2.692c2.352,0,4.706-0.897,6.502-2.692l95.329-95.326    C458.566,52.467,458.566,46.646,454.976,43.056z"
                            />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path
                              d="M480.9,68.571c-3.592-3.589-9.412-3.589-13.003,0l-95.328,95.328c-3.59,3.592-3.59,9.412-0.001,13.003    c1.796,1.795,4.15,2.692,6.502,2.692c2.352,0,4.706-0.897,6.502-2.692L480.9,81.573C484.491,77.982,484.491,72.161,480.9,68.571z"
                            />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path
                              d="M390.969,229.548L509.307,111.21c3.591-3.592,3.591-9.412,0-13.003c-3.592-3.588-9.412-3.591-13.003,0L377.968,216.545    c-14.579,14.578-36.871,18.403-55.47,9.521c-3.7-1.766-8.118-0.873-10.839,2.193l-40.209,45.303    c-0.016,0.017-0.034,0.032-0.05,0.05c-0.016,0.018-0.028,0.037-0.044,0.055L97.567,469.464c-0.044,0.05-0.088,0.101-0.131,0.152    c-0.573,0.673-1.114,1.264-1.662,1.813c-11.475,11.474-30.145,11.473-41.615,0c-5.558-5.557-8.619-12.948-8.619-20.808    s3.061-15.25,8.629-20.818c0.534-0.537,1.124-1.076,1.803-1.654c0.052-0.043,0.102-0.087,0.152-0.131l108.648-96.434    c3.798-3.371,4.143-9.182,0.773-12.979c-3.371-3.799-9.183-4.146-12.979-0.773L43.99,414.202    c-1.038,0.885-1.967,1.742-2.833,2.609c-9.031,9.031-14.005,21.038-14.005,33.81c0,12.771,4.973,24.779,14.004,33.81    c9.323,9.321,21.566,13.982,33.812,13.981c12.241,0,24.487-4.659,33.803-13.976c0.883-0.881,1.738-1.811,2.616-2.839    l132.432-149.206l132.434,149.208c0.877,1.029,1.732,1.959,2.609,2.834c9.321,9.321,21.565,13.981,33.809,13.981    c12.245,0,24.49-4.661,33.812-13.982c18.64-18.643,18.64-48.975,0.005-67.613c-0.88-0.883-1.811-1.738-2.838-2.615    l-152.391-135.26l29.815-33.592C345.231,253.911,372.565,247.949,390.969,229.548z M431.514,428.019    c0.05,0.044,0.101,0.088,0.152,0.131c0.673,0.573,1.264,1.114,1.813,1.662c11.473,11.474,11.473,30.143,0.001,41.615    c-11.475,11.473-30.144,11.473-41.622-0.005c-0.543-0.543-1.086-1.135-1.659-1.808c-0.043-0.051-0.087-0.102-0.131-0.152    L256.111,318.54l22.939-25.845L431.514,428.019z"
                            />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path
                              d="M427.379,16.278c-3.592-3.589-9.412-3.589-13.003,0L296.04,134.617c-18.406,18.404-24.366,45.735-15.807,69.897    l-36.415,32.322l-34.998-31.064c18.099-35.612,11.492-78.851-17.222-107.566c-28.518-28.518-61.55-48.587-93.011-56.508    c-32.843-8.267-61.001-2.748-79.295,15.545s-23.814,46.455-15.545,79.296c7.922,31.459,27.99,64.491,56.51,93.008    c28.714,28.716,71.952,35.323,107.566,17.223c0,0,34.225,38.558,34.659,39.048c1.817,2.047,4.342,3.09,6.88,3.09    c2.171,0,4.349-0.764,6.1-2.318l81.866-72.664c3.065-2.721,3.958-7.141,2.193-10.839c-8.884-18.601-5.058-40.891,9.521-55.468    L427.379,29.281C430.97,25.689,430.97,19.869,427.379,16.278z M210.131,266.737l-33.468-37.706    c-2.964-3.339-7.902-4.069-11.702-1.722c-29.478,18.177-67.188,13.754-91.704-10.763c-26.204-26.203-44.557-56.21-51.68-84.497    c-6.625-26.317-2.819-48.267,10.718-61.803C45.83,56.708,67.78,52.904,94.096,59.53c28.287,7.122,58.296,25.474,84.498,51.678    c24.516,24.515,28.94,62.225,10.762,91.703c-2.344,3.801-1.617,8.737,1.722,11.702l38.888,34.516L210.131,266.737z"
                            />
                          </g>
                        </g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                      </svg>
                    </div>
                    <div>
                      <h6>{{ product.name }}</h6>
                    </div>
                    </div>
                  </div>
                </el-collapse-item>
              </div>
            </div>
          </el-collapse>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import Category from "@/components/Operations/Categorie/SelectableCategorie";
// import NoData from '@/components/NoData';
import axiosApi from "@/plugins/axios.js";

export default {
  props: {
    items: Array,
    toggleTablesNames: Boolean,
  },
  components: {
    Category,
    // NoData
  },

  watch: {
    toggleOffers(val) {
      if (val == true) {
        this.getOffers();
      }
    },
  },

  data: () => ({
    toggleOffers: false,
    allTables: [],
    offers: [],
    sizes: [],

    categories: [],
    selectedCategory: {},
    products: [],
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
    currentTables: [],
    tableStatus: "",
    selectedTable: {},
    emptyCount: "",
    reservedCount: "",
    fullCount: "",
  }),
  created() {
    this.getAllCategories();
    this.getAllTables();
    this.getSizes();
  },
  mounted() {
    if (JSON.parse(localStorage.getItem("HevenSelectedCategory"))) {
      this.selectCategory(
        JSON.parse(localStorage.getItem("HevenSelectedCategory"))
      );
    }
  },
  methods: {
    getOffers() {
      const loading = this.$loading({
        lock: true,
        text: false,
        spinner: "el-icon-loading",
        background: "rgba(255,255,255,.7)",
        customClass: "fullscreen-loading",
      });
      axiosApi
        .get(`/offers`)
        .then((res) => {
          this.offers = res.data;
        })
        .finally(() => {
          loading.close();
        });
    },
    getSizes() {
      const loading = this.$loading({
        lock: true,
        text: false,
        spinner: "el-icon-loading",
        background: "rgba(255,255,255,.7)",
        customClass: "fullscreen-loading",
      });
      axiosApi
        .get(`/product-sizes`)
        .then((res) => {
          this.sizes = res.data;
        })
        .finally(() => {
          loading.close();
        });
    },
    showProducts() {
      let currOrder = this.$store.state.orders[this.$store.state.selectedOrder];
      console.log("obbbbb ", currOrder);
      if (
        (currOrder && currOrder.orderType.id != 3) ||
        (currOrder &&
          currOrder.orderType.id == 3 &&
          currOrder.orderType.table &&
          currOrder.orderType.table.id)
      ) {
        return true;
      } else {
        // console.log(currOrder.orderType.id)
        return false;
      }
    },
    setTableToOrder(table) {
      // if(table.status == 1 || table.status == 2){
      // console.log("hi")
      this.selectedTable = { ...table };
      this.$store.commit("AddTableToOrder", table);
      this.currentTables = [];
      // }
    },
    getTables(status) {
      this.tableStatus = status;
      this.toggleTablesNames = true;
      this.currentTables = this.$store.state.allTables.filter(
        (ele) => ele.status === status
      );
    },
    getAllTables() {
      axiosApi.get(`/tables`).then((res) => {
        this.allTables = res.data;
        this.allTables.splice(
          this.allTables.findIndex((ele) => ele.id == 1),
          1
        );
        this.$store.commit("updateTables", this.allTables);
      });
    },
    selectCategory(category) {
      this.selectedCategory = category;
      this.$store.commit("UpdateSelectedCategory", { ...category });

      this.getProductsByCategorie(category);
    },
    getProductsByCategorie(category) {
      const loading = this.$loading({
        lock: true,
        text: false,
        spinner: "el-icon-loading",
        background: "rgba(255,255,255,.7)",
        customClass: "fullscreen-loading",
      });
      axiosApi
        .get(`/product-categories/${category.id}/products`)
        .then((res) => {
          this.products = res.data;
        })
        .finally(() => {
          loading.close();
        });
    },
    getAllCategories() {
      const loading = this.$loading({
        lock: true,
        text: false,
        spinner: "el-icon-loading",
        background: "rgba(255,255,255,.7)",
        customClass: "fullscreen-loading",
      });
      axiosApi
        .get("product-categories")
        .then((res) => {
          this.categories = res.data;
        })
        .finally(() => {
          loading.close();
        });
    },
    addOfferToCart(offer) {
      let isOfferExist = false;
      this.$store.state.orders[
        this.$store.state.selectedOrder
      ].products.forEach((ele) => {
        if (ele.offerId == offer.id) {
          isOfferExist = true;
        }
      });

      if (!isOfferExist) {
        let products = [];

        offer.products.map((prod) => {
          let price = prod.prices.find(
            (ele) => ele.product_size_id == prod.pivot.product_size_id
          ).price;

          products.push({
            priceObject: prod.prices.find(
              (ele) => ele.product_size_id == prod.pivot.product_size_id
            ),
            price: price,

            name: prod.name,
            id: prod.id,
            size: this.sizes.find(
              (ele2) => ele2.id == prod.pivot.product_size_id
            ).name,

            qty: 1,
            type: 1,

            offerId: offer.id,
            discount: Number(offer.discount),
            kitchen_type: this.categories.find(
              (ele2) => ele2.id == prod.product_category_id
            ).kitchen_type,

            product_category_id: prod.product_category_id,
            printer_id: this.categories.find(
              (ele2) => ele2.id == prod.product_category_id
            ).printer_id,
          });
        });

        console.log(products);

        if (
          this.$store.state.orders[this.$store.state.selectedOrder].orderType.id
        ) {
          console.log(document.querySelector("#idToScrollBottom"));

          this.$store.commit("AddProductsToOrder", [...products]);
          console.log("added");
        } else {
          this.$notify.error({
            title: "خطأ!",
            message: "قم بإختيار نوع للطلب أولاً",
            type: "danger",
          });
        }
        console.log("scrolled");

        setTimeout(() => {
          const div = document.querySelector("#idToScrollBottom");
          div.scrollTop = div.scrollHeight;
        }, 0);
      }
    },
    addItem(item, price) {
      //push selected item with large size
      let product = {
        discount : 0,
        priceObject: price,
        price: price.price,
        qty: 1,
        name: item.name,
        id: item.id,
        
        type: 1,
        offerId: null,
        size: price.product_size.name,
        kitchen_type: this.categories.find(
          (ele2) => ele2.id == item.product_category_id
        ).kitchen_type,
        product_category_id: item.product_category_id,
        printer_id: this.categories.find(
          (ele2) => ele2.id == item.product_category_id
        ).printer_id,
      };

      if (
        this.$store.state.orders[this.$store.state.selectedOrder].orderType.id
      ) {
        console.log(document.querySelector("#idToScrollBottom"));
        this.$store.commit("AddProductToOrder", { ...product });
        console.log("added");
      } else {
        this.$notify.error({
          title: "خطأ!",
          message: "قم بإختيار نوع للطلب أولاً",
          type: "danger",
        });
      }
      console.log("scrolled");

      setTimeout(() => {
        const div = document.querySelector("#idToScrollBottom");
        div.scrollTop = div.scrollHeight;
      }, 0);
    },
  },
};
</script>
<style lang="scss">
@import "../styles/workbook.scss";

.tables {
  .col-md-4 {
    > h6 {
      margin-bottom: 5px;
      margin-top: 15px;
    }
  }

  margin-top: 10px;
  .table-img {
    padding: 50px 32px;
    border-radius: 50%;
    margin: 0 22px;
    width: 168px;
    height: 162px;
    margin: auto;
    text-align: center;
  }
  .table-img.complete {
    box-shadow: 0px 3px 6px 0 #ff09091c;
  }
  .table-img.reserved {
    box-shadow: 0px 3px 6px 0 #ffdd0040;
  }
  .table-img.empty {
    box-shadow: 0px 3px 6px 0 #00ff1124;
  }
  button {
    margin: auto;
  }

  .showAllTables {
    text-align: start;
    padding: 17px;
    margin-top: 20px;
    background: #ebf9fc;

    .table-active {
      background: #fe5634;
      color: #fff;
    }

    h6 {
      margin-right: 0;
      font-size: 17px;
      margin-top: 0 !important;
      margin-bottom: 4px;
    }

    span {
      padding: 5px 14px;
      transition: all ease 0.4s;
      cursor: pointer;
      background: #fff;
      border-radius: 50%;
      display: inline-block;
      margin: 0 5px;
      text-align: center;
    }
  }
}
</style>
