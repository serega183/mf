export function clearCart() {
  const storeCart = usePiniaCart();
  let productsInCart = {};
  localStorage.setItem("products", JSON.stringify(productsInCart));
  storeCart.cart = productsInCart;
}
