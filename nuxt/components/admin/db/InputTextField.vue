<template>
    <div>
        <h4>Название поля: "{{ nazv }}"
            <span v-if="error">
                <span v-for="err in error" style="color: red;" :key="err">
                    {{ err }},
                </span>
            </span>
        </h4>
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