<template>
    <h4>
        admin edit_category <br>
        route.params: {{ route.params }}
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
    <Custominput :text="category.cat_name" @update="category.cat_name = $event"></Custominput>

    <!--  -->
</template>

<script setup>
definePageMeta({
    layout: "default",
});
const route = useRoute();
const { data: category } = await useFetch('/api/products/categoriesAskOne', { query: { id: route.params.id_category } });
/*  */
/*  */
</script>