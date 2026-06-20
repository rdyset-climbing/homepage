import type { imageMetadata } from "astro/assets/utils";
import { idToSlug, slugToId } from "./helpers";
import en from "./locales/en.yml";
import fr from "./locales/fr.yml";
import ja from "./locales/ja.yml";

import { getCollection, type CollectionEntry } from "astro:content";

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

// brands

export const getBrands = async () => await getCollection("brands");

export const getBrandBySlug = async (slug: string) => {
  const brands = await getBrands();
  return brands.find((brand) => brand.id === slugToId(slug));
};

export const getBrandById = async (id: string) => {
  const brands = await getBrands();
  return brands.find((brand) => brand.id === id);
};

export const getBrandPath = (brand: CollectionEntry<"brands">) =>
  `/brands/${idToSlug(brand.id)}`;

export const getBrandPhoto = (brand: CollectionEntry<"brands">) => {
  const images = getAllSetImages();
  return images[`./assets/holds/${brand.id}/${brand.data.photo}`];
};

// sets

export const getSets = async () => await getCollection("hold_sets");

export const getSetsByBrandId = async (id: string) => {
  const allSets = await getSets();
  return allSets.filter((set) => set.data.brand.id === id);
};

export const getSetById = async (id: string) => {
  const sets = await getSets();
  return sets.find((set) => set.id === id);
};

export const getSetPath = (set: CollectionEntry<"hold_sets">) =>
  `/sets/${idToSlug(set.id)}`;

export const getAllSetImages = () => {
  const images = import.meta.glob("./assets/holds/*/*", {
    eager: true,
    import: "default",
  });
  return images;
};

export const getSetPhoto = (
  set: CollectionEntry<"hold_sets">,
  photo: string,
) => {
  const images = getAllSetImages();
  return images[`./assets/holds/${set.data.brand.id}/${photo}`];
};
