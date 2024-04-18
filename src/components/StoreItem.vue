<template>
  <v-card v-if="!editMode"
    class="store-item-card"
    max-width="425"
    height="100%"
    hover
  >
    <!-- Row 1: Title -->
    <v-card-title><b>{{ product.data.name }}</b></v-card-title>
    
    <!-- Row 2: Rating, Price, Stock -->
    <v-row class="row justify-center">
      <v-col cols="3">
        <v-rating 
          v-model="product.data.rating" 
          color="yellow-darken-3"
          size="20"
          readonly
          half-increments
        ></v-rating>
      </v-col>
      <v-col cols="3" class="text-center">
        <v-row class="icon-text">
            <v-card-text><v-icon icon="mdi-cash" color="green" size="30"></v-icon>{{ product.data.price }}</v-card-text>
        </v-row>
      </v-col>
      <v-col cols="3">
        <v-row class="icon-text">
            <v-card-text><v-icon icon="mdi-package-variant" color="blue" size="24"></v-icon>{{ product.data.stock }}</v-card-text>
        </v-row>
      </v-col>
    </v-row>
    
    <!-- Row 3: Image -->
    <v-row>
      <v-col></v-col>
      <v-col cols="8">
        <v-img :src="product.data.image" aspect-ratio="1"></v-img>
      </v-col>
      <v-col></v-col>
    </v-row>
    
    <!-- Row 4: Description -->
    <v-row>
      <v-col></v-col>
      <v-col cols="9">
        <v-card-text style="height: 125px;">{{ product.data.description }}</v-card-text>
      </v-col>
      <v-col></v-col>
    </v-row>

    <!-- Row 5: Modify and Delete Buttons -->
    <v-row style="margin-top: 20%;" class="align-end">
      <v-card-actions>
      <v-col cols="1"></v-col>
      <v-col cols="12">
        <v-btn rounded="xl" size="large" variant="tonal" @click="toggleEditMode">
          Modify
        </v-btn>
      </v-col>
      <v-col>
        <v-btn rounded="xl" size="large" variant="tonal" @click="deleteItem(product)">
          Delete
        </v-btn>
      </v-col>
      <v-col></v-col>
      </v-card-actions>
    </v-row>
  </v-card>
  <!------------------------------------ EDITABLE V-CARD ------------------------------------->
  <v-card v-else
    class="store-item-card"
    max-width="425"
    height="100%"
    hover>
    <!-- Row 1: Title -->
    <v-card-title><b>
      <input type="string" v-model="product.data.name" style="border: 2px solid gray"/>
    </b></v-card-title>
      
      <!-- Row 2: Rating, Price, Stock -->
      <v-row class="row justify-center">
        <v-col cols="4">
          <v-rating 
            v-model="product.data.rating" 
            color="yellow-darken-3"
            size="20"
            half-increments
          ></v-rating>
        </v-col>
        <v-col cols="3" class="text-center">
          <v-row class="icon-text">            
              <v-card-text><v-icon icon="mdi-cash" color="green" size="30"></v-icon>
                <input type="number" v-model="product.data.price" style="max-width: 50px; border: 2px solid gray"/>
              </v-card-text>
          </v-row>
        </v-col>
        <v-col cols="3">
          <v-row class="icon-text">
              <v-card-text><v-icon icon="mdi-package-variant" color="blue" size="24"></v-icon>
                <input type="number" v-model="product.data.stock" style="max-width: 50px; border: 2px solid gray"/>  
              </v-card-text>
          </v-row>
        </v-col>
      </v-row>
      
      <!-- Row 3: Image -->
      <v-row>
        <v-col></v-col>
        <v-col cols="6">
          <v-img :src="product.data.image" aspect-ratio="1"></v-img>
          <input type="text" v-model="product.data.image" placeholder="Enter image URL" style="border: 2px solid gray; margin-top: 12px; margin-left: 8px">
        </v-col>
        <v-col></v-col>
      </v-row>
      
      <!-- Row 4: Description -->
      <v-row>
        <v-col></v-col>
        <v-col cols="9">
          <v-card-text>
            <v-textarea class="textfield" v-model="product.data.description" no-resize variant="outlined"/>
          </v-card-text>
        </v-col>
        <v-col></v-col>
      </v-row>

      <!-- Row 5: Category -->
      <v-row>
        <label style="margin-left: 85px;">Category: </label>
          <select v-model="product.data.category" style="border: 2px solid gray; width: 125px; margin-left: 10px">
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Groceries">Groceries</option>            
          </select>
      </v-row>

      <!-- Row 6: Modify and Delete Buttons -->
      <v-row>
        <v-card-actions>
        <v-col cols="1"></v-col>
        <v-col cols="12">
          <v-btn rounded="xl" size="large" variant="tonal" @click="updateStore">
            Update
          </v-btn>
        </v-col>
        <v-col>
          <v-btn rounded="xl" size="large" variant="tonal" @click="cancelModify">
            Cancel
          </v-btn>
        </v-col>
        <v-col></v-col>
        </v-card-actions>
      </v-row>
  </v-card>
</template>

<script lang="ts" setup>
// your answer
import { ProductDoc, Product } from "../types/product";
import { defineProps, ref } from 'vue';
import { deleteDoc, doc, updateDoc, getDoc, DocumentSnapshot } from "firebase/firestore";
import { db } from "../main"; // Import the firebase app

const { product } = defineProps<{ product: ProductDoc }>();

const editMode = ref(false);
//const productCollection = collection(db,"products");

async function deleteItem(product: ProductDoc) {
  try {
    // Get user confirmation first
    if (confirm("Are you sure you want to delete this item?")){
      const toRemove = doc(db, "products", product.id)
      await deleteDoc(toRemove);
      console.log('Item successfully deleted.');
      // Refresh the store after deletion
      window.location.reload();
    } else {
    // Else do nothing
    }
  } catch (error) {
    console.error('Error deleting item:', error);
  }
}

function toggleEditMode() {
  editMode.value = !editMode.value;
}

function cancelModify() {
  // Restore the product as the one from firestore
  const currentDoc = doc(db, "products", product.id)
  getDoc(currentDoc).then((qd: DocumentSnapshot) => {
    if (qd.exists()) {
      const productData = qd.data() as Product;
      product.data.name = productData.name;
      product.data.rating = productData.rating;
      product.data.price = productData.price;
      product.data.stock = productData.stock;
      product.data.image = productData.image;
      product.data.description = productData.description; 
      product.data.category = productData.category;
      }
  });
  // Toggle the edit mode to false
  editMode.value = false;
}

function updateStore() {
  if (confirm("Are you sure you want to update this item?")) {
  try {
    // Push the modified changes to firestore
    const currentDoc = doc(db, "products", product.id)
    updateDoc(currentDoc, { 
      name: product.data.name,
      rating: product.data.rating,
      price: product.data.price,
      stock: product.data.stock,
      image: product.data.image,
      description: product.data.description,
      category: product.data.category
    })
  } catch (error) {
    console.error("Error updating document:", error);
  }
  // Toggle the edit mode to false
  editMode.value = false;
} else {
  // Else do nothing
  }
}

</script>

