import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

import HomePage from '@/pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import MembersPage from '@/pages/MembersPage.vue'

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
  {
    path: '/members',
    name: 'members',
    component: MembersPage,
    meta: {
      requiresAuth: true,
      requiresPastor: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const user = useUserStore()

  if (user.userLoaded && to.meta.requiresAuth && !user.isAuthenticated) {
    next({ name: 'login' })
  }

  if (user.userLoaded && to.meta.requiresPastor && !user.isPastor && !user.isAdmin) {
    next({ name: 'profile' })
  }

  next()
})

export default router
