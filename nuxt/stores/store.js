import { defineStore, acceptHMRUpdate } from "pinia";
export const usePiniaCart = defineStore("piniaCart", () => {
  /* подготовка к печати */
  const cart = ref({});
  return {
    cart,
  };
});
if (import.meta.hot) {
  /*  console.log("Pinia meta hot from store file"); */
  import.meta.hot.accept(acceptHMRUpdate(usePiniaCart, import.meta.hot));
}

/*     ref()s become state properties
    computed()s become getters
    function()s become actions */
