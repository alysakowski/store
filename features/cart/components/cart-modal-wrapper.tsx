"use server";

import { getCart } from "../actions/get-cart";
import { CartModal } from "./cart-modal";

export default async function CartModalWrapper() {
  const cart = await getCart();

  return <CartModal cart={cart} />;
}
