import { defineStore } from 'pinia'
import { supabase } from '@/services/supabaseClient'
import { handleError, handleLog } from '@/utils/functions'
import { useUserStore } from './user'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: null,
    newProfile: null,
    profiles: [],
  }),
  getters: {
    isAdmin: (state) => state.profile?.role === 'admin',
    isPastor: (state) => state.profile?.role === 'pastor',
    isLeader: (state) => state.profile?.role === 'leader',
    isMember: (state) => state.profile?.role === 'member',
  },
  actions: {
    async fetchProfile(userId) {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId)

      if (error) {
        handleError(error)
        return
      }

      this.profile = data[0]
    },

    async fetchProfiles() {
      const user = useUserStore()

      await user.fetchUser()

      if (user.userLoaded && !this.isAdmin && !this.isPastor) {
        handleLog('Somente Pastores podem Ver os Membros.')
        return
      }

      const { data, error } = await supabase.from('profiles').select('*')

      if (error) {
        handleError(error)
        return
      }

      this.profiles = data
    },

    cleanProfileStore() {
      this.profile = null
      this.newProfile = null
      this.profiles = []
    },

    async fetchAll() {
      await this.fetchProfiles()
    },
  },
})
