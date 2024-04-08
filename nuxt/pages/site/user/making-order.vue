<template>
    <h4>
        Оформление
    </h4>

    <userTextField nazv="name" :text="userData.name" :err="errFields" placeholder="Имя" @update="userData.name = $event; testFF(false, 'name')"></userTextField>
    <hr>
    <userTextField nazv="phone" :text="userData.phone" :err="errFields" placeholder="Телефон" @update="userData.phone = $event; testFF(false, 'phone')"></userTextField>
    <hr>
    <userTextField nazv="street" :text="userData.street" :err="errFields" placeholder="Улица" @update="userData.street = $event; testFF(false, 'street')"></userTextField>
    <hr>
    <userTextField nazv="house" :text="userData.house" :err="errFields" placeholder="Дом" @update="userData.house = $event; testFF(false, 'house')"></userTextField>
    <hr>
    <userTextField nazv="apartment" :text="userData.apartment" :err="errFields" placeholder="Квартира" @update="userData.apartment = $event; testFF(false, 'apartment')"></userTextField>
    <hr>
    <userTextField nazv="comment" :text="userData.comment" :err="errFields" placeholder="Комментарий" @update="userData.comment = $event; testFF(false, 'comment')"></userTextField>
    <hr>
    <button @click="testFF(true)">writeOrder</button><br>
    <br>
    <!--  --> <br>
    Результат: {{ errFields }}
</template>

<script setup>
import { onMounted } from 'vue';


definePageMeta({
    layout: "withoutсart",
});
useSeoMeta({
    title: `Оформление`
})
const storeCart = usePiniaCart();
/*  */
const userData = ref({
    name: '',
    phone: '',
    street: '',
    house: '',
    apartment: '',
    comment: '',

})
onMounted(() => {
    try {
        if (JSON.parse(localStorage.getItem("userData"))) {
            userData.value = JSON.parse(localStorage.getItem("userData"));
        }
    } catch (error) {
        localStorage.removeItem('userData');
    }

});



/* Проверка полей */
let errFields = ref({});
async function testFF(write, fieldKey) {
    const apiDalee = "/api/db_orders/writeOrder";
    const fields = ref({});
    if (fieldKey) {
        fields.value[fieldKey] = userData.value[fieldKey];
        errFields.value[fieldKey] = (await myCompValidate(apiDalee, fields, write))[fieldKey]

    } else {
        fields.value = userData.value;
        errFields.value = await myCompValidate(apiDalee, fields, write, storeCart.cart, curDateTime());
    }
    if (await errFields.value === true) {
        console.log('всё ок');
        /* navigateTo({
            path: "/site/user/order-complite"
        }); */
    }
    localStorage.setItem("userData", JSON.stringify(userData.value));
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
    return { date: `${g}-${m}-${d}`, time: `${h}:${mn}` }
}
/*  */
</script>