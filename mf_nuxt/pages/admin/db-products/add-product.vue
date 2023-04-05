<template>
    <h4>
        admin add-product
    </h4>
    respWriteProduct: {{ respWriteProduct }}<br>
    allCategoriesName: {{ allCategoriesName }}<br>
    errorAllCategories: {{ errorAllCategories ? errorAllCategories : 'ошибок нет' }}
    <br>
    <Custominput nazv="name" :text="product.name" @update="product.name = $event"></Custominput>
    <Custominput nazv="category" :text="product.category" @update="product.category = $event"></Custominput>
    <Custominput nazv="subcategory" :text="product.subcategory" @update="product.subcategory = $event"></Custominput>
    <Custominput nazv="edinic" :text="product.edinic" @update="product.edinic = $event"></Custominput>
    <Custominput nazv="units" :text="product.units" @update="product.units = $event"></Custominput>
    <Custominput nazv="price " :text="product.price" @update="product.price = $event"></Custominput>
    <Custominput nazv="balance" :text="product.balance" @update="product.balance = $event"></Custominput>
    <Custominput nazv="stock" :text="product.stock" @update="product.stock = $event"></Custominput>
    <Custominput nazv="image " :text="product.image" @update="product.image = $event"></Custominput>
    <Custominput nazv="description" :text="product.description" @update="product.description = $event"></Custominput>
    <Custominput nazv="rating" :text="product.rating" @update="product.rating = $event"></Custominput>
    <Custominput nazv="maker" :text="product.maker" @update="product.maker = $event"></Custominput>
    <Custominput nazv="param1" :text="product.param1" @update="product.param1 = $event"></Custominput>
    <Custominput nazv="param2" :text="product.param2" @update="product.param2 = $event"></Custominput>
    <Custominput nazv="param3" :text="product.param3" @update="product.param3 = $event"></Custominput>
    <Custominput nazv="publicationdate" :text="product.publicationdate" @update="product.publicationdate = $event"></Custominput>
    <button @click="writeProduct()">writeProduct</button>
</template>

<script setup>
const route = useRoute();
definePageMeta({
    layout: "default",
});
useSeoMeta({
    title: `Доб. товара`
})
/*  */
const allCategoriesName = computed(() => {
    if (!errorAllCategories.value)
        return allCategories.value.map(function (cat) {
            return cat.cat_name;
        });
});
const { data: allCategories, pending, error: errorAllCategories, refresh: refreshAllCategories } = await useFetch('/api/products/categoriesAskAll', {
    method: 'GET',
})
/*  */

/*  */
const product = ref({
    name: `Продукт_`,
    category: `Категория_01`,
    subcategory: `Подкатегория_01`,
    edinic: `1`,
    units: `шт, гр, л, упак и т.п.`,
    price: `10`,
    balance: `15`,
    stock: `0`,
    image: `/`,
    description: `Описание`,
    rating: 2,
    maker: `Производитель`,
    param1: `param1`,
    param2: `param2`,
    param3: `param3`,
    publicationdate: curDateTime().stringDataTime
})

let respWriteProduct = ref();
async function writeProduct() {
    const newProduct = product.value;
    respWriteProduct.value = await $fetch('/api/products/productAdd', { method: 'POST', body: { newProduct } });
}
/*  */

/*  */
function curDateTime() {
    const date = new Date();
    const g = date.getFullYear();
    let m = (Number(date.getMonth()) + 1).toString();
    let d = Number(date.getDate()).toString();
    let h = Number(date.getHours()).toString();
    let mn = Number(date.getMinutes()).toString();
    if (m.length < 2) {
        m = `0${m}`;
    }
    if (d.length < 2) {
        d = `0${d}`;
    }
    if (h.length < 2) {
        h = `0${h}`;
    }
    if (mn.length < 2) {
        mn = `0${mn}`;
    }
    return { stringDataTime: `${g}.${m}.${d} / ${h}:${mn}`, numData: Number(`${g}${m}${d}`) };
}
/*  */
</script>