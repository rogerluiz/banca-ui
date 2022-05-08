import colors from 'theme/colors';
import { RGB } from '../types';

export function hexToRgb(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (result) {
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  }

  return { r: 0, g: 0, b: 0 };
}

export function difference(backgroundColor: string): string {
  const r: any = hexToRgb(backgroundColor).r * 0.2126;
  const g: any = hexToRgb(backgroundColor).g * 0.7152;
  const b: any = hexToRgb(backgroundColor).b * 0.0722;
  const sum: any = r + g + b;
  const perceivedLightness: any = sum / 255;
  const threshold: any = 0.5;

  return `hsl(0, 0%, ${(perceivedLightness - threshold) * -10000000}%)`;
}

export function getCssColor(propertyName: string): string {
  const root = getComputedStyle(document.documentElement);
  return String(root.getPropertyValue(propertyName)).trim();
}

export function getTokenColor(token: string) {
  const color = `--${token}`;
  return colors[color as keyof typeof colors];
}
