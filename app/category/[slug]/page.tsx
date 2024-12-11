import ProductsList from "@/components/products-list";
import { deslugify } from "@/features/products/utils";
import * as Commerce from "commerce-kit";
import { notFound } from "next/navigation";

export default async function CategoryPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const products = await Commerce.productBrowse({
    first: 100,
    filter: { category: params.slug },
  });

  if (products.length === 0) {
    return notFound();
  }

  return (
    <main className="space-y-4">
      <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground">
        {deslugify(params.slug)}
      </h1>

      <ProductsList products={products} />
    </main>
  );
}
