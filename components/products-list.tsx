import * as Commerce from "commerce-kit";
import ItemCard from "./item-card";

type Props = {
  products: Commerce.MappedProduct[];
};

export default function ProductsList({ products }: Props) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((product) => (
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
  );
}
