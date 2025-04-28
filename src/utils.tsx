import { v4 as uuidv4 } from "uuid";

export function generateKey(): string {
  return uuidv4();
}

export function formatDate(date?: Date): string {
  date = date ?? new Date();
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}
