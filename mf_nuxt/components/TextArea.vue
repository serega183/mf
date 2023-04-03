<template>
  <form id="form">
      <label for="inptarea">
        <div>{{ props.name }}</div>
        <textarea required id="inptarea" ref="inputName" v-model.trim="props.text" placeholder="Введите текст"></textarea>
      </label>
  </form>
  <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
</template>
<script setup>
const props = defineProps(["text", "name"]);
const dd = "пиздец";
</script>
