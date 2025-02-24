"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useMemo } from "react";

type ElementsWrapperProps = {
  clientSecret?: string;
  publishableKey?: string;
};

export const ElementsWrapper = ({
  clientSecret,
  publishableKey,
  children,
}: React.PropsWithChildren<ElementsWrapperProps>) => {
  const stripePromise = useMemo(
    () =>
      loadStripe(
        (publishableKey ||
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) as string
      ),
    [publishableKey]
  );

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      {children}
    </Elements>
  );
};
