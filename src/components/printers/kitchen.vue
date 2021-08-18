<template>
  <div>
    <div class="kitchen-table">
      <!-- <div class="logo">
        <img src="@/images/logo.png" alt="" />
      </div> -->
      <h6 style="font-weight: bold;font-family: auto !important;" class="text-center mt-2 mb-2" v-if="productsToPrint && productsToPrint.length > 0 && productsToPrint[0].kitchen_type == 2"> 
        <img style="width: 20px" src="@/assets/pizza-slice.svg" alt="">
        مطبخ بيتزا </h6>
      <h6 style="font-weight: bold;font-family: auto !important;" class="text-center mt-2 mb-2" v-if="productsToPrint && productsToPrint.length > 0 && productsToPrint[0].kitchen_type == 3">
        <img style="width: 20px" src="@/assets/spaguetti.svg" alt="">
        مطبخ بستا</h6>

      

      <table class="custom-table" style="font-family: auto !important;">

        <tr v-if="table_id">
          <td width="35%">نوع الطلب</td>
          <td>
            <b> صالة </b>
          </td>
        </tr>

        <tr v-if="table_id">
          <td width="35%">الطرابيزة</td>
          <td>
            <b>{{ table_id }}</b>
          </td>
        </tr>

        <tr v-if="notes">
          <td width="35%">ملاحظات</td>
          <td>
            <b>{{ notes }}</b>
          </td>
        </tr>




        <tr v-if="inVoiceDetails.id">
          <td width="35%">رقم الطلب</td>
          <td>
            <b>{{ inVoiceDetails.id }}</b>
          </td>
        </tr>

        <tr v-if="inVoiceDetails && inVoiceDetails.order_type">
          <td width="35%">نوع الطلب</td>
          <td>
            <b>{{ inVoiceDetails.order_type.name }}</b>
          </td>
        </tr>

        <tr v-if="inVoiceDetails.created_at">
          <td width="35%">ميعاد الطلب</td>
          <td>
            <b>{{ new Date(inVoiceDetails.created_at).toLocaleString("ar-EG") }}</b>
          </td>
        </tr>

        <tr v-if="inVoiceDetails.preparated_at">
          <td width="35%">ميعاد الإستلام</td>
          <td >{{ new Date(inVoiceDetails.preparated_at).toLocaleString("ar-EG") }}</td>
        </tr>


        <tr v-if="inVoiceDetails.notes">
          <td width="35%">ملاحظات</td>
          <td>
            <b>{{ inVoiceDetails.notes }}</b>
          </td>
        </tr>


      </table>

      <div style="height: 10px;"></div>

      <table class="custom-table">
        <thead>
          <tr>
            <!-- <td>رقم المنتج</td> -->
            <td>الكمية</td>
            <td>الصنف</td>
            <td>المقاس</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(x, index) in productsToPrint" :key="index">
            <!-- <td>{{ x.id }}</td> -->
            <td>{{ x.qty || x.pivot.qty }}</td>
            <td>{{ x.name || x.pivot.name }}</td>
            <td>{{ x.size || x.pivot.size }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
    props:['productsToPrint', 'inVoiceDetails', 'dataForPrint', 'table_id', 'notes']
};
</script>

<style scoped lang="scss">

.custom-table{
  border: 1px solid #000 !important;
    margin: 5px 0px !important;
    border-radius: 5px !important;
    font-family: auto !important;
    td{
      border: 1px solid #000 !important;
    }
}

</style>
