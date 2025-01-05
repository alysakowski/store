"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useMemo } from "react";

type ElementsWrapperProps = {
  clientSecret?: string;
  publishableKey?: string;
  stripeAccount?: string;
};

export const ElementsWrapper = ({
  clientSecret,
  publishableKey,
  stripeAccount,
  children,
}: React.PropsWithChildren<ElementsWrapperProps>) => {
  const stripePromise = useMemo(
    () =>
      loadStripe(
        (publishableKey ||
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) as string,
        { stripeAccount }
      ),
    [stripeAccount, publishableKey]
  );

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      {children}
    </Elements>
  );
};
