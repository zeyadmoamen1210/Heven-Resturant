<template>
  <div class="table">
    <h6> {{table.name}} </h6>

    
  </div>
</template>

<script>
export default {
    props:['table'],
    
}
</script>

<style lang="scss" scoped>
.table{
    
    h6{
        margin-bottom:0;
    padding: 5px 18px;
    margin-bottom: 27px;
    
    background: #EBF9FC;
    color: #333;
    border-radius: 8px;
    margin-right: 10px;

    margin-top: 0;
        font-family: "CairoSemiBold";
        text-align: center;
        font-size: 15px;
    }
}
</style>