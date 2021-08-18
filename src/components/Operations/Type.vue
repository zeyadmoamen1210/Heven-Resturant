<template>
  <div class="type">
    <h6> {{type.name}} </h6>

    <div class="edit-delete">
        <slot name="edit-delete">

        </slot>
    </div>
  </div>
</template>

<script>
export default {
    props:['type', 'color'],
    
}
</script>

<style lang="scss" scoped>
.type{
    direction: ltr;
    font-family: "din";
    // box-shadow: 0 4px 25px 0 #0000001a;
    padding: 15px 18px;
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