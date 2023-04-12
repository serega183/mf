<template>
    <NuxtLink to="/site/user/cart" v-if="Object.keys(storeCart.cart).length">Корзина:
        <div v-for="item in storeCart.cart">
            id: {{ item.product.id }}, name: {{ item.product.name }}
            <hr>
        </div>
    </NuxtLink>
    <div v-else>Корзина пуста</div>
</template>

<script setup>


const storeCart = usePiniaCart();

//console.log(store.cart);
/* const props = defineProps(["text", "nazv"]);
const emit = defineEmits(["update"]); */

</script>