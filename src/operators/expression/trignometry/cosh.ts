// Trignometry Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#trigonometry-expression-operators

import { createTrignometryOperator } from "./_internal";

/** Returns the hyperbolic cosine of a value that is measured in radians. */
export let $cosh = createTrignometryOperator(Math.cosh, {
  "-Infinity": Infinity,
  Infinity: Infinity
});
