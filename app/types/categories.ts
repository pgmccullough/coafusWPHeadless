import type { CuriesLink, HrefLink } from "./common";

export interface WpCategoryLinks {
  self: HrefLink[];
  collection: HrefLink[];
  about: HrefLink[];
  "wp:post_type": HrefLink[];
  curies: CuriesLink[];
}

export interface WpCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: "category"; // narrow literal based on your sample
  parent: number;
  meta: unknown[]; // empty array in your sample
  _links: WpCategoryLinks;
}

export type WpCategoryList = WpCategory[];
