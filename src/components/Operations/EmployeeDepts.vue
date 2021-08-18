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
    padding: 11px 11px;
    /* background: #f7f7f7; */
    /* border-bottom: 1px solid #ccc; */
    margin: 0;
    }
    .edit-delete{
        margin-right: 16px;
        margin-top: 1px;
        button{
               padding: 4px 10px;
    margin: 2px;
        }
    }

    .emp-dept-delete{
    background: var(--bs-danger);
    color: #fff;
    padding: 3px 6px 0;
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