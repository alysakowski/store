"use client";

import { Button } from "@/components/ui/button";
import {
  AddressElement,
  CardElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import type { StripeCardElement } from "@stripe/stripe-js";
import { useState } from "react";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<string>();

  const handleSubmit = async (
    event: React.
  ) => {
    event.preventDefault();
    setPaymentProcessing(true);

    if (!stripe || !elements) {
      setPaymentStatus("Stripe.js has not loaded.");
      setPaymentProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement) as StripeCardElement;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setPaymentStatus(error.message);
      setPaymentProcessing(false);
    } else {
      setPaymentStatus("Payment method created successfully!");
      console.log("PaymentMethod:", paymentMethod);
      setPaymentProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AddressElement
        options={{
          mode: "shipping",
          fields: { phone: "always" },
          validation: { phone: { required: "auto" } },
        }}
        onChange={(e) => {}}
      />

      <PaymentElement />

      <Button className="w-full">Proceed to Payment</Button>

      {paymentStatus && <p>{paymentStatus}</p>}
    </form>
  );
};
