/**
 * Convierte milisegundos a 'HH:mm:ss'.
 */
export function formatMillisToTime(millis: number): string {
  const seconds = Math.floor(millis / 1000);
  return formatTime(seconds);
}
// utils/time.ts

/**
 * Formatea segundos a 'HH:mm:ss'. Ejemplo: 22:30:55
 */
export function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':');
}

/**
 * Parsea un string 'HH:mm:ss' a segundos
 */
export function parseTime(time: string): number {
  const [h, m, s] = time.split(':').map(Number);
  return h * 3600 + m * 60 + s;
}
