export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

export function getQualityLabel(value: number, type: 'ping' | 'speed'): {
  text: string;
  class: string;
} {
  if (type === 'ping') {
    if (value < 20) return { text: 'Excellent', class: 'quality-excellent' };
    if (value < 50) return { text: 'Good', class: 'quality-good' };
    if (value < 100) return { text: 'Fair', class: 'quality-fair' };
    return { text: 'Poor', class: 'quality-poor' };
  } else {
    if (value >= 100) return { text: 'Excellent', class: 'quality-excellent' };
    if (value >= 50) return { text: 'Good', class: 'quality-good' };
    if (value >= 25) return { text: 'Fair', class: 'quality-fair' };
    return { text: 'Poor', class: 'quality-poor' };
  }
}
