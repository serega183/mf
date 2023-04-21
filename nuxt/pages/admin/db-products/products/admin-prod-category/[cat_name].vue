<template>
    <h4>
        admin products cat_name {{ route.params.cat_name }}
    </h4>
    <!-- <img :src="product.image" width="100" alt=""> -->
    <div v-if="!pending">

        <ol>
            <div v-if="products.length" v-for="product in products">
                <hr>
                <div>{{ product.name }}</div>
                <img :src="product.image" alt="">
                <span>product:{{ product }} | </span><br>
                <br>
                {{ product.id }}
                <button @click="goToEditProduct(product.id)">редактировать</button> <button @click="productDell(product.id)">удалить</button>
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
import { onMounted } from 'vue';

/*  */
const route = useRoute();
definePageMeta({
    layout: "default",
});
useSeoMeta({
    title: route.params.cat_name
})
/*  */

//не передаёт параметры
//const products = ref([]);
const { data: products, pending, refresh: refreshProducts } = await useLazyFetch('/api/products/productsInCatAsk', { method: 'POST', body: { cat_name: route.params.cat_name } });

//products.value = await data.value;
//console.log(products.value);

/* const { data: products, pending, refresh: refreshProducts } = await useFetch('/api/products/productsInCatAsk', { method: 'GET', query: { cat_name: route.params.cat_name } }); */

//const products = ref([]);
/* const { data, pending, refresh: refreshProducts } = await useFetch(() => `/api/products/productsInCatAsk`, { query: { cat_name: route.params.cat_name } })
products.value = data.value; */
/*  */
function goToEditProduct(id) {

    navigateTo({
        path: `/admin/db-products/products/edit-product/${id}`
    })
}
/*  */
async function productDell(id) {
    await useLazyFetch('/api/db_products/productDell', { method: 'delete', query: { id } });
    refreshProducts();
}
/*  */
</script>