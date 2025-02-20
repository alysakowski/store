"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { addToCart } from "../actions/add-to-cart";
import { useCartModal } from "../context/cart-context";
import { fold } from "fp-ts/Either";

export default function AddToCartButton({ product }: any) {
  const [isAdding, setIsAdding] = useState(false);

  const { setIsOpen } = useCartModal();

  const onClick = async () => {
    setIsAdding(true);

    const result = await addToCart(product.id);

    fold(
      (error) => {
        console.error(error);
        setIsAdding(false);
      },
      () => {
        setIsOpen(true);
        setIsAdding(false);
      }
    )(result);
  };

  return (
    <Button onClick={onClick} disabled={isAdding} className="w-full">
      {isAdding ? (
        "Adding to Cart..."
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </>
      )}
    </Button>
  );
}
