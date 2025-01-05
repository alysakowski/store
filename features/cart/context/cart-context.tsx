"use client";

import { createContext, useContext, useState } from "react";

const CartModalContext = createContext<
  | {
      isOpen: boolean;
      setIsOpen: (open: boolean) => void;
    }
  | undefined
>(undefined);

export const CartModalProvider = ({ children }: React.PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CartModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </CartModalContext.Provider>
  );
};

export const useCartModal = () => {
  const context = useContext(CartModalContext);

  if (!context) {
    throw new Error("useCartModal must be used within a CartModalProvider");
  }

  return context;
};
