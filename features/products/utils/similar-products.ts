import type { MappedProduct } from "commerce-kit";

const calculateSimilarityScore = (
  productA: MappedProduct,
  productB: MappedProduct
): number => {
  const weights = {
    category: 5,
    name: 4,
    slug: 2,
    description: 2,
  };

  const tokenize = (str: string | undefined | null): string[] =>
    str
      ? str
          .toLowerCase()
          .split(/\s+/)
          .filter((token) => token.trim().length > 0)
      : [];

  const intersect = (arr1: string[], arr2: string[]): number =>
    arr1.filter((item) => arr2.includes(item)).length;

  let score = 0;

  // Compare `category`
  if (productA.metadata.category && productB.metadata.category) {
    if (productA.metadata.category === productB.metadata.category) {
      score += weights.category;
    }
  }

  // Compare `slug`
  const slugA = tokenize(productA.metadata.slug);
  const slugB = tokenize(productB.metadata.slug);
  score += intersect(slugA, slugB) * weights.slug;

  // Compare `name`
  const nameTokensA = tokenize(productA.name);
  const nameTokensB = tokenize(productB.name);
  score += intersect(nameTokensA, nameTokensB) * weights.name;

  // Compare `description`
  const descriptionTokensA = tokenize(productA.description);
  const descriptionTokensB = tokenize(productB.description);
  score +=
    intersect(descriptionTokensA, descriptionTokensB) * weights.description;

  return score;
};

export const findSimilarProducts = (
  products: MappedProduct[],
  targetProduct: MappedProduct,
  maxResults: number = 4
): MappedProduct[] => {
  const scoredProducts = products
    .filter((product) => product.id !== targetProduct.id) // Exclude the target product itself
    .map((product) => ({
      product,
      score: calculateSimilarityScore(targetProduct, product),
    }))
    .filter(({ score }) => score > 0) // Keep only similar products
    .sort((a, b) => b.score - a.score); // Sort by similarity score

  return scoredProducts.slice(0, maxResults).map(({ product }) => product); // Return top results
};
