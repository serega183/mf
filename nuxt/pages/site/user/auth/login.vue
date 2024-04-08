<template>
    <userTextField nazv="email" :text="user.email" placeholder="email" @update="user.email = $event" />
    <hr>
    <userTextField nazv="pass" :text="user.pass" placeholder="Пароль" @update="user.pass = $event" />
    <button @click="mySignInHandler()">Войти</button>
    <p v-if="err">{{ err }}</p>
    <NuxtLink to="/site/user/auth/registration">Регистрация</NuxtLink> |
    <NuxtLink to="/site/user/auth/forgot-pass">Забыл пароль?</NuxtLink>
</template>



<script setup>

const route = useRoute();
definePageMeta({
    layout: "custom",
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/',
    },
});
useSeoMeta({
    title: `Login`
})
/*  */
//const { signIn, status, data, signOut } = useAuth();
const { status, data, signIn, signOut } = useAuth();
//status.value;// Session status: `unauthenticated`, `loading`, `authenticated`
//data.value; // Session data, e.g., expiration, user.email, ...
//await signIn(); // Sign in the user
//await signOut(); // Sign out the user
/*  */
let err = ref(false);
const mySignInHandler = async () => {
    err.value = false;
    const { error, url } = await signIn('credentials', { email: user.value.email, password: user.value.pass, redirect: false });
    localStorage.setItem('user', JSON.stringify(user.value));
    if (error) {
        err.value = "Неверный логин или пароль";
    } else {
        // No error, continue with the sign in, e.g., by following the returned redirect:    
        return navigateTo(route.query.callbackUrl, { external: true });
        // return navigateTo(url, { external: true });
    }
}


/*  */
const user = ref({
    email: '',
    pass: '',
});
onMounted(() => {
    if (JSON.parse(localStorage.getItem('user'))) {
        user.value = JSON.parse(localStorage.getItem('user'));
    } else {
        localStorage.removeItem('user');
    }
});

</script>

