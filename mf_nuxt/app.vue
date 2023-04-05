<template>
  <nav>
    <div>main</div>
    <div>
      <NuxtLink to="/">Index</NuxtLink> |
      <NuxtLink to="/test">test</NuxtLink> |
    </div>
    <div>
      <div>Admin</div>
      <NuxtLink to="/admin">admin</NuxtLink> |
      <NuxtLink to="/admin/db-products">db-products</NuxtLink> |
      <NuxtLink to="/admin/db-products/admin-categories">categories</NuxtLink> |
      <NuxtLink to="/admin/db-products/edit_category/1">[edit_category]/1</NuxtLink> |
      <NuxtLink to="/admin/db-products/add-category">add-category</NuxtLink> |
      <NuxtLink to="/admin/db-products/admin-products">products</NuxtLink> |
      <NuxtLink to="/admin/db-products/edit-product/1">[edit-product]/1</NuxtLink> |
      <NuxtLink to="/admin/db-products/add-product">add-product</NuxtLink> |

    </div>
    <div>
      <div>Site</div>
      <div>
        <NuxtLink to="/site/categories">categories</NuxtLink> |
        <NuxtLink to="/site/products-in-cat/еда">[products-in-cat]/еда</NuxtLink> |


      </div>
    </div>
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
useHead({
  title: 'My App',
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
  bodyAttrs: {
    class: 'test_in_app.vue'
  },
  script: [{ innerHTML: 'console.log(\'Hello world\')' }]

})
</script>