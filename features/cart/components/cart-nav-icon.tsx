"use client";

import { ShoppingCartIcon } from "lucide-react";
import { useCartModal } from "../context/cart-context";

export default function CartNavIcon() {
  const { setIsOpen } = useCartModal();

  return (
    <ShoppingCartIcon
      className="h-6 w-6 hover:cursor-pointer"
      onClick={() => setIsOpen(true)}
    />
  );
}
