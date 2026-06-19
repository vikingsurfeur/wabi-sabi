// Concatène des classes conditionnelles en filtrant les valeurs falsy.
export function cn(
  ...inputs: Array<string | false | null | undefined>
): string {
  return inputs.filter(Boolean).join(" ");
}
