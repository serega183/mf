export default defineNuxtPlugin((nuxtApp) => {
  /*  console.log("myPlugin"); */
  return {
    provide: {
      myPlugin() {
        return "из функции";
      },
    },
  };
});
