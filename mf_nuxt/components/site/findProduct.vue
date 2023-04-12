<template>
    <div>
        <h4>Поиск</h4>
        <input class=" '_input'" :value="text" @input="$emit('update', $event.target.value)" :placeholder="placeholder" autocomplete="off" />
    </div>
</template>

<script setup>
const props = defineProps(["text", "placeholder"]);
const emit = defineEmits(["update"]);
</script>

<style></style>