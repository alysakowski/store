import { ProductCarousel } from "@/components/products-carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCartIcon } from "lucide-react";
import Image from "next/image";

import * as Commerce from "commerce-kit";
import ProductsList from "@/components/products-list";
import Link from "next/link";

export default async function Home() {
  const products = await Commerce.productBrowse({ first: 8 });

  return (
    <div className="container max-w-7xl mx-auto space-y-8 mt-8">
      <ProductCarousel products={products.slice(0, 8)} />

      <div className="h-[546px] bg-neutral-100 flex justify-around items-center">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            New Arrivals 2024
          </h1>

          <p className="mb-6 max-w-md text-lg">
            Explore our exclusive watches collection, showcasing the latest
            arrivals designed to redefine elegance and functionality.
          </p>

          <Link href="/category/watches" passHref>
            <Button className="flex items-center gap-2">
              See collection
              <ArrowRight className="w-6 h-6" />
            </Button>
          </Link>
        </div>

        <Image
          src="/items/watch.png"
          className="rounded"
          height={450}
          width={450}
          alt="logo"
        />
      </div>

      <ProductsList products={products} />
    </div>
  );
}
