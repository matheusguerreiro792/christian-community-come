import { defineStore } from 'pinia'
import { supabase } from '@/services/supabaseClient'
import { handleError } from '@/utils/functions'

export const useCellStore = defineStore('cell', {
  state: () => ({
    cells: [],
    cell: {},
  }),
  actions: {
    async fetchCells() {
      const { data, error } = await supabase.from('cells').select('*')

      if (error) {
        handleError(error)

        return
      }

      this.cells = data
    },
    async fetchCell(id) {
      const { data, error } = await supabase.from('cells').select('*').eq('id', id)

      if (error) {
        handleError(error)

        return
      }

      this.cell = data[0]
    },

    cleanCellStore() {
      this.cells = []
      this.cell = {}
    },

    async fetchAll() {
      await this.fetchCells()
    },
  },
})
