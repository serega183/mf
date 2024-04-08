<template>
  <!-- <UserCart></UserCart> -->
  status:{{ status }} <br>
  data: {{ data }} <br>
  <NuxtLink to="/site/user/cabinet">cabinet</NuxtLink><br>

  <button v-if="status == 'authenticated'" @click="signOut()">signOut</button>
  <NuxtLink v-else to="/site/user/auth/login">login</NuxtLink><br>
  <br><br>
  <slot />
  <div class="footer">
    footer
    <a href="/site/user/cart" class="logo-cart" v-if="Object.keys(storeCart.cart).length">
      <span>{{ Object.keys(storeCart.cart).length }}</span>
      <p></p>

    </a>




  </div>
</template>
<script setup>
const { status, data, signIn, signOut, getSession } = useAuth();
const storeCart = usePiniaCart();
</script>

<style>
.footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: red;
}

.logo-cart {
  color: black;
  text-decoration: none;
  background-color: #d1d1d1;
  position: fixed;
  z-index: 999;
  bottom: 2em;
  right: 2em;
  text-align: center;
  border-radius: 0.5em;
  box-shadow: 0 0.2em 0.5em 0.05em rgb(0, 0, 0);
  padding: 0.15em;
}

.logo-cart p {

  background: url("/icons/cart-icon.png") no-repeat;
  background-size: contain;
  background-position: center;
  display: block;
  width: 2em;
  height: 1em;
}
</style>