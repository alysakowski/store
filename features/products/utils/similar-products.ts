// @ts-nocheck
import type { MappedProduct } from "commerce-kit";
import * as R from "ramda";

const FIELD_WEIGHTS = {
  category: 5,
  name: 4,
  slug: 2,
  description: 2,
};

const tokenize = R.pipe(
  R.toLower,
  R.split(/\s+/),
  R.map(R.trim),
  R.filter((token: string) => token.length > 0)
);

const intersectCount = R.curry((arr1: string[], arr2: string[]): number =>
  R.length(R.intersection(arr1, arr2))
);

const calculateSimilarityScore = R.curry(
  (productA: MappedProduct, productB: MappedProduct): number =>
    R.pipe(
      R.toPairs,
      R.reduce((score, [key, weight]) => {
        const tokensA = tokenize(
          R.path(["metadata", key], productA) || R.prop(key, productA) || ""
        );
        const tokensB = tokenize(
          R.path(["metadata", key], productB) || R.prop(key, productB) || ""
        );

        return score + intersectCount(tokensA, tokensB) * weight;
      }, 0)
    )(FIELD_WEIGHTS)
);

const withSimilarityScores = R.curry(
  (targetProduct: MappedProduct, products: MappedProduct[]) =>
    R.map((product) => ({
      product,
      score: calculateSimilarityScore(targetProduct, product),
    }))
);

const filterRelevant = R.filter(R.propSatisfies((score) => score > 0, "score"));

const sortByScore = R.sort(R.descend(R.prop("score")));

export const findSimilarProducts = (
  products: MappedProduct[],
  targetProduct: MappedProduct,
  maxResults = 4
): MappedProduct[] =>
  R.pipe(
    withSimilarityScores(targetProduct),
    filterRelevant,
    sortByScore,
    R.take(maxResults),
    R.pluck("product")
  )(products);
