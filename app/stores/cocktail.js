// ~/stores/counter.js
import { defineStore } from 'pinia'

import Api from '~/api'

export const useCocktailsStore = defineStore('cocktails', {
  state: () => ({
    cocktails: [],
    isLoading: false,
    query: null
  }),
  actions: {
    /**
     *
     * @param cocktails
     */
    setCocktails(cocktails = []) {
      this.cocktails = cocktails || []
    },
    /**
     *
     * @param newValue
     */
    setQuery(newValue) {
      if (typeof newValue === 'string' || !newValue) {
        this.query = newValue
      }
    },
    /**
     *
     * @returns {Promise<*|{}>}
     */
    async getRandomCocktails() {
      try {
        console.log('getRandomCocktails')
        this.isLoading = true
        // пример асинхронной операции
        const data = await Api.get('api/v1/cocktails/id/random')

        return data[0] || {}
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
    /**
     *
     * @returns {Promise<*|{}>}
     */
    async getCocktailsByName() {
      try {
        console.log('getCocktailsByName')
        this.isLoading = true
        // пример асинхронной операции
        if (this.query) {
          const data = await Api.get(`/api/v1/cocktails/name/${this.query}`)
          return data || []
        } else {
          return []
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    }
  }
})
