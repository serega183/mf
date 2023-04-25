<template>
    <userTextField nazv="login" :text.lazy="user.login" :err="errFields" placeholder="Логин" @update="user.login = $event, testFF(false, 'login')" />
    <hr>
    <userTextField nazv="pass" :text.lazy="user.pass" :err="errFields" placeholder=" Пароль" @update="user.pass = $event, testFF(false, 'pass')" />
    <button @click="testFF(true)">Login</button><br>
    <p>
        {{ errFields }}
    </p>
    <hr>
    <div>
        <p>Sign-In Options:</p>
        <button @click="signIn('github')">Github</button>
        <br>
        <!-- NOTE: Here we hard-coded username and password, on your own page this should probably be connected to two inputs for username + password -->
        <button @click="mySignInHandler()">Username and Password</button>
    </div>
</template>



<script setup>
const route = useRoute();
definePageMeta({
    layout: "custom",
    auth: false
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

const mySignInHandler = async () => {
    const { error, url } = await signIn('credentials', { username: user.value.login, password: user.value.pass, redirect: false });
    if (error) {
        // Do your custom error handling here
        console.log(error);
        console.log('Неверный логин или пароль');
    } else {
        // No error, continue with the sign in, e.g., by following the returned redirect:    
        // return navigateTo(route.query.callbackUrl, { external: true });
        return navigateTo(url, { external: true });
    }
}


/*  */
const user = ref({
    login: '',
    pass: '',
});
/* Проверка полей */
let errFields = ref({});
async function testFF(write, fieldKey) {
    const apiDalee = "/api/login";
    const fields = ref({});
    if (fieldKey) {
        fields.value[fieldKey] = user.value[fieldKey];
        errFields.value[fieldKey] = (await myCompValidate(apiDalee, fields, write))[fieldKey]

    } else {
        fields.value = user.value;
        errFields.value = await myCompValidate(apiDalee, fields, write);
    }
    if (write && await errFields.value.user === true) {
        /* navigateTo({
            path: "/site/user/order-complite"
        }) */
    } else if (write) {
        console.log('авторизировался отклонена');
    }
    //  localStorage.setItem("userData", JSON.stringify(userData.value));
}
/*  */

</script>

