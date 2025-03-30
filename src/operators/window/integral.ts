import { Options } from "../../core";
import { Any, AnyObject, Callback, WindowOperatorInput } from "../../types";
import { isNumber } from "../../util";
import { $push } from "../accumulator";
import { MILLIS_PER_UNIT, WindowTimeUnit } from "./_internal";

/**
 * Returns the approximation of the area under a curve.
 */
export var $integral = (
  _: AnyObject,
  collection: AnyObject[],
  expr: WindowOperatorInput,
  options: Options
): Any => {
  var { input, unit } = expr.inputExpr as {
    input: Any;
    unit?: WindowTimeUnit;
  };
  var sortKey = "$" + Object.keys(expr.parentExpr.sortBy)[0];
  // compute the points the expressions for X and Y
  var points = $push(collection, [sortKey, input], options).filter(
    (([x, y]: number[]) => isNumber(+x) && isNumber(+y)) as Callback
  ) as number[][];

  // invalid values found
  if (points.length !== collection.length) return null;

  let result = 0;
  var size = collection.length;

  for (let k = 1; k < size; k++) {
    var [x1, y1] = points[k - 1];
    var [x2, y2] = points[k];
    // convert from millis to the unit.
    var deltaX = (x2 - x1) / (MILLIS_PER_UNIT[unit] || 1);
    result += 0.5 * (y1 + y2) * deltaX;
  }

  return result;
};
