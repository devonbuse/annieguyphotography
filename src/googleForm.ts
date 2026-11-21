/**
 * Reads a Google Form "pre-filled link" made with placeholder answers
 * NAME, EMAIL, PHONE, SESSION, MESSAGE and returns where to send each field.
 */
export type GoogleForm = { action: string; fields: Record<'name' | 'email' | 'phone' | 'session' | 'message', string | undefined> };

export function parseGoogleForm(link: string): GoogleForm | null {
  if (!link) return null;
  let url: URL;
  try { url = new URL(link.trim()); } catch { return null; }
  const m = url.pathname.match(/\/forms\/d\/e\/([^/]+)\//);
  if (url.hostname !== 'docs.google.com' || !m) return null;
  const byValue: Record<string, string> = {};
  url.searchParams.forEach((v, k) => { if (k.startsWith('entry.')) byValue[v.trim().toUpperCase()] = k; });
  const fields = { name: byValue.NAME, email: byValue.EMAIL, phone: byValue.PHONE, session: byValue.SESSION, message: byValue.MESSAGE };
  if (!fields.name || !fields.email) return null; // name + email are the minimum to follow up
  return { action: `https://docs.google.com/forms/d/e/${m[1]}/formResponse`, fields };
}
