export default defineNitroPlugin(() => {
  return {
    provide: {
      myServerPlugin: () =>
        `Строка, сгенерированная из моего автоматически импортируемого плагина на сервере!`,
    },
  };
});
