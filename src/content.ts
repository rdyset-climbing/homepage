import { idToSlug, slugToId } from "./helpers";
import en from "./locales/en.yml";
import fr from "./locales/fr.yml";
import ja from "./locales/ja.yml";

import { getCollection } from "astro:content";

export const getString = (
  k: string,
  options: {
    kPlural?: string;
    count?: number;
    fallback?: string;
  } = {},
) => {
  const { count, fallback = k } = options;
  const s = en.find((s) => s.key === k);
  let t = s?.t || fallback;
  const tPlural = s?.tPlural;
  if (tPlural && count && count > 1) {
    t = tPlural;
  }
  return { t };
};

export const getBrands = async () => await getCollection("brands");

export const getBrandBySlug = async (slug: string) => {
  const brands = await getBrands();
  return brands.find((brand) => brand.id === slugToId(slug));
};

export const getBrandById = async (id: string) => {
  const brands = await getBrands();
  return brands.find((brand) => brand.id === id);
};

export const getBrandPath = (brand) => `/brands/${idToSlug(brand.id)}`;
