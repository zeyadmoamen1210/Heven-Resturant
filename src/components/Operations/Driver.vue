<template>
  <div class="driver">
    <div class="header">
        <h6> {{driver.name}} </h6>
    </div>
    <!-- <h6> <span>الهاتف</span> {{driver.mobile}} </h6>
    <h6> <span>العنوان</span> {{driver.address}} </h6> -->

    <table>
        <tr>
            <td>الهاتف</td>
            <td> {{driver.mobile}} </td>
        </tr>
        <tr>
            <td>العنوان</td>
            <td> {{driver.address}} </td>
        </tr>
        <tr>
            <td>الراتب</td>
            <td> {{driver.salary}} </td>
        </tr>
        <tr>
            <td>الرقم القومي</td>
            <td> {{driver.national_id}} </td>
        </tr>
        <tr v-if="driver.department">
            <td>القسم</td>
            <td> {{driver.department.name}} </td>
        </tr>
    </table>

    <div class="edit-delete">
        <slot name="edit-delete">

        </slot>
    </div>
    
  </div>
</template>

<script>
export default {
    props:['driver'],
    
}
</script>

<style lang="scss" scoped>
.driver{
    font-family: "din";
    // box-shadow: 0 4px 25px 0 #0000001a;
    padding: 6px 6px;
    margin-bottom: 27px;
    border: 1px solid #ddd;
    color: #676666;
    border-radius: 8px;
    margin-right: 10px;
    width: 220px;
    // height: 133px;

    table{
        width: 100%;
        tr{
            td{
                &:first-of-type{
                    font-size:13px ;
                }
                border: 1px solid #dadada;
            }
        }
    }
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