<template>
    <h4>
        admin add-category
    </h4>
    <br>
    <br>


    <adminDbInputTextField nazv="cat_name" :text.lazy="category.cat_name" :err="errFields" placeholder="Название категории" @update="category.cat_name = $event; testFF(false, 'cat_name')"></adminDbInputTextField>
    <adminDbInputTextField nazv="cat_discr" :text.lazy="category.cat_discr" :err="errFields" placeholder="Описание категории" @update="category.cat_discr = $event; testFF(false, 'cat_discr')"></adminDbInputTextField>
    Результат: {{ errFields }}
    <br>
    <button @click="testFF(true)">writeCategory</button>
</template>

<script setup>
definePageMeta({
    layout: "default",
});
const category = ref({
    cat_name: '',
    cat_discr: '',
    cat_img: '/categories/cat_01.jpg'
})

const route = useRoute();

/*  */

/*  */
/* let data = ref();
async function writeCategory() {
    const newCategory = category.value;
    try {
        data.value = await $fetch('/api/products/categoryAdd', { method: 'POST', body: { newCategory } });
        navigateTo({
            path: "/admin/db-products/categories/admin-categories"
        })
    } catch (error) {
        data.value = error
    }

} */
/*  */

/* Проверка полей */
let errFields = ref({})
async function testFF(write, fieldKey) {
    const apiDalee = "/api/db_categories/categoryAdd";
    const fields = ref({});
    if (fieldKey) {
        fields.value[fieldKey] = category.value[fieldKey];
       
        errFields.value[fieldKey] = (await myCompValidate(apiDalee, fields, write))[fieldKey]
    } else {
        fields.value = category.value;
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