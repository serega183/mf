<template>
    <h4>
        route.params: {{ route.params }} <br>
        admin edit-product
    </h4>
    <img :src="product.image" alt="">
    <hr>
    errorAllCategories: {{ errorAllCategories ? errorAllCategories : 'ошибок нет' }}
    <br><br>
    <h4>Название поля: "category" <span v-if="errFields.category" v-for="err in errFields.category" style="color: red;">{{ err }}, </span> </h4>
    <span v-for="cat in allCategoriesName">
        <input type="checkbox" :id=cat :value=cat v-model="checkedCategories">
        <label :for=cat>{{ cat }}</label> |
    </span>

    <adminDbInputTextField nazv="name" :text.lazy="product.name" :err="errFields" placeholder="Название" @update="product.name = $event; testFF(false, 'name')"></adminDbInputTextField>
    <adminDbInputTextField nazv="edinic" :text.lazy="product.edinic" :err="errFields" placeholder="Единиц" @update="product.edinic = $event; testFF(false, 'edinic')"></adminDbInputTextField>

    <adminDbInputTextField nazv="units" :text.lazy="product.units" :err="errFields" placeholder="Единицы измерения (гр., шт, пара, уп. и т.п.)" @update="product.units = $event; testFF(false, 'units')"></adminDbInputTextField>
    <adminDbInputTextField nazv="price" :text.lazy="product.price" :err="errFields" placeholder="Цена" @update="product.price = $event; testFF(false, 'price')"></adminDbInputTextField>
    <adminDbInputTextField nazv="balance" :text.lazy="product.balance" :err="errFields" placeholder="Остаток на складе" @update="product.balance = $event; testFF(false, 'balance')"></adminDbInputTextField>
    <adminDbInputTextField nazv="stock" :text.lazy="product.stock" :err="errFields" placeholder="Входит ли в акцию" @update="product.stock = $event; testFF(false, 'stock')"></adminDbInputTextField>
    <adminDbInputTextField nazv="image" :text.lazy="product.image" :err="errFields" placeholder="Изображение" @update="product.image = $event; testFF(false, 'image')"></adminDbInputTextField>
    <adminDbInputTextField nazv="description" :text.lazy="product.description" :err="errFields" placeholder="Описание" @update="product.description = $event; testFF(false, 'description')"></adminDbInputTextField>
    <adminDbInputTextField nazv="rating" :text.lazy="product.rating" :err="errFields" placeholder="Рейтинг" @update="product.rating = $event; testFF(false, 'rating')"></adminDbInputTextField>

    <adminDbInputTextField nazv="maker" :text.lazy="product.maker" :err="errFields" placeholder="Производитель" @update="product.maker = $event; testFF(false, 'maker')"></adminDbInputTextField>
    <adminDbInputTextField nazv="param1" :text.lazy="product.param1" :err="errFields" placeholder="Параметры фильтра №1" @update="product.param1 = $event; testFF(false, 'param1')"></adminDbInputTextField>
    <adminDbInputTextField nazv="param2" :text.lazy="product.param2" :err="errFields" placeholder="Параметры фильтра №2" @update="product.param2 = $event; testFF(false, 'param2')"></adminDbInputTextField>
    <adminDbInputTextField nazv="param3" :text.lazy="product.param3" :err="errFields" placeholder="Параметры фильтра №3" @update="product.param3 = $event; testFF(false, 'param3')"></adminDbInputTextField>
    <adminDbInputTextField nazv="publicationdate" :text.lazy="product.publicationdate" :err="errFields" placeholder="Дата поступления" @update="product.publicationdate = $event; testFF(false, 'publicationdate')"></adminDbInputTextField>

    <button @click="testFF(true)">writeProduct</button>
    <br><span>Результат: {{ errFields }}</span>
    <hr>
</template>

<script setup>
const route = useRoute();
definePageMeta({
    layout: "default",
});
useSeoMeta({
    title: 'Ред. продукт'
})
/*  */
const allCategoriesName = computed(() => {
    if (!errorAllCategories.value)
        return allCategories.value.map(function (cat) {
            return cat.cat_name;
        });
});
const { data: allCategories, error: errorAllCategories } = await useFetch('/api/db_categories/categoriesAskAll', {
    method: 'GET',
})
/*  */
/*  */
const checkedCategories = ref([]);
watch(checkedCategories, (newX) => {
    testFF(false, 'category');
})

let product = ref({
    name: ``,
    category: computed(() => {
        return checkedCategories.value.join(', ')
    }),
    edinic: `1`,
    units: ``,
    price: ``,
    balance: ``,
    stock: `0`,
    image: `/`,
    description: ``,
    rating: `0`,
    maker: ``,
    param1: ``,
    param2: ``,
    param3: ``,
    publicationdate: ``
});

const { data: productIncom } = await useFetch('/api/db_products/productsAskOne', { query: { id: route.params.id_product } });
for (const key in productIncom.value) {
    if (key != 'category') {
        product.value[key] = productIncom.value[key];
    } else {
        checkedCategories.value = productIncom.value[key].split(',').map(function (a) { return a.trim() })
    }

}


/*  */

async function writeProduct() {
    const editedProduct = product.value;
    const { data, error } = await useFetch('/api/db_products/productEdit', { method: 'POST', body: { editedProduct } });
    refreshProduct();
    respProductEdit.value = data;
    errorProductEdit = error;
    if (!error.value) {
        navigateTo({
            path: `/admin/db-products/products/admin-products`
        })
    }
}
/*  */
/* Проверка полей */
let errFields = ref({})
async function testFF(write, fieldKey) {
    const editedProduct = ref(await product);
    const apiDalee = "/api/db_products/productEdit";
    const fields = ref({});
    if (fieldKey) {
        fields.value[fieldKey] = product.value[fieldKey];
        errFields.value[fieldKey] = (await myCompValidate(apiDalee, fields, write))[fieldKey]
    } else {
        fields.value = product.value;
        errFields.value = await myCompValidate(apiDalee, fields, write)
    }
    if (await errFields.value === true) {
        navigateTo({
            path: "/admin/db-products/products/admin-products"
        })
    }
}
/*  */
</script>