<template>
  <nav>
    <NuxtLink to="/">Index</NuxtLink> |
    <NuxtLink to="/test">test</NuxtLink> |
    <NuxtLink to="/admin/listproducts">List Products</NuxtLink> |
  </nav>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
//import devtools from '@vue/devtools'
//if (process.env.NODE_ENV === 'development') {
//  devtools.connect(/* host, port */)
//}

</script>