<template>
    <input :value="text" @input="$emit('update', $event.target.value)" />
</template>
<script setup>
const props = defineProps(["text"]);
const emit = defineEmits(["update"]);
</script>
