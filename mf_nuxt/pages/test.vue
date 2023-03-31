<template>
    <h2>
        test page32
    </h2>
    <div>
        <button type="button" @click="test">api hello</button>
        <p>hello:{{ hello }}</p>
        <br><br>
        <button type="button" @click="fff">api loadSleep</button>
        <p>loadSleep: {{ sleep }}</p>
        <p v-if="pend">pend: {{ pend }}</p>
        <br><br>
        <button type="button" @click="databaseTestConnect">api databaseTestConnect</button>
        <br><br>



    </div>
</template>

<script setup>
import { ref } from "vue";



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
async function databaseTestConnect(params) {
    console.log(`databaseTestConnect`);
    const sql = await useFetch('/api/databaseTestConnect');
    /*     let mysql = require('mysql'); */
    //const mysql = require('mysql2/promise');
    console.log(sql.data.value);
}
</script>