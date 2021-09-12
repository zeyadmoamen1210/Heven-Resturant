<template>
  <div class="size">
    <h6> {{item.name}} </h6>
  </div>
</template>

<script>
export default {
    props:['item'],
    
}
</script>

<style lang="scss" scoped>
.size{
    font-family: "din";
    // box-shadow: 0 4px 25px 0 #0000001a;
    padding: 5px 18px;
    margin-bottom: 27px;
    background: #EBF9FC;
    color: #333;
    border-radius: 8px;
    margin-right: 10px;
    h6{
        margin-bottom:0;
    }
}
</style>
