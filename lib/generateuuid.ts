import { v4 as uuidv4 } from 'uuid';

export function generateShortUUID(length: number) {
  const uuid = uuidv4().replace(/-/g, ''); // Remove hyphens
  return uuid.substring(0, length); // Get the first `length` characters
}