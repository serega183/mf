<template>
    <h2>
        index
    </h2>

    <button @click="goTotestparams('строка')">goTotestparams</button>
</template>

<script setup>

const route = useRouter();
definePageMeta({
    layout: "default",
});

function goTotestparams(qq) {
    route.push({
        name: "testparams",
        params: { qq },
        query: { qq },
        props: { qq }
    })
}
</script>