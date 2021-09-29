<template>
  <div class="dept">
    <div>
      <h6>{{ dept.name }}</h6>
    </div>
    <div class="edit-delete">
      <slot name="edit-delete"> </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["dept"],
};
</script>

<style lang="scss" scoped>
.dept {
  direction: ltr;
  font-family: "din";
  // box-shadow: 0 4px 25px 0 #0000001a;
  padding: 15px 18px;
  margin-bottom: 27px;
  background: #ebf9fc;

  color: #333;
  border-radius: 8px;
  margin-right: 10px;
  h6 {
    margin-bottom: 0;
    margin-top: 0;
    font-family: "CairoSemiBold";
    text-align: center;
    font-size: 15px;
  }
}
</style>