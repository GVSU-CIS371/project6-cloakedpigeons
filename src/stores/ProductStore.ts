import { defineStore } from "pinia";
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";

export let products = [] as ProductDoc[];

export const useProductStore = defineStore("ProductStore", {
  // Define products state, initially empty array of ProductDoc
  state: () => ({
    return: { products },
  }),
  actions: {
    // initialize the products with initProducts from data-init.ts
    init() {
      products=initProducts;
    },
    filterByCategory(category: string) {
      products.filter((a) => a.data.category = category);
    },
    filterByRating(minRating: number) {
      products.filter((a) => a.data.rating >= minRating)
    },
  },
  getters: {
    products(): ProductDoc[] {
      return products; 
    },
  },
});
