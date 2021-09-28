import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

const axiosApi = axios.create({
    baseURL:  `http://167.172.157.191:5050/api/`,
    // baseURL: 'https://haven-pos.herokuapp.com/api/',
    // baseURL: `http://127.0.0.1:8000/api/`,
    headers: {
         Authorization: `Bearer ${window.localStorage.getItem('heavenDashboardToken')}` ,
    }
})

Vue.use(VueAxios, axios)
export default axiosApi;
