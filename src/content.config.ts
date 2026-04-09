import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().optional(),
    image: z.string().optional(),
    lang: z.enum(['en', 'ru', 'es', 'pt', 'de', 'zh']),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
