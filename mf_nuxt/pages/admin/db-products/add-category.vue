<template>
    <h4>
        admin add-category
    </h4>
    resp: {{ data }}
    <br>
    {{ category.name }}
    <br>
    <Custominput nazv="cat_name" :text="category.cat_name" @update="category.cat_name = $event"></Custominput>
    <Custominput nazv="cat_discr" :text="category.cat_discr" @update="category.cat_discr = $event"></Custominput>
    <button @click="writeCategory()">writeCategory</button>
</template>

<script setup>
definePageMeta({
    layout: "default",
});
const category = ref({
    cat_name: `Категория_`,
    cat_discr: `Описание`,
})

const route = useRoute();

/*  */

/*  */
let data = ref();
async function writeCategory() {
    const newCategory = category.value;
    try {
        data.value = await $fetch('/api/products/categoryAdd', { method: 'POST', body: { newCategory } });
        category.value.cat_name = ``;
        category.value.cat_discr = ``;
        navigateTo({
            path: "/admin/db-products/admin-categories"
        })
    } catch (error) {
        data.value = error
    }

}
/*  */
</script>