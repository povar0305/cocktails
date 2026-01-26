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
    get getFilteredCocktails() {
      console.log(this.cocktails.filter(item => {
        // перебираем все свойства фильтров
        console.log('item',this.cocktails,  item)
        // return Object.keys(this.filters).some(key => {
        //   const filterValue = this.filters[key];
        //   const itemValue = item[key];
        //
        //   if (typeof filterValue === 'string') {
        //     return itemValue === filterValue;
        //   } else if (Array.isArray(filterValue)) {
        //     if (Array.isArray(itemValue)) {
        //       // Проверяешь, есть ли хотя бы одно совпадение
        //       return filterValue.some(val => itemValue.includes(val));
        //     } else {
        //       // если у элемента свойство не массив, можно либо возвращать false
        //       // либо создать отдельную логику
        //       return false;
        //     }
        //   } else {
        //     // Другие типы не ожидаемы; возвращаем false или делаем расширение
        //     return false;
        //   }
        // });
      }))

      return this.cocktails
    },
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
            cocktail.cocktail_taste.flat(Infinity)
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
