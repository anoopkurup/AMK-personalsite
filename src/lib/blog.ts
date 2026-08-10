import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog');
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function excerpt(post: Post): string {
  if (post.data.description) return post.data.description;
  // ponytail: crude markdown strip, fine for excerpts
  const text = (post.body ?? '')
    .replace(/[#>*_`\[\]!]/g, '')
    .replace(/\(https?:[^)]*\)/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const words = text.split(' ').slice(0, 40).join(' ');
  return words.length < text.length ? words + '…' : words;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  });
}
