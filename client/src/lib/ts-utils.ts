/**
 * Use this in the `default` of a switch statement to ensure all possible values are checked
 */
export function checkExhaustive(
  _value: never,
  message = "Exhaustive check failed",
): never {
  throw new Error(message);
}
