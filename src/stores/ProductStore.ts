import { defineStore } from "pinia";
import { ProductDoc, Product } from "../types/product";
import { initProducts } from "../data-init";
import { db } from "../main"; // Import the firebase app
import { collection, addDoc, doc, setDoc, DocumentReference, getDocs, QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";

export const useProductStore = defineStore("ProductStore", {
  // Define products state, initially empty array of ProductDoc
  state: () => {
    return { products: [] as ProductDoc[] }
  },
  actions: {
    // initialize the products with initProducts from data-init.ts
    async init() {
      // this.products=initProducts;
      // Create firestore collection 
      const productsCollection = collection(db, "products")
      // Check if firestore collection is empty        
      getDocs(productsCollection)
      .then((querySnapshot) => {
        if (querySnapshot.empty) { // If empty, initialize products collection with initProducts from data-init.ts
          this.products=initProducts;
          // Create docs from products array to add to collection
          initProducts.forEach(async (product: any) => {
            const productDoc = doc(productsCollection, product.id); 
            await setDoc(productDoc, product.data);
          }); 
        } else { // Else load the data from Firestore products collection
          // Clear products array firstly
          this.products = [];
          // Now get the documents from firestore
          getDocs(productsCollection).then((qs: QuerySnapshot) => {
            qs.forEach((qd: QueryDocumentSnapshot) => {
              const productData = qd.data() as Product;
              const productId = qd.id;
              let product = {} as ProductDoc;
              product.id = productId;
              product.data = productData;
              this.products.push(product);
            }) 
          });
        } 
      }) 
      .catch((error) => {
        console.error('Error checking collection:', error);
      }); 
    },
    filterByCategory(category: string) {
      this.products.filter((a) => a.data.category = category);
    },
    filterByRating(minRating: number) {
      this.products.filter((a) => a.data.rating >= minRating)
    },
  },
});