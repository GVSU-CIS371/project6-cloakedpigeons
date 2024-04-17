<template>
  <container>
        <v-card class="justify-center">
          <div class="field">
            <label>Product Name:   </label>
            <input type="text" />
          </div>
          <div class="field">
            <label>Rating:   </label>
            <input type="text" />
          </div>
          <div class="field">
            <label>Price:   </label>
            <input type="text" />
          </div>
          <div class="field">
            <label>Stock:   </label>
            <input type="text" />
          </div>
          <div class="field">
            <label>Description:   </label>
            <input type="text" />
          </div>
        <button>Add Item</button>
        <v-spacer></v-spacer>
        <button @click="goBack">Go Back</button>
        </v-card>
    </container>
</template>

<script lang="ts" setup>
  //import { defineProps, computed } from "vue";
  import { useRouter } from "vue-router";
  //import { randomUsers } from "../data/usersData";
  //import { product } from "../components/StoreItem.vue";
  //const { id } = defineProps({
  //  id: String,
  //});
  // const user = computed(() => randomUsers.value.find((u) => u.id === id));
  const router = useRouter();

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