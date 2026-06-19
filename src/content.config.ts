// 1. Import utilities from `astro:content`
import { defineCollection, reference } from "astro:content";
import { z } from "astro/zod";

// 2. Import loader(s)
import { glob, file } from "astro/loaders";

const i18nString = z.object({
  en: z.string(),
  fr: z.string(),
  ja: z.string(),
});

// 3. Define your collection(s)
const brands = defineCollection({
  loader: file("src/data/brands.yml"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    description_i18n: i18nString,
    url: z.string(),
    city: z.string(),
    founder: z.object({
      name_i18n: i18nString,
      bio_i18n: i18nString,
      photo: z.string(),
    }),
    moves: z.array(z.string()),
    tags: z.array(z.string()),
  }),
});

// 3. Define your collection(s)
const hold_sets = defineCollection({
  loader: file("src/data/hold_sets.yml"),
  schema: z.object({
    id: z.string(),
    holdMakerId: reference("hold_makers"),
    name_i18n: i18nString,
    description_i18n: i18nString,
    photos: z.array(z.string()),
  }),
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { brands, hold_sets };
