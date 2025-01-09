import { getCart } from "@/features/cart/actions/get-cart";
import { CartItems } from "@/features/checkout/components/cart-items";
import { CheckoutForm } from "@/features/checkout/components/checkout-form";
import { ElementsWrapper } from "@/features/stripe/components/elements-wrapper";
import * as Commerce from "commerce-kit";

export default async function CheckoutPage() {
  const cart = await getCart();

  const { stripeAccount, publishableKey } = await Commerce.contextGet();

  if (!cart) {
    return;
  }

  return (
    <ElementsWrapper
      stripeAccount={stripeAccount}
      publishableKey={publishableKey}
      clientSecret={cart.cart.client_secret ?? undefined}
    >
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="flex justify-between relative items-start gap-8">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

            <CartItems cart={cart} />
          </div>

          <div className="flex-1 sticky top-[84px]">
            <h2 className="text-xl font-semibold mb-4">Payment</h2>

            <CheckoutForm />
          </div>
        </div>
      </div>
    </ElementsWrapper>
  );
}
