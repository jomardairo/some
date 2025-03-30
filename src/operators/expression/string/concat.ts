/**
 * String Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators
 */

import { computeValue, ExpressionOperator, Options } from "../../../core";
import { Any, AnyObject } from "../../../types";
import { assert, isNil, isString } from "../../../util";

/**
 * Concatenates two strings.
 *
 * @param obj
 * @param expr
 * @returns {string|*}
 */
export let $concat: ExpressionOperator = (
  obj: AnyObject,
  expr: Any,
  options: Options
): Any => {
  let args = computeValue(obj, expr, null, options) as Any[];
  assert(
    args.every(v => isString(v) || isNil(v)),
    "$concat only supports strings."
  );
  if (args.some(isNil)) return null;
  return args.join("");
};
