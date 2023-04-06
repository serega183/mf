export default defineNuxtPlugin((nuxtApp) => {
  console.log("myPlugin");
  return {
    provide: {
      myPlugin: (msg) =>
        `${msg}. Строка, сгенерированная из моего автоматически импортируемого плагина!`,
    },
  };
});
