<template>
  <div class="offers-page">
    <div class="container-fluid" v-if="!openUpdatePage">
      <div class="offers-head">
        <h2>العروض</h2>

        <el-button class="mb-3" @click="$router.push(`/offers/add`)">
          إضافة عرض جديد
        </el-button>
      </div>

      <div class="offers">
        <div class=" offers-section">
          <div>
            <el-collapse accordion>
              <div class="row">
                <div
                  class="col-md-6"
                  v-for="offer in offers"
                  :key="offer.id"
                  :name="offer.id"
                >
                  <el-collapse-item class="mb-3">
                    <template slot="title">
                      <div
                        class="d-flex justify-content-between collapse-title"
                      >
                        <h6>{{ offer.name }}</h6>
                        <h6>
                          <div class="edit-delete">
                            <span
                              ><el-button>{{ offer.price }}</el-button></span
                            >

                            <button
                              class="btn emp-dept-update"
                              @click.stop="openUpdateOffer(offer)"
                            >
                              <img
                                src="@/images/Icon-feather-edit-3.svg"
                                alt=""
                              />
                            </button>
                            <button
                              class="btn emp-dept-delete"
                              @click.stop="handleDeleteOffer(offer)"
                            >
                              <img
                                src="@/images/Icon-material-delete.svg"
                                alt=""
                              />
                            </button>
                          </div>
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
      </div>
    </div>

    <div v-else class="container-fluid">
      <div class="header d-flex mb-4">
        <div style="flex: 1">
          <h2 style="margin-bottom:0;margin-top:10px">تعديل العرض</h2>
        </div>

        <div class="mt-4">
          <el-button transparent @click="openUpdatePage = false">
            الرجوع الي العروض
          </el-button>
        </div>
      </div>
      <div class="add-offer">
        <el-form
          :model="currOfferToUpdate"
          ref="currOfferToUpdate"
          class="demo-ruleForm"
        >
          <div class="row">
            <div class="col-md-6">
              <div>
                <h6>اسم العرض</h6>
                <el-form-item
                  prop="name"
                  :rules="[{ required: true, message: 'اسم العرض مطلوب' }]"
                >
                  <el-input v-model="currOfferToUpdate.name"></el-input>
                </el-form-item>
              </div>
            </div>

            <div class="col-md-3">
              <div>
                <h6>سعر العرض</h6>
                <el-form-item
                  prop="price"
                  :rules="[{ required: true, message: 'سعر العرض مطلوب' }]"
                >
                  <el-input
                    type="number"
                    v-model.number="currOfferToUpdate.price"
                  ></el-input>
                </el-form-item>
              </div>
            </div>

            <div class="col-md-3">
              <div>
                <h6>قيمة الخصم للعرض</h6>
                <el-form-item
                  prop="discount"
                  :rules="[{ required: true, message: 'قيمة الخصم مطلوبة' }]"
                >
                  <el-input
                    v-model.number="currOfferToUpdate.discount"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-8">
              <div>
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
                    <h6 class="mr-1 " style="margin-top: -3px;font-size: 21px;">
                      المنيو
                    </h6>
                  </div>
                </h4>
                <swiper class="swiper mb-4" :options="swiperOptionBestSeller">
                  <swiper-slide
                    v-for="category in categories"
                    :key="category.id"
                  >
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
                    <b-tab title="أساسي" active>
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
                                      (ele) =>
                                        ele.product_size_id == sizes[0].id
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
                                      (ele) =>
                                        ele.product_size_id == sizes[0].id
                                    ).price
                                  }}
                                </div>
                                <div v-else class="price">
                                  -
                                </div>

                                <div
                                  v-if="
                                    product.prices.find(
                                      (ele) =>
                                        ele.product_size_id == sizes[1].id
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
                                      (ele) =>
                                        ele.product_size_id == sizes[1].id
                                    ).price
                                  }}
                                </div>
                                <div v-else class="price">
                                  -
                                </div>

                                <div
                                  v-if="
                                    product.prices.find(
                                      (ele) =>
                                        ele.product_size_id == sizes[2].id
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
                                      (ele) =>
                                        ele.product_size_id == sizes[2].id
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
                                @click="
                                  addPriceToOffer(
                                    product,
                                    product.prices.find(
                                      (ele) =>
                                        ele.product_size_id == sizes[1].id
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
                                      (ele) =>
                                        ele.product_size_id == sizes[2].id
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
              </div>
            </div>
            <div class="col-md-4">
              <div>
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
                      <h6
                        class="mr-1 "
                        style="    margin-top: -3px;font-size: 21px;"
                      >
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
                        <tr  v-for="(prod, index) in currOfferToUpdate.products" :key="index">
                            <td> {{ prod.name }} </td>
                           <td v-if="!prod.pivot">
                              {{ prod.price }}
                            </td>
                            <td v-else>
                              {{
                                prod.prices.find(
                                  (ele) =>
                                    ele.product_size_id ==
                                    prod.pivot.product_size_id
                                ).price
                              }}
                            </td>
                                    <td>
                                <div class="edit-delete">
                                        <el-button
                                        @click.prevent="
                                            deleteProductFromOffer(prod, index)
                                        "
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
                </div>


                  <!-- <div class="row" v-if="currOfferToUpdate.products.length > 0">
                    <div
                      class="col-md-6"
                      v-for="(prod, index) in currOfferToUpdate.products"
                      :key="index"
                    >
                      <div class="d-flex justify-content-between offer-prod">
                        <div>
                          <h6>{{ prod.name }}</h6>
                        </div>
                        <div class="d-flex">
                          <div>
                            <h6 v-if="!prod.pivot" class="price">
                              {{ prod.price }}
                            </h6>
                            <h6 v-else class="price">
                              {{
                                prod.prices.find(
                                  (ele) =>
                                    ele.product_size_id ==
                                    prod.pivot.product_size_id
                                ).price
                              }}
                            </h6>
                          </div>
                          <div class="edit-delete">
                            <button
                              class="btn emp-dept-delete"
                              @click.prevent="
                                currOfferToUpdate.products.splice(index, 1)
                              "
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
                  </div>
                  <div v-else>
                    <NoData />
                  </div>
                </div> -->
              </div>
            </div>
          </div>

          <el-form-item class="mt-4">
            <el-button
              type="primary"
              @click="submitUpdateOffer('currOfferToUpdate')"
              >حفظ العرض</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>

    <vs-dialog
      class="delete-dialog"
      width="550px"
      not-center
      v-model="openDeleteOfferModel"
    >
      <div class="con-content">
        <h6><i class="el-icon-warning-outline"></i></h6>
        <p>
          هل أنت متأكد من أتك تريد حذف ؟
        </p>

        <div class="btns d-flex justify-content-center">
          <vs-button color="#675DEC" @click="deleteOffer()">
            تأكيد
          </vs-button>
          <vs-button color="danger" @click="openDeleteOfferModel = false">
            إلغاء
          </vs-button>
        </div>
      </div>
    </vs-dialog>
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
  created() {
    this.getOffers();
    this.getAllCategories();
    this.getSizes();
  },
  data() {
    return {
      offers: [],
      openDeleteOfferModel: false,
      currOffer: {},
      openUpdatePage: false,
      sizes: [],

      categories: [],
      selectedTab: {},
      selectedCategory: {},
      products: {},
      currOfferToUpdate: {
        products: [],
      },
      additions: [],
      totalPrice:0,
      swiperOptionBestSeller: {
        slidesPerView: 9,
        spaceBetween: 5,
        slidesPerGroup: 1,
        loopFillGroupWithBlank: false,
        breakpoints: {
          1200: {
            slidesPerView: 10,
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
  watch: {
    selectedTab(val) {
      if (val == 0) {
        this.getProductsByCategorie(this.selectedCategory);
      } else if (val == 1) {
        this.getAdditionsByCategorie(this.selectedCategory);
      }
    },
  },
  methods: {

      
    deleteProductFromOffer(pr, index){
        let product = this.currOfferToUpdate.products[index];
        this.currOfferToUpdate.products.splice(index, 1)

            
        if(product.pivot){

            console.log("inside ")
            product.prices.map(ele2 => {
                console.log(ele2)
                if(ele2.product_size_id == product.pivot.product_size_id){
                    this.totalPrice = Number(this.totalPrice) - Number(ele2.price)
                }
            })

        }else{
            this.totalPrice = Number(this.totalPrice) - Number(product.price)
        }


      },

    addPriceToOffer(product, price) {
      let prod = {
        name: product.name,
        product_id: product.id,
        price: price.price,
        product_size_id: price.product_size_id,
      };
      console.log(prod);
      let ifExist = this.currOfferToUpdate.products.findIndex(
        (ele) =>
          (ele.product_id || ele.pivot.product_id) ==
            (product.id || product.pivot.product_id) &&
          (ele.product_size_id || ele.pivot.product_size_id) ==
            price.product_size_id
      );
      if (ifExist <= -1) {
        this.totalPrice = Number(this.totalPrice) + Number(prod.price);
        this.currOfferToUpdate.products.push({ ...prod });
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
    submitUpdateOffer(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.currOfferToUpdate.products.length == 0) {
            this.$notify.error({
              title: "خطأ",
              message: "حدد منتجات لهذا العرض",
              duration: 1500,
            });
            return;
          }
          this.updateOffer();
        }
      });
    },
    updateOffer() {
      const loading = this.$vs.loading();
      let prods = [];

      this.currOfferToUpdate.products.map((ele) => {
        prods.push({
          product_id: ele.product_id || ele.pivot.product_id,
          product_size_id: ele.product_size_id || ele.pivot.product_size_id,
        });
      });

      let offer = {
        name: this.currOfferToUpdate.name,
        price: this.currOfferToUpdate.price,
        discount: this.currOfferToUpdate.discount,
        products: [...prods],
      };

      axiosApi
        .put(`/offers/${this.currOfferToUpdate.id}`, offer)
        .then((res) => {
          this.$notify({
            title: "تم بنجاح",
            message: "تم تعديل العرض بنجاح",
            type: "success",
            duration: 1500,
          });
          this.getOffers();
          this.currOfferToUpdate = { products: [] };
          this.openUpdatePage = false;
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

    openUpdateOffer(offer) {
      this.openUpdatePage = true;
      this.currOfferToUpdate = { ...offer };
      this.totalPrice = 0;
      this.currOfferToUpdate.products.map(ele => {
          ele.prices.map(ele2 => {
              if(ele2.product_size_id == ele.pivot.product_size_id){
                 this.totalPrice += Number(ele2.price)
              }
          })
      })
    },
    deleteOffer() {
      const loading = this.$loading({
        lock: true,
        text: false,
        spinner: "el-icon-loading",
        background: "rgba(255,255,255,.7)",
        customClass: "fullscreen-loading",
      });
      axiosApi
        .delete(`/offers/${this.currOffer.id}`)
        .then((res) => {
          this.openDeleteOfferModel = false;
          this.getOffers();
          this.$notify({
            title: "تم بنجاح",
            message: "تم حذف العرض بنجاح",
            type: "success",
            duration: 1500,
          });
        })
        .finally(() => {
          loading.close();
        });
    },
    handleDeleteOffer(offer) {
      this.openDeleteOfferModel = true;
      this.currOffer = { ...offer };
    },
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
  },
};
</script>

<style lang="scss">
.offers-page {
  .btn.emp-dept-update,
  .btn.emp-dept-delete {
    background: #fff;
    padding: 7px 11px;
    margin: 0 6px 0;
    border-radius: 5px;
  }

  .offers-section {
    .el-collapse {
      border-top: none !important;
      border-bottom: none !important;
      .el-collapse-item {
        border: none;
      }
      .collapse-title {
        width: 100% !important;
      }
      .el-collapse-item__header {
        background-color: #ebf9fc;
        border: none;
      }
      .el-collapse-item__content {
        padding: 10px;
        background-color: #ebf9fc;
      }
      .el-collapse-item__wrap {
        border: none;
      }
      h6 {
        margin-bottom: 0;
        margin-right: 13px;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .el-button {
          background: #fff;
          font-size: 13px;
          padding: 8px 12px;
          border: none;
        }
      }
    }
    .offer-product {
      padding: 5px;
      background: #fff;
      margin-bottom: 5px;
      margin: 8px 10px;
      h6 {
        display: inline-block;
      }
      svg {
        path {
          fill: #fe5634;
        }
      }
    }
  }

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
