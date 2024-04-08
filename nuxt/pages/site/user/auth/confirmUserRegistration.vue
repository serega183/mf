<template>
    <h4>
        confirm
    </h4>
    <p>
        Проверь почту там цифры.
        Вводим цифры из почты 2 попытки
    </p>
    <input v-if="!isHideInput" v-model="token" @input="checkToken()" autocomplete="off" />
    <button v-if="isHideInput" :disabled=disabled @click="createUserForVerificationEmail()">Отправить новый код</button>
    <p v-if="isHideInput">Запросить код повторно можно будет через {{ timer }} сек</p>
    <hr>
    pending: {{ pending }} <br>
    resp: {{ resp }}
</template>

<script setup>
import { onMounted } from 'vue';

definePageMeta({
    layout: "default",
    auth: false
});
useSeoMeta({
    title: `Подтверждение email`
});
/*  */
let token = ref();
function checkToken() {
    if (token.value.length == 4) {
        sendMailConfirm()
    }
}
/*  */
const disabled = ref(true);
const isHideInput = ref(false);
let userStorage;
onMounted(() => {
    try {
        userStorage = JSON.parse(sessionStorage.getItem('user'));
    } catch {
        sessionStorage.removeItem('user');
        navigateTo({
            path: "/site/user/auth/registration"
        });
    }
});
async function createUserForVerificationEmail(params) {
    timer.value = timeTimer;
    disabled.value = true;
    setTimeout(timerf, 1000);
    // это копипаста!!!
    console.log('createUserForVerificationEmail');

    const user = {};
    for (const key in userStorage) {
        user[key] = { input: userStorage[key] };
    }

    const createUserForVerificationEmail = await useLazyFetch(
        "/api/db_usersNoVerificatedEmail/createUserForVerificationEmail",
        {
            method: "POST",
            body: user,
        }
    );
}
/*  */
const timeTimer = 5;

const timer = ref(timeTimer);
function timerf() {
    timer.value--;
    if (timer.value < 0) {
        timer.value = 0;

    }
    if (timer.value == 0) {
        disabled.value = false;
        return true;
    }
    else {
        setTimeout(timerf, 1000);
    }
}
//setTimeout(timerf, 1000);
/*  */
let resp = ref();
const resend = ref(false);
const pending = ref(false);
async function sendMailConfirm() {
    timer.value = timeTimer;
    const email = JSON.parse(sessionStorage.getItem('user')).email
    const { data, pending: pending } = await useLazyFetch("/api/auth/sendTokenForMailConfirm", {
        method: "POST",
        body: { token: token.value, email },
    });
    resp.value = data;
    //api = server/api/auth/sendTokenForMailConfirm.js
    if (!data.value) {
        token.value = '';
    } else if (data.value == 'resend') {
        isHideInput.value = true;
        resend.value = true;
        token.value = '';
        setTimeout(timerf, 1000);
        disabled.value = true;
        //server/api/db_usersNoVerificatedEmail/createUserForVerificationEmail.js
    } else {
        localStorage.setItem('user', JSON.stringify(userStorage));
        navigateTo({
            path: "/site/user/auth/login"
        });
        console.log('Зарегистрировали нужно сохранить в локал и войти');
    }
}

</script>