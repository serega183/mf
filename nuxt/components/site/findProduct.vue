<template>
    <div class="inputFind">
        <input class="" v-model="findProduct" placeholder="Поиск..." autocomplete="off" />
        <div class="button" @click="findProducts()">Поиск</div>
    </div>
</template>

<script setup>
const route = useRouter();
const props = defineProps(["text", "placeholder"]);
const emit = defineEmits(["update"]);

const findProduct = ref('');

function findProducts() {
    if (!findProduct.value) return;
    route.push({
        path: "/site/findered-products",
        query: { ff: findProduct.value }
    })
}
</script>

<style>
.inputFind {
    display: flex;
    margin: 0em 1em 0em 1em;
    padding: 0.2em;
    align-content: stretch;
}

.inputFind input {
    flex-grow: 1;
    margin: 0em 1em 0em 0em;
    padding: 0.25em 0.75em;
    font-size: 1em;
    font-weight: 400;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: none;
    border-radius: 0.25em;
}

.inputFind input:focus {
    color: #212529;
    background-color: #fff;
    border-color: #bdbdbd;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(158, 158, 158, 0.25);
}

/* .inputFind div {
    align-self: center;
} */
</style>