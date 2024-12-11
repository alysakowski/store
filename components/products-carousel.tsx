"use client";

import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ItemCard from "./item-card";
import * as Commerce from "commerce-kit";

type ProductsCarouselProps = {
  products: Commerce.MappedProduct[];
};

export function ProductCarousel({ products }: ProductsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  useEffect(() => {
    if (emblaApi) {
      const intervalId = setInterval(() => {
        emblaApi.scrollNext();
      }, 2000);

      return () => clearInterval(intervalId);
    }
  }, [emblaApi]);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {products.map((product) => (
          <div key={product.id} className="flex-[0_0_25%] min-w-0 px-4">
            <ItemCard
              name={product.name}
              slug={product.metadata.slug}
              imageUrl={product.images[0]}
              withDescription={false}
              isNew
            />
          </div>
        ))}
      </div>
    </div>
  );
}
