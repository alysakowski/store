"use server";

import * as Commerce from "commerce-kit";
import { getCartCookieJson } from "./cart-cookies";

export async function getCart() {
  const cartJson = await getCartCookieJson();

  return cartJson ? Commerce.cartGet(cartJson.id) : null;
}
