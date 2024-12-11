import { searchProducts } from "@/features/search/utils";
import { redirect, RedirectType } from "next/navigation";
import * as Commerce from "commerce-kit";
import ProductsList from "@/components/products-list";

export default async function SearchPage(props: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams.q;

  if (!query) {
    return redirect("/", RedirectType.replace);
  }

  const products = await Commerce.productBrowse({ first: 100 });
  const foundProducts = searchProducts(products, query);

  if (foundProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-xl font-semibold mb-2">No products found</h2>

        <p className="text-muted-foreground">
          We couldn't find any products matching "{query}"
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground">
        Search results for "{query}"
      </h1>

      <ProductsList products={foundProducts} />
    </div>
  );
}
