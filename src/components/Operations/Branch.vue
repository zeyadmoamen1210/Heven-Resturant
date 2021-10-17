<template>
  <div class="branch">
    <div class="header">
      <h6>{{ branch.name }}</h6>
    </div>
    <h6><span>الهاتف</span> {{ branch.phone }}</h6>
    <h6><span>العنوان</span> {{ branch.address }}</h6>

    <div class="edit-delete">
      <slot name="edit-delete"> </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["branch"],
};
</script>

<style lang="scss" scoped>
.branch {
  // box-shadow: 0 4px 25px 0 #0000001a;
  border: 1px solid #ddd;
  padding: 6px 6px;
  margin-bottom: 27px;
  color: #676666;
  border-radius: 8px;
  margin-right: 10px;
  width: 220px;
  text-align: center;
  h6 {
    margin-bottom: 5px;
    margin-top: 0;
    font-family: "CairoSemiBold";
    text-align: center;
    font-size: 15px;

    span {
      color: #fe5634;
      font-size: 11px;
      display: block;
      margin-bottom: 2px;
    }
  }
  .header {
    background: #f7f7f7;
    padding: 9px 10px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 5px;
  }
}
</style>