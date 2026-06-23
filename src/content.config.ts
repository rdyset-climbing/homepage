// 1. Import utilities from `astro:content`
import { defineCollection, reference } from "astro:content";
import { z } from "astro/zod";

// 2. Import loader(s)
import { glob, file } from "astro/loaders";

const optionalString = z
  .string()
  .nullish()
  .transform((v) => v ?? null);

const i18nString = z.object({
  en: optionalString,
  fr: optionalString,
  ja: optionalString,
});

// 3. Define your collection(s)
const brands = defineCollection({
  loader: file("src/data/brands.yml"),
  schema: z.object({
    id: z.string(),
    name: optionalString,
    description_i18n: i18nString,
    url: optionalString,
    city: optionalString,
    instagram: optionalString,
    status: z.number().optional(),
    photo: z.string().optional(),
    founder: z
      .object({
        name_i18n: i18nString,
        bio_i18n: i18nString,
        photo: optionalString,
      })
      .optional(),
    tags: z.array(z.string()).optional().default([]),
  }),
});

const hold_families = defineCollection({
  loader: file("src/data/hold_families.yml"),
  schema: z.object({
    id: z.string(),
    brand: reference("brands"),
    name: z.string(),
    url: z.string().optional(),
  }),
});

const hold_sets = defineCollection({
  loader: file("src/data/hold_sets.yml"),
  schema: z.object({
    id: z.string(),
    brand: reference("brands"),
    name: z.string(),
    family: reference("holds_families"),
    url: z.string(),
    size: z.enum(["XS", "S", "M", "L", "XL"]),
    price: z.number(),
    currency: z.enum(["JPY", "USD", "EUR"]).default("JPY"),
    quantity: z.number(),
    description_i18n: i18nString,
    photos: z.array(z.string()),
    moves: z.array(z.string()).optional().default([]),
  }),
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { brands, hold_families, hold_sets };
