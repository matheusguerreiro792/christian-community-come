import { defineStore } from 'pinia'
import { supabase } from '@/services/supabaseClient'
import { handleError } from '@/utils/functions'

import { useProfileStore } from './profile'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    newUser: null,
    userLoaded: false,
    fullUser: {},
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    async create(email, password, profileData, addressData) {
      const profile = useProfileStore()

      if (!profile.isAdmin || !profile.isPastor) {
        alert('Somente Pastores podem Criar Novos Membros.')
        return
      }

      const { data: userData, error: userError } = await supabase.auth.api.createUser({
        email,
        password,
      })

      if (userError) {
        handleError(userError)
        return
      }

      this.newUser = userData?.user

      if (this.newUser) {
        const { data: profileDataResult, error: profileError } = await supabase
          .from('profiles')
          .insert({ user_id: this.newUser.id, ...profileData })

        if (profileError) {
          handleError(profileError)
          return
        }

        this.newProfile = profileDataResult[0]
      }

      if (this.newProfile) {
        const { data: addressDataResult, error: addressError } = await supabase
          .from('addresses')
          .insert({ user_id: this.newUser.id, ...addressData })

        if (addressError) {
          handleError(addressError)
          return
        }

        this.newAddress = addressDataResult[0]
      }
    },

    async fetchUser() {
      const { data, error } = await supabase.auth.getUser()

      if (error) {
        handleError(error)
        return
      }

      this.user = data.user

      const profileStore = useProfileStore()

      if (this.user) {
        await profileStore.fetchProfile(this.user.id)
      }

      this.fullUser = {
        user: this.user,
        profile: profileStore.profile,
      }
    },

    async logIn(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        handleError(error)
        return
      }

      this.user = data.user
    },

    async logOut() {
      await supabase.auth.signOut()
      this.cleanUserStore()
    },

    cleanUserStore() {
      this.user = null
      this.newUser = null

      const profileStore = useProfileStore()
      profileStore.cleanProfileStore()

      this.userLoaded = false
      this.fullUser = {}
    },

    async fetchAll() {
      await this.fetchUser()

      const profileStore = useProfileStore()

      if (this.user && profileStore.profile && this.fullUser) {
        this.userLoaded = true
      }
    },
  },
})
