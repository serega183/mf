export function removeFromCart(id) {
  const storeCart = usePiniaCart();
  delete storeCart.cart[id];
  localStorage.setItem("products", JSON.stringify(storeCart.cart));
}
