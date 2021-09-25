<template>
  <div class="add-new-offers-page">
    <div class="container-fluid">
      <div class="header d-flex mb-4">
        <div style="flex: 1">
          <h2 style="margin-bottom:0;margin-top:10px">عرض جديد</h2>
        </div>

        <div class="mt-4">
          <el-button transparent @click="$router.push(`/offers`)">
            الرجوع الي العروض
          </el-button>
        </div>
      </div>

      <div class="add-offer">
        <el-form :model="newOffer" ref="newOffer" class="demo-ruleForm">
          <div class="row">
            <div class="col-md-6">
              <div>
                <h6>اسم العرض</h6>
                <el-form-item
                  prop="name"
                  :rules="[{ required: true, message: 'اسم العرض مطلوب' }]"
                >
                  <el-input v-model="newOffer.name"></el-input>
                </el-form-item>
              </div>
            </div>

            <div class="col-md-3">
              <div>
                <h6>سعر العرض</h6>
                <el-form-item
                  prop="price"
                  :rules="[
                    { required: true, message: 'سعر العرض مطلوب' },
                    { type: 'number', message: 'سعر العرض غير صالح' },
                  ]"
                >
                  <el-input v-model.number="newOffer.price"></el-input>
                </el-form-item>
              </div>
            </div>

            <div class="col-md-3">
              <div>
                <h6>قيمة الخصم للعرض</h6>
                <el-form-item
                  prop="discount"
                  :rules="[
                    { required: true, message: 'قيمة الخصم مطلوبة' },
                    { type: 'number', message: 'قيمة خصم العرض غير صالح' },
                  ]"
                >
                  <el-input v-model.number="newOffer.discount"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-8">
              <h4 class="mb-1 head d-flex">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Capa_1"
                    enable-background="new 0 0 512 512"
                    height="25"
                    viewBox="0 0 512 512"
                    width="25"
                  >
                    <g>
                      <path
                        d="m447 271h-382c-19.33 0-35-15.67-35-35 0-19.33 15.67-35 35-35h382c19.33 0 35 15.67 35 35 0 19.33-15.67 35-35 35z"
                        fill="#a07651"
                      />
                      <path
                        d="m447 201h-191v70h191c19.33 0 35-15.67 35-35 0-19.33-15.67-35-35-35z"
                        fill="#7e5d40"
                      />
                      <path
                        d="m447 391h-382c-19.33 0-35-15.67-35-35 0-19.33 15.67-35 35-35h382c19.33 0 35 15.67 35 35 0 19.33-15.67 35-35 35z"
                        fill="#a07651"
                      />
                      <path
                        d="m447 321h-191v70h191c19.33 0 35-15.67 35-35 0-19.33-15.67-35-35-35z"
                        fill="#7e5d40"
                      />
                      <path
                        d="m427 511h-342c-46.944 0-85-38.056-85-85 0-22.091 17.909-40 40-40h432c22.091 0 40 17.909 40 40 0 46.944-38.056 85-85 85z"
                        fill="#ffd422"
                      />
                      <path
                        d="m472 386h-216v125h171c46.944 0 85-38.056 85-85 0-22.091-17.909-40-40-40z"
                        fill="#ff9100"
                      />
                      <path
                        d="m477 261h-442c-19.33 0-35 15.67-35 35 0 19.33 15.67 35 35 35h137.137c5.882 0 11.221 3.438 13.655 8.793l42.414 93.31c4.955 10.899 15.822 17.897 27.794 17.897 11.972 0 22.84-6.998 27.794-17.897l42.413-93.31c2.434-5.355 7.773-8.793 13.656-8.793h137.137c19.33 0 35-15.67 35-35 0-19.33-15.67-35-35-35z"
                        fill="#ff8e8e"
                      />
                      <path
                        d="m477 261h-221v190c11.972 0 22.84-6.998 27.794-17.897l42.413-93.31c2.434-5.355 7.773-8.793 13.656-8.793h137.137c19.33 0 35-15.67 35-35 0-19.33-15.67-35-35-35z"
                        fill="#ff3c7d"
                      />
                      <path
                        d="m462 206h-412c-27.614 0-50-22.386-50-50v-10c0-80.081 64.919-145 145-145h222c80.081 0 145 64.919 145 145v10c0 27.614-22.386 50-50 50z"
                        fill="#ffd422"
                      />
                      <path
                        d="m367 1h-111v205h206c27.614 0 50-22.386 50-50v-10c0-80.081-64.919-145-145-145z"
                        fill="#ff9100"
                      />
                      <circle cx="256" cy="136" fill="#fff5f5" r="15" />
                      <circle cx="331" cy="136" fill="#ebe1dc" r="15" />
                      <circle cx="406" cy="136" fill="#ebe1dc" r="15" />
                      <g fill="#fff5f5">
                        <circle cx="181" cy="136" r="15" />
                        <circle cx="106" cy="136" r="15" />
                        <circle cx="218.5" cy="86" r="15" />
                      </g>
                      <circle cx="293.5" cy="86" fill="#ebe1dc" r="15" />
                      <circle cx="368.5" cy="86" fill="#ebe1dc" r="15" />
                      <circle cx="143.5" cy="86" fill="#fff5f5" r="15" />
                      <path
                        d="m271 136c0-8.284-6.716-15-15-15v30c8.284 0 15-6.716 15-15z"
                        fill="#ebe1dc"
                      />
                    </g>
                  </svg>
                </div>
                <div>
                  <h6 class="mr-1 " style="    margin-top: -3px;font-size: 21px;">
                    المنيو
                  </h6>
                </div>
              </h4>
              <swiper class="swiper mb-4" :options="swiperOptionBestSeller">
                <swiper-slide v-for="category in categories" :key="category.id">
                  <Category
                    :class="{
                      'selected-category': category.id == selectedCategory.id,
                    }"
                    @click.native="selectCategory(category)"
                    :categorie="category"
                  >
                  </Category>
                </swiper-slide>

                <div class="swiper-pagination" slot="pagination"></div>
              </swiper>

              <div
                class="products"
                v-if="
                  selectedCategory && Object.keys(selectedCategory).length > 0
                "
              >
                <b-tabs
                  v-model="selectedTab"
                  pills
                  card
                  v-if="selectedCategory"
                >
                  <b-tab title="المنتجات" active>
                    <b-card-text>
                      <div class="row">
                        <div
                          class="col-md-6"
                          v-for="product in [...products]"
                          :key="product.id"
                        >
                          <div class="d-flex meunItem">
                            <b-col md="5">{{ product.name }}</b-col>
                            <div
                              class="prices d-flex"
                              v-if="
                                product &&
                                  product.prices &&
                                  product.prices.length > 0
                              "
                            >
                              <div
                                v-if="
                                  product.prices.find(
                                    (ele) => ele.product_size_id == sizes[0].id
                                  )
                                "
                                @click="
                                  addPriceToOffer(
                                    product,
                                    product.prices.find(
                                      (ele) =>
                                        ele.product_size_id == sizes[0].id
                                    )
                                  )
                                "
                                :class="{ price: true }"
                              >
                                {{
                                  product.prices.find(
                                    (ele) => ele.product_size_id == sizes[0].id
                                  ).price
                                }}
                              </div>
                              <div v-else class="price">
                                -
                              </div>

                              <div
                                v-if="
                                  product.prices.find(
                                    (ele) => ele.product_size_id == sizes[1].id
                                  )
                                "
                                :class="{ price: true }"
                                @click="
                                  addPriceToOffer(
                                    product,
                                    product.prices.find(
                                      (ele) =>
                                        ele.product_size_id == sizes[1].id
                                    )
                                  )
                                "
                              >
                                {{
                                  product.prices.find(
                                    (ele) => ele.product_size_id == sizes[1].id
                                  ).price
                                }}
                              </div>
                              <div v-else class="price">
                                -
                              </div>

                              <div
                                v-if="
                                  product.prices.find(
                                    (ele) => ele.product_size_id == sizes[2].id
                                  )
                                "
                                :class="{ price: true }"
                                @click="
                                  addPriceToOffer(
                                    product,
                                    product.prices.find(
                                      (ele) =>
                                        ele.product_size_id == sizes[2].id
                                    )
                                  )
                                "
                              >
                                {{
                                  product.prices.find(
                                    (ele) => ele.product_size_id == sizes[2].id
                                  ).price
                                }}
                              </div>
                              <div v-else class="price">
                                -
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </b-card-text>
                  </b-tab>
                  <!-- <b-tab title="إضافي">
                    <div class="row">
                      <div
                        class="col-md-4"
                        v-for="product in additions"
                        :key="product.id"
                      >
                        <div class="d-flex meunItem">
                          <div class="name">{{ product.name }}</div>
                          <div class="price-circle d-flex">
                            <div
                              v-if="
                                product.prices.find(
                                  (ele) => ele.product_size_id == sizes[0].id
                                )
                              "
                              @click="
                                addPriceToOffer(
                                  product,
                                  product.prices.find(
                                    (ele) => ele.product_size_id == sizes[0].id
                                  )
                                )
                              "
                              :class="{ price: true }"
                            >
                              {{
                                product.prices.find(
                                  (ele) => ele.product_size_id == sizes[0].id
                                ).price
                              }}
                            </div>
                            <div v-else class="price">
                              -
                            </div>

                            <div
                              v-if="
                                product.prices.find(
                                  (ele) => ele.product_size_id == sizes[1].id
                                )
                              "
                              @click="
                                addPriceToOffer(
                                  product,
                                  product.prices.find(
                                    (ele) => ele.product_size_id == sizes[1].id
                                  )
                                )
                              "
                              :class="{ price: true }"
                            >
                              {{
                                product.prices.find(
                                  (ele) => ele.product_size_id == sizes[1].id
                                ).price
                              }}
                            </div>
                            <div v-else class="price">
                              -
                            </div>

                            <div
                              v-if="
                                product.prices.find(
                                  (ele) => ele.product_size_id == sizes[2].id
                                )
                              "
                              @click="
                                addPriceToOffer(
                                  product,
                                  product.prices.find(
                                    (ele) => ele.product_size_id == sizes[2].id
                                  )
                                )
                              "
                              :class="{ price: true }"
                            >
                              {{
                                product.prices.find(
                                  (ele) => ele.product_size_id == sizes[2].id
                                ).price
                              }}
                            </div>
                            <div v-else class="price">
                              -
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </b-tab> -->
                </b-tabs>
              </div>

               <el-form-item class="mt-4">
                    <el-button type="primary" @click="submitAddOffer('newOffer')"
                    >حفظ العرض</el-button
                    >
                </el-form-item>

            </div>
            <div class="col-md-4">
              <div>
                <h4 class="mb-1 head d-flex">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      version="1.1"
                      id="Capa_1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 511.548 511.548"
                      style="enable-background:new 0 0 511.548 511.548;"
                      xml:space="preserve"
                      width="30"
                      height="30"
                    >
                      <g>
                        <path
                          style="fill:#FF6200;"
                          d="M394.441,191.548C307.52,95.547,287.775,20.882,287.775,20.882s-15.054,6.718-32,22.11   l-21.333,244.556l21.333,209h0.001c104.842-0.001,189.833-84.992,189.833-189.833C445.608,263.409,421.423,221.349,394.441,191.548   z"
                        />
                        <path
                          style="fill:#FD7D21;"
                          d="M223.775,84.882c-10.873,21.747-13.434,46.265-13.33,65.08c0.1,18.252-12.758,34.004-30.655,37.584   c-12.504,2.501-25.43-1.413-34.447-10.43l-17.568-17.568c0,0-26.044,35.911-30.507,42.667   c-20.047,30.346-31.613,66.786-31.321,105.945c0.778,104.581,85.244,188.388,189.828,188.388V42.992   C244.69,53.06,232.797,66.838,223.775,84.882z"
                        />
                        <g>
                          <path
                            style="fill:#FFB62D;"
                            d="M405.561,181.48c-43.372-47.903-69.147-90.072-83.134-117.013    c-15.148-29.181-20.112-47.276-20.15-47.42L297.768,0l-16.104,7.183c-0.917,0.409-11.941,5.434-25.89,16.238l-10.667,18.794    l10.667,22.117c8.336-9.351,16.934-16.341,23.849-21.18c11.282,28.696,39.881,87.981,103.699,158.465    c14.217,15.702,47.285,57.376,47.285,105.099c0,96.403-78.43,174.833-174.832,174.833h-0.001l-10.667,19.333l10.667,10.667h0.001    c112.945-0.001,204.832-91.888,204.832-204.833C460.608,265.764,440.544,220.118,405.561,181.48z"
                          />
                          <path
                            style="fill:#FDCB02;"
                            d="M132.499,430.925c-32.898-32.646-51.206-76.285-51.553-122.876    c-0.26-34.878,9.712-68.616,28.837-97.565c2.335-3.534,11.702-16.602,19.833-27.879l5.119,5.119    c12.592,12.592,30.53,18.025,47.996,14.532c24.888-4.978,42.852-27.004,42.713-52.375c-0.087-15.701,1.881-38.558,11.746-58.29    c5.351-10.702,11.883-19.741,18.584-27.258V23.421c-14.692,11.381-32.628,29.175-45.417,54.753    c-12.515,25.031-15.018,52.9-14.913,71.87c0.061,11.04-7.761,20.626-18.598,22.793c-7.598,1.518-15.414-0.844-20.898-6.328    l-29.997-29.997l-10.319,14.229c-1.071,1.477-26.289,36.256-30.88,43.205c-22.419,33.937-34.109,73.47-33.806,114.325    c0.406,54.565,21.864,105.686,60.421,143.948c38.554,38.259,89.839,59.329,144.407,59.329v-30    C209.176,481.548,165.396,463.57,132.499,430.925z"
                          />
                        </g>
                        <g>
                          <path
                            style="fill:#ED3800;"
                            d="M255.775,206.042c-0.111,0-0.222,0.004-0.333,0.004l-24.997,117.329l24.997,117.329    c0.111,0,0.222,0.004,0.333,0.004c64.801,0,117.333-52.532,117.333-117.333C373.108,258.574,320.576,206.042,255.775,206.042z"
                          />
                          <path
                            style="fill:#FF4B00;"
                            d="M138.441,323.375c0,64.69,52.352,117.149,117,117.329V206.046    C190.794,206.226,138.441,258.685,138.441,323.375z"
                          />
                        </g>
                        <g>
                          <polygon
                            style="fill:#D9E7EC;"
                            points="319.432,254.503 286.177,254.503 255.441,299.513 245.108,340.882 255.441,348.214   "
                          />
                          <path
                            style="fill:#D9E7EC;"
                            d="M306.248,317.472c-20.858,0-36.601,13.971-36.601,38.372c0,24.597,15.742,38.371,36.601,38.371    s36.601-13.774,36.601-38.371C342.849,331.443,327.106,317.472,306.248,317.472z M306.248,372.963    c-4.329,0-8.658-3.936-8.658-17.12c0-13.184,4.329-17.12,8.658-17.12s8.658,3.936,8.658,17.12    C314.906,369.027,310.577,372.963,306.248,372.963z"
                          />
                          <polygon
                            style="fill:#FAFCFD;"
                            points="225.372,392.247 255.441,348.214 255.441,299.513 192.117,392.247   "
                          />
                          <path
                            style="fill:#FAFCFD;"
                            d="M241.902,290.907c0-24.4-15.742-38.372-36.601-38.372s-36.601,13.971-36.601,38.372    c0,24.597,15.742,38.372,36.601,38.372S241.902,315.504,241.902,290.907z M196.643,290.907c0-13.184,4.329-17.12,8.658-17.12    c4.329,0,8.658,3.936,8.658,17.12c0,13.184-4.329,17.12-8.658,17.12C200.972,308.027,196.643,304.091,196.643,290.907z"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div>
                    <h6 class="mr-1 " style="    margin-top: -3px;font-size: 21px;">
                      منتجات العرض
                    </h6>
                  </div>
                </h4>

                <div>
                    <table style="width: 100%">
                        <tr>
                            <td> المنتج </td>
                            <td> السعر </td>
                            <td> حذف </td>
                        </tr>
                        <tr v-for="(prod, index) in newOffer.products" :key="index">
                            <td> {{ prod.name }} </td>
                            <td> {{ prod.price }} </td>
                                    <td>
                                <div class="edit-delete">
                                        <el-button
                                        @click.prevent="deleteProductFromOffer(prod, index)"
                                        style="padding: 5px; height: 26px; margin: 5px"
                                        :type="'danger'"
                                        :icon="'el-icon-close'"
                                        circle
                                        ></el-button>

                                </div>
                                    </td>
                        </tr>
                    </table>

                    <table style="width:100%">
                        <tr>
                            <td>إجمالي سعر العرض</td>
                            <td> {{totalPrice}} </td>
                        </tr>
                    </table>
                </div>
                <!-- <div class="row" v-if="newOffer.products.length > 0">
                  <div
                    class="col-md-4"
                    v-for="(prod, index) in newOffer.products"
                    :key="index"
                  >
                    <div class="d-flex justify-content-between offer-prod">
                      <div>
                        <h6>{{ prod.name }}</h6>
                      </div>
                      <div class="d-flex">
                        <div>
                          <h6 class="price">{{ prod.price }}</h6>
                        </div>
                        <div class="edit-delete">
                          <button
                            class="btn emp-dept-delete"
                            @click.prevent="newOffer.products.splice(index, 1)"
                          >
                            <img
                              src="@/images/Icon-material-delete.svg"
                              alt=""
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> -->
                <!-- <div v-else>
                  <NoData />
                </div> -->
              </div>
            </div>
          </div>

         
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import NoData from "@/components/NoData.vue";
import Category from "@/components/Operations/Categorie/SelectableCategorie";
import axiosApi from "@/plugins/axios.js";
export default {
  components: {
    Category,
    NoData,
  },
  watch: {
    selectedTab(val) {
      if (val == 0) {
        this.getProductsByCategorie(this.selectedCategory);
      } else if (val == 1) {
        this.getAdditionsByCategorie(this.selectedCategory);
      }
    },
  },
  data() {
    return {
      categories: [],
      selectedTab: {},
      selectedCategory: {},
      products: {},
      newOffer: {
        products: [],
      },
      additions: [],
      totalPrice: 0,
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
            slidesPerView: 7,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 5,
          },
          350: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          320: {
            slidesPerView: 2,
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
    };
  },
  created() {
    this.getAllCategories();
    this.getSizes();
  },
  methods: {
      deleteProductFromOffer(product, index){
        this.totalPrice -= Number(this.newOffer.products[index].price);
        this.newOffer.products.splice(index, 1);
      },
    addPriceToOffer(product, price) {
      let prod = {
        name: product.name,
        product_id: product.id,
        price: price.price,
        product_size_id: price.product_size_id,
      };
      console.log(prod);
      let ifExist = this.newOffer.products.findIndex(
        (ele) =>
          ele.product_id == product.id && ele.product_size_id == price.product_size_id
      );
      if (ifExist <= -1) {
        this.totalPrice += Number(prod.price);
        this.newOffer.products.push({ ...prod });
      } else {
        this.$notify({
          title: "موجود من قبل",
          message: "هذا المنتج تم إضافته من قبل في العرض",
          type: "error",
          duration: 1500,
        });
      }
    },
    getSizes() {
      const loading = this.$vs.loading();
      axiosApi
        .get(`/product-sizes`)
        .then((res) => {
          this.sizes = res.data;
        })
        .finally(() => loading.close());
    },
    submitAddOffer(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.newOffer.products.length == 0) {
            this.$notify.error({
              title: "خطأ",
              message: "حدد منتجات لهذا العرض",
              duration: 1500,
            });
            return;
          }
          this.addOffer();
        }
      });
    },
    addOffer() {
      const loading = this.$vs.loading();
      axiosApi
        .post("/offers", this.newOffer)
        .then((res) => {
          this.$notify({
            title: "تم بنجاح",
            message: "تم إضافة العرض بنجاح",
            type: "success",
            duration: 1500,
          });
          this.addOffer = { products: [] };
          this.$router.push("/offers");
        })
        .catch((err) => {
          this.$notify.error({
            title: "خطأ",
            message: "حدث خطأ ما !",
            duration: 1500,
          });
        })
        .finally(() => loading.close());
    },
    getAllCategories() {
      const loading = this.$vs.loading();
      axiosApi
        .get("product-categories")
        .then((res) => {
          this.categories = res.data;
          if (this.categories.length > 0) {
            this.selectCategory(this.categories[0]);
          }
        })
        .finally(() => loading.close());
    },
    selectCategory(category) {
      this.selectedTab = {};
      this.selectedCategory = category;
      this.getProductsByCategorie(category);
    },

    getProductsByCategorie(category) {
      this.isUserNowUpdate = false;
      console.log("false ", this.isUserNowUpdate);
      let loading = this.$vs.loading();
      axiosApi
        .get(`/product-categories/${category.id}/products`)
        .then((res) => {
          this.products = res.data;
        })
        .finally(() => loading.close());
    },
    getAdditionsByCategorie(category) {
      this.isUserNowUpdate = false;
      this.additions = [];
      let loading = this.$vs.loading();
      axiosApi
        .get(`/product-categories/${category.id}/additions`)
        .then((res) => {
          this.additions = res.data;
        })
        .finally(() => loading.close());
    },
  },
};
</script>

<style lang="scss">
.add-new-offers-page {
  .head {
    // font-family: 'CairoBold';
    color: #fe5634 !important;
  }
  .offer-prod {
    justify-content: space-around;
    background: linear-gradient(-180deg, #edfafd, #ffffff);
    margin-bottom: 5px;
    font-size: 16px;
    font-family: "din";
    border-radius: 6px;
    height: 58px;
    align-items: center;
    padding-right: 13px;
    padding-left: 15px;

    .price {
      background-color: #ffffff;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: block;
      /* align-items: center; */
      padding: 5px 0;
      color: #1d1d1d;
      font-weight: 600;
      cursor: pointer;
      font-size: 12px;
      text-align: center;
      margin: auto;
    }
  }
  .selected-category {
    background: #fe5634 !important;
    color: #fff !important;
  }

  .addNewCategory {
    text-align: right;
    margin-bottom: 15px;
    button {
      padding: 7px;
    }
  }

  > h6 {
    text-align: right;
    font-size: 25px;
    font-family: "din";
  }

  .selected-category {
    background: #fe5634 !important;
    color: #fff !important;
  }

  .products {
    font-family: "din";
  }

  .nav-pills .nav-link.active,
  .nav-pills .show > .nav-link {
    background: #ebf9fc;
    color: var(--primary);
  }
  .nav-pills .nav-link {
    border-radius: 0.25rem;
    color: var(--primary);
  }

  .meunItem {
    display: flex;
    justify-content: space-around;
    background: linear-gradient(-180deg, #edfafd, #ffffff);
    margin-bottom: 5px;
    font-size: 16px;
    font-family: "din";
    border-radius: 6px;
    height: 58px;
    align-items: center;
    padding-right: 13px;

    .operations {
      padding-top: 0 !important;
    }

    .price {
      background-color: #ffffff;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: block;
      /* align-items: center; */
      padding: 5px 0;
      color: #1d1d1d;
      font-weight: 600;
      cursor: pointer;
      font-size: 12px;
      text-align: center;
      margin: auto;

      &:hover {
        background: #fe5634;
        color: #fff;
      }

      // &:hover {
      //     background-color: orange;
      //     color: #ffffff;
      // }
    }
  }
  .nav.nav-pills.card-header-pills {
    padding: 0;
    padding: 0;
    list-style: none;
    display: flex;
    li {
      padding: 0 5px;
      a {
        text-decoration: none;
        padding: 3px 10px;
      }
    }
  }

  .card-header {
    margin-bottom: 0;
    background-color: transparent !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  }

  .tab-content > .active {
    display: block;
    padding: 0;
  }

  table{
      td{
          border: 1px solid #d8d8d8 !important;
          text-align: center;
         
      }
  }
}
</style>
