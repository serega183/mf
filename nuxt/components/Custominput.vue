<template>
    <div><span>{{ nazv }}: </span> <input :value="text" @input="$emit('update', $event.target.value)" /></div>
</template>

<script setup>
const props = defineProps(["text", "nazv"]);
const emit = defineEmits(["update"]);
</script>
