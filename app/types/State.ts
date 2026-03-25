import type { Cocktail } from "~/types/Cocktail";
import type { FilterItem } from "~/types/Filter";

export interface State {
  cocktails: Cocktail[]
  cocktail: Cocktail
  isLoading: boolean
  query: string | null
  filters: FilterItem[]
  selectedFilters: Record<string, string | number | null>
}
