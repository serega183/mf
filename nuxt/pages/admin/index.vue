<template>
    <h2>
        admin
    </h2>
    <NuxtLink to="/admin/db-products">БД продуктов</NuxtLink>
    <hr>
    <NuxtLink to="/admin/db-users">БД полльзователей</NuxtLink>
    <hr>
    <NuxtLink to="/admin/db-orders/db-orders">БД Заказы</NuxtLink>
</template>

<script setup>
// УДВЛЕНИЕ НЕ ВЛИЯЕТ НА ОШИБКИ
// CUSTOM LAYOUT не работает также
definePageMeta({
    layout: "default",
    auth: false
});
useSeoMeta({
    title: `Админка`
})
//console.log(process.env.MYSQLHOST);
onlyForAdmin();
</script>