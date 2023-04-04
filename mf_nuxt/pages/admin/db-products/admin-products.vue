<template>
    <h2>
        admin products
    </h2>
    <NuxtLink to="/admin/db-products/add-product">Add products</NuxtLink>

    <ul>
        <li v-for="product in products" :key="product.id">
            <hr>
            <h4>{{ product.name }}</h4>
            <img :src="product.image" width="100" alt="">
            <button @click="goToEditProduct(product.id)">редактировать</button> <button @click="productDell(product.id)">удалить</button>
            <br>
            <span v-for="(value, name, index) in product">
                {{ name }}: {{ value }} |
            </span>
            <hr>
        </li>
    </ul>
</template>

<script setup>
useSeoMeta({
    title: `Админка товары`
})
const route = useRouter();
/*  */
function goToEditProduct(qq) {
    route.push({
        path: "edit-product/" + qq,
    })
}
/*  */
async function productDell(id) {
    await useLazyFetch('/api/products/productDell', { query: { id } });
    refreshProducts();
}
/*  */
const { data: products, refresh: refreshProducts } = await useLazyFetch('/api/products/productsAskAll');
/*  */
</script>