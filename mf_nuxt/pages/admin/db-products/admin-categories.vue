<template>
    <h2>
        admin categories
    </h2>
    <div v-for="(item, name, index) in categories">
        <p>{{ name }}: {{ item }}</p> <button @click="goToEditCategory(item)">Редактировать категорию</button>
    </div>
</template>

<script setup>
definePageMeta({
    layout: "default",
});
useSeoMeta({
    title: `Админка категории`
})
const route = useRouter();
//const { data: categories } = await useFetch('/api/products/categoriesAskAll');
/* const { data: categories, pending, error, refresh } = await useAsyncData(
    'mountains',
    () => $fetch('/api/products/categoriesAskAll')
) */

//const { data: categories } = await useLazyFetch('/api/products/categoriesAskAll')
const { data: categories, pending, error, refresh } = await useLazyAsyncData(
    'mountains',
    () => $fetch('/api/products/categoriesAskAll')
)
function goToEditCategory(item) {
    route.push({
        path: "edit_category/" + item.id_cat,
        query: { cat_name: item.cat_name }
    }) // -> /user/123
}
</script>