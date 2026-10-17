/**
 * Format a phone number string for display.
 * Strips non-digits, then formats as (XXX) XXX-XXXX for US numbers.
 *
 * @example
 * formatPhone('9728810715')       // '(972) 881-0715'
 * formatPhone('(972) 881-0715')   // '(972) 881-0715'
 * formatPhone('+19728810715')     // '(972) 881-0715'
 * formatPhone('123')              // '123' (too short, returned as-is)
 */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");

  // Remove leading country code '1' if 11 digits
  const normalized = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;

  if (normalized.length === 10) {
    return `(${normalized.slice(0, 3)}) ${normalized.slice(3, 6)}-${normalized.slice(6)}`;
  }

  // Non-standard length — return cleaned input
  return phone.trim();
}

/**
 * Convert a phone number string to a tel: href value.
 * Strips everything except digits and leading +.
 *
 * @example
 * phoneHref('(972) 881-0715')  // 'tel:9728810715'
 * phoneHref('+1 972-881-0715') // 'tel:+19728810715'
 */
export function phoneHref(phone: string): string {
  const cleaned = phone.replace(/[^\d+]/g, "");
  return `tel:${cleaned}`;
}
