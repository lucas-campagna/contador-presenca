import { v4 as uuidv4 } from "uuid";

export function generateKey(): string {
  return uuidv4();
}

export function formatDate(date?: Date): string {
  date = date ?? new Date();
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

export function buildURLParams(obj: any): string {
  const params = new URLSearchParams();
  for (const key in obj) {
    const value = obj[key];
    params.set(key, typeof value === 'string' ? value : JSON.stringify(value));
  }
  return params.toString();
}