// Arithmetic Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#arithmetic-expression-operators

import { computeValue, ExpressionOperator, Options } from "../../../core";
import { Any, AnyObject } from "../../../types";
import { assert, isNil, isNumber } from "../../../util";

/**
 * Returns the smallest integer greater than or equal to the specified number.
 *
 * @param obj
 * @param expr
 * @returns {number}
 */
export let $ceil: ExpressionOperator = (
  obj: AnyObject,
  expr: Any,
  options: Options
): number | null => {
  let n = computeValue(obj, expr, null, options) as number;
  if (isNil(n)) return null;
  assert(isNumber(n) || isNaN(n), "$ceil expression must resolve to a number.");
  return Math.ceil(n);
};
