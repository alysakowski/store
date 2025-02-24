// @ts-nocheck
import type Stripe from "stripe";
import * as R from "ramda";

export const formatAmount = (amount: number): string =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  }).format(amount / 100);

export const formatCurrencyToUppercase = R.toUpper;

const calculateTotalAmount = (unitAmount: number, quantity: number) =>
  unitAmount * quantity;

export const formatStripePrice = ({
  unit_amount,
  currency,
  quantity = 1,
}: {
  unit_amount: Stripe.Price["unit_amount"];
  currency: Stripe.Price["currency"];
  quantity?: number;
}): string =>
  R.ifElse(
    R.isNil,
    R.always("Free"),
    R.pipe(
      (amount) => calculateTotalAmount(amount, quantity),
      formatAmount,
      (formattedAmount) =>
        `${formattedAmount} ${formatCurrencyToUppercase(currency)}`
    )
  )(unit_amount);
