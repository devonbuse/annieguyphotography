import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const galleries = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/galleries' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      category: z.string().default('Other'),
      description: z.string().optional().default(''),
      cover: image(),
      featured: z.boolean().optional().default(false),
      draft: z.boolean().optional().default(false),
      // Uploaded all at once from the phone; saved as a simple list of photos.
      photos: z.array(image()).optional().default([]),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      excerpt: z.string().optional().default(''),
      cover: image().optional(),
      photos: z.array(image()).optional().default([]),
      draft: z.boolean().optional().default(false),
    }),
});

const site = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/site' }),
  schema: ({ image }) =>
    z.object({
      businessName: z.string(),
      photographer: z.string(),
      location: z.string(),
      tagline: z.string(),
      heroImages: z.array(image()).min(1),
      intro: z.string(),
      categories: z.array(z.string()).default([]),
      aboutImage: image().optional(),
      about: z.string(),
      services: z.array(z.object({ name: z.string(), description: z.string() })).default([]),
      steps: z.array(z.object({ title: z.string(), text: z.string() })).default([]),
      packages: z.array(z.object({
        name: z.string(),
        label: z.string().optional().default(''),
        price: z.string(),
        features: z.array(z.string()).default([]),
        popular: z.boolean().optional().default(false),
      })).default([]),
      packagesNote: z.string().optional().default(''),
      testimonials: z.array(z.object({ quote: z.string(), name: z.string() })).default([]),
      phone: z.string().optional().default(''),
      email: z.string().optional().default(''),
      facebook: z.string().optional().default(''),
      instagram: z.string().optional().default(''),
      messenger: z.string().optional().default(''),
      googleFormLink: z.string().optional().default(''),
    }),
});

export const collections = { galleries, blog, site };
