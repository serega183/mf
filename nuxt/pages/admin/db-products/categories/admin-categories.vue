<template>
    <h2>
        admin categories
    </h2>
    dataDell: {{ dataDell }}
    <br>
    errorDell: {{ errorDell }}
    <br>
    errorCategories: {{ errorCategories }}
    <br>
    <NuxtLink to="/admin/db-products/categories/add-category">add-category</NuxtLink>
    <hr>
    <div v-for="(item, name, index) in categories">
        <img :src="item.cat_img" alt="">
        <span>{{ name }}: {{ item }}</span>
        <br><button @click="goToEditCategory(item)">Редактировать категорию</button><button @click="categoryDell(item.id_cat)">Удалить категорию</button>
    </div>
</template>

<script setup>
definePageMeta({
    layout: "default",
});
useSeoMeta({
    title: `Категории`
})
const route = useRouter();
//const { data: categories } = await useFetch('/api/products/categoriesAskAll');
/* const { data: categories, pending, error, refresh } = await useAsyncData(
    'mountains',
    () => $fetch('/api/products/categoriesAskAll')
) */

//const { data: categories } = await useLazyFetch('/api/products/categoriesAskAll')
const { data: categories, pending, error: errorCategories, refresh: refreshCategories } = await useLazyAsyncData(
    'categories',
    () => $fetch('/api/db_categories/categoriesAskAll', { method: 'GET' })
)
function goToEditCategory(item) {
    route.push({
        path: "edit_category/" + item.id_cat
    })
}
/*  */
let dataDell = ref();
let errorDell = ref();
async function categoryDell(id_cat) {
    ({ data: dataDell, error: errorDell } = await useLazyFetch('/api/db_categories/categoryDell', {
        method: 'DELETE', query: { id_cat },
    }));
    refreshCategories();
}
/*  */
</script>