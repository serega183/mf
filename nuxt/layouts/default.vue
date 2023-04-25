<template>
  <div>
    <h4>
      status:{{ status }} <br>
      data: {{ data }} <br>
    </h4>
    default layouts
    <div>
      <UserCart></UserCart>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>
<script setup>
const { status, data, signIn, signOut, getSession } = useAuth();

</script>