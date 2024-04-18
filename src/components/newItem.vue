<template>
  <v-container fluid>
    <v-card variant="elevated">
      <v-row>
      </v-row>
      <div class="header">
        <v-card-title>Create New Store Item</v-card-title>
      </div>
      <div class="content">
        <div class="field">
          <label>Product Name:</label>
          <input type="text" id="productName" v-model="productName"/>
        </div>
        <div class="field">
          <label>Rating:</label>
          <v-rating v-model="rating" 
          :max="5" 
          half-increments
          color="yellow-darken-3"
          size="35"
          ></v-rating>
        </div>
        <div class="field">
          <label>Price:</label>
          <input type="text" id="price" v-model="price" placeholder="$"/>
        </div>
        <div class="field">
          <label>Stock:</label>
          <input type="text" id="stock" v-model="stock"/>
        </div>
        <div class="field">
          <label>Description:</label>
          <input type="text" id="description" v-model="description"/>
        </div>
        <div class="field">
          <label>Category:</label>
          <v-select v-model="category" 
          :items="['Electronics', 'Clothing', 'Groceries']"
          dense></v-select>
        </div>
        <div class="field">
          <label>Image:</label>
            <input type="text" v-model="image" placeholder="Enter image URL">
            <!--<button @click="addImage">Add Image</button>-->
        </div>
        <div class="field">
          <label>ID:</label>
          <input type="text" id="productID" v-model="productID"/>
        </div>
        <div class="picture">
          <img v-if="image" :src="image" alt="Invalid Image" style="max-width: 20%">
        </div>
      </div>
      <div class="footer">
        <button class="button" @click="addItem">Add Item</button>
        <button class="button" @click="goBack">Go Back</button>
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { db } from "../main";
  import { doc, setDoc } from "firebase/firestore";
  
  const router = useRouter();
  
  const productName = ref('');
  const description = ref('');
  const price = ref(0);
  const rating = ref(0);
  const stock = ref(0);
  const category = ref('');
  const image = ref('');
  const productID = ref(0);

    

  function addItem() {
    // Get user confirmation first
    if (confirm("Are you sure you want to add this item?")) {
    const id = productID.value.toString()
    const productDoc = doc(db, "products", id); 
    setDoc(productDoc, {
      name: productName.value,
      description: description.value,
      price: price.value,
      rating: rating.value,
      stock: stock.value,
      category: category.value,
      image: image.value,
      //productID: productID.value
    });
    router.back();
  } else {
    // Do nothing
  }
}

  function goBack() {
    router.back();
  }
</script>

<style scoped>
.v-card {
  background-color: #212121;
  max-width: 50%;
  margin: auto;
}

.header {
  background-color: #424242;
  padding: 16px;
}

.v-card-title {
  font-size: 24px;
  color: white;
  font-family: sans-serif;
  text-align: center;
  margin-top: 20px;
}

.content {
  color: white;
  padding: 16px;
  font-size: 16px;
}

.footer {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.field {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.field label {
  margin-right: 15px;
}

.field input {
  font-size: 16px;
  font-family: sans-serif;
  color: white;
  background-color: #424242;
  border: none;
  border-radius: 5px;
  padding: 8px;
}

.picture {
  padding: 20px;
  text-align: center;
}

.v-select {
  max-width: 250px; /* Limit the width to 200 pixels */
}

.button {
  background-color: white;
  padding: 10px;
  border-radius: 20px;
}

</style>