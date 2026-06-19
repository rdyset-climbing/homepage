export const idToSlug = (id: string) => id.replaceAll("_", "-");

export const slugToId = (slug: string) => slug.replaceAll("-", "_");
