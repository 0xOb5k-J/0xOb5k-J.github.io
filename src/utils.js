// Math & random
export const TAU = Math.PI * 2;
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const rand = (a = 0, b = 1) => a + Math.random() * (b - a);

// Easing
export const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

// Colors
export function stringToHSL(str) {
  let h = 0, s = 65, l = 58;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 360;
  s = 50 + (h % 20);
  l = 45 + ((h * 3) % 15);
  return `hsl(${h}, ${s}%, ${l}%)`;
}

// Formatting
export function niceNumber(n) {
  try { return Intl.NumberFormat().format(n); } catch { return String(n); }
}
export function escapeHTML(str) {
  return str.replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
}
export function relativeTime(iso) {
  try {
    const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });
    const d = new Date(iso);
    const diff = (Date.now() - d.getTime()) / 1000;
    const units = [
      ['year', 31536000],
      ['month', 2592000],
      ['day', 86400],
      ['hour', 3600],
      ['minute', 60],
      ['second', 1],
    ];
    for (const [unit, sec] of units) {
      if (Math.abs(diff) >= sec || unit === 'second') {
        const val = Math.round(-diff / sec);
        return rtf.format(val, unit);
      }
    }
  } catch { /* ignore */ }
  return new Date(iso).toLocaleDateString();
}
