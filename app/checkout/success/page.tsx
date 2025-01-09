import { Button } from "@/components/ui/button";

import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="flex flex-col items-center space-y-4 mt-12">
      <CheckCircle className="h-6 w-6 text-green-500" />

      <h4 className="text-2xl font-semibold mb-4">Order Confirmation</h4>

      <p className="text-muted-foreground mb-4">
        Thank you for your purchase! Your order has been successfully placed.
      </p>

      <Link href="/" passHref>
        <Button className="w-full">Continue Shopping</Button>
      </Link>
    </div>
  );
}
