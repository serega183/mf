<template>
    <div>{{ $myPlugin('Сообщение в плагин') }} <br>
        {{ $www('Жопа') }}
        <br>
        {{ $qqq('Вторая жопа') }}
    </div>
</template>
<script setup>
const { $myPlugin, $www, $qqq } = useNuxtApp();
/* console.log($myPlugin('myPlugin'));
console.log($www('myPluginSecond www'));
console.log($qqq('myPluginSecond qqq')); */

// alternatively, you can also use it here
</script>