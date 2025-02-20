"use client";

import { Button } from "@/components/ui/button";
import { clearCartCookie } from "@/features/cart/actions/cart-cookies";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const router = useRouter();

  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<string>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPaymentProcessing(true);

    if (!stripe || !elements) {
      return setPaymentStatus("Stripe.js  has not loaded yet.");
    }

    const addressElement = elements.getElement(AddressElement);
    const addressValues = (await addressElement?.getValue())?.value;

    if (!addressValues) {
      return setPaymentStatus("Address is required.");
    }

    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (result.error) {
      setPaymentStatus(result.error.message);

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
