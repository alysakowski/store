import { morphism } from "morphism";

type Product = {
  default_price: number;
  marketing_features: string[];
  metadata: Record<string, string>;
  images: string[];
  id: string;
  name: string;
  object: string;
  active: boolean;
  created: number;
  deleted: boolean;
  description: string;
  livemode: boolean;
  package_dimensions: Record<string, number>;
  shippable: boolean;
  statement_descriptor: string;
  tax_code: string;
  type: string;
  unit_label: string;
  updated: number;
  url: string;
};

export const mapProducts = (products: Product[]) => {
  const schema = {
    defaultPrice: "default_price",
    marketingFeatures: "marketing_features",
    metadata: "metadata",
    images: "images",
    id: "id",
    name: "name",
    object: "object",
    active: "active",
    created: "created",
    deleted: "deleted",
    description: "description",
    livemode: "livemode",
    packageDimensions: "package_dimensions",
    shippable: "shippable",
    statementDescriptor: "statement_descriptor",
    taxCode: "tax_code",
    type: "type",
    unitLabel: "unit_label",
    updated: "updated",
    url: "url",
  };

  return morphism(schema, products);
};
