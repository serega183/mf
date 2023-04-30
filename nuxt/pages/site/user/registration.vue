<template>
    <h2>
        Регистрация
    </h2>
    <hr>

    <userTextField nazv="name" :text.lazy="user.name" :err="errFields" placeholder="Логин" @update="user.name = $event, testFF(false, 'name')" />
    <hr>
    <userTextField nazv="email" :text.lazy="user.email" :err="errFields" placeholder="Email" @update="user.email = $event, testFF(false, 'email')" />
    <userTextField nazv="phone" :text.lazy="user.phone" :err="errFields" placeholder="Телефон" @update="user.phone = $event, testFF(false, 'phone')" />
    <userTextField nazv="pass" :text.lazy="user.pass" :err="errFields" placeholder="Пароль" @update="user.pass = $event, testFF(false, 'pass')" />
    <br>
    <button @click="testFF(true)">Зарегистрироваться</button><br>
    <hr>
    errFields: {{ errFields }}
    <hr>
    <hr>
    <button @click="sendMail()">sendMail</button>
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
async function sendMail(params) {
    console.log('sendMail');
    const { data } = await useFetch(`/api/test/sendMail`);
}





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
            path: "/site/user/confirmUserAdd"
        })
    }
}
/*  */
</script>