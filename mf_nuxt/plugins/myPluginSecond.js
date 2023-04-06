export default defineNuxtPlugin(() => {
  return {
    provide: {
      www: (msg) => `Hello ${msg}!`,
      qqq: (msg) => `qq ${msg}!`,
    },
  };
});
