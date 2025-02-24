"use client";

import { Button } from "@/components/ui/button";
import { clearCartCookie } from "@/features/cart/actions/cart-cookies";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import type { Stripe, StripeElements } from "@stripe/stripe-js";
import { left, right, chain, isLeft } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const router = useRouter();

  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<string>();

  const getAddress = async (elements: StripeElements | null) => {
    if (!elements) return left("Stripe.js has not loaded yet.");

    const addressElement = elements.getElement(AddressElement);
    const addressValues = (await addressElement?.getValue())?.value;

    return addressValues ? right(addressValues) : left("Address is required.");
  };

  const processPayment = async (
    stripe: Stripe | null,
    elements: StripeElements
  ) => {
    if (!stripe) return left("Stripe instance not available.");

    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    return result.error ? left(result.error.message) : right(result);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPaymentProcessing(true);

    const result = pipe(
      await getAddress(elements),
      // @ts-ignore - TS doesn't understand the fp-ts chain function
      chain(() => processPayment(stripe, elements))
    );

    if (isLeft(result)) {
      setPaymentStatus(result.left);
      return;
    }

    await clearCartCookie();
    router.push("/checkout/success");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {paymentStatus && <p>{paymentStatus}</p>}

      <AddressElement
        options={{
          mode: "shipping",
          fields: { phone: "always" },
          validation: { phone: { required: "auto" } },
        }}
      />

      <PaymentElement />

      <Button className="w-full" disabled={paymentProcessing}>
        Proceed to Payment
      </Button>
    </form>
  );
};
