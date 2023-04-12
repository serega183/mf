export function addToCart(product) {
  const storeCart = usePiniaCart();
  let productsInCart = {};
  if (localStorage.getItem("products")) {
    //корзина есть парсим
    productsInCart = JSON.parse(localStorage.getItem("products"));
    // провнряем продукт
    if (typeof productsInCart[product.id] !== "undefined") {
      // продукт есть
      productsInCart[product.id].count++;
    } else {
      productsInCart[product.id] = { count: 1, product: product };
    }
  } else {
    productsInCart[product.id] = { count: 1, product: product };
  }
  localStorage.setItem("products", JSON.stringify(productsInCart));
  storeCart.cart = productsInCart;
}
