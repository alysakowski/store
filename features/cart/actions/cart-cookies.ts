import { cookies } from "next/headers";

const CART_COOKIE_KEY = "cart";

export async function setCartCookieJson(cart: {
  id: string;
  linesCount: number;
}): Promise<void> {
  const cookiesValue = await cookies();

  cookiesValue.set(CART_COOKIE_KEY, JSON.stringify(cart), {
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}

export async function getCartCookieJson(): Promise<{
  id: string;
  linesCount: number;
} | null> {
  const cookiesValue = await cookies();
  const cartJson = cookiesValue.get(CART_COOKIE_KEY);

  if (!cartJson) {
    return null;
  }

  return JSON.parse(cartJson.value);
}
