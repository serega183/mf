<template>
    <h4>
        admin edit_category <br>
    </h4>
    errorEditCategory: {{ errorEditCategory }} <br>
    respEditCategory: {{ respEditCategory }}

    <br>
    <img :src="category.cat_img" alt="">
    <p>id_cat:{{ category.id_cat }}</p>
    <!--     <Custominput nazv="name" :text="category.cat_name" @update="category.cat_name = $event"></Custominput>
    <Custominput nazv="cat_discr" :text="category.cat_discr" @update="category.cat_discr = $event"></Custominput>
    <Custominput nazv="cat_img" :text="category.cat_img" @update="category.cat_img = $event"></Custominput> -->

    <!--  -->
    <adminDbInputTextField nazv="cat_name" :text.lazy="category.cat_name" :err="errFields" placeholder="Название категории" @update="category.cat_name = $event; testFF(false, 'cat_name')"></adminDbInputTextField>
    <adminDbInputTextField nazv="cat_discr" :text.lazy="category.cat_discr" :err="errFields" placeholder="Описание категории" @update="category.cat_discr = $event; testFF(false, 'cat_discr')"></adminDbInputTextField>
    <adminDbInputTextField nazv="cat_img" :text.lazy="category.cat_img" :err="errFields" placeholder="Описание категории" @update="category.cat_img = $event; testFF(false, 'cat_img')"></adminDbInputTextField>

    <hr>
    <button @click="testFF(true)">writeCategory</button>
    <br>
    Результат: {{ errFields }}
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
const category = await $fetch('/api/products/categoriesAskOne', { method: 'GET', query: { id: route.params.id_category } });
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
/* Проверка полей */
let errFields = ref({})
async function testFF(write, fieldKey) {
    const editedCategory = ref(await category);
    const apiDalee = "/api/products/categoryEdit";
    const fields = ref({});
    if (fieldKey) {
        fields.value[fieldKey] = editedCategory.value[fieldKey];
        errFields.value[fieldKey] = (await myCompValidate(apiDalee, fields, write))[fieldKey]
    } else {
    ;
        fields.value = editedCategory.value;
        errFields.value = await myCompValidate(apiDalee, fields, write)
    }
    if (await errFields.value === true) {
        navigateTo({
            path: "/admin/db-products/categories/admin-categories"
        })
    }
}
/*  */
</script>