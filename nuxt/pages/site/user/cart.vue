<template>
    <div v-if="Object.keys(storeCart.cart).length">
        <div class="product-card" v-for="(cnt, id) in storeCart.cart" :key="'cnt' + id">
            <hr>
            {{ cnt }}
            <hr>
            <div>{{ cnt.product.name }} (id:{{ id }})</div>
            <img :src="cnt.product.image" alt="">
            <div>Категория: {{ cnt.product.category }}</div>
            <div>Описание: {{ cnt.product.description }}</div>
            <div>Производитель: {{ cnt.product.maker }}</div>
            <div>В наличии: {{ cnt.product.balance }} {{ cnt.product.units }}</div>
            <!--        count:{{ cnt }} -->
            <div>{{ cnt.product.param1select }} / {{ cnt.product.param2select }} / {{ cnt.product.param3select }}</div>
            <div> Цена за 1 {{ cnt.product.units }}: {{ cnt.product.price }} руб.</div>
            <div>
                <button v-if="storeCart.cart[id].count > 1" @click="plusMinusCount('minus', id)">. - .</button>
                <button v-else @click="removeFromCart(id)">уд.</button>
                <button @click="plusMinusCount('plus', id)">. + .</button> {{ cnt.count }} {{ cnt.product.units }}
            </div>

            <hr>
        </div>
        <a class="button" href="/site/user/making-order">Оформить</a>
    </div>
    <div v-else>Корзина пуста</div>
</template>

<script setup>

definePageMeta({
    layout: "withoutсart",
    auth: false
});
useSeoMeta({
    title: `Корзина`
})
const storeCart = usePiniaCart();

</script>
