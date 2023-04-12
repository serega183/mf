<template>
    <h2>
        admin products
    </h2>
    <NuxtLink to="/admin/db-products/products/add-product">Add products</NuxtLink>

    <ol>
        <li v-for="product in products" :key="product.id">
            <hr>
            <h4>{{ product.name }}</h4>
            <img :src="product.image" alt="">
            <button @click="goToEditProduct(product.name, product.id)">редактировать</button> <button @click="productDell(product.id)">удалить</button>
            <br>
            <span v-for="(value, name, index) in product">
                {{ name }}: {{ value }} |
            </span>
            <hr>
        </li>
    </ol>
</template>

<script setup>
/*  */
useSeoMeta({
    title: `Товары`
})
const route = useRouter();
/*  */
function goToEditProduct(name, id) {
    route.push({
        path: "/admin/db-products/products/edit-product/" + id
    })
}
/*  */
async function productDell(id) {
    await useLazyFetch('/api/products/productDell', { method: 'delete', query: { id } });
    refreshProducts();
}
/*  */
const { data: products, refresh: refreshProducts } = await useLazyAsyncData('products', () => $fetch('/api/products/productsAskAll'), { method: 'get' });
/*  */
</script>