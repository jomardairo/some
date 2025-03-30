import { ComputeOptions, PipelineOperator } from "../../core";
import { Iterator } from "../../lazy";
import { ensureArray } from "../../util";
import { $project } from "./project";

/**
 * Removes/excludes fields from documents.
 *
 * See {@link https://www.mongodb.com/docs/manual/reference/operator/aggregation/unset usage}.
 *
 * @param collection
 * @param expr
 * @param options
 * @returns {Iterator}
 */
export let $unset: PipelineOperator = (
  collection: Iterator,
  expr: string | string[],
  options?: ComputeOptions
): Iterator => {
  expr = ensureArray(expr);
  let doc: Record<string, number> = {};
  for (let k of expr) doc[k] = 0;
  return $project(collection, doc, options);
};
