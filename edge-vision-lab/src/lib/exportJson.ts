export function exportJson(payload: unknown) {
  return JSON.stringify(payload, null, 2);
}
