<template>
    <h2>
        testparams:
    </h2>
    route.params: {{ route.params }} <br>
    route.query: {{ route.query }} <br>
    route.props: {{ route.props }} <br>
</template>

<script setup>
const route = useRoute();
definePageMeta({
    layout: "custom",
});
/* ------------ */

</script>