/**
 * Loads all Query and Projection operators
 */
import { useOperators } from "../core";
import * as booleanOperators from "../operators/expression/boolean";
import * as comparisonOperators from "../operators/expression/comparison";
import { $limit, $project, $skip, $sort } from "../operators/pipeline";
import * as projectionOperators from "../operators/projection";
import * as queryOperators from "../operators/query";

useOperators("expression", {
  ...booleanOperators,
  ...comparisonOperators
});
useOperators("pipeline", {
  $project,
  $skip,
  $limit,
  $sort
});
useOperators("projection", projectionOperators);
useOperators("query", queryOperators);
