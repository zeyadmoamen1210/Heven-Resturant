<template>
  <div class="area">
    <div class="header">
        <h6> {{area.name}} </h6>
    </div>
    <h6 v-if="area.city"> <span>المدينة</span> {{area.city.name}} </h6>

    <h6> <span>سعر السائق</span> {{area.driver_cost}} </h6>
    <h6> <span>سعر هيفين</span> {{area.haven_cost}} </h6>

    <div class="edit-delete">
        <slot name="edit-delete">

        </slot>
    </div>

  </div>
</template>

<script>
export default {
    props:['area'],
    
}
</script>

<style lang="scss" scoped>
.area{
    font-family: "din";
    // box-shadow: 0 4px 25px 0 #0000001a;
    border: 1px solid #ddd;
    padding: 6px 6px;
    margin-bottom: 27px;
    color: #676666;
    border-radius: 8px;
    margin-right: 10px;
        width: 155px;
    height: 170px;
    h6{
        margin-bottom:0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        span{
            color:#FE5634;
            font-size:12px;
            display: block;
        }
    }
    .header{
        background: #f7f7f7;
        padding: 9px 10px;
        border-bottom: 1px solid #CCC;
        margin-bottom: 9px;
    }
}
</style>