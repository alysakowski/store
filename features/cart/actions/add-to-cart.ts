"use server";

import * as Commerce from "commerce-kit";
import { getCart } from "./get-cart";
import { setCartCookieJson } from "./cart-cookies";

export async function addToCart(productId: string) {
  const cartData = await getCart();

  const updatedCart = await Commerce.cartAdd({
    cartId: cartData?.cart.id,
    productId,
  });

  if (!updatedCart) {
    throw new Error("Failed to add product to cart");
  }

  await setCartCookieJson({
    id: updatedCart.id,
    linesCount: Commerce.cartCount(updatedCart.metadata),
  });
}
