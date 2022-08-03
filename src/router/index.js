import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

// import Layout Frontend
import FrontendLayout from '@/layouts/Frontend.vue'

const routes = [
  {
    path: '/',
    component: FrontendLayout,
    children: [{
      path: '',
      name: 'Home',
      component: Home
    }],
    meta: {
      title: 'หน้าหลัก'
    }
  },
  {
    path: '/about',
    name: 'About',
  
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
