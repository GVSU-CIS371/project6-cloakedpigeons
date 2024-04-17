import { defineStore } from "pinia";
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";
import { app, db } from "../main"; // Import the firebase app
import { collection, addDoc, doc, setDoc, DocumentReference } from "firebase/firestore";

export let products = [] as ProductDoc[];

export const useProductStore = defineStore("ProductStore", {
  // Define products state, initially empty array of ProductDoc
  state: () => ({
    return: { products },
  }),
  actions: {
    // initialize the products with initProducts from data-init.ts
    init() {
      //products=initProducts;
      // Create firestore collection 
      const productsCollection = collection(db, "products")
      // Create docs from products array to add to collection
      initProducts.forEach(async (product: any) => {
          const productDoc = doc(db, "products", product.id); 
          await setDoc(productDoc, {name: product.data.name, 
            description: product.data.description, price: product.data.price,
            rating: product.data.rating, stock: product.data.stock, 
            image: product.data.image, category: product.data.category
          });
      }); 
      //addDoc(productsCollection, {}); 
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