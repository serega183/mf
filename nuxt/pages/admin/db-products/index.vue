<template>
    <h2>
        admin db-products
    </h2>
    <hr>

    <p>Управление категориями</p>
    <NuxtLink to="/admin/db-products/categories/admin-categories">Просмотр и редактирование категорий</NuxtLink>
    <br>
    <NuxtLink to="/admin/db-products/categories/add-category">Добавить новую категорию</NuxtLink>
    <hr>
    <p>Управление продуктами</p>
    <NuxtLink to="/admin/db-products/products/admin-products-categories">Просмотр продуктов по категориям и редактирование</NuxtLink>
    <br>
    <NuxtLink to="/admin/db-products/products/admin-products">Просмотр всех продуктов и редактирование</NuxtLink>
    <br>
    <NuxtLink to="/admin/db-products/products/add-product">Добавить новый продукт</NuxtLink>
</template>

<script setup>
definePageMeta({
    layout: "default",
});
useSeoMeta({
    title: `БД товары`
});
onlyForAdmin();

</script>