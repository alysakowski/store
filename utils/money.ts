import type Stripe from "stripe";

const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  }).format(amount / 100);
};

const formatCurrency = (currency: string): string => currency.toUpperCase();

export const formatStripePrice = (price: Stripe.Price): string =>
  price.unit_amount
    ? `${formatAmount(price.unit_amount)} ${formatCurrency(price.currency)}`
    : "Price not available";
