// ~/stores/counter.js
import { defineStore } from 'pinia'

import Api from '~/api'

export const useCocktailsStore = defineStore('cocktails', {
  state: () => ({
    /**
     * @type Cocktail[]
     */
    cocktails: [],
    isLoading: false,
    query: null,
    /**
     * @type Filter[]
     */
    filters: [],
    selectedFilters: {}
  }),
  actions: {
    /**
     * Установка значения массива коктейлей
     * @param {Cocktail[]} cocktails - массив коктейлей
     */
    setCocktails(cocktails = []) {
      this.cocktails = cocktails || []
    },

    /**
     *Установка значения фильтров
     * @param {Filter[]} filters - массив из данных по фильтру
     */
    setFilters(filters = []) {
      this.filters = filters || []
    },
    /**
     * Установка выбранных фильтров
     * @param {string} key - ключ выбранного фильтра
     * @param {string|number|null} value - значение выбранного фильтра
     */
    setSelectedFilters({ key, value = null } = {}) {
      if (key) {
        this.selectedFilters[key] = value || null
      }
    },
    /**
     * Установка значения поискового запроса
     * @param {string|null} newValue
     */
    setQuery(newValue = null) {
      if (typeof newValue === 'string' || !newValue) {
        this.query = newValue
      }
    },
    /**
     * Получение рандомного коктейля
     * @returns {Promise<Cocktail|{}>}
     */
    async getRandomCocktail() {
      try {
        this.isLoading = true
        const data = await Api.get('api/v1/cocktails/id/random')

        return data[0] || {}
      } catch (error) {
        console.error(error)
        return {}
      } finally {
        this.isLoading = false
      }
    },
    /**
     * Получение массива коктейлей по поисковому запросу
     * @returns {Promise<Cocktail[]>}
     */
    async getCocktailsByName() {
      try {
        this.isLoading = true
        if (this.query) {
          const data = await Api.get(`/api/v1/cocktails/name/${encodeURIComponent(this.query)}`)
          return data.map((cocktail) => {
            cocktail.cocktail_taste = cocktail?.cocktail_taste.flat(Infinity) || []
            return cocktail
          }) || []
        } else {
          return []
        }
      } catch (error) {
        console.error(error)
        return []
      } finally {
        this.isLoading = false
      }
    },
    /**
     * Получение массива коктейлей по игнредиенту
     * @returns {Promise<Cocktail[]>}
     */
    async getCocktailsByIngredient() {
      try {
        this.isLoading = true
        if (this.query) {
          const data = await Api.get(`/api/v1/cocktails/ingredient/${encodeURIComponent(this.query)}`)
          return data || []
        } else {
          return []
        }
      } catch (error) {
        console.error(error)
        return []
      } finally {
        this.isLoading = false
      }
    }
  }
})
