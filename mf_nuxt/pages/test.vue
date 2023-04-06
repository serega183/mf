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
    <hr>
    <!-- testFieldValidate -->
    <p>respSendTestField: {{ respSendTestField }}</p>
    <p>
        <span v-for="err in errFields.name">{{ err }}<br></span>
        <label for="name">Имя</label>
        <input id="name" v-model="testField.name.input" type="text" name="name">
    </p>

    <p>
        <span v-for="err in errFields.age">{{ err }}<br></span>
        <label for="age">Возраст</label>
        <input id="age" v-model="testField.age.input" type="number" name="age" min="0">
    </p>

    <button @click="sendTestField()">sendTestField</button>
    <!--  -->
</template>

<script setup>
definePageMeta({
    layout: "custom",
});
useSeoMeta({
    title: `Тест`
})
const store = usePiniaStore();
/* ------------  */
/* testFieldValidate */
const testField = ref({
    name: {
        input: '',
        needValidate: {
            isEmpty: true,
            minLength: 5
        }
    },
    age: {
        input: '',
        needValidate: {
            isEmpty: true,
            digit: true
        }
    },
})
const respSendTestField = ref();
const errFields = ref({ name: [], age: [] });
async function sendTestField() {
    try {
        respSendTestField.value = await $fetch('/api/test/testFieldValidate', { method: 'POST', body: { fields: testField.value } });
    } catch (error) {
        respSendTestField.value = error;
    }
    if (respSendTestField.value.errFields) {
        errFields.value = respSendTestField.value.errFields
        console.log(errFields.value);
        console.log('dfgdgdgdfgd');
    }
    // console.log(respSendTestField.value);
}


/*  */

/*  */
const foo = useFoo('ссобщение');
console.log("----" + foo);
/*  */

/* ------------ */
let hello = ref();
async function test(params) {
    hello.value = await useFetch('/api/test/hello?qqq=123');
}
/* ---- */
let sleep = ref();
let pend = ref('oooo');
async function fff() {
    ({ pending: pend.value, data: sleep.value } = await useFetch(`/api/test/loadSleep`, { params: { token: 123 } }));
}
/* ---- */

</script>