import { notFound } from "next/navigation";
import * as Commerce from "commerce-kit";

import ProductsList from "@/components/products-list";

export default async function ProductsPage() {
  const products = await Commerce.productBrowse({ first: 100 });

  if (!products) {
    return notFound();
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground">
        All Products
      </h1>

      <ProductsList products={products} />
    </div>
  );
}
