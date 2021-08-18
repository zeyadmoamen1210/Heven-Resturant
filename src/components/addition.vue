<template>
  <b-col md="12">
    <div class="addition" v-if="showAddition">
      <div class="additionContent pt-5" @click="changeToggle">
        <b-row class="pt-5 mr-3 pb-0">
          <b-col lg="4" md="6" sm="12" class="pt-0 pb-0 header">
            <b-row class="card-item header">
              <b-col md="8" class="subheading">الصنف</b-col>
              <b-col md="4" class="subheading">السعر</b-col>
            </b-row>
          </b-col>
          <b-col lg="4" md="6" sm="12" class="pt-0 pb-0 header">
            <b-row class="card-item header">
              <b-col md="8" class="subheading">الصنف</b-col>
              <b-col md="4" class="subheading">السعر</b-col>
            </b-row>
          </b-col>
          <b-col lg="4" md="6" sm="12" class="pt-0 pb-0 header">
            <b-row class="card-item header">
              <b-col md="8" class="subheading">الصنف</b-col>
              <b-col md="4" class="subheading">السعر</b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="pt-0 mr-3">
          <b-col
            lg="4"
            md="6"
            sm="12"
            class="pt-0"
            v-for="(addition, index) in additions"
            :key="index"
          >
            <b-row class="card-item bg-color">
              <b-col md="8" class="pt-2">{{ addition.text }}</b-col>
              <b-col md="4" class="pt-2">
                <div class="priceAddition">
                  {{ addition.priceAddition }}
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </div></b-col
  >
</template>
<script>
// import additions from "../data/addition";
import { mapState, mapActions } from "vuex";
export default {
  // data: () => ({ additions }),
  computed: {
    ...mapState(["showAddition"]),
  },
  methods: {
    ...mapActions(["toggleAddition"]),
    changeToggle() {
      this.toggleAddition();
    },
  },
};
</script>
<style lang="scss">
@import "../styles/addition.scss";
</style>