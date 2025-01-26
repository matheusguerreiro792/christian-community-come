import { defineStore } from 'pinia'
import { supabase } from '@/services/supabaseClient'
import { handleError, generatePassword, handleLog } from '@/utils/functions'
import { sendPasswordMail } from '@/services/brevoClient'

import { useProfileStore } from './profile'
import { useCellStore } from './cell'

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
    async createUser(email) {
      const profile = useProfileStore()

      if (!profile.isAdmin || !profile.isPastor) {
        alert('Somente Pastores podem Criar Novos Membros.')
        return
      }

      const newPassword = generatePassword()

      const { data: userData, error: userError } = await supabase.auth.api.createUser({
        email,
        password: newPassword,
      })

      if (userError) {
        handleError(userError)
        return
      }

      await sendPasswordMail(email, newPassword)

      this.newUser = userData?.user

      if (this.newUser) {
        await profile.createProfile(this.newUser.id)
      }

      handleLog('Novo Membro Criado com Sucesso.')
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

      const cellStore = useCellStore()

      if (profileStore.profile) {
        await cellStore.fetchCell(profileStore.profile.cell_id)
      }

      this.fullUser = {
        user: this.user,
        profile: profileStore.profile,
        cell: cellStore.cell,
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
      const cellStore = useCellStore()

      if (this.user && profileStore.profile && cellStore.cell && this.fullUser) {
        this.userLoaded = true
      }
    },
  },
})
