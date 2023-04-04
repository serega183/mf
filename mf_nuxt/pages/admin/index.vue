<template>
    <h2>
        admin
    </h2>
</template>

<script setup>
// УДВЛЕНИЕ НЕ ВЛИЯЕТ НА ОШИБКИ
// CUSTOM LAYOUT не работает также
definePageMeta({
    layout: "default",
});
useSeoMeta({
    title: `Админка`
})
//console.log(process.env.MYSQLHOST);

</script>