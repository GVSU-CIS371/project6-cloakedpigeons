import { defineStore } from "pinia";
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";
import { db } from "../main"; // Import the firebase app
import { collection, addDoc, doc, setDoc, DocumentReference, getDocs, QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";

export let products = [] as ProductDoc[];

export const useProductStore = defineStore("ProductStore", {
  // Define products state, initially empty array of ProductDoc
  state: () => ({
    return: { products },
  }),
  actions: {
    // initialize the products with initProducts from data-init.ts
    async init() {
      // products=initProducts;
      // Create firestore collection 
      const productsCollection = collection(db, "products")

      // Check if firestore collection is empty        
      getDocs(productsCollection)
      .then((querySnapshot) => {
        if (querySnapshot.empty) { // If empty, initialize products collection with initProducts from data-init.ts
          // Create docs from products array to add to collection
          initProducts.forEach(async (product: any) => {
            const productDoc = doc(db, "products", product.id); 
            await setDoc(productDoc, {id: product.id, name: product.data.name, 
              description: product.data.description, price: product.data.price,
              rating: product.data.rating, stock: product.data.stock, 
              image: product.data.image, category: product.data.category
            });
          }); 
        } else { // Else load the data from Firestore products collection
          getDocs(productsCollection).then((qs: QuerySnapshot) => {
            qs.forEach((qd: QueryDocumentSnapshot) => {
              const products = qd.data() as ProductDoc[];
              console.log(products);
            })
          });
        }
      })
      .catch((error) => {
        console.error('Error checking collection:', error);
      });      
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
      console.log("getter");
      console.log(products);
      return products; 
    },
  },
});