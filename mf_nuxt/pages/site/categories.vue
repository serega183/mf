<template>
    <h2>
        product categories
    </h2>
    <div v-for="(item, name, id) in categories">
        <button @click="goToProductsInCat(item.cat_name)"><img :src="item.cat_img" alt="">{{ item.cat_name }}</button>
    </div>
</template>

<script setup>
const route = useRouter();
definePageMeta({
    layout: "default",
});
useSeoMeta({
    title: "Каталог"
})

//const { data: categories } = await useFetch('/api/products/categoriesAskAll');
/* const { data: categories, pending, error, refresh } = await useAsyncData(
    'mountains',
    () => $fetch('/api/products/categoriesAskAll')
) */

//const { data: categories } = await useLazyFetch('/api/products/categoriesAskAll')
const { data: categories, pending, error, refresh } = await useLazyAsyncData(
    'categories',
    () => $fetch('/api/products/categoriesAskAll')
)

function goToProductsInCat(cat_name) {
    route.push({
        path: "products-in-cat/" + cat_name,
    })
}

</script>