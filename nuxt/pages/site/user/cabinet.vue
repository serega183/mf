<template>
    <h4>
        cabinet
    </h4>
    status:{{ status }} <br>
    data: {{ data }} <br>
</template>

<script setup>

definePageMeta({
    layout: "default",
});
useSeoMeta({
    title: `Кабинет`
})
const { status, data, signIn, signOut, getSession } = useAuth();


</script>