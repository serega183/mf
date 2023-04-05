<template>
    <h4>
        route.params: {{ route.params }} <br>
        admin edit-product
    </h4>
    <span>respProductEdit: {{ respProductEdit }}</span><br>
    <span>errorProductEdit: {{ errorProductEdit }}</span>
    <!--     <img :src="product.image" width="100" alt=""> -->
    <br>
    <img :src="product.image" alt="">
    <hr>
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
    <hr>
    <ul>
        <span v-for="(item, key) in product">
            <span>{{ key }}: {{ item }}</span> |
        </span>
    </ul>
</template>

<script setup>
const route = useRoute();
definePageMeta({
    layout: "default",
});
useSeoMeta({
    title: 'Ред. продукт'
})
const { data: product, refresh: refreshProduct } = await useFetch('/api/products/productsAskOne', { query: { id: route.params.id_product } });

/*  */
let respProductEdit = ref('respProductEdit');
let errorProductEdit = ref('errorProductEdit');
async function writeProduct() {
    const editedProduct = product.value;
    const { data, error } = await useFetch('/api/products/productEdit', { method: 'POST', body: { editedProduct } });
    refreshProduct();
    respProductEdit.value = data;
    errorProductEdit = error;

}
/*  */
</script>