/** Picks allowed keys from a body object (reusable, closed for modification). */
export function pickFields(body = {}, fields = []) {
  return Object.fromEntries(fields.filter((k) => body[k] !== undefined).map((k) => [k, body[k]]));
}
