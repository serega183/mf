<template>
    <h4>
        route.params: {{ route.params }} : {{ route.params.cat_name }}<br>
        products cat_name
    </h4>
    <!--     <img :src="product.image" width="100" alt=""> -->
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
    <!-- передаём в компонент TextArea строку и возвращаем редактированую -->
    <!--    <Custominput :text="product.name" @update="product.name = $event"></Custominput> -->

    <!--  -->
</template>

<script setup>
/*  */
const route = useRoute();
definePageMeta({
    layout: "default",
    auth: false
});
useSeoMeta({
    title: route.params.cat_name
})
/*  */

//не передаёт параметры
//const products = ref([]);
const { data: products, pending } = await useLazyFetch('/api/db_products/productsInCategoryAsk', { method: 'POST', body: { cat_name: route.params.cat_name } });
//products.value = await data.value;
//console.log(products.value);

/* const { data: products, pending, refresh: refreshProducts } = await useFetch('/api/products/productsInCatAsk', { method: 'GET', query: { cat_name: route.params.cat_name } }); */

//const products = ref([]);
/* const { data, pending, refresh: refreshProducts } = await useFetch(() => `/api/products/productsInCatAsk`, { query: { cat_name: route.params.cat_name } })
products.value = data.value; */
/*  */


</script>