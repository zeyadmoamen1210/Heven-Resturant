<template>
  <div class="type">
    <div class="pr-3 d-flex">
      <div
        v-for="(item, index) in type"
        :key="index"
        :class="{ active: item.id == $store.state.currentType.id }"
        @click="selectType(index, item)"
      >
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import axiosApi from "@/plugins/axios.js";

export default {
  props: {
    type: Array,
  },
  data: () => ({
    selectedType: undefined,
    currType: {
      // isSelected: false
    },
  }),
  methods: {
    selectType(index, item) {
      this.currType = { ...item };

      this.$store.commit("ResetSelectedAddressAndCustomer");

      this.$store.commit("SetOrderType", item);

      this.$store.commit("setOrdersTabActive", true);

      this.$store.commit("calcPrice");
    },
  },
  mounted() {
    if (localStorage.getItem("currType")) {
      this.currType = JSON.parse(localStorage.getItem("currType"));

      // this.type.forEach(ele => {
      //   if(ele.id === this.currType.id)
      //     ele.isSelected = true;
      // });

      let index = this.type.findIndex((ele) => ele.id == this.currType.id);
      this.selectType(index, this.currType);
    }
  },
};
</script>
<style lang="scss">
@import "../styles/typeCard.scss";
</style>