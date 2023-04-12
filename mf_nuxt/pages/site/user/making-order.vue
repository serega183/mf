<template>
    <h4>
        Оформление
    </h4>
    <adminDbInputTextField nazv="name" :text.lazy="userData.name" :err="errFields" placeholder="Имя" @update="userData.name = $event; testFF(false, 'name')"></adminDbInputTextField>
    <hr>
    <adminDbInputTextField nazv="age" :text.lazy="userData.age" :err="errFields" placeholder="Возраст" @update="userData.age = $event; testFF(false, 'age')"></adminDbInputTextField>
    <hr>

    <button @click="testFF(true)">register</button><br>
    <br>
    <!--  --> <br>
    Результат: {{ errFields }}
</template>

<script setup>

definePageMeta({
    layout: "withoutсart",
});
useSeoMeta({
    title: `Оформление`
})
const storeCart = usePiniaCart();
/*  */
const userData = ref({
    name: '',
    age: '',
})
/* Проверка полей */
let errFields = ref({})
async function testFF(write, fieldKey) {
    const apiDalee = "/api/sendOrder";
    const fields = ref({});
    if (fieldKey) {
        fields.value[fieldKey] = userData.value[fieldKey];
        errFields.value[fieldKey] = (await myCompValidate(apiDalee, fields, write))[fieldKey]

    } else {
        fields.value = userData.value;
        errFields.value = await myCompValidate(apiDalee, fields, write, storeCart.cart);
    }
}
/*  */

</script>