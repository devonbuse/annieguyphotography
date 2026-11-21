import { getCollection, type CollectionEntry } from 'astro:content';
export const fmtDate = (d: Date) => d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
export const getGalleries = async () =>
  (await getCollection('galleries', (g) => !g.data.draft)).sort((a, b) => +b.data.date - +a.data.date);
export const getPosts = async () =>
  (await getCollection('blog', (p) => !p.data.draft)).sort((a, b) => +b.data.date - +a.data.date);
/** Uses the summary she typed, or the first ~160 characters of the post. */
export const excerpt = (p: CollectionEntry<'blog'>) => {
  if (p.data.excerpt) return p.data.excerpt;
  const text = (p.body ?? '').replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[#*_>`]/g, '').replace(/\s+/g, ' ').trim();
  return text.length > 160 ? text.slice(0, 157).replace(/\s+\S*$/, '') + '…' : text;
};
