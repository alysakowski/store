import type Stripe from "stripe";

export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  }).format(amount / 100);
};

export const formatCurrency = (currency: string): string =>
  currency.toUpperCase();

export const formatStripePrice = ({
  unit_amount,
  currency,
  quantity = 1,
}: {
  unit_amount: Stripe.Price["unit_amount"];
  currency: Stripe.Price["currency"];
  quantity?: number;
}): string => {
  if (!unit_amount) {
    return "Free";
  }

  const totalAmount = unit_amount * quantity;

  return `${formatAmount(totalAmount)} ${formatCurrency(currency)}`;
};
