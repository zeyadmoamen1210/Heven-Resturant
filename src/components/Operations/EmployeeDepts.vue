<template>
  <div class="dept d-flex ">
    <div>
        <h6> {{dept.name}} </h6>
    </div>
    <div class="edit-delete">
        <slot name="edit-delete">

        </slot>
    </div>
  </div>
</template>

<script>
export default {
    props:['dept'],
    
}
</script>

<style lang="scss" scoped>
.dept{
    flex-direction: row-reverse;
        direction: ltr;
    font-family: "din";
    /* padding: 20px 23px; */
    margin-bottom: 27px;
    border-radius: 3px;
    margin-right: 10px;
    border: 1px solid #ffffff;
    border: 1px solid #ddd;
        padding: 3px;
    h6{
            /* margin-bottom: 8px; */
    font-size: 15px;
    /* background: #f7f7f7; */
    /* border-bottom: 1px solid #ccc; */
    margin: 0;
    margin-top: 0;
        font-family: "CairoSemiBold";
        text-align: center;
        font-size: 15px;
    }
    .edit-delete{
        margin-right: 16px;
        margin-top: 1px;
        button{
               
    margin: 2px;
        }
    }

    .emp-dept-delete{
    background: #e74c3c;;
    color: #fff;
    
    cursor: pointer;
}

.emp-dept-update{
    background: #EBF9FC !important;
    color: #fff;
    padding: 3px 6px 0;
    cursor: pointer;
        padding: 2px 7px 0;
    color: #333;
    border: 1px solid #ccc;
}

}
</style>