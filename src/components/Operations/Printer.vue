<template>
  <div class="printer">
    <h6> {{printer.name}} </h6>

    <div class="edit-delete">
        <slot name="edit-delete">

        </slot>
    </div>
    
  </div>
</template>

<script>
export default {
    props:['printer'],
    
}
</script>

<style lang="scss" scoped>
.printer{
    font-family: "Cairo";
    // box-shadow: 0 4px 25px 0 #0000001a;
    padding: 5px 18px;
    margin-bottom: 27px;
    background: #EBF9FC;
    padding:10px;
    
    color: #333;
    border-radius: 8px;
    margin-right: 10px;
    h6{
        margin-bottom:0;
        margin-top: 0;
        font-family: "CairoSemiBold";
        text-align: center;
        font-size: 15px;
    }
}
</style>