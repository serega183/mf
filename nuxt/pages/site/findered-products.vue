<template>
    <h4>
        product categories
    </h4>
    <siteFindProduct :text.lazy="findProduct" placeholder="Поиск ..." @update="findProduct = $event"></siteFindProduct>
    <hr>
    <div v-if="!pending">
        <ol>
            <div v-if="true" v-for="(product, index) in products">
                <hr>
                <div>{{ index + 1 }}. {{ product.name }}</div>
                <img :src="product.image" alt="">
                <span>product:{{ product }} | </span><br>
                <br>
                <button @click="addToCart(product)">addToCart</button>
                <hr>
            </div>
            <div v-else>Категория пуста</div>
        </ol>
        <hr>
    </div>
    <div v-else>Загрузка...</div>
</template>

<script setup>
const route = useRouter();
const findProduct = ref(route.currentRoute.value.query.ff);
definePageMeta({
    layout: "default",
    auth: false
});
useSeoMeta({
    title: `Поиск`
})

const { data: products, pending } = await useLazyFetch('/api/db_products/findProduct', { method: 'POST', body: { findProduct: findProduct } });
/*  */
</script>