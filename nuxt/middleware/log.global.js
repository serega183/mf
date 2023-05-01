//const storeCart = usePiniaCart();
export default defineNuxtRouteMiddleware((to, from) => {
  console.log(`nuxt/middleware/log.global.js из ${from.path} в ${to.path}`);
  // console.log(from);
  //  console.log(to.path);
});
