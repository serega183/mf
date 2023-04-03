<template>
    <h4>
        route.params: {{ route.params }} : {{ route.params.cat_name }}<br>
        products cat_name
    </h4>
    <!--     <img :src="product.image" width="100" alt=""> -->
    <div>
        <ul>
            <div v-for="product in products">
                <hr>
                <div>{{ product.name }}</div>
                <img :src="product.image" alt="">
                <span>product:{{ product }} | </span><br>
                <br>
                <button @click="addToCart(product)">addToCart</button>
                <hr>
            </div>
        </ul>
        <hr>
    </div>
    <!-- передаём в компонент TextArea строку и возвращаем редактированую -->
    <!--    <Custominput :text="product.name" @update="product.name = $event"></Custominput> -->

    <!--  -->
</template>

<script setup>
definePageMeta({
    layout: "default",
});
const route = useRoute();
const { data: products } = await useFetch('/api/products/productsInCatAsk', { query: { cat_name: route.params.cat_name } });

function addToCart(product) {
    console.log(`Добавлено в корзину: ${product.name}`);
}
</script>