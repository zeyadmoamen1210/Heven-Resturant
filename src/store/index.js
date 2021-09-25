import Vue from "vue";
import Vuex from "vuex";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allTables:{},
    emptyTables:{},
    emptyCount:"",
    reservedCount:"",
    reservedTables:{},
    fullTables:{},
    fullCount:'',
    areas:[],


    selectedCategory:{},
    orders:[
     {
      notes:"",
      products:[],
      newUser:"",
      selectedAddress:{area: {}},
      selectedCustomer:{
        phone:""
      },
      total:0,
      discount: 0,
      afterDiscounts: 0,

      payment_status: 1,
      selectFromOldAddresses:"",
      orderType: {table:{}},
      date: new Date().toISOString(),
      table_id:'',
      order_type_id:'',
      addresses:[],
      newUser:"",
      selectFromExist:"",
      departmentEmployees:{
        employees:[]
      },
     }
    ],
    selectedOrder: 0,
    currentType:{},


    showAddition: false,
    setUser:{},
    partners:[],
    employeesDepts:[],

    isLoggedIn: null,
    // url:"http://127.0.0.1:8000/images/"
    url:"http://167.172.157.191:2090/images/",
    // url:"https://haven-pos.herokuapp.com/api/images/",
    // url:"https://haven-pos.herokuapp.com/images/"

    ordersTab:"orders"
  },
  mutations: {

    setEmployeeDepts: (state, payload) => {
      state.employeesDepts = payload;
    },
    setPartenars: (state, payload) => {
      state.partners = payload;
    },

    setOrdersTabActive: (state, payload) => {
      if(payload){
        state.ordersTab = "orders";
      }else{
        state.ordersTab = "clients";
      }
    },


    ResetSelectedAddressAndCustomer: (state) => {
      const orderTab = state.orders[state.selectedOrder];
      orderTab.selectedAddress = {area: {}};
      orderTab.selectedCustomer = {phone: " " };
    },

    // calcDiscounts: (state) => {
    //   orderTab.discounts
    //   const orderTab = state.orders[state.selectedOrder];
    //   let discounts = [];
    //   orderTab.products.forEach(ele => {
    //     if(ele.offerDiscount > 0){
    //       discounts.push(Number(ele.offerDiscount));
    //     }
    //   })

    //   discounts = [... new Set(discounts)];
    //   console.log(discounts);
    //   discounts.forEach(ele => orderTab.discounts += Number(ele));
    // },

    calcPrice: (state) => {

      

      const orderTab = state.orders[state.selectedOrder];


      

      

      let sum = 0;
      orderTab.products.forEach(ele => {
        sum += (Number(ele.price) * Number(ele.qty));
      })

      console.log("sum ", sum)

      if(orderTab.selectedAddress && orderTab.selectedAddress.area && Object.keys(orderTab.selectedAddress.area).length > 0){

        console.log("case one ")

        orderTab.driver_cost = Number(orderTab.selectedAddress.area.driver_cost);
        orderTab.haven_cost = Number(orderTab.selectedAddress.area.haven_cost);

        sum += (orderTab.driver_cost  + orderTab.haven_cost);

      }else{
        orderTab.haven_cost = 0;
        orderTab.driver_cost = 0;
      }


      if(orderTab.selectedAddress.area && Object.keys(orderTab.selectedAddress.area).length == 0){
        orderTab.haven_cost = 0;
        orderTab.driver_cost = 0;
      
      }
      

      orderTab.total = Number(sum);

      state.orders[state.selectedOrder].afterDiscounts = state.orders[state.selectedOrder].total - state.orders[state.selectedOrder].discount;
      state.orders[state.selectedOrder].afterDiscounts = state.orders[state.selectedOrder].total - state.orders[state.selectedOrder].discount;


    },


    


    SetAreas: (state, payload) => {
      state.areas = payload;
    },


    AddTableToOrder: (state, payload) => {
      if(state.orders[state.selectedOrder].orderType.id === 3){
        // console.log("sala")
        state.orders[state.selectedOrder].orderType.table = {...payload};
        state.orders[state.selectedOrder].table_id = payload.id;
        localStorage.setItem('HevenOrders', JSON.stringify(state.orders));
      }
    },

    updateTables: (state, payload) => {
        state.allTables = payload;

        state.emptyTables = state.allTables.filter(ele => ele.status == 1);
        state.emptyCount = state.emptyTables.length;

        state.reservedTables = state.allTables.filter(ele => ele.status == 3);
        state.reservedCount = state.reservedTables.length;

        state.fullTables = state.allTables.filter(ele => ele.status == 2);
       
        state.fullCount = state.fullTables.length;
    },

    removeOrder:(state) => {
      state.orders.splice(state.selectedOrder, 1);
    },
    

    deleteProductInOrder: (state, payload) => {
      let targetProduct = state.orders[state.selectedOrder].products[payload];
      console.log(targetProduct)
      if(targetProduct.offerId){

        let i = state.orders[state.selectedOrder].products.length;

        while (i--) {
          if (state.orders[state.selectedOrder].products[i].offerId == targetProduct.offerId) {
            state.orders[state.selectedOrder].products.splice(i, 1);
          }
        }

        state.orders[state.selectedOrder].discount -= Number(targetProduct.discount);
        state.orders[state.selectedOrder].afterDiscounts = state.orders[state.selectedOrder].total - state.orders[state.selectedOrder].discount;
        state.orders[state.selectedOrder].afterDiscounts = state.orders[state.selectedOrder].total - state.orders[state.selectedOrder].discount;

      }else{
        state.orders[state.selectedOrder].products.splice(payload, 1)
      }
      localStorage.setItem('HevenOrders', JSON.stringify(state.orders));



    },
   

    AddNewOrder: (state) => {
      state.orders.push({
        departmentEmployees:{
          employees:[]
        },
    
        
        date: new Date().toISOString(),

        notes:"",
        discount: 0,
      afterDiscounts: 0,
        products:[],
        newUser:"",
        payment_status: 1,
        selectedAddress:{area:{}},
        selectedCustomer:{
          phone:""
        },
        
        orderType: {...state.currentType, table:{}},
        table_id:'',
        order_type_id: state.currentType.id,
        total:0,
        addresses:[],
        selectFromExist:"",
        selectFromOldAddresses:'',
      });

      state.selectedOrder = state.orders.length - 1;
      localStorage.setItem('defaultOrderIndex', state.selectedOrder);
      localStorage.setItem('HevenOrders', JSON.stringify(state.orders));
    },

    SetOrderType:(state, payload) => {
      if(payload){
        state.currentType = {...payload};
      }


      if(state.orders[state.selectedOrder] && state.orders[state.selectedOrder].orderType){
        state.orders[state.selectedOrder].orderType = {...payload, table: {}};
        state.orders[state.selectedOrder].order_type_id = payload.id;

      }else{
        state.orders[0].orderType = {...payload, table: {}};
        state.orders[0].order_type_id = payload.id;
      }

      // localStorage.setItem('HevenOrders', JSON.stringify(state.orders));

      localStorage.setItem('currType', JSON.stringify({...payload}));


      

      if(state.orders[state.selectedOrder] && state.orders[state.selectedOrder].orderType.id == 2){
        // delete state.orders[state.selectedOrder].clientInfo;
        state.orders[state.selectedOrder].selectedCustomer = {};
        state.orders[state.selectedOrder].addresses = [];
        console.log(state.orders[state.selectedOrder].selectedCustomer)
        state.orders[state.selectedOrder].selectedAddress = {};
        state.orders[state.selectedOrder].selectFromExist = '';
        
      }



      
    },

    AddProductsToOrder: (state, payload) => {
      
      
      
      payload.forEach(ele => {
        state.orders[state.selectedOrder].total = Number(state.orders[state.selectedOrder].total) + Number(ele.priceObject.price);
      })

      state.orders[state.selectedOrder].products = [...state.orders[state.selectedOrder].products, ...payload];

      state.orders[state.selectedOrder].discount += Number(payload[0].discount);
      state.orders[state.selectedOrder].afterDiscounts = state.orders[state.selectedOrder].total - state.orders[state.selectedOrder].discount;

      localStorage.setItem('HevenOrders', JSON.stringify(state.orders));
    },

    AddProductToOrder: (state, payload) => {
      // console.log("payload ", payload)


     

      let targetProduct = state.orders[state.selectedOrder].products.findIndex(ele => {
        let ifSameProductSamePrice = ele.id == payload.id && ele.priceObject.id == payload.priceObject.id
        return ifSameProductSamePrice;
      })



        state.orders[state.selectedOrder].total = Number(state.orders[state.selectedOrder].total) + Number(payload.priceObject.price);
        state.orders[state.selectedOrder].afterDiscounts = state.orders[state.selectedOrder].total - state.orders[state.selectedOrder].discount;


        // if(targetProduct >= 0){
        //   state.orders[state.selectedOrder].products[targetProduct].qty += 1;
        // }else{
          state.orders[state.selectedOrder].products.push(payload);
        // }

        
      
      
      
      localStorage.setItem('HevenOrders', JSON.stringify(state.orders));
      
    },

    AddAdditionsToProductInOrder: (state, payload) => {
      // let targetProduct = state.orders[state.selectedOrder].products.findIndex(ele => {
      //   let ifSameProductSamePrice = (ele.id == payload.id) && (ele.priceObject.price == payload.priceObject.price) && (ele.product_category_id == payload.product_category_id)
      //   return ifSameProductSamePrice;
      // })

      // console.log(targetProduct)

      // if(targetProduct < 0){
      //   console.log("payload ", payload)

        state.orders[state.selectedOrder].products.splice(payload.index+1, 0, payload);
      // }
      // }else{
      //   state.orders[state.selectedOrder].products.find(ele => {
      //     if(ele.id == payload.id && ele.priceObject.price == payload.priceObject.price){
      //       console.log("this is element ", ele)
      //       ele.qty +=1
      //     }
      //   })
      // }



    },


    ResetOrderTable: (state) => {
      if(state.orders[state.selectedOrder].orderType.id === 3){
        state.orders[state.selectedOrder].orderType.table = {};
      }
    },

    UpdateOrderTab: (state, payload) => {
      state.selectedOrder = Number(payload);
      localStorage.setItem('defaultOrderIndex', Number(payload));

      state.currentType = state.orders[state.selectedOrder].orderType;
      localStorage.setItem('currType', JSON.stringify({...state.currentType}));
      // localStorage.setItem('HevenOrders', JSON.stringify(state.orders));




    },
    CloseTab: (state, payload) => {
      state.orders.splice(payload, 1);
      state.selectedOrder = state.orders.length - 1;
      localStorage.setItem('defaultOrderIndex', state.selectedOrder);
      localStorage.setItem('HevenOrders', JSON.stringify(state.orders));
    },
    updateOrders:(state, payload) => {
      state.orders = payload;
    },
    updateOrder:(state, payload) => {
      let orderTab = state.orders[state.selectedOrder]

      if(orderTab.orderType.id != 3){
        orderTab.table_id = 1;
      }

      
      orderTab = payload;

      let address = orderTab.selectedAddress;


      

      // concatenate flat and building and streat as a address descriptions
      if(address.building && address.streat && address.flat){
        address.description = `شارع ${address.streat} - عمارة ${address.building} - شقة ${address.flat}`;
      }


      // customer alraady exist and his order in new address then i will add id = 0
      if(!orderTab.newUser && !orderTab.selectFromOldAddresses){
        address.id = 0;
      }


       // set area_id and id = 0 when new customer
       if (orderTab.newUser && address.area && Object.keys(address.area).length > 0){
        address.id = 0;
      }

     

      localStorage.setItem('HevenOrders', JSON.stringify(state.orders));


    },
    UpdateSelectedCategory:(state, payload) => {
      state.selectedCategory = {...payload};
      localStorage.setItem('HevenSelectedCategory', JSON.stringify(state.selectedCategory));
    },

    UpdateUserStatus: (state, payload) => {
      state.isLoggedIn = true;
    },
    addition: (state) => {
      state.showAddition = !state.showAddition
    },
    setUser(state, payload){
      state.user = payload;
    },

    Logout(state){
      state.setUser = {};
      window.localStorage.removeItem("heavenDashboardToken");
      window.localStorage.removeItem("heavenDashboardUser");
      router.push(`/login`);
      state.isLoggedIn = false;
    }
  },
  actions: {
    toggleAddition: ({
      commit
    }) => {
      commit('addition', )
    },

  },
  modules: {},
});