<template>
    <h2>
        admin product categories
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


const { data: categories, pending, error, refresh } = await useLazyAsyncData(
    'categories',
    () => $fetch('/api/db_categories/categoriesAskAll')
)

function goToProductsInCat(cat_name) {
    route.push({
        path: "/admin/db-products/products/admin-prod-category/" + cat_name,
    })
}

</script>