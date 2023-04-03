<template>
    <h4>
        admin add-product
    </h4>
    resp: {{ data }}
    <br>
    {{ product.name }}
    <br>
    <Custominput :text="product.name" @update="product.name = $event"></Custominput>
    <button @click="productAdd()">goToAddProduct</button>
</template>

<script setup>
definePageMeta({
    layout: "default",
});
const product = ref({
    name: `Продукт_`,
})

const route = useRoute();

/*  */

/*  */
let data = ref();
async function productAdd() {
    const newProduct = product.value;
    data.value = await $fetch('/api/products/productAdd', { method: 'post', body: { newProduct } });
}
/*  */
</script>