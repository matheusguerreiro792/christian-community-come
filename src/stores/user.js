import { defineStore } from 'pinia'
import { supabase } from '@/services/supabaseClient'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    newUser: null,
    profile: null,
    newProfile: null,
    address: null,
    newAddress: null,
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
    handleError(error) {
      if (import.meta.env.MODE === 'development') {
        console.error(error)
      }
    },

    async fetchUser() {
      const { data, error } = await supabase.auth.getUser()

      if (error) {
        this.handleError(error)
      }

      this.user = data.user
    },

    async fetchProfile() {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', this.user.id)

      if (error) {
        this.handleError(error)
      }

      this.profile = data[0]
    },

    async create(email, password, profileData, addressData) {
      if (this.user.isAdmin || this.user.isPastor) {
        const { data: userData, error: userError } = await supabase.auth.api.createUser({
          email,
          password,
        })

        if (userError) {
          this.handleError(userError)
          return
        }

        this.newUser = userData.user

        if (this.newUser) {
          const { data: profileDataResult, error: profileError } = await supabase
            .from('profiles')
            .insert({ user_id: this.newUser.id, ...profileData })

          if (profileError) {
            this.handleError(profileError)
            return
          }

          this.newProfile = profileDataResult[0]
        }

        if (this.newProfile) {
          const { data: addressDataResult, error: addressError } = await supabase
            .from('addresses')
            .insert({ user_id: this.newUser.id, ...addressData })

          if (addressError) {
            this.handleError(addressError)
            return
          }

          this.newAddress = addressDataResult[0]
        }
      }
    },

    async logIn(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        this.handleError(error)
      }

      this.user = data.user

      if (this.user) {
        await this.fetchProfile()

        this.userLoaded = true
      }
    },

    async logOut() {
      await supabase.auth.signOut()

      this.cleanUserStore()
    },

    cleanUserStore() {
      this.user = null
      this.profile = null
      this.userLoaded = false
    },

    fetchAll() {
      this.fetchUser()
        .then(() => {
          if (this.user) {
            return this.fetchProfile()
          }
        })
        .catch((error) => {
          this.handleError(error)
        })
        .finally(() => {
          this.userLoaded = true
        })
    },
  },
})
