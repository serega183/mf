<template>
    <h4>
        test:
    </h4>
    <br>
    <button type="button" @click="test">api hello</button> |
    <span>hello:{{ hello }}</span>
    <br>

    <button type="button" @click="fff">api loadSleep</button> |
    <span>loadSleep: {{ sleep }}</span> |
    <span v-if="pend">pend: {{ pend }}</span>
    <hr>

    <!--     <p>respMyValidator: {{ respMyValidator }}</p> -->
    <p>
        <span v-if="errFields" v-for="err in errFields.name"><br>
            {{ err }}
        </span>
        <br>
        <label for="name">Имя</label>
        <input @focus="errFields.name = false" id="name" v-model.trim="testField.name" type="text" name="name">
    </p>

    <p>
        <span v-if="errFields" v-for="err in errFields.age">{{ err }}<br></span>
        <label for="age">Возраст</label>
        <input @focus="errFields.age = false" id="age" v-model.trim="testField.age" type="text" name="age">
    </p>

    <button @click="validateFields()">testSendToAnyApi</button>
    qqq: {{ errFields }}
    <br>

    <!--  -->
</template>

<script setup>

definePageMeta({
    layout: "custom",
});
useSeoMeta({
    title: `Тест`
})
/*  */
const testField = ref({
    name: 'name',
    age: '',
})
/*  */

/* сделать плагин из этого */
//const respMyValidator = ref({});
/* let errFields = ref();
const fieldToValidate = computed(() => {
    const fields = {};
    for (const key in testField.value) {
        fields[key] = { input: testField.value[key] }
    }
    return fields
});

async function validateFields() {
    await useLazyFetch('/api/test/testApiDalee', {
        method: 'POST', body: { fields: fieldToValidate },
        onResponse({ request, response, options }) {
            // Process the response data
            // respMyValidator.value = response._data;
            if (response._data) {
                errFields.value = response._data
            } else {
                for (const key in testField.value) {
                    errFields.value[key] = []
                }
            }
            return response._data
        },
        onResponseError({ request, response, options }) {
            // Handle the response errors
            alert(response._data.message);
        }
    });
} */
/*  */

/*  */
/* const foo = useFoo('ссобщение');
console.log("----" + foo); */
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