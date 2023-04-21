<template>
    <div>
        <h4>{{ nazv }} <span v-if="error" v-for="err in error" style="color: red;">{{ err }}, </span> </h4>
        <input :class="[error ? 'errorClass' : '', '_input']" :value="text" @input="$emit('update', $event.target.value)" :placeholder="placeholder" autocomplete="off" />
    </div>
</template>

<script setup>
const props = defineProps(["text", "nazv", "err", "placeholder"]);
const emit = defineEmits(["update"]);
const error = computed(() => {
    if (props.err && props.err[props.nazv]) {
        return props.err[props.nazv]
    }
    return false
})
</script>

<style></style>