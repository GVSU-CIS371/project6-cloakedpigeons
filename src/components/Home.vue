<template>
  <!-- your answer -->
  <v-container fluid>
    <v-row>
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <store-item :product="product"></store-item>
      </v-col>
    </v-row>
  </v-container>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <store-item :product="product"></store-item>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
// your answer
import { useProductStore, products } from '../stores/ProductStore'; 
import StoreItem from '../components/StoreItem.vue';
import { onMounted, ref } from 'vue';

const productStore = useProductStore();
const isLoading = ref(true); // Define a loading state

onMounted( async () => {
  // Initialize products on component mount
  await productStore.init();
  isLoading.value = false; // Set loading state to false after initialization
});

</script>