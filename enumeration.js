//Time- ISO 8601 (YYYY-MM-DDTHH:MM:SSZ)
//UTC: 2024-10-09T13:45:30Z
//UTC+3: 2024-10-09T16:45:30+03:00

// Random string generator (16 digits by default):
import { randomBytes } from "crypto";
export function generateRandomString(length = 16) {
  return randomBytes(length).toString("hex").slice(0, length);
}
