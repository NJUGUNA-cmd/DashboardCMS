import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RobotList from '@/components/RobotList.vue'
import Canvas from '@/components/canvas.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/robots',
      name: 'robots',
      component: RobotList
    },
    {
      path: '/simulation',
      name: 'simulation',
      component: Canvas
    }
  ],
})

export default router
