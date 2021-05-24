export function toCurrency(num: number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  return formatter.format(num);
}

export function getPercentOfTotal(total: number, percent: number): number {
  return percent * 0.01 * total;
}

export function stripNonNumericCharacters(text: string): string {
  return text.replace(/[^\d.-]/g, "");
}
