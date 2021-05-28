export default function formatNumber(n: number) {
  const lessThanK = n < 1e3;
  const betweenKandM = n >= 1e3 && n < 1e6;
  const betweenMandB = n >= 1e6 && n < 1e9;
  const betweenBandT = n >= 1e9 && n < 1e12;
  const greaterThanT = n >= 1e12;

  if (lessThanK) return n.toString();
  if (betweenKandM) return +(n / 1e3).toFixed(1) + "K";
  if (betweenMandB) return +(n / 1e6).toFixed(1) + "M";
  if (betweenBandT) return +(n / 1e9).toFixed(1) + "B";
  if (greaterThanT) return +(n / 1e12).toFixed(1) + "T";
}
