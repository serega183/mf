<template>
    <h4>
        test:
    </h4>
    <br>
    <button type="button" @click="mongo()">mongo</button> |



    <!--  -->
</template>

<script setup>
import mongoose from "mongoose";
definePageMeta({
    layout: "custom",
    auth: false
});
useSeoMeta({
    title: `Тест`
})
/*  */
composablesLog();
utilsLog();
/*  */
async function mongo(params) {
    console.log('mongo');
    const { data } = await useFetch(`/api/test/testMongo`);

    //await mongoose.connect(config.mongoUrl);
    //console.log("DB connection established.");

    // console.log(user);
}
/* ---- */


</script>