"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export default function AddToCartButton({ product }: any) {
  const [isAdding, setIsAdding] = useState(false);

  const addToCart = async () => {
    setIsAdding(true);
    // Simulate adding to cart
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsAdding(false);
    // Here you would typically call an API to add the item to the cart
    console.log("Added to cart:", product);
  };

  return (
    <Button onClick={addToCart} disabled={isAdding} className="w-full">
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
