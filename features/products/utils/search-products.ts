// @ts-nocheck
import type { MappedProduct } from "commerce-kit";
import * as R from "ramda";

const FIELD_WEIGHTS = {
  name: 5,
  description: 3,
  slug: 4,
  category: 2,
};

const tokenize = R.pipe(
  R.toLower,
  R.split(/\s+/),
  R.map(R.trim),
  R.filter((token: string) => token.length > 0)
);

const calculateTokenMatchScore = R.curry(
  (queryTokens: string[], fieldTokens: string[]): number =>
    R.length(
      R.filter(
        (queryToken) => R.any(R.startsWith(queryToken), fieldTokens),
        queryTokens
      )
    )
);

const calculateScore = R.curry(
  (query: string, product: MappedProduct): number =>
    R.pipe(
      R.toPairs,
      R.reduce((score, [key, weight]) => {
        const fieldTokens = tokenize(
          R.path(["metadata", key], product) || R.prop(key, product) || ""
        );
        return (
          score +
          calculateTokenMatchScore(tokenize(query), fieldTokens) * weight
        );
      }, 0)
    )(FIELD_WEIGHTS)
);

const withScores = R.curry((query: string, products: MappedProduct[]) =>
  R.pipe(
    R.map((product) => ({ product, score: calculateScore(query, product) }))
  )(products)
);

const filterRelevant = R.filter(R.propSatisfies((score) => score > 0, "score"));

const sortByScore = R.sort(R.descend(R.prop("score")));

export const searchProducts = (
  products: MappedProduct[],
  query: string
): MappedProduct[] =>
  R.pipe(
    withScores(query),
    filterRelevant,
    sortByScore,
    R.pluck("product")
  )(products);
