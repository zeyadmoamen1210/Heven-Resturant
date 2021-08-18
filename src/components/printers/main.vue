<template>
  <div>
    
    <h6
      class="text-center mt-2 mb-2"
      style="margin-top:100px;font-size:18px;padding: 8px;font-weight: 500;margin-top: 8px;"
      v-if="inVoiceDetails && inVoiceDetails.branch"
    >
      <b>
        {{ inVoiceDetails.branch.name }}
      </b>
    </h6>
    <!-- <h6 class="text-center mt-2 mb-2">haVen</h6> -->

    <div>
      <table class="custom-table" >
        <tr v-if="inVoiceDetails">
          <td width="35%">رقم الطلب</td>
          <td>
            <b>{{ inVoiceDetails.order }}</b>
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

        <tr>
          <td width="35%">ميعاد الإستلام</td>
          <td >{{ new Date(inVoiceDetails.preparated_at).toLocaleString("ar-EG") }}</td>
        </tr>


         <tr v-if="inVoiceDetails.notes">
          <td width="35%">ملاحظات</td>
          <td>
            <b>{{ inVoiceDetails.notes }}</b>
          </td>
        </tr>








        
        <tr v-if="inVoiceDetails &&
            inVoiceDetails.customer && inVoiceDetails.customer.id > 0">
          <td width="35%">العميل</td>
          <td >{{ inVoiceDetails.customer.name }}</td>
        </tr>

        <tr v-else>
          <td width="35%">العميل</td>
          <td >نقدي</td>
        </tr>


        <tr v-if="inVoiceDetails && inVoiceDetails.customer && inVoiceDetails.customer.mobile && inVoiceDetails.customer.id != 1 && inVoiceDetails.customer.mobile != 0">
          <td>الهاتف</td>
          <td>
            {{ inVoiceDetails.customer.mobile }}
          </td>
        </tr>
        <tr v-if="inVoiceDetails && inVoiceDetails.customer && inVoiceDetails.customer.id != 1 && inVoiceDetails.customer.phone">
          <td >رقم التليفون</td>
          <td >
            {{ inVoiceDetails.customer.phone }}
          </td>
        </tr>

        <tr v-if="inVoiceDetails && inVoiceDetails.address && inVoiceDetails.customer.id != 1">
          <td width="35%">العنوان</td>
          <td >{{ inVoiceDetails.address }}</td>
        </tr>

        <tr v-if="inVoiceDetails && inVoiceDetails.user">
          <td width="35%">الكاشير</td>
          <td >{{ inVoiceDetails.user.name }}</td>
        </tr>


        <template
        v-if="
          inVoiceDetails &&
            inVoiceDetails.employee &&
            inVoiceDetails.order_type &&
            inVoiceDetails.order_type.id != 1 &&
            inVoiceDetails.order_type.id != 3
        "
      >


        
        
        
       
        


        <tr v-if="inVoiceDetails.employee && inVoiceDetails.employee.id > 1">
          <td width="35%">السائق</td>
          <td >{{ inVoiceDetails.employee.name }}</td>
        </tr>

        

        <tr></tr>
      </template>

      </table>

      <div style="height: 10px;"></div>

      <table class="custom-table" >
        <thead>
          <tr>
            <td>الكمية</td>
            <td>الصنف</td>
            <td>م</td>
            <td>السعر</td>
            <td>القيمة</td>
          </tr>
        </thead>

        <tbody v-if="isKitchenPrinters">
          <tr v-for="(x, index) in dataForPrint" :key="index">
            <td>{{ x.pivot ? x.pivot.qty : x.qty }}</td>
            <td>{{ x.name }}</td>
            <td>{{ x.pivot ? x.pivot.size : x.size }}</td>
            <td>{{ x.pivot ? x.pivot.price : x.price }}</td>
            <td>
              {{
                calcTotal(
                  x.pivot ? x.pivot.qty : x.qty,
                  x.pivot ? x.pivot.price : x.price
                )
              }}
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr v-for="(x, index) in dataForPrint" :key="index">
            <td>{{ x.pivot ? x.pivot.qty : x.qty }}</td>
            <td>{{ x.name }}</td>
            <td>{{ x.pivot ? x.pivot.size : x.size }}</td>
            <td>{{ x.pivot ? x.pivot.price : x.price }}</td>

            <td>
              {{
                calcTotal(
                  x.pivot ? x.pivot.qty : x.qty,
                  x.pivot ? x.pivot.price : x.price
                )
              }}
            </td>
          </tr>
        </tbody>
        <!-- <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tfoot> -->
      </table>

      <div style="height: 10px;"></div>

     

      <table class="custom-table">


        <tr
          v-if="
            inVoiceDetails &&
              (inVoiceDetails.driver_cost > 0 ||
                inVoiceDetails.restaurant_cost > 0)
          "
        >
          <td style="width: 180px;background:#f7f7f7;    font-weight: bold;">
            الإجمالي
          </td>
          <td> 
            {{
              allOrderPrice - 
              (inVoiceDetails.driver_cost
                ? Number(inVoiceDetails.driver_cost)
                : 0) +
                (inVoiceDetails.restaurant_cost
                  ? Number(inVoiceDetails.restaurant_cost)
                  : 0)
            }}
            ج.م
          </td>
        </tr>


        <tr
          v-if="
            inVoiceDetails &&
              (inVoiceDetails.driver_cost > 0 ||
                inVoiceDetails.restaurant_cost > 0)
          "
        >
          <td style="width: 180px;background:#f7f7f7;    font-weight: bold;">
            سعر التوصيل
          </td>
          <td >
            {{
              (inVoiceDetails.driver_cost
                ? Number(inVoiceDetails.driver_cost)
                : 0) +
                (inVoiceDetails.restaurant_cost
                  ? Number(inVoiceDetails.restaurant_cost)
                  : 0)
            }}
            ج.م
          </td>
        </tr>

        <tr>
          <td style="background:#f7f7f7;    font-weight: bold;">
            إجمالي الفاتورة
          </td>
          <td style="width: 100px;" v-if="inVoiceDetails && inVoiceDetails.total">
            <b>{{
              Number(inVoiceDetails.total) +
                (inVoiceDetails.driver_cost
                  ? Number(inVoiceDetails.driver_cost)
                  : 0) +
                (inVoiceDetails.restaurant_cost
                  ? Number(inVoiceDetails.restaurant_cost)
                  : 0)
            }}</b>
            ج.م
          </td>
          <td v-else >
            <b>{{ allOrderPrice }}</b> ج.م
          </td>
        </tr>
      </table>

      <div style="height: 5px;"></div>

      <div
        class="d-flex justify-content-center pt-1 shared-value"
      >
        <h6><b>الاسعار شاملة ضريبة القيمة المضافة</b></h6>
        
      </div>


      <div
        class="d-flex justify-content-center p-1 phone"
        style=""
      >
        <h6 class="head"><b>للتوصيل</b></h6>
        <h6 class="value" v-if="inVoiceDetails && inVoiceDetails.branch && inVoiceDetails.branch.phone">
           {{ inVoiceDetails.branch.phone }} <i class="fas fa-phone-alt"></i>
        </h6>
      </div>

      <h6
      v-if="inVoiceDetails && inVoiceDetails.branch"
      class="address"
       
      >
        {{ inVoiceDetails.branch.address }}
      </h6>

      


     
    </div>
  </div>
</template>

<script>
export default {
    props:['isKitchenPrinters', 'dataForPrint', 'inVoiceDetails', 'allOrderPrice'],
    methods:{
        calcTotal(qty, price){
            return Number(qty)*Number(price);
        },
    }
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

.shared-value{
  border: 1px solid #000;
  margin: 0 ;
  h6{
    margin:0 10px;
    margin-bottom:0;
    font-size:12px;
    padding: 8px;
    font-family: "CairoBold";
  }
}
.phone{
    padding: 10px;
    border: 1px solid #000;
    margin: 10px 0;
    .head{
      margin:0 5px;margin-bottom:0;font-size:12px;font-family: "CairoBold";
    }
    .value{
      margin:0;font-size:12px;font-family: "CairoBold"
    }
}
h6.address{
  font-family: "CairoBold";
  text-align: center;
  padding: 5px;font-weight: 500;background: #f7f7f7;margin-top: 8px; font-weight: bold;font-size:12px;
}
</style>
