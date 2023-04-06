<template>
    vee-validate
    <br>

    <hr>
    <!--  -->
    <Form @submit="onSubmit">
        <ErrorMessage name="field"></ErrorMessage>
        <Field name="field" type="email" :rules="isRequired" />

        <button>Sign up</button>
    </Form>
</template>
<script setup>
const isRequired = (value) => {
    console.log(123);
    if (value && value.trim()) {
        return true
    }
    return 'This is required'
}
const isRequired2 = (value) => {
    console.log(222);
    if (value && value.trim()) {
        return true
    }
    return 'This is required2222'
}
function onSubmit(values) {
    console.log(values);
    console.log(console.log(JSON.stringify(values, null, 2)));
}
</script>