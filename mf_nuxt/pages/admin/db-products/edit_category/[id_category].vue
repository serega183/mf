<template>
    <h4>
        admin edit_category <br>
    </h4>

    <div>
        <ul>
            <div v-for="(value, name, index) in category">
                <p>{{ name }}: {{ value }}</p>

            </div>
        </ul>
        <hr>
    </div>
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
    title: `Админка кат.: ${route.query.cat_name}`
})

const { data: category } = await useFetch('/api/products/categoriesAskOne', { query: { id: route.params.id_category } });
/*  */
/*  */
</script>