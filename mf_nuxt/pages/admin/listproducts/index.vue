<template>
    <h2>
        List product/index
    </h2>
    <div>
        <button type="button" @click="productsAll">api productsAll</button>
        <br>
        <ul>
            <li v-for="item in products.rows" :key="item.id">
                <hr>
                {{ item }}
                <p>
                    <img :src="item.image" width="100" alt="">
                </p>
                <!--  -->
                <!--   <NuxtLink to="/admin/:id?">List Products</NuxtLink> | -->

                <!-- --- -->
                <button @click="goToEditPage(item.id)">goToEditPage</button>
                <!--  -->
                <!-- <button @click="navigateTo({
                    path: '/admin/editProduct',
                    query: {
                        sort: 'asc dfsf'
                    }
                })">Редактировать 2</button> -->
                <!--  -->
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
const route = useRouter();
/*  */

function goToEditPage(id) {
    console.log(id);
    route.push({
        path: "listproducts/" + id,
    }) // -> /user/123
}


const products = ref({ rows: null });

const sql = await useFetch('/api/productsAll');
//const mysql = require('mysql2/promise');
products.value = sql.data.value;

/*  */
</script>