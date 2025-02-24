"use server";

import * as Commerce from "commerce-kit";
import { getCart } from "./get-cart";
import { setCartCookieJson } from "./cart-cookies";

import { Either, right, left } from "fp-ts/Either";

export async function addToCart(
  productId: string
): Promise<Either<string, void>> {
  const cartData = await getCart();

  const updatedCart = await Commerce.cartAdd({
    cartId: cartData?.cart.id,
    productId,
  });

  if (!updatedCart) {
    return left("Failed to add product to cart");
  }

  try {
    await setCartCookieJson({
      id: updatedCart.id,
      linesCount: Commerce.cartCount(updatedCart.metadata),
    });

    return right(undefined);
  } catch (err) {
    return left(`Failed to update cart cookies: ${(err as Error).message}`);
  }
}
