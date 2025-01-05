"use server";

import { getCart } from "../actions/get-cart";
import { CartModal } from "./cart-modal";

export default async function CartModalWrapper() {
  const cart = await getCart(); // Fetch data here in the server component

  return <CartModal cart={cart} />; // Pass the cart data to the client component as props
}
