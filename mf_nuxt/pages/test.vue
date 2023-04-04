<template>
    <h4>
        test:
    </h4>
    {{ store.piniaTest }}
    <br>
    <button type="button" @click="test">api hello</button> |
    <span>hello:{{ hello }}</span>
    <br>
    <button type="button" @click="fff">api loadSleep</button> |
    <span>loadSleep: {{ sleep }}</span> |
    <span v-if="pend">pend: {{ pend }}</span>
    <br>
    <button type="button" @click="usersAll">api usersAll</button> <span>users: {{ users.rows }}</span>
    <hr>
</template>

<script setup>
definePageMeta({
    layout: "custom",
});
useSeoMeta({
    title: `Тест`
})
const store = usePiniaStore();
/*  */
const users = ref({ rows: null });
async function usersAll(params) {
    const sql = await useFetch('/api/users_all');
    users.value = sql.data.value;
    console.log(sql.data.value);
}
/*  */

/* ------------ */
let hello = ref();
async function test(params) {
    hello.value = await useFetch('/api/hello?qqq=123');
}
/* ---- */
let sleep = ref();
let pend = ref('oooo');
async function fff() {
    ({ pending: pend.value, data: sleep.value } = await useFetch(`/api/loadSleep`, { params: { token: 123 } }));
}
/* ---- */

</script>