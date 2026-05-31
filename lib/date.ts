export function formatShort(d: Date): string {
  return d.toISOString().slice(5, 10);
}

export function formatLong(d: Date): string {
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
