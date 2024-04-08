<template>
    <h4>
        db_orders admin
    </h4>
    <VueDatePicker v-model="dateOt" :format="format(dateOt)"></VueDatePicker>
    <VueDatePicker v-model="dateDo" :format="format(dateDo)"></VueDatePicker>
    <div div> {{ filterStatus }}</div>
    <hr>
    <span>status: </span>
    <select select v-model="filterStatus">
        <option v-for="status in statuses" v-bind:value="status.value" :key='"status.text" + status'>
            {{ status.text }}
        </option>
    </select>
    <hr>
    <div v-if="!pending">
        <ol v-if="!orders.err">
            <h4>Заказов: {{ Object.keys(orders.resp).length }}</h4>
            <li v-for="order in orders.resp" :key="order.id">
                <hr>
                <h4>id: {{ order.id }} : {{ order.status }} : {{ order.name }}</h4>
                <b>
                    <p>{{ Object.keys(order.cart).length }}</p>
                </b>
                {{ order }}
                <ul>
                    <li v-for="product in order.cart" :key="product.id">{{ product }}</li>
                </ul>

                <br><button @click="orderDell(order.id)">orderDell</button>
                <br>
                <select v-model="order.status" v-on:change="changeStatus(order.id, order.status)">
                    <option v-for="stat in status" v-bind:value="stat.value" :key='"stat" + stat'>
                        {{ stat.text }}
                    </option>
                </select>

                <hr>
            </li>
        </ol>
        <span v-else>{{ orders.err }}</span>
    </div>
    <div v-else>Загрузка...</div>
    <br>
    <hr>
    <!--     {{ orders }} -->
</template>
<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
useSeoMeta({
    title: `Заказы`
});
definePageMeta({
    layout: "default",
    auth: false
});
/*  */
const dateOt = ref(new Date());
const dateDo = ref(new Date());
let curDateTime = ref({
    ot: computed(() => {
        const g = dateOt.value.getFullYear();
        let m = (Number(dateOt.value.getMonth()) + 1).toString();
        let d = Number(dateOt.value.getDate()).toString();
        if (m.length < 2) {
            m = `0${m}`;
        }
        if (d.length < 2) {
            d = `0${d}`;
        }
        return `${g}-${m}-${d}`
    }), do: computed(() => {
        const g = dateDo.value.getFullYear();
        let m = (Number(dateDo.value.getMonth()) + 1).toString();
        let d = Number(dateDo.value.getDate()).toString();
        if (m.length < 2) {
            m = `0${m}`;
        }
        if (d.length < 2) {
            d = `0${d}`;
        }
        return `${g}-${m}-${d}`
    })
})

/*  */
function format(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}

/*  */
const filterStatus = ref('Новый');
const statuses = ref([
    { text: 'Все', value: 'Все' },
    { text: 'Новый', value: 'Новый' },
    { text: 'В работе', value: 'В работе' },
    { text: 'Выполнен', value: 'Выполнен' }
]);
/*  */
const status = ref([
    { text: 'Новый', value: 'Новый' },
    { text: 'В работе', value: 'В работе' },
    { text: 'Выполнен', value: 'Выполнен' }
]);
async function changeStatus(id, status) {
    await useLazyFetch('/api/db_orders/orderStatus', { method: 'post', body: { id, status } });
    refreshOrders();
}
/*  */
const { data: orders, refresh: refreshOrders, pending } = await useLazyFetch('/api/db_orders/ordersAll', { method: 'POST', body: { filterStatus, filterDate: curDateTime } });

/*  */
async function orderDell(id) {
    await useLazyFetch('/api/db_orders/order', { method: 'delete', body: { id } });
    refreshOrders();
}
/*  */
onlyForAdmin();
</script>