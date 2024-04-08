<template>
    <siteFindProduct></siteFindProduct>


    <div>
        <div class="cat">
            <div class="catItem catItemIndex" v-for="(item) in categories" :key="item" @click="goToProductsInCategory(item.cat_name)" :style="bg(item.cat_img)">
                <span><!-- <img :src="item.cat_img" alt=""> -->{{ item.cat_name }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
const route = useRouter();
definePageMeta({
    layout: "default",
    auth: false
});
useSeoMeta({
    title: "Каталог"
})
/*  */
function bg(bgimg) {
    if (!bgimg) return '';
    const bgi = `background-image: url("${bgimg}")`;
    return bgi;
};

/*  */

/*  */
//const { data: categories } = await useFetch('/api/products/categoriesAskAll');
/* const { data: categories, pending, error, refresh } = await useAsyncData(
    'mountains',
    () => $fetch('/api/products/categoriesAskAll')
) */

//const { data: categories } = await useLazyFetch('/api/products/categoriesAskAll')
const { data: categories, pending, error, refresh } = await useLazyAsyncData(
    'categories',
    () => $fetch('/api/db_categories/categoriesAskAll')
)

function goToProductsInCategory(cat_name) {
    route.push({
        path: "/site/products-category/" + cat_name,
    })
}

</script>
<style>
/*  */




/* .catItem:hover {
    box-shadow: 0 0.3em 1em 0.3em darkslategray;
}

.catItem:hover span {
    color: black;
} */
</style>