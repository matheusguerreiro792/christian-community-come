import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useProfileStore } from '@/stores/profile'

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

router.beforeEach(async (to, from, next) => {
  const user = useUserStore()
  const profile = useProfileStore()

  await user.fetchAll()

  if (profile.isAdmin || profile.isPastor) {
    await profile.fetchProfiles()
  }

  if (to.meta.requiresAuth && !user.isAuthenticated) {
    alert('Você Precisa estar Autenticado para Acessar esta Página.')
    return next({ name: 'login' })
  }

  if (to.meta.requiresAuth && to.meta.requiresPastor && !profile.isPastor && !profile.isAdmin) {
    alert('Somente Pastores podem Acessar essa Página.')
    return next({ name: 'profile' })
  }

  next()
})

export default router
