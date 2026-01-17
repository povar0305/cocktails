// ~/stores/counter.js
import { defineStore } from 'pinia'

export const useCocktailsStore = defineStore('cocktails', {
  state: () => ({
    cocktails: []
  }),
  actions: {
    addCocktail(cocktail) {
      this.cocktails.push(cocktail)
    }
  }
})
