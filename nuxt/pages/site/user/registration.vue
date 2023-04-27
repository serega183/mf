<template>
    <h2>
        Регистрация
    </h2>
    <hr>
    <adminDbInputTextField nazv="name" :text.lazy="user.name" :err="errFields" placeholder="Имя" @update="user.name = $event; testFF(false, 'name')"></adminDbInputTextField>
    <adminDbInputTextField nazv="email" :text.lazy=" user.email " :err=" errFields " placeholder="email" @update=" user.email = $event; testFF(false, 'email') "></adminDbInputTextField>
    <adminDbInputTextField nazv="phone" :text.lazy=" user.phone " :err=" errFields " placeholder="phone" @update=" user.phone = $event; testFF(false, 'phone') "></adminDbInputTextField>
    <adminDbInputTextField nazv="pass" :text.lazy=" user.pass " :err=" errFields " placeholder="pass" @update=" user.pass = $event; testFF(false, 'pass') "></adminDbInputTextField>
    <br>
    <button @click=" testFF(true) ">Зарегистрироваться</button><br>
    <hr>

    errFields: {{ errFields }}
</template>

<script setup>
definePageMeta({
    layout: "default",
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/',
    },
});
useSeoMeta({
    title: "Регистрация"
})
/*  */
const user = ref({
    name: '',
    email: '',
    phone: '',
    pass: '',
})
/*  */
/* Проверка полей */
let errFields = ref({})
async function testFF(write, fieldKey) {
    const apiDalee = "/api/db_users/userAdd";
    const fields = ref({});
    if (fieldKey) {
        fields.value[fieldKey] = user.value[fieldKey];

        errFields.value[fieldKey] = (await myCompValidate(apiDalee, fields, write))[fieldKey]
    } else {
        fields.value = user.value;
        errFields.value = await myCompValidate(apiDalee, fields, write)
    }
    if (await errFields.value === true) {
        console.log('Всё ок');
        navigateTo({
            path: "/site/user/confirm"
        })
    }
}
/*  */
</script>