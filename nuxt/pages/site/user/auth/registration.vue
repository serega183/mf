<template>
    <h2>
        Регистрация
    </h2>
    <hr>

    <userTextField nazv="name" :text="user.name" :err="errFields" placeholder="Логин" @update="user.name = $event, testFF(false, 'name')" />
    <hr>
    <userTextField nazv="email" :text="user.email" :err="errFields" placeholder="Email" @update="user.email = $event, testFF(false, 'email')" />
    <userTextField nazv="phone" :text="user.phone" :err="errFields" placeholder="Телефон" @update="user.phone = $event, testFF(false, 'phone')" />
    <userTextField nazv="pass" :text="user.pass" :err="errFields" placeholder="Пароль" @update="user.pass = $event, testFF(false, 'pass')" />
    <br>

    <button v-if="!pending" @click="testFF(true)">Зарегистрироваться</button><button disabled v-else>загрузка...</button><br>
    <hr>
    errFields: {{ errFields }}
    <hr>
    pending: {{ pending }}
    <hr>
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






/*  */
const user = ref({
    name: 'ИмяПроверка',
    email: 'serega183@mail.ru',
    phone: '89600160061',
    pass: 'qqq',
})
/*  */
/* Проверка полей */
let errFields = ref({});
const pending = ref(false);
async function testFF(write, fieldKey) {
    pending.value = true;
    const resp = ref({});
    const apiDalee = "/api/db_users/userAdd";
    const fields = ref({});
    if (fieldKey) {
        fields.value[fieldKey] = user.value[fieldKey];
        resp.value[fieldKey] = (await myCompValidate(apiDalee, fields, write))[fieldKey];
    } else {
        fields.value = user.value;
        sessionStorage.setItem('user', JSON.stringify(user.value));
        resp.value = await myCompValidate(apiDalee, fields, write);
    }
    if (await resp.value === true) {
        console.log('Всё ок');
        navigateTo({
            path: "/site/user/auth/confirmUserRegistration"
        });
    }
    if (errFields.value) {
        pending.value = false;
    }
    errFields.value = resp.value;
}
/*  */
</script>