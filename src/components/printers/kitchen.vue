<template>
  <div>
    <div class="kitchen-table">
      <!-- <div class="logo">
        <img src="@/images/logo.png" alt="" />
      </div> -->
      <h6 class="text-center mt-2 mb-2" v-if="productsToPrint && productsToPrint.length > 0 && productsToPrint[0].kitchen_type == 2"> 
        <svg style="width: 20px; height: 20px" xmlns="http://www.w3.org/2000/svg" version="1.0" width="48.000000pt" height="48.000000pt" viewBox="0 0 48.000000 48.000000" preserveAspectRatio="xMidYMid meet">
          <g transform="translate(0.000000,48.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
          <path d="M235 386 c-22 -7 -51 -18 -63 -25 -32 -17 -102 -81 -102 -93 0 -6 14 -23 31 -39 30 -28 31 -28 25 -6 -4 18 2 30 22 49 46 43 71 52 91 34 25 -22 40 -20 53 9 6 14 15 25 20 25 15 0 9 -139 -7 -164 -13 -20 -13 -25 0 -42 20 -27 18 -37 -4 -24 -16 8 -21 6 -25 -8 -2 -9 -5 -1 -4 18 0 53 -1 57 -17 64 -16 6 -54 -11 -67 -29 -4 -5 -8 2 -8 16 0 22 -15 39 -36 39 -2 0 -4 -21 -5 -47 -1 -39 -2 -43 -9 -23 l-8 25 -1 -27 c-1 -30 13 -45 25 -26 4 7 11 28 15 48 6 30 7 31 8 8 1 -32 17 -44 36 -28 12 10 18 10 30 0 8 -7 15 -18 15 -24 0 -6 4 -17 9 -25 8 -12 12 -12 24 -2 10 8 17 9 22 1 20 -32 25 2 23 148 l-3 157 -25 2 c-14 1 -43 -4 -65 -11z m81 -7 c8 -14 -14 -29 -44 -29 -32 0 -101 -36 -139 -72 -42 -40 -66 -27 -26 14 38 40 88 70 143 84 58 16 58 16 66 3z m-36 -52 c0 -8 -3 -17 -7 -20 -9 -9 -34 13 -27 24 8 14 34 11 34 -4z m-20 -172 c0 -9 -6 -12 -15 -9 -8 4 -15 10 -15 15 0 5 7 9 15 9 8 0 15 -7 15 -15z m57 -7 c-3 -8 -6 -5 -6 6 -1 11 2 17 5 13 3 -3 4 -12 1 -19z"/>
          <path d="M160 266 c-27 -33 18 -72 48 -42 13 13 14 20 6 34 -15 23 -38 26 -54 8z m43 -10 c3 -7 0 -19 -6 -25 -14 -14 -38 5 -30 25 7 18 29 18 36 0z"/>
          <path d="M250 256 c-27 -33 18 -72 48 -42 13 13 14 20 6 34 -15 23 -38 26 -54 8z m43 -12 c9 -9 -4 -34 -18 -34 -14 0 -27 25 -18 34 4 3 12 6 18 6 6 0 14 -3 18 -6z"/>
          </g>
          </svg>
        مطبخ بيتزا </h6>
      <h6 class="text-center mt-2 mb-2" v-if="productsToPrint && productsToPrint.length > 0 && productsToPrint[0].kitchen_type == 3">
        <svg style="width: 20px; height: 20px" xmlns="http://www.w3.org/2000/svg" version="1.0" width="48.000000pt" height="48.000000pt" viewBox="0 0 48.000000 48.000000" preserveAspectRatio="xMidYMid meet">
        <g transform="translate(0.000000,48.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
        <path d="M301 348 c-10 -24 -21 -51 -24 -61 -10 -27 -45 -1 -39 29 4 21 1 23 -34 21 -32 -2 -38 -5 -36 -20 2 -11 -3 -26 -12 -35 -8 -10 -18 -29 -21 -45 -4 -15 -11 -30 -16 -33 -5 -3 -9 -14 -9 -25 0 -10 -7 -19 -15 -19 -8 0 -15 -7 -15 -15 0 -10 10 -15 28 -15 16 0 32 -8 40 -20 10 -17 23 -20 92 -20 69 0 82 3 92 20 8 12 24 20 40 20 18 0 28 5 28 15 0 8 -7 15 -15 15 -8 0 -15 8 -15 18 0 20 -29 52 -48 52 -6 0 -12 8 -14 17 -5 20 22 103 33 103 4 0 5 9 2 20 -8 31 -23 24 -42 -22z m11 -29 c-10 -30 -17 -60 -17 -68 0 -8 -6 -16 -12 -18 -15 -5 -18 33 -4 42 5 3 17 28 26 56 9 28 19 48 21 46 2 -2 -4 -28 -14 -58z m-117 2 c3 -5 1 -12 -5 -16 -5 -3 -10 1 -10 9 0 18 6 21 15 7z m35 0 c0 -6 -4 -13 -10 -16 -5 -3 -10 1 -10 9 0 9 5 16 10 16 6 0 10 -4 10 -9z m14 -53 c9 -12 16 -30 16 -38 0 -13 7 -15 30 -12 34 5 70 -20 70 -47 0 -10 -5 -7 -13 9 -9 18 -21 25 -42 25 -21 0 -33 -7 -43 -25 l-14 -25 7 28 c4 19 2 26 -5 22 -5 -3 -23 3 -38 15 l-27 22 25 -4 c14 -1 28 -7 32 -13 5 -6 8 -3 8 7 0 9 -4 20 -10 23 -5 3 -10 3 -10 -2 0 -4 -13 -8 -29 -8 -23 0 -27 3 -19 13 6 7 20 10 32 6 16 -5 18 -3 10 6 -16 17 -53 3 -64 -23 -6 -16 -9 -18 -9 -5 -2 45 66 64 93 26z m-30 -64 c9 -8 16 -23 16 -32 0 -12 -4 -9 -13 8 -18 35 -66 35 -84 0 -7 -14 -13 -19 -13 -11 0 42 64 66 94 35z m-16 -16 c7 -7 12 -17 12 -22 0 -6 -5 -3 -11 7 -12 21 -23 22 -43 1 -9 -8 -16 -12 -16 -7 0 13 22 33 35 33 6 0 16 -5 23 -12z m130 0 c7 -7 12 -16 12 -21 0 -5 -7 -1 -16 7 -20 21 -31 20 -43 -1 -6 -10 -11 -13 -11 -7 0 13 21 34 35 34 6 0 16 -5 23 -12z m-141 -24 c-3 -3 -12 -4 -19 -1 -8 3 -5 6 6 6 11 1 17 -2 13 -5z m130 0 c-3 -3 -12 -4 -19 -1 -8 3 -5 6 6 6 11 1 17 -2 13 -5z m1 -21 c-43 -2 -113 -2 -155 0 -43 1 -8 3 77 3 85 0 120 -2 78 -3z m5 -28 c-4 -13 -21 -15 -86 -13 -53 2 -82 7 -85 16 -3 9 19 12 87 12 77 0 90 -2 84 -15z"/>
        <path d="M330 306 c-5 -15 -10 -35 -9 -44 0 -9 7 1 15 22 8 22 12 41 9 44 -2 3 -9 -7 -15 -22z"/>
        </g>
        </svg>
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
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    td{
      border: 1px solid #000 !important;
      text-align: center;
      font-size: 12px;
    font-family: "CairoBold";
    }
}

.kitchen-table{
  h6{font-family: "CairoBold";}
}

</style>
