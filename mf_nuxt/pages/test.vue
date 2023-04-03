<template>
    <h2>
        товары:
    </h2>
    rjhpbyf :
    <div>
        <button type="button" @click="test">api hello</button> |
        <span>hello:{{ hello }}</span>
        <br>
        <button type="button" @click="fff">api loadSleep</button> |
        <span>loadSleep: {{ sleep }}</span> |
        <span v-if="pend">pend: {{ pend }}</span>
        <br>
        <button type="button" @click="usersAll">api usersAll</button>
        <br>
        <p>{{ users.rows }}</p>
        <hr>
        <button type="button" @click="productsAll">api productsAll</button>
        <br>
        <ul>
            <li v-for="item in products.rows" :key="item.id">
                {{ item }}
                <p>
                    <img :src="item.image" width="100" alt="">
                </p>
                <hr>
                <div v-for="(value, name, index) in item">
                    <p>{{ name }}: {{ value }}</p>

                </div>
                <hr>
                <hr>
            </li>
        </ul>
        <hr>
    </div>
</template>

<script setup>
import { ref } from "vue";

/*  */
const products = ref({ rows: null });
async function productsAll(params) {
    console.log(`databaseTestConnect`);
    const sql = await useFetch('/api/products/productsAskAll');
    //const mysql = require('mysql2/promise');
    products.value = sql.data.value;
    console.log(sql.data.value);
}
/*  */

/*  */
const users = ref({ rows: null });
async function usersAll(params) {
    console.log(`databaseTestConnect`);
    const sql = await useFetch('/api/users_all');
    // let mysql = require('mysql');
    //const mysql = require('mysql2/promise');
    users.value = sql.data.value;
    console.log(sql.data.value);
}
/*  */
definePageMeta({
    layout: "custom",
});
/* ------------ */
let hello = ref();
async function test(params) {
    console.log(`hello`);
    hello.value = await useFetch('/api/hello?qqq=123');
    console.log(hello.value);
}
/* ---- */
let sleep = ref();
let pend = ref('oooo');
async function fff() {
    console.log(`sleep`);
    ({ pending: pend.value, data: sleep.value } = await useFetch(`/api/loadSleep`, { params: { token: 123 } }));
}
/* ---- */

</script>