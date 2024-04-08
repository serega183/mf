<template>
    <div class="inputFind">
        <input class="" v-model="findProduct" placeholder="Поиск..." autocomplete="off" />
    </div>
    <hr>
    <div v-if="!pending">
        <ol>
            <div v-if="findProduct">
                <div v-if="products.length > 0">
                    <div v-for="(product, index) in products" :key="product">
                        <div>{{ index + 1 }}. {{ product.name }}</div>
                        <img :src="product.image" alt="">
                        <span>product:{{ product }} | </span><br>
                        <br>
                        <button @click="addToCart(product)">addToCart</button>
                    </div>

                </div>
                <div v-else>По запросу <b>{{ findProduct }}</b> товаров не найдено</div>
            </div>
        </ol>

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

const { data: products, pending, refresh } = await useLazyFetch('/api/db_products/findProduct', { method: 'POST', body: { findProduct: findProduct } });
/*  */
</script>