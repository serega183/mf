<template>
    Заказ оформлен:

    <NuxtLink to="/">На главную</NuxtLink>
    <br>
    тут выводим информацию о заказе из БД заказов
</template>

<script setup>
import { onMounted } from 'vue';


definePageMeta({
    layout: "withoutсart",
    auth: false
});
useSeoMeta({
    title: `Заказ оформлен`
})
onMounted(() => {
    clearCart();
})
</script>