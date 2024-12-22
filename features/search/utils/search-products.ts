import type { MappedProduct } from "commerce-kit";

const tokenize = (str: string): string[] =>
  str
    .toLowerCase()
    .split(/\s+/) // Split by whitespace
    .map((token) => token.trim())
    .filter((token) => token.length > 0); // Remove empty tokens

const calculateTokenMatchScore = (
  fieldTokens: string[],
  queryTokens: string[]
): number => {
  return queryTokens.reduce((score, queryToken) => {
    const match = fieldTokens.some(
      (fieldToken) => fieldToken.startsWith(queryToken) // Partial match for tokens
    );
    return match ? score + 1 : score;
  }, 0);
};

export const searchProducts = (
  products: MappedProduct[],
  query: string
): MappedProduct[] => {
  const weights = {
    name: 5,
    description: 3,
    slug: 4,
    category: 2,
  };

  const queryTokens = tokenize(query);

  const calculateScore = (product: MappedProduct): number =>
    [
      { field: product.name, weight: weights.name },
      { field: product.description, weight: weights.description },
      { field: product.metadata.slug, weight: weights.slug },
      { field: product.metadata.category, weight: weights.category },
    ]
      .filter(({ field }) => field) // Ensure the field exists
      .reduce((score, { field, weight }) => {
        const fieldTokens = tokenize(field!); // Tokenize the field
        const matchScore = calculateTokenMatchScore(fieldTokens, queryTokens);
        return score + matchScore * weight; // Weight the match score
      }, 0);

  const scoreProduct = (product: MappedProduct) => ({
    product,
    score: calculateScore(product),
  });

  const isRelevant = (scored: { product: MappedProduct; score: number }) =>
    scored.score > 0;

  const sortByScoreDesc = (
    a: { product: MappedProduct; score: number },
    b: { product: MappedProduct; score: number }
  ) => b.score - a.score;

  return products
    .map(scoreProduct) // Calculate scores
    .filter(isRelevant) // Filter relevant products
    .sort(sortByScoreDesc) // Sort by relevance
    .map(({ product }) => product); // Extract products
};
