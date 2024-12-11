import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import Link from "next/link";
import type Stripe from "stripe";
import { formatStripePrice } from "@/utils/money";

type ItemCardProps =
  | {
      name: string;
      slug: string;
      price: Stripe.Price;
      imageUrl: string;
      withDescription?: true;
      isNew?: boolean;
    }
  | {
      name: string;
      slug: string;
      price?: never;
      imageUrl: string;
      withDescription: false;
      isNew?: boolean;
    };

export default function ItemCard({
  name,
  slug,
  price,
  imageUrl,
  withDescription,
  isNew,
}: ItemCardProps) {
  return (
    <Link href={`/product/${slug}`}>
      <Card className="w-full max-w-sm overflow-hidden group hover:cursor-pointer">
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {isNew && (
          <Badge className="absolute top-2 right-2 bg-black text-white">
            New
          </Badge>
        )}

        {withDescription && (
          <CardContent className="px-4 py-2">
            <h3 className="text-md font-semibold line-clamp-1">{name}</h3>

            <p className="text-sm text-gray-500 mt-1">
              {formatStripePrice(price)}
            </p>
          </CardContent>
        )}
      </Card>
    </Link>
  );
}
