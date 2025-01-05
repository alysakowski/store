"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { addToCart } from "../actions/add-to-cart";
import { useCartModal } from "../context/cart-context";

export default function AddToCartButton({ product }: any) {
  const [isAdding, setIsAdding] = useState(false);

  const { setIsOpen } = useCartModal();

  const onClick = async () => {
    setIsAdding(true);
    await addToCart(product.id);
    setIsOpen(true);
    setIsAdding(false);
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
