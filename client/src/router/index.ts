import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { authenticate } from './guards'
import HomeLayout from '@/layouts/HomeLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      component: DashboardLayout,
      beforeEnter: [authenticate],
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: () => import('../views/DashboardView.vue'),
        },
        {
          path: 'trip/create',
          name: 'tripCreate',
          component: () => import('../views/TripCreateView.vue'),
        },
        {
          path: 'trip/:id',
          name: 'Trip',
          component: () => import('../views/TripView.vue'),
        },
        {
          path: 'trip/:id/calculated',
          name: 'TripCalculated',
          component: () => import('../views/TripCalculatedView.vue'),
        },
        {
          path: 'trip/:id/addLocation',
          name: 'AddLocation',
          component: () => import('../views/AddBasicLocationView.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/SignupView.vue'),
    },
    {
      path: '',
      component: HomeLayout,
      children: [
        {
          path: '',
          name: 'Home',
          component: HomeView,
        },
      ],
    },
  ],
})

export default router
