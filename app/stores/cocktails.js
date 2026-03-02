import { defineStore } from 'pinia'

import Api from '~/api'
import { filterTypes } from '~/constants/filterTypes.js'

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
  getters: {
    filteredCocktails(state) {
      return state.cocktails.filter(cocktail => {
        // Проверяем каждый фильтр
        return Object.entries(state.selectedFilters).every(([key, values]) => {
          const cocktailValue = cocktail[key]

          if (Array.isArray(cocktailValue)) {
            return values.some(val => cocktailValue?.includes(val))
          } else if (typeof cocktailValue === 'string') {
            return values.includes(cocktailValue)
          } else if ( typeof cocktailValue === 'number' ) {
            return Number(cocktailValue).toFixed(2) == values
          }
        })
      })
    },
    hasSelectedFiltersValue(state) {
      return state?.selectedFilters !== undefined && Object.values(state?.selectedFilters)?.length ? Object.values(state.selectedFilters).some(
        value => Array.isArray(value) && value.length > 0
      ) : false
    }
  },
  actions: {
    /**
     * Установка значения массива коктейлей
     * @param {Cocktail[]} cocktails - массив коктейлей
     */
    setCocktails(cocktails = []) {
      this.cocktails = cocktails || []
    },
    /**
     * Установка значения фильтров
     */
    initFilters() {
      this.filters = [
        {
          label: 'Base type',
          key: 'cocktail_base_type',
          element: filterTypes.multiSelect,
          options: [...new Set(this.cocktails.flatMap(item => item?.cocktail_base_type))].sort()
        },
        {
          label: 'Types',
          key: 'cocktail_type',
          element: filterTypes.multiSelect,
          options: this.cocktails.map((cocktail) => cocktail?.cocktail_type)
        },
        {
          label: 'Taste',
          key: 'cocktail_taste',
          element: filterTypes.multiSelect,
          options: [...new Set(this.cocktails.flatMap(item => item?.cocktail_taste).flat(Infinity))].sort()
        },
        {
          label: 'Author',
          key: 'cocktail_author',
          element: filterTypes.multiSelect,
          options: [...new Set(this.cocktails.flatMap(item => item?.cocktail_author).flat(Infinity))].sort()
        },
        {
          label: 'Type drinks',
          key: 'cocktail_type_drinks',
          element: filterTypes.multiSelect,
          options: [...new Set(this.cocktails.flatMap(item => item?.cocktail_type_drinks).flat(Infinity))].sort()
        },
        {
          label: 'Complexity',
          key: 'cocktail_complexity_type',
          element: filterTypes.multiSelect,
          options: [...new Set(this.cocktails.flatMap(item => item?.cocktail_complexity_type))].sort()
        },
        {
          label: 'Like',
          key: 'cocktail_like',
          element: filterTypes.multiSelect,
          options: [...new Set(this.cocktails.flatMap(item => item?.cocktail_like))].sort()
        },
        {
          label: 'Score',
          key: 'score',
          element: filterTypes.multiSelect,
          options: [...new Set(this.cocktails.flatMap(item => Number(item?.score.toFixed(2))))].sort()
        }
      ]
      this.selectedFilters = this.filters.map((filter) => {
        return filter.key
      })
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
