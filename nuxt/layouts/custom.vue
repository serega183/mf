<template>
  <div>
    custom layout
    <!--  status:{{ status }} <br> -->
    data: {{ data }} <br>
    <div>
      <slot />
    </div>
  </div>
</template>
<script setup>
const { status, data, signIn, signOut, getSession } = useAuth();
</script>