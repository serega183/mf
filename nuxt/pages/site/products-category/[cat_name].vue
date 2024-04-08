<template>
    <h2>
        {{ route.params.cat_name }}
    </h2>
    <div v-if="!pending">
        <div v-if="products.length > 0">
            <div class="product-card" v-for="(product, index) in products" :key="'product' + index">
                <hr>
                {{ product }}
                <hr>
                {{ product.id }}
                <h3>{{ product.name }}</h3>
                <img :src="product.image" alt="">
                <div>{{ product.edinic }}{{ product.units }}</div>
                <div>Остаток: {{ product.balance }}</div>
                <div>Описание: {{ product.description }}</div>
                <div>Производитель: {{ product.maker }}</div>
                <div v-if="product.param1">
                    <div v-for="(param, index) in product.param1.split(',')" :key="'param1' + index" :class="[{ activeClass: isActive(param, product, 1) }, 'button']" @click="paramSet(product.id, 1, param)">{{ param }}
                    </div>
                </div>
                <div v-if="product.param2">
                    <div v-for="(param, index) in product.param2.split(',')" :key="'param2' + index" :class="[{ activeClass: isActive(param, product, 2) }, 'button']" @click="paramSet(product.id, 2, param)">
                        {{ param }}
                    </div>
                </div>
                <div v-if="product.param3">
                    <div v-for="(param, index) in product.param3.split(',')" :key="'param3' + index" :class="[{ activeClass: isActive(param, product, 3) }, 'button']" @click="paramSet(product.id, 3, param)">{{ param }}
                    </div>
                </div>
                <hr>
                <div>Цена: {{ product.price }} руб</div>
                <div class="button" @click="addToCart(product)">В корзину</div>
            </div>
        </div>
        <div v-else>В этой категории нет товаров</div>
    </div>
    <div v-else>Загрузка...</div>
    <!-- передаём в компонент TextArea строку и возвращаем редактированую -->
    <!--    <Custominput :text="product.name" @update="product.name = $event"></Custominput> -->

    <!--  -->
</template>

<script setup>
const route = useRoute();
const storeCart = usePiniaCart();
definePageMeta({
    layout: "default",
    auth: false
});
useSeoMeta({
    title: route.params.cat_name
})

/*  */
function isActive(param, product, ind) {
    let select = false;
    console.log(111);
    if (product.paramsset) {
        if (Object.hasOwnProperty.call(product.paramsset, ind)) {
            if (product.paramsset[ind] == param) {
                select = true;
            }
            //  const element = product.paramsset[param];

        }
    }


    return select
}

/*  */
function addToCart(product) {
    if (product.param1 && !product.paramsset['1']) {
        alert(`${product.name}: выбирите цвет`);
        return
    }
    if (product.param2 && !product.paramsset['2']) {
        alert(`${product.name}: выбирите размер`);
        return
    }
    if (product.param3 && !product.paramsset['3']) {
        alert(`${product.name}: выбирите материал`);
        return
    }
    let productsInCart = {};
    /*  */
    let paramset = '';
    for (const key in product.paramsset) {
        if (Object.hasOwnProperty.call(product.paramsset, key)) {
            const element = product.paramsset[key];
            paramset += `_${element.trim()}`;
        }
    }
    /*  */
    if (localStorage.getItem("products")) {
        //корзина есть парсим
        productsInCart = JSON.parse(localStorage.getItem("products"));
        // провнряем продукт
        if (typeof productsInCart[`${product.id}${paramset}`] !== "undefined") {
            // продукт есть
            productsInCart[`${product.id}${paramset}`].count++;
        } else {
            productsInCart[`${product.id}${paramset}`] = { count: 1, product: product };
        }
    } else {
        productsInCart[`${product.id}${paramset}`] = { count: 1, product: product };
    }
    console.log(product.id);
    localStorage.setItem("products", JSON.stringify(productsInCart));
    storeCart.cart = productsInCart;
}


function paramSet(idProd, ind, param) {
    for (let i = 0; i < products.value.length; i++) {
        const element = products.value[i];
        if (element.id == idProd) {
            console.log(products.value[i]);
            products.value[i].paramsset[ind] = param;
        }
    }
}

/*  */


const { data: products, pending } = await useLazyFetch('/api/db_products/productsInCategoryAsk', { method: 'POST', body: { cat_name: route.params.cat_name } });



//products.value = await data.value;
//console.log(products.value);

/* const { data: products, pending, refresh: refreshProducts } = await useFetch('/api/products/productsInCatAsk', { method: 'GET', query: { cat_name: route.params.cat_name } }); */

//const products = ref([]);
/* const { data, pending, refresh: refreshProducts } = await useFetch(() => `/api/products/productsInCatAsk`, { query: { cat_name: route.params.cat_name } })
products.value = data.value; */
/*  */


</script>

<style>
.activeClass {
    background-color: rgb(143, 143, 143);
}

h3 {
    margin-bottom: 0.5em;
    color: #744faf;
}



img {
    width: 25%;
}
</style>