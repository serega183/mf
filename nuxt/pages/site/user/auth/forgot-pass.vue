<template>
    <h2>
        Забыл пароль
    </h2>
    <hr>


    <userTextField nazv="email" :text="user.email" :err="errFields" placeholder="Email" @update="user.email = $event, testFF(false, 'email')" />
    <br>

    <button v-if="!pending" @click="testFF(true)">Выслать пароль на почту</button><button disabled v-else>загрузка...</button><br>
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
    title: "Восстановить пароль"
})
/*  */

const user = ref({
    email: '',
})
/*  */
/* Проверка полей */
let errFields = ref({});
const pending = ref(false);
async function testFF(write, fieldKey) {
    pending.value = true;
    const resp = ref({});
    const apiDalee = "/api/auth/sendPass";
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
        localStorage.removeItem('user');
        navigateTo({
            path: "/site/user/auth/login"
        });
    }
    if (errFields.value) {
        pending.value = false;
    }
    errFields.value = resp.value;
}
/*  */
</script>