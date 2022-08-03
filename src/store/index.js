import { createStore } from 'vuex'
import http from '@/services/AuthService'
export default createStore({
  state: {
    notFoundData: 'ไม่พบข้อมูลที่ท่านต้องการ กรุณาเลือกเงื่อนไขที่ต้องการค้นหาใหม่',
    isDisable: true,
  },
  mutations: {
   

  },
  actions: {
  },
  modules: {
  }
})
