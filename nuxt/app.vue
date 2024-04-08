<template>
  <div class="header">
    <div class="logo"></div>
    <h1 class="name">Название название</h1>
  </div>
  <div class="page">
    <nav v-if="route.currentRoute.value.fullPath != '/'">
      <NuxtLink to="/">В каталог</NuxtLink>
    </nav>


    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </div>
  <hr>
  <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br>

  <!--   <div>
    <NuxtLink to="/">Index</NuxtLink> |
    <NuxtLink to="/admin">admin</NuxtLink> |
    <NuxtLink v-if="status == 'unauthenticated'" to="/site/user/auth/login">login</NuxtLink> |
    <a v-if="status == 'authenticated'" href="#" @click="logout()">logout</a> |
    <NuxtLink v-if="status == 'authenticated'" to="/site/user/cabinet">cabinet</NuxtLink> |
  </div> -->
</template>

<script setup>
const route = useRouter();
//import devtools from '@vue/devtools'
//if (process.env.NODE_ENV === 'development') {
//  devtools.connect(/* host, port */)
//}
useHead({
  title: 'My App',
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
  bodyAttrs: {
    class: 'test_in_app.vue'
  },
  /*   script: [{ innerHTML: 'console.log(\'Hello world\')' }] */
});
/*  */
const storeCart = usePiniaCart();
const { signOut, status } = useAuth();

onMounted(() => {
  storeCart.cart = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : {};
})
/*  */

async function logout(params) {
  await signOut({ callbackUrl: '/' });
}
</script>


<style>
.page {
  margin: 1em;
}

nav {
  padding: 0.7em;
}

nav a {
  text-decoration: none;
  color: rgb(255, 255, 255);
  display: inline-block;
  padding: 0.2em 0.7em;
  box-shadow: 0 0.1em 0.2em 0.04em rgb(0, 0, 0);
  background-color: #5558e6;
  border-radius: 0.25em;
}

.header {
  background-color: rgb(114, 0, 104);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3em;
}

.header .logo {
  width: 2em;
  height: 2em;
  /*  background: url('/'); */
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  float: left;
}

.header .name {
  color: rgb(255, 219, 100);
  margin-left: 1em;
}
</style>