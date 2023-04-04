import { defineStore, acceptHMRUpdate } from "pinia";

export const usePiniaStore = defineStore("piniaStore", () => {
  /* подготовка к печати */
  const piniaTest = ref("да - piniaTest");

  return {
    piniaTest,
  };
});
if (import.meta.hot) {
  console.log("Pinia meta hot from store file");
  import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot));
}
/* if (import.meta.hot) {
  console.log(11111111111);
  import.meta.hot.accept(acceptHMRUpdate(useShemedocStore, import.meta.hot));
} */
/*     ref()s become state properties
    computed()s become getters
    function()s become actions */
