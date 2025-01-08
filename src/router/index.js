import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

import HomePage from '@/pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage,
    meta: {
      requiresAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const user = useUserStore()
  if (to.meta.requiresAuth) {
    if (!user.user) {
      next({ path: '/login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
