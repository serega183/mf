export function plusMinusCount(action, id) {
  const storeCart = usePiniaCart();
  if (action == "plus") {
    storeCart.cart[id].count++;
  }
  if (action == "minus") {
    if (storeCart.cart[id].count > 1) {
      storeCart.cart[id].count--;
    } else return;
  }
  localStorage.setItem("products", JSON.stringify(storeCart.cart));
}
