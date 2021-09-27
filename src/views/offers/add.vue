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

            <div class="col-md-2">
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

            <div class="col-md-2">
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


            <div class="col-md-2" style="margin-top:7px">
              <div class="d-flex flex-row-reverse">
                

                <el-form-item class="mt-4">
                    <el-button type="primary" @click="submitAddOffer('newOffer')"
                    >حفظ العرض</el-button
                    >
                </el-form-item>

              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-8">
              <h4 class="mb-1 head d-flex">
                <div>
                                                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-34 0 511 511.999"><path d="m294.007812 147.253906h-239.566406l37.40625 322.921875c.59375 5.113281 4.78125 8.960938 9.75 8.960938h145.25c4.972656 0 9.160156-3.847657 9.75-8.960938zm0 0" fill="#f3e8d7"/><path d="m102.351562 151.566406h-47.414062l36.910156 318.609375c.59375 5.113281 4.78125 8.960938 9.75 8.960938h22.867188zm0 0" fill="#fc4e51"/><path d="m157.636719 479.136719h33.171875l7.371094-327.570313h-47.914063zm0 0" fill="#fc4e51"/><path d="m293.507812 151.566406h-47.414062l-22.113281 327.570313h22.867187c4.972656 0 9.160156-3.847657 9.75-8.960938zm0 0" fill="#ea3942"/><path d="m269.179688 101.847656h-189.910157c-2.703125 0-5.035156 1.964844-5.582031 4.710938l-8.722656 43.792968h218.515625l-8.722657-43.792968c-.542968-2.746094-2.875-4.710938-5.578124-4.710938zm0 0" fill="#f3e8d7"/><path d="m212.304688 117.902344h-140.875l-6.460938 32.449218h214.246094l3.546875-3.617187-8.003907-40.175781c-.542968-2.746094-2.875-4.710938-5.578124-4.710938h-52.519532l1.765625 8.59375c.769531 3.863282-2.183593 7.460938-6.121093 7.460938zm0 0" fill="#ddd1c3"/><path d="m301.039062 171.546875h-253.628906c-4.714844 0-8.539062-3.824219-8.539062-8.539063v-23.347656c0-4.714844 3.824218-8.535156 8.539062-8.535156h253.628906c4.714844 0 8.535157 3.820312 8.535157 8.535156v23.347656c0 4.714844-3.820313 8.539063-8.535157 8.539063zm0 0" fill="#f3e8d7"/><path d="m301.039062 131.121094h-50.023437v19.472656c0 5.824219-4.71875 10.542969-10.542969 10.542969h-193.0625c-4.714844 0-8.539062-3.824219-8.539062-8.539063v10.410156c0 4.714844 3.824218 8.539063 8.539062 8.539063h253.628906c4.714844 0 8.535157-3.824219 8.535157-8.539063v-23.347656c0-4.714844-3.820313-8.539062-8.535157-8.539062zm0 0" fill="#ddd1c3"/><path d="m392.335938 383.324219h-195.976563c-6.734375 0-12.191406 5.457031-12.191406 12.191406v22.863281h220.359375v-22.863281c0-6.734375-5.457032-12.191406-12.191406-12.191406zm0 0" fill="#912c2c"/><path d="m392.335938 383.324219h-58.558594c6.730468 0 12.191406 5.457031 12.191406 12.191406v22.863281h58.558594v-22.863281c0-6.734375-5.457032-12.191406-12.191406-12.191406zm0 0" fill="#7c1e1e"/><path d="m407.238281 417.269531h-225.871093c-5.511719 0-9.980469 4.46875-9.980469 9.980469 0 28.65625 23.230469 51.886719 51.886719 51.886719h142.0625c28.65625 0 51.882812-23.230469 51.882812-51.886719 0-5.511719-4.46875-9.980469-9.980469-9.980469zm0 0" fill="#efa335"/><path d="m407.238281 417.269531h-48.578125v19.960938c0 23.144531-18.761718 41.90625-41.90625 41.90625h48.582032c28.652343 0 51.882812-23.230469 51.882812-51.882813 0-5.515625-4.46875-9.984375-9.980469-9.984375zm0 0" fill="#fd8f31"/><path d="m179.609375 360.199219c-5.488281 8.71875-.46875 28.4375 6.410156 28.4375h137.453125c2.234375 0 4.394532.800781 6.089844 2.253906l19.507812 16.714844c5.695313 4.882812 14.203126 4.515625 19.460938-.835938l15.0625-15.332031c1.757812-1.789062 4.164062-2.800781 6.675781-2.800781h12.019531c4.660157 0 9.03125-5.957031 9.03125-12.921875 0-5.957032-.644531-13.566406-1.757812-15.515625zm0 0" fill="#fccf3f"/><path d="m425.859375 476.429688h-407.234375c-5.847656 0-10.589844 4.738281-10.589844 10.585937v6.859375c0 5.847656 4.742188 10.589844 10.589844 10.589844h407.234375c5.847656 0 10.589844-4.742188 10.589844-10.589844v-6.859375c0-5.847656-4.742188-10.585937-10.589844-10.585937zm0 0" fill="#a0796d"/><path d="m400.535156 338.035156c6.347656 0 11.699219 10.523438 11.703125 17.140625.003907 9.453125-10.769531 14.453125-23.285156 12.621094-11.6875-1.710937-11.835937-7.089844-23.671875-7.089844-11.839844 0-11.839844 7.089844-23.675781 7.089844-11.839844 0-11.839844-7.089844-23.675781-7.089844-11.835938 0-11.835938 7.089844-23.675782 7.089844-11.835937 0-11.835937-7.089844-23.671875-7.089844-11.839843 0-11.839843 7.089844-23.675781 7.089844-11.839844 0-11.839844-7.089844-23.675781-7.089844-11.835938 0-11.984375 5.378907-23.675781 7.089844-12.515626 1.832031-23.289063-3.167969-23.28125-12.621094.003906-6.617187 5.355468-17.140625 11.703124-17.140625zm0 0" fill="#a0e557"/><path d="m294.304688 247.644531c-114.445313.042969-122.917969 75.539063-122.917969 86.230469 0 5.511719 4.46875 9.980469 9.980469 9.980469h225.871093c5.511719 0 9.980469-4.46875 9.980469-9.980469 0-10.691406-8.472656-86.1875-122.914062-86.230469zm0 0" fill="#efa335"/><path d="m294.304688 247.644531c-10.652344.003907-20.386719.664063-29.28125 1.863281 86.664062 11.675782 93.636718 74.667969 93.636718 84.367188 0 5.511719-4.46875 9.980469-9.980468 9.980469h58.5625c5.511718 0 9.976562-4.46875 9.976562-9.980469 0-10.691406-8.472656-86.1875-122.914062-86.230469zm0 0" fill="#fd8f31"/><path d="m407.238281 343.855469h-54.480469v20.804687c3.207032-1.898437 6.148438-3.953125 12.523438-3.953125 11.835938 0 11.984375 5.378907 23.671875 7.089844 10.359375 1.515625 19.519531-1.652344 22.367187-8.144531v-9.875c-.644531-2.074219-1.605468-4.175782-2.792968-6.015625-.421875.054687-.851563.09375-1.289063.09375zm0 0" fill="#93cc4a"/><path d="m388.957031 367.796875c-11.691406-1.710937-11.839843-7.089844-23.675781-7.089844-6.371094 0-9.316406 2.054688-12.519531 3.953125v45.230469c5.265625 2.246094 11.558593 1.167969 15.773437-3.121094l15.058594-15.332031c1.761719-1.789062 4.164062-2.800781 6.675781-2.800781h12.019531c4.660157 0 9.03125-5.957031 9.03125-12.921875 0-4.898438-.4375-10.90625-1.210937-13.976563-3.742187 5.066407-11.976563 7.402344-21.152344 6.058594zm0 0" fill="#efc03c"/><path d="m425.859375 468.890625h-18.117187c10.664062-10.859375 17.015624-25.679687 17.015624-41.636719 0-7.988281-5.375-14.726562-12.695312-16.828125v-14.910156c0-1.078125-.09375-2.140625-.261719-3.1875 4.230469-3.75 7.054688-9.855469 7.054688-16.609375 0-3.621094-.226563-8.609375-.824219-12.632812 1.140625-2.4375 1.746094-5.113282 1.742188-7.910157 0-2.445312-.476563-5.160156-1.332032-7.847656 3.855469-3.21875 6.316406-8.050781 6.316406-13.453125 0-9.359375-3.84375-30.28125-18.242187-49.324219-2.507813-3.320312-7.234375-3.976562-10.554687-1.464843-3.320313 2.511718-3.976563 7.238281-1.46875 10.558593 15.015624 19.855469 15.191406 40.027344 15.191406 40.230469 0 1.347656-1.097656 2.441406-2.445313 2.441406h-225.871093c-1.347657 0-2.441407-1.09375-2.441407-2.441406 0-.214844.191407-21.847656 16.851563-42.355469 10.796875-13.289062 25.730468-22.960937 44.625-28.96875.636718-.113281 1.246094-.304687 1.820312-.566406 11.855469-3.578125 25.222656-5.75 40.082032-6.5h.046874c.246094 0 .492188-.011719.734376-.035156 3.652343-.171875 7.382812-.265625 11.214843-.269531 31.019531.011718 56.527344 5.753906 75.816407 17.066406 3.589843 2.105468 8.207031.902344 10.3125-2.6875 2.105468-3.589844.902343-8.207032-2.6875-10.3125-21.628907-12.6875-49.703126-19.125-83.441407-19.140625-1.164062 0-2.316406.015625-3.464843.03125l7.070312-61.054688h3.132812c8.859376 0 16.070313-7.214843 16.070313-16.078125v-23.34375c0-8.863281-7.210937-16.074218-16.070313-16.074218h-15.207031l-3.683593-18.5c-1.242188-6.242188-6.695313-10.777344-12.972657-10.777344h-86.949219v-61.933594c0-.765625.421876-1.457031 1.019532-1.679688l43.355468-16.089843c3.902344-1.449219 5.890626-5.785157 4.441407-9.6875-1.445313-3.902344-5.789063-5.894531-9.6875-4.445313l-43.367188 16.097656c-6.480469 2.417969-10.835937 8.769532-10.835937 15.804688v61.933594h-87.882813c-6.273437 0-11.730469 4.535156-12.972656 10.777344l-3.683594 18.5h-15.203125c-8.863281 0-16.074218 7.210937-16.074218 16.074218v23.347656c0 8.863282 7.210937 16.074219 16.074218 16.074219h3.128906l33.574219 289.808594h-65.488281c-9.996094 0-18.125 8.132813-18.125 18.125v6.859375c0 9.992188 8.128906 18.125 18.125 18.125h407.234375c9.996094 0 18.125-8.132812 18.125-18.125v-6.859375c0-9.992187-8.128906-18.125-18.125-18.125zm-241.257813-117.5h219.308594c.515625 1.464844.789063 2.839844.789063 3.792969.003906 1.164062-.402344 2.015625-1.359375 2.839844-1.945313 1.683593-6.59375 3.296874-13.292969 2.316406-4.070313-.59375-6.066406-1.652344-8.597656-2.992188-3.511719-1.859375-7.882813-4.175781-16.171875-4.175781-8 0-12.453125 2.667969-15.707032 4.617187-2.578124 1.542969-4.132812 2.472657-7.964843 2.472657-3.835938 0-5.390625-.929688-7.96875-2.472657-3.25-1.949218-7.703125-4.617187-15.707031-4.617187-8.003907 0-12.457032 2.667969-15.710938 4.617187-2.574219 1.542969-4.128906 2.472657-7.964844 2.472657-3.835937 0-5.390625-.929688-7.964844-2.472657-3.253906-1.949218-7.707031-4.617187-15.710937-4.617187s-12.457031 2.667969-15.710937 4.617187c-2.574219 1.542969-4.128907 2.472657-7.964844 2.472657-3.835938 0-5.386719-.929688-7.964844-2.472657-3.253906-1.949218-7.707031-4.617187-15.710938-4.617187-8.285156 0-12.65625 2.316406-16.167968 4.175781-2.53125 1.339844-4.53125 2.398438-8.597656 2.992188-6.703126.980468-11.347657-.632813-13.292969-2.316406-.238281-.207032-.441407-.414063-.613281-.628907-.003907 0-.003907 0-.003907-.003906-.515625-.640625-.746093-1.335937-.746093-2.210937.007812-.949219.28125-2.324219.796874-3.789063zm205.667969 29.710937c-4.503906 0-8.898437 1.84375-12.050781 5.054688l-15.0625 15.332031c-2.472656 2.515625-6.503906 2.6875-9.183594.394531l-19.507812-16.71875c-3.058594-2.617187-6.964844-4.0625-10.992188-4.0625h-135.949218c-.671876-1.019531-1.6875-3.203124-2.28125-6.4375-.011719-.046874-.015626-.09375-.023438-.140624 4.621094 1.261718 9.890625 1.539062 15.429688.730468 6.640624-.972656 10.425781-2.976562 13.464843-4.585937 2.855469-1.511719 4.574219-2.421875 9.117188-2.421875 3.835937 0 5.390625.929687 7.964843 2.472656 3.253907 1.949219 7.707032 4.617188 15.710938 4.617188s12.457031-2.667969 15.710938-4.617188c2.574218-1.542969 4.128906-2.472656 7.964843-2.472656 3.832031 0 5.386719.929687 7.964844 2.472656 3.253906 1.949219 7.707031 4.617188 15.710937 4.617188 8 0 12.457032-2.667969 15.707032-4.617188 2.578125-1.542969 4.132812-2.472656 7.96875-2.472656 3.832031 0 5.386718.929687 7.964844 2.472656 3.25 1.949219 7.707031 4.617188 15.707031 4.617188 8.003906 0 12.457031-2.667969 15.710937-4.617188 2.574219-1.542969 4.128906-2.472656 7.964844-2.472656 4.542969 0 6.265625.910156 9.117188 2.421875 3.039062 1.609375 6.824218 3.613281 13.46875 4.585937 2.105468.308594 4.175781.460938 6.183593.460938 3.457031 0 6.726563-.472656 9.722657-1.34375.007812.445312.011718.894531.011718 1.34375 0 2.851562-1.273437 4.824218-1.964844 5.386718zm6.722657 15.074219v13.558594h-20.804688l12.785156-13.015625c.335938-.347656.8125-.542969 1.296875-.542969zm-57.019532 13.558594h-148.269531v-13.558594h131.769531c.4375 0 .859375.15625 1.1875.4375zm-158.605468 15.070313h225.875c1.34375 0 2.441406 1.097656 2.441406 2.445312 0 18.675781-11.65625 35.261719-29.117188 41.640625h-172.523437c-17.464844-6.378906-29.117188-22.960937-29.117188-41.640625 0-1.347656 1.09375-2.445312 2.441407-2.445312zm-.5 44.085937h-15.921876l-.808593-35.917969c1.320312 13.753906 7.351562 26.367188 16.730469 35.917969zm6.9375-191.175781c-1.277344 1.398437-2.527344 2.824218-3.722657 4.296875-15.96875 19.65625-20.230469 41.847656-20.230469 51.863281 0 5.363281 2.429688 10.167969 6.242188 13.386719-.867188 2.710937-1.355469 5.449219-1.355469 7.910156-.003906 2.792969.597657 5.46875 1.738281 7.90625-2.078124 9.179687.4375 20.316406 4.546876 26.453125.628906.9375 1.28125 1.734375 1.941406 2.433594-.214844 1.164062-.335938 2.347656-.335938 3.550781v14.886719c-6.761718 1.90625-11.875 7.761718-12.664062 14.914062l-5.542969-246.234375h31.597656zm44.128906-28.246094c-10.726563 3.761719-20.3125 8.652344-28.746094 14.664062l1.910156-85.050781h31.585938zm43.648437-8.660156c-10.035156.769531-19.453125 2.175781-28.242187 4.214844l4.449218-65.941407h30.945313zm-228.171875-76.800782c-.554687 0-1.003906-.449218-1.003906-1v-23.347656c0-.550781.449219-1 1.003906-1h47.039063c4.164062 0 7.535156-3.375 7.535156-7.535156 0-4.164062-3.371094-7.539062-7.535156-7.539062h-16.46875l2.828125-14.203126h186.828125l2.828125 14.203126h-140.949219c-4.164063 0-7.535156 3.375-7.535156 7.539062 0 4.160156 3.371093 7.535156 7.535156 7.535156h171.523437c.550782 0 1 .449219 1 1v23.347656c0 .550782-.449218 1-1 1zm102.457032 304.882813h-18.539063l-19.5625-289.808594h31.582031zm-84.152344-289.808594h30.941406l19.5625 289.808594h-16.933594zm363.195312 314.792969c0 1.683594-1.367187 3.050781-3.050781 3.050781h-407.234375c-1.683594 0-3.050781-1.367187-3.050781-3.050781v-6.859375c0-1.679687 1.367187-3.050781 3.050781-3.050781h407.234375c1.683594 0 3.054687 1.371094 3.054687 3.050781v6.859375zm0 0"/></svg>

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
                            <td> الحجم </td>
                            <td> الكمية </td>
                            <td> حذف </td>
                        </tr>
                        <tr v-for="(prod, index) in newOffer.products" :key="index">
                            <td> {{ prod.name }} </td>
                            <td> {{ prod.price }} </td>
                            <td> {{ prod.size }} </td>
                            <td>
                              <div class="quantity">
                                <el-input-number
                                  size="mini"
                                  v-model="prod.qty"
                                  :min="1"
                                  @change="addPriceAfterIncreateQty"
                                ></el-input-number>
                              </div>
                            </td>
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
      selectedTab: 0,
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
    addPriceAfterIncreateQty(){
      let sum = 0;
      this.newOffer.products.map(ele => {
        sum += Number(ele.price) * Number(ele.qty);
      })

      this.totalPrice = sum;
     
    },
      deleteProductFromOffer(product, index){
        this.totalPrice -= Number(this.newOffer.products[index].price) * Number(this.newOffer.products[index].qty);
        this.newOffer.products.splice(index, 1);
      },
    addPriceToOffer(product, price) {
      let prod = {
        name: product.name,
        product_id: product.id,
        price: price.price,
        product_size_id: price.product_size_id,
        size: price.product_size.name,
        qty: 1,

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
        let theProduct = this.newOffer.products.find(
            (ele) =>
            ele.product_id == product.id && ele.product_size_id == price.product_size_id
        );
        theProduct.qty++;
        this.totalPrice += Number(theProduct.price);
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
      this.selectedTab = 0;
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
