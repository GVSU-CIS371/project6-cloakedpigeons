<template>
  <container>
        <v-card class="justify-center">
          <div class="field">
            <label>Product Name:   </label>
            <input type="text" id="productName" v-model="productName"/>
          </div>
          <div class="field">
            <label>Rating:   </label>
            <input type="text" id="rating" v-model="rating"/>
          </div>
          <div class="field">
            <label>Price:   </label>
            <input type="text" id="price" v-model="price"/>
          </div>
          <div class="field">
            <label>Stock:   </label>
            <input type="text" id="stock" v-model="stock"/>
          </div>
          <div class="field">
            <label>Description:   </label>
            <input type="text" id="description" v-model="description"/>
          </div>
          <div class="field">
            <label>Category:   </label>
            <input type="text" id="category" v-model="category"/>
          </div>
        <button @click="addItem">Add Item</button>
        <v-spacer></v-spacer>
        <button @click="goBack">Go Back</button>
        </v-card>
    </container>
</template>

<script lang="ts" setup>
  import { defineProps, computed, ref } from "vue";
  import { ProductDoc } from "../types/product";
  import { useRouter } from "vue-router";
  //import { randomUsers } from "../data/usersData";
  //import { product } from "../components/StoreItem.vue";
  import { app, db } from "../main"; // Import the firebase app
  import { collection, addDoc, doc, setDoc, DocumentReference, getDocs, QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";
  
  


  //const user = computed(() => randomUsers.value.find((u) => u.id === id));
  const router = useRouter();
  const productCollection = collection(db,"productStore");
  const productName = ref('');
  const description = ref('');
  const price = ref(0);
  const rating = ref(0);
  const stock = ref(0);
  const image = ref('');
  const category = ref('');
  let id ='';
  getDocs(productCollection)
      .then((querySnapshot) => {
        id = (querySnapshot.size).toString();
      });

  function addItem() {
    const productDoc = doc(db, "productStore", id); 
      setDoc(productDoc, {
      name: productName.value,

      description: description.value,

      price: price.value,

      rating: rating.value,

      stock: stock.value,

      image: image.value,

      category: category.value

    });
    router.back();
  }

  function goBack() {
    router.back();
  }
</script>

<style scoped>
.container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-width: 500px;
  margin: 40px auto;
}
</style>