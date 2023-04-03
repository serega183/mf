<template>
    <h4>
        route.params: {{ route.params }} <br>
        admin edit-product
    </h4>
    <!--     <img :src="product.image" width="100" alt=""> -->
    <div>
        <ul>
            <div v-for="(item, key) in product">
                <span>{{ key }}: {{ item }}</span><br>

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
const { data: product } = await useFetch('/api/products/productsAskOne', { query: { id: route.params.id_product } });
</script>