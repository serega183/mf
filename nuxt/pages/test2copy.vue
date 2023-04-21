<template>
    <h4>
        test2copy
    </h4>
    <adminDbInputTextField nazv="age" :text.lazy="textField.age" :err="errFields" placeholder="Возраст" @update="textField.age = $event; testFF(false, 'age')"></adminDbInputTextField>
    <hr>
    <adminDbInputTextField nazv="name" :text.lazy="textField.name" :err="errFields" placeholder="Имя" @update="textField.name = $event; testFF(false, 'name')"></adminDbInputTextField>
    <hr>
    <button @click="testFF(true)">myCompValidate()</button><br>
    <br>
    <!--  --> <br>
    Результат: {{ errFields }}
</template>

<script setup>
useSeoMeta({
    title: `Проверка полей`
})
/*  */
const textField = ref({
    name: '',
    age: '',
})
/* Проверка полей */
let errFields = ref({})
async function testFF(write, fieldKey) {
    const apiDalee = "/api/test/testApiDalee";
    const fields = ref({});
    if (fieldKey) {
        fields.value[fieldKey] = category.value[fieldKey];
        errFields.value[fieldKey] = (await myCompValidate(apiDalee, fields, write))[fieldKey]
     
    } else {
        fields.value = category.value;
        errFields.value = await myCompValidate(apiDalee, fields, write)
    }
}
/*  */

</script>