import type { MappedProduct } from "commerce-kit";
import R from "ramda";

type ProductWithScore = {
  product: MappedProduct;
  score: number;
};

const tokenize = (str: string): string[] =>
  str
    .toLowerCase()
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 0);

const isRelevantProduct = (scored: ProductWithScore) => scored.score > 0;

const calculateScore = (product: MappedProduct, query: string): number => {
  const weights = {
    name: 5,
    description: 3,
    slug: 4,
    category: 2,
  };

  const queryTokens = tokenize(query);

  const calculateTokenMatchScore = (
    fieldTokens: string[],
    queryTokens: string[]
  ): number => {
    return queryTokens.reduce((score, queryToken) => {
      const match = fieldTokens.some((fieldToken) =>
        fieldToken.startsWith(queryToken)
      );
      return match ? score + 1 : score;
    }, 0);
  };

  return [
    { field: product.name, weight: weights.name },
    { field: product.description, weight: weights.description },
    { field: product.metadata.slug, weight: weights.slug },
    { field: product.metadata.category, weight: weights.category },
  ]
    .filter(({ field }) => field)
    .reduce((score, { field, weight }) => {
      const fieldTokens = tokenize(field!);
      const matchScore = calculateTokenMatchScore(fieldTokens, queryTokens);
      return score + matchScore * weight;
    }, 0);
};

const withScores = (
  products: MappedProduct[],
  query: string
): ProductWithScore[] => {
  return products.map((product) => ({
    product,
    score: calculateScore(product, query),
  }));
};

const filterRelevant = (scored: ProductWithScore[]): ProductWithScore[] => {
  return scored.filter(isRelevantProduct);
};

const sortDesc = (scored: ProductWithScore[]): ProductWithScore[] => {
  return [...scored].sort((a, b) => b.score - a.score);
};

const extractProduct = (scored: ProductWithScore[]): MappedProduct[] => {
  return scored.map(({ product }) => product);
};

export const searchProducts = (
  products: MappedProduct[],
  query: string
): MappedProduct[] => {
  return R.compose(
    extractProduct,
    sortDesc,
    filterRelevant,
    (p: MappedProduct[]) => withScores(p, query)
  )(products);
};
