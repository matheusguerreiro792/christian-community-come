import { defineStore } from 'pinia'
import { supabase } from '@/services/supabaseClient'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    profile: null,
    userLoaded: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) => state.profile?.role === 'admin',
    isPastor: (state) => state.profile?.role === 'pastor',
    isLeader: (state) => state.profile?.role === 'leader',
    isMember: (state) => state.profile?.role === 'member',
  },
  actions: {
    async fetchUser() {
      const { data, error } = await supabase.auth.getUser()

      if (error) console.error(error)

      this.user = data.user
    },

    async fetchProfile() {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', this.user.id)

      if (error) console.error(error)

      this.profile = data[0]
    },

    async handleLogin(email, password) {
      const { user, error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) console.error(error)

      this.user = user
    },

    async handleLogout() {
      await supabase.auth.signOut()

      this.cleanUserStore()
    },

    cleanUserStore() {
      this.user = null
      this.profile = null
      this.userLoaded = false
    },

    async fetchAll() {
      await this.fetchUser()
      await this.fetchProfile()

      this.userLoaded = true
    },
  },
})
