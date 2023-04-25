<template>
  <nav>
    <div>
      <NuxtLink to="/">Index</NuxtLink> |
      <NuxtLink to="/admin">admin</NuxtLink> |
      <NuxtLink to="/login">login</NuxtLink> |
      <a href="#" @click="logout()">logout</a> |
      <!--  <NuxtLink to="/vee-validate">vee-validate</NuxtLink> -->
    </div>
  </nav>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
  <br>
  <div style="background-color: gray;">
    <NuxtLink to="/admin/db-products/categories/admin-categories">Просмотр и редактирование категорий</NuxtLink>
    <br>
    <NuxtLink to="/admin/db-products/categories/add-category">Добавить новую категорию</NuxtLink>
    <hr>
    <p>Управление продуктами</p>
    <NuxtLink to="/admin/db-products/products/admin-products-categories">Просмотр продуктов по категориям и редактирование</NuxtLink>
    <br>
    <NuxtLink to="/admin/db-products/products/admin-products">Просмотр всех продуктов и редактирование</NuxtLink>
    <br>
    <NuxtLink to="/admin/db-products/products/add-product">Добавить новый продукт</NuxtLink>
    <br>
    <NuxtLink to="/test">test</NuxtLink> |

    <NuxtLink to="/test2copy">test2copy</NuxtLink> |

    <NuxtLink to="/pluginTest">pluginTest</NuxtLink>
  </div>
</template>

<script setup>
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
const { signOut } = useAuth();

onMounted(() => {
  storeCart.cart = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : {};
  console.log('onMounted');
})
/*  */

async function logout(params) {
  console.log('logout');
  await signOut();
}
</script>
