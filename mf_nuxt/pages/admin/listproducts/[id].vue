<template>
    <h2>
        Edit product _id list
        <br>
    </h2>
    <div>


        <br>
        <ul>
            <li v-for="item in products.rows" :key="item.id">
                <hr>
                {{ item }}
                <p>
                    <img :src="item.image" width="100" alt="">
                </p>
                <div v-for="(value, name, index) in item">
                    <p>{{ name }}: {{ value }}</p>

                </div>
                <hr>
            </li>
        </ul>
        <hr>
    </div>
</template>

<script setup>
import { ref } from "vue";
const route = useRoute();

/*  */
const products = ref({ rows: null });
const sql = await useFetch('/api/productsOne', { query: { id: route.params.id } });
//const mysql = require('mysql2/promise');
products.value = sql.data.value;
/*  */
</script>