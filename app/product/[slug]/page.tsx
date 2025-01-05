import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "@/features/cart/components/add-to-cart-button";
import * as Commerce from "commerce-kit";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { findSimilarProducts } from "@/features/products/utils/similar-products";
import ItemCard from "@/components/item-card";
import { formatStripePrice } from "@/utils/money";
import { deslugify } from "@/features/products/utils/slugs";

async function MoreLikeThis({ product }: { product: Commerce.MappedProduct }) {
  const products = await Commerce.productBrowse({
    first: 100,
  });

  const similarProducts = findSimilarProducts(products, product);

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">More Like This</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {similarProducts.map((product) => (
          <ItemCard
            slug={product.metadata.slug}
            key={product.id}
            name={product.name}
            price={product.default_price!}
            imageUrl={product.images[0]}
            withDescription
          />
        ))}
      </div>
    </section>
  );
}

export default async function ProductPage(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ variant?: string }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const variants = await Commerce.productGet({ slug: params.slug });
  const selectedVariant = searchParams.variant || variants[0]?.metadata.variant;
  const product = variants.find(
    (variant) => variant.metadata.variant === selectedVariant
  );

  if (!product) {
    return notFound();
  }

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              asChild
              className="inline-flex min-h-12 min-w-12 items-center justify-center"
            >
              <Link href="/products">All products</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {product.metadata.category && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="inline-flex min-h-12 min-w-12 items-center justify-center"
                  asChild
                >
                  <Link href={`/category/${product.metadata.category}`}>
                    {deslugify(product.metadata.category)}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>

          {selectedVariant && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{deslugify(selectedVariant)}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">{product.name}</h1>

            <p className="text-xl font-semibold text-gray-600">
              {formatStripePrice({ ...product.default_price })}
            </p>
          </div>

          <p className="text-gray-600">{product.description}</p>

          <AddToCartButton product={product} />
        </div>
      </div>

      <MoreLikeThis product={product} />
    </div>
  );
}
