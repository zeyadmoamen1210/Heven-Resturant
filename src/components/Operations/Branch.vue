<template>
  <div class="branch">
    <div class="header">
        <h6> {{branch.name}} </h6>
    </div>
    <h6> <span>الهاتف</span> {{branch.phone}} </h6>
    <h6> <span>العنوان</span> {{branch.address}} </h6>

    <div class="edit-delete">
        <slot name="edit-delete">

        </slot>
    </div>
    
  </div>
</template>

<script>
export default {
    props:['branch'],
    
}
</script>

<style lang="scss" scoped>
.branch{
    font-family: "din";
    // box-shadow: 0 4px 25px 0 #0000001a;
    border: 1px solid #ddd;
    padding: 6px 6px;
    margin-bottom: 27px;
    color: #676666;
    border-radius: 8px;
    margin-right: 10px;
    width: 220px;
    height: 170px;
    h6{
        margin-bottom:5px;
        
        span{
            color: #FE5634;
        font-size: 11px;
        display: block;
        margin-bottom: 2px;
        }
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .header{
        background: #f7f7f7;
        padding: 9px 10px;
        border-bottom: 1px solid #CCC;
        margin-bottom: 5px;
    }
}
</style>