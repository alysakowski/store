"use server";

import * as Commerce from "commerce-kit";
import { getCartCookieJson, setCartCookieJson } from "./cart-cookies";

export async function getCart() {
  const cartJson = await getCartCookieJson();

  if (!cartJson) {
    const newCart = await Commerce.cartCreate();

    await setCartCookieJson({
      id: newCart.id,
      linesCount: 0,
    });

    return Commerce.cartGet(newCart.id);
  }

  return Commerce.cartGet(cartJson.id);
}
