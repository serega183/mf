<template>
    <h2>
        product categories index
    </h2>
    <hr>

    <siteFindProduct nazv="publicationdate" :text.lazy="findProduct" placeholder="Поиск ..." @update="findProduct = $event"></siteFindProduct>
    <button @click="findProducts()">Поиск</button>

    <hr>
    <div v-for="(item, index) in categories">
        <span>{{ index + 1 }}</span><button @click="goToProductsInCategory(item.cat_name)"><img :src="item.cat_img" alt="">{{ item.cat_name }}</button>
    </div>
</template>

<script setup>
const route = useRouter();
definePageMeta({
    layout: "default",
    auth: false
});
useSeoMeta({
    title: "Каталог"
})

/*  */
const findProduct = ref('Про');
function findProducts(params) {
    route.push({
        path: "/site/findered-products",
        query: { ff: findProduct.value }
    })
}
/*  */
//const { data: categories } = await useFetch('/api/products/categoriesAskAll');
/* const { data: categories, pending, error, refresh } = await useAsyncData(
    'mountains',
    () => $fetch('/api/products/categoriesAskAll')
) */

//const { data: categories } = await useLazyFetch('/api/products/categoriesAskAll')
const { data: categories, pending, error, refresh } = await useLazyAsyncData(
    'categories',
    () => $fetch('/api/db_categories/categoriesAskAll')
)

function goToProductsInCategory(cat_name) {
    route.push({
        path: "/site/products-category/" + cat_name,
    })
}

</script>