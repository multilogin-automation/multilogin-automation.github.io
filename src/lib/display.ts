/** Sanitize catalog copy for public UI — banned terms per content guidelines. */
export function sanitizeDisplay(text: string): string {
  return text
    .replace(/\bAnti-Bot\b/gi, "Anti-Detection")
    .replace(/\bBot detection\b/gi, "Fingerprint detection")
    .replace(/\bbot\b/gi, "automation");
}
