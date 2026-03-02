import { defineStore } from 'pinia'

import Api from '~/api'

export const useCocktailStore = defineStore('cocktail', {
  state: () => ({
    /**
     * @type Cocktail
     */
    cocktail: null,
    isLoading: false,
    /**
     * @type Filter[]
     */
    filters: [],
    selectedFilters: {}
  }),
  actions: {
    /**
     * Установка данных по коктейлю
     * @param {Cocktail} cocktail
     */
    setCocktail(cocktail = []) {
      this.cocktail = cocktail || []
    },
    /**
     * Получение данных по коктейлю по id
     * @returns {Promise<Cocktail[]>}
     */
    async getCocktailData(id) {
      try {
        this.isLoading = true

        this.cocktail = await Api.get(`/api/v1/cocktails/id/${id}`) || null

        return data
      } catch (error) {
        return null

        console.error(error)
      } finally {
        this.isLoading = false
      }
    }
  }
})
