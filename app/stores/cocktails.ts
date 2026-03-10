import { defineStore } from 'pinia'

import Api from '~/api'
import { filterTypes } from '~/constants/filterTypes.js'
import type { Cocktail, Filter } from '~/types/types'

interface State {
  cocktails: Cocktail[]
  cocktail: Cocktail
  isLoading: boolean
  query: string | null
  filters: Filter[]
  selectedFilters: Record<string, string | number | null>
}

export const useCocktailsStore = defineStore('cocktails', {
  state: (): State => ({
    cocktails: [],
    cocktail: {} as Cocktail,
    isLoading: false,
    query: null,
    filters: [],
    selectedFilters: {}
  }),
  getters: {
    filteredCocktails(state): Cocktail[] {
      return state.cocktails.filter((cocktail) => {
        // Проверяем каждый фильтр
        return Object.entries(state.selectedFilters).every(([key, values]) => {
          const cocktailValue = (cocktail as any)[key] // Временно any, так как ключи динамические

          if (Array.isArray(cocktailValue)) {
            return (values as unknown as any[]).some(val => cocktailValue?.includes(val))
          } else if (typeof cocktailValue === 'string') {
            return (values as unknown as string[]).includes(cocktailValue)
          } else if (typeof cocktailValue === 'number') {
            // Т.к. сравниваем числа и строки
            return Number(cocktailValue).toString() === (values as string | number).toString()
          }
        })
      })
    },
    hasSelectedFiltersValue(state): boolean {
      return (
        state.selectedFilters !== undefined &&
        Object.values(state.selectedFilters).length > 0 &&
        Object.values(state.selectedFilters).some(
          (value) => Array.isArray(value) && value.length > 0
        )
      )
    },
  },
  actions: {
    setCocktails(cocktails: Cocktail[] = []) {
      this.cocktails = cocktails || []
    },
    setCocktail(cocktail: Cocktail) {
      this.cocktail = cocktail
    },
    initFilters() {
      this.filters = [
        {
          label: 'Base type',
          key: 'cocktail_base_type',
          element: filterTypes.multiSelect,
          options: [
            ...new Set(this.cocktails.flatMap((item) => item?.cocktail_base_type))
          ].sort()
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
          options: [
            ...new Set(
              this.cocktails
                .flatMap((item) => item?.cocktail_taste)
                .flat(Infinity)
            )
          ].sort()
        },
        {
          label: 'Author',
          key: 'cocktail_author',
          element: filterTypes.multiSelect,
          options: [
            ...new Set(
              this.cocktails
                .flatMap((item) => item?.cocktail_author)
                .flat(Infinity)
            )
          ].sort()
        },
        {
          label: 'Type drinks',
          key: 'cocktail_type_drinks',
          element: filterTypes.multiSelect,
          options: [
            ...new Set(
              this.cocktails
                .flatMap((item) => item?.cocktail_type_drinks)
                .flat(Infinity)
            )
          ].sort()
        },
        {
          label: 'Complexity',
          key: 'cocktail_complexity_type',
          element: filterTypes.multiSelect,
          options: [
            ...new Set(this.cocktails.flatMap((item) => item?.cocktail_complexity_type))
          ].sort()
        },
        {
          label: 'Like',
          key: 'cocktail_like',
          element: filterTypes.multiSelect,
          options: [
            ...new Set(this.cocktails.flatMap((item) => item?.cocktail_like))
          ].sort()
        },
        {
          label: 'Score',
          key: 'score',
          element: filterTypes.multiSelect,
          options: [
            ...new Set(this.cocktails.map((item) => Number(item?.score).toFixed(2)))
          ].sort()
        }
      ]
      this.selectedFilters = Object.fromEntries(this.filters.map((f) => [f.key, null]))
    },
    setSelectedFilters({ key, value = null }: { key: string; value?: string | number | null }) {
      if (key) {
        this.selectedFilters[key] = value
      }
    },
    setQuery(newValue: string | null = null) {
      if (typeof newValue === 'string' || newValue === null) {
        this.query = newValue
      }
    },
    async getRandomCocktail(): Promise<Cocktail | {}> {
      try {
        this.isLoading = true

        const data = await Api.get('api/v1/cocktails/id/random')
        this.setCocktail(data[0])

        return data[0] || {}
      } catch (error) {
        console.error(error)
        return {}
      } finally {
        this.isLoading = false
      }
    },
    async getCocktailsByName(): Promise<Cocktail[]> {
      try {
        this.isLoading = true
        if (this.query) {
          const data: Cocktail[] = await Api.get(
            `/api/v1/cocktails/name/${encodeURIComponent(this.query)}`
          )
          return data.map((cocktail) => {
            cocktail.cocktail_taste = cocktail?.cocktail_taste?.flat(Infinity) || []
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
    async getCocktailData(id: string): Promise<Cocktail | null> {
      try {
        this.isLoading = true
        const data: Cocktail = await Api.get(`/api/v1/cocktails/id/${id}`)

        this.setCocktail(data)

        return data || null
      } catch (error) {
        console.error(error)
        return null
      } finally {
        this.isLoading = false
      }
    }
  }
})
