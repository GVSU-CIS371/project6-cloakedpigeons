<template>
  <!-- your answer -->
  <v-container fluid>
    <v-row>
      <v-col
        v-for="product in products.filter(obj => obj.data.category == 'Electronics')"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <store-item  :product="product"></store-item>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
// your answer
import { useProductStore, products } from '../stores/ProductStore'; 
import StoreItem from '../components/StoreItem.vue';
import { onMounted } from 'vue';

const productStore = useProductStore();

onMounted(() => {
  // Initialize products on component mount
  productStore.init();
});
</script>
