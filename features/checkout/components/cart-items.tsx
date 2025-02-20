import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  formatAmount,
  formatCurrencyToUppercase,
  formatStripePrice,
} from "@/utils/money";
import type * as Commerce from "commerce-kit";
import Image from "next/image";

interface CartItemsProps {
  cart: Commerce.Cart;
}

export function CartItems({ cart }: CartItemsProps) {
  const totalPrice =
    cart.lines.reduce(
      (total, line) =>
        line.product.default_price.unit_amount
          ? line.product.default_price.unit_amount * line.quantity + total
          : total,
      0
    ) || 0;

  return (
    <div className="space-y-4">
      <ScrollArea className="flex-1">
        {cart.lines.map((line, index) => (
          <div
            key={line.product.id}
            className={cn("flex items-center justify-between pb-4", {
              "border-t pt-4": index !== 0,
            })}
          >
            <div className="flex gap-2">
              <Image
                src={line.product.images[0]}
                alt={line.product.name}
                className="object-cover rounded"
                width={84}
                height={84}
              />

              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold">{line.product.name}</h3>

                  <p className="text-sm">
                    {formatStripePrice({ ...line.product.default_price })}
                  </p>
                </div>

                <p className="text-sm text-gray-500 self-end">
                  Quantity: {line.quantity}
                </p>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>

      <div className="flex justify-between items-center mb-4 flex-1">
        <span className="font-semibold">Total:</span>
        <span className="font-semibold">
          {formatAmount(totalPrice)} {formatCurrencyToUppercase("pln")}
        </span>
      </div>
    </div>
  );
}
