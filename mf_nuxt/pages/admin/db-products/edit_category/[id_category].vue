<template>
    <h4>
        admin edit_category <br>
    </h4>
    errorEditCategory: {{ errorEditCategory }} <br>
    respEditCategory: {{ respEditCategory }}

    <br>
    <img :src="category.cat_img" alt="">
    <p>id_cat:{{ category.id_cat }}</p>
    <Custominput nazv="name" :text="category.cat_name" @update="category.cat_name = $event"></Custominput>
    <Custominput nazv="cat_discr" :text="category.cat_discr" @update="category.cat_discr = $event"></Custominput>
    <Custominput nazv="cat_img" :text="category.cat_img" @update="category.cat_img = $event"></Custominput>
    <hr>
    <button @click="writeCategory()">writeCategory</button>

    <!-- передаём в компонент TextArea строку и возвращаем редактированую -->
    <!--  <Custominput :text="category.cat_name" @update="category.cat_name = $event"></Custominput> -->

    <!--  -->
</template>

<script setup>
const route = useRoute();
definePageMeta({
    layout: "default",
});
useSeoMeta({
    title: 'Ред. категорию'
})
/*  */
const { data: category, refresh: refreshCategory } = await useFetch('/api/products/categoriesAskOne', { method: 'GET', query: { id: route.params.id_category } });
/*  */
/*  */
let respEditCategory = ref('respEditCategory');
let errorEditCategory = ref('errorEditCategory');
async function writeCategory() {
    const editedCategory = toRaw(category.value);
    const { data, error } = await useFetch('/api/products/categoryEdit', { method: 'POST', body: { editedCategory } });
    refreshCategory();
    errorEditCategory.value = error;
    respEditCategory.value = data;
    if (!error.value) {
        navigateTo({
            path: "/admin/db-products/admin-categories"
        })
    }

}
/*  */
</script>