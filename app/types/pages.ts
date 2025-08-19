import type { CuriesLink, HrefLink, WpContent, WpEmbeddableLink, WpExcerpt, WpGuid, WpPostStatus, WpPredecessorVersionLink, WpRendered, WpVersionHistoryLink } from "./common";

// Links (re-using prior HrefLink/CuriesLink)

export interface WpPageLinks {
  self: HrefLink[];
  collection: HrefLink[];
  about: HrefLink[];
  author: WpEmbeddableLink[];
  replies: WpEmbeddableLink[];
  "version-history": WpVersionHistoryLink[];
  "predecessor-version": WpPredecessorVersionLink[];
  "wp:attachment": HrefLink[];
  curies: CuriesLink[];
}

// Meta (allow listed keys + flexible index signature for extras)
export interface WpPageMeta {
  advanced_seo_description: string;
  jetpack_seo_html_title: string;
  jetpack_seo_noindex: boolean;
  _coblocks_attr: string;
  _coblocks_dimensions: string;
  _coblocks_responsive_height: string;
  _coblocks_accordion_ie_support: string;
  jetpack_post_was_ever_published: boolean;
  reader_suggested_tags: string;
  footnotes: string;
  [key: string]: string | number | boolean | null | undefined;
}

export interface WpPage {
  id: number;
  date: string;             // ISO8601
  date_gmt: string;         // ISO8601
  guid: WpGuid;
  modified: string;         // ISO8601
  modified_gmt: string;     // ISO8601
  slug: string;
  status: WpPostStatus;
  type: "page";
  link: string;

  title: WpRendered;
  content: WpContent;
  excerpt: WpExcerpt;

  author: number;
  featured_media: number;
  parent: number;
  menu_order: number;

  comment_status: "open" | "closed";
  ping_status: "open" | "closed";
  template: string;

  meta: WpPageMeta;

  class_list: string[];

  // Jetpack extras (optionalize in case not present across sites)
  jetpack_shortlink?: string;
  jetpack_sharing_enabled?: boolean;
  jetpack_likes_enabled?: boolean;
  "jetpack-related-posts": unknown[];

  _links: WpPageLinks;
}

export type WpPageList = WpPage[];
