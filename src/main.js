import { createApp ,Vue  } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/tailwind.css'
import Select2 from 'vue3-select2-component'
import LitepieDatepicker from 'litepie-datepicker'; 
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// import dayjs from 'dayjs'

// var buddhistEra = require('dayjs/plugin/buddhistEra')
// dayjs.extend(buddhistEra)
// dayjs().format('BBBB BB')
// dayjs.locale('th', null , true)
// .use(dayjs)
const options = {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674',
  };
createApp(App).use(store).use(router).use(LitepieDatepicker).use(VueSweetalert2, options).component('Select2', Select2).mount('#app')
