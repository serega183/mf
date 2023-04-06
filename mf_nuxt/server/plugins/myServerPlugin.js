export default defineNitroPlugin(() => {
  console.log("Nitro plugin");
  return {
    provide: {
      myServerPlugin: () =>
        `Строка, сгенерированная из моего автоматически импортируемого плагина на сервере!`,
    },
  };
});
