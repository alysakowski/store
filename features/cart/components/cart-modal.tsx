"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCartModal } from "../context/cart-context";
import type { getCart } from "../actions/get-cart";
import type * as Commerce from "commerce-kit";
import Image from "next/image";
import { formatAmount, formatCurrency, formatStripePrice } from "@/utils/money";
import { useRouter } from "next/navigation";
import { ShoppingCartIcon } from "lucide-react";

function CartItem({
  product,
  quantity,
}: {
  product: Commerce.MappedProduct;
  quantity: number;
}) {
  return (
    <div className="flex py-4 border-b justify-between items-center pr-4">
      <div className="flex gap-2">
        <Image
          src={product.images[0]}
          alt={product.name}
          objectFit="cover"
          width={80}
          height={80}
          className="rounded-md"
        />

        <div className="flex flex-col justify-between">
          <div>
            <h3 className="font-semibold">{product.name}</h3>

            <p className="text-sm">
              {formatStripePrice({ ...product.default_price })}
            </p>
          </div>

          <p className="text-sm text-gray-500 self-end">Quantity: {quantity}</p>
        </div>
      </div>
    </div>
  );
}

type CartModalProps = {
  cart: Awaited<ReturnType<typeof getCart>>;
};

export function CartModal({ cart }: CartModalProps) {
  const { isOpen, setIsOpen } = useCartModal();

  const router = useRouter();

  const totalPrice =
    cart?.lines.reduce(
      (total, line) =>
        line.product.default_price.unit_amount
          ? line.product.default_price.unit_amount * line.quantity + total
          : total,
      0
    ) || 0;

  const isEmpty = cart?.lines.length === 0 || !cart;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {isEmpty ? (
            <div className="flex-1 flex items-center justify-center flex-col">
              <ShoppingCartIcon className="h-12 w-12 text-gray-400 mb-4" />

              <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>

              <p className="text-sm text-gray-500 mb-4 text-center">
                Looks like you haven't added any items to your cart yet.
              </p>

              <Button onClick={() => setIsOpen(false)}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <ScrollArea className="flex-1">
              {cart?.lines.map((item) => (
                <CartItem
                  key={item.product.id}
                  product={item.product}
                  quantity={item.quantity}
                />
              ))}
            </ScrollArea>
          )}

          {!isEmpty && (
            <div className="mb-6 border-t pt-4">
              <div className="flex justify-between items-center mb-4 flex-1">
                <span className="font-semibold">Total:</span>
                <span className="font-semibold">
                  {formatAmount(totalPrice)} {formatCurrency("pln")}
                </span>
              </div>

              <Button
                className="w-full"
                onClick={() => {
                  setIsOpen(false);
                  router.push("/checkout");
                }}
              >
                Proceed to Payment
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
