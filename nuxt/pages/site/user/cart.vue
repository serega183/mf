<template>
    <div v-if="Object.keys(storeCart.cart).length">
        Корзина:
        <div v-for="(cnt, id) in storeCart.cart">
            id:{{ id }}, count:{{ cnt }}
            <br> <button @click="removeFromCart(id)">removeFromCart</button>
            <button @click="plusMinusCount('plus', id)">plusCount</button>
            <button v-if="storeCart.cart[id].count > 1" @click="plusMinusCount('minus', id)">minusCount</button>
            <hr>
        </div>
        <NuxtLink to="/site/user/making-order">Оформить</NuxtLink>
    </div>
    <div v-else>Корзина пуста</div>
</template>

<script setup>

definePageMeta({
    layout: "withoutсart",
});
useSeoMeta({
    title: `Корзина`
})
const storeCart = usePiniaCart();

</script>