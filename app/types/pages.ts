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
  "wp:featuredmedia": WpEmbeddableLink[];
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
  _embedded: WpPageEmbedded;
}

export type WpPageList = WpPage[];

// --- Embedded: Users (authors) ---

export interface WpUserLinks {
  self: HrefLink[];
  collection: HrefLink[];
}

export interface WpAvatarUrls {
  // WordPress uses string keys like "24", "48", "96"
  [size: string]: string;
}

export interface WpUser {
  id: number;
  name: string;
  url: string;
  description: string;
  link: string;
  slug: string;
  avatar_urls: WpAvatarUrls;
  _links: WpUserLinks;
}

// --- Embedded: Media (attachments / featuredmedia) ---

export interface WpMediaSize {
  file: string;          // e.g. "coaf.jpg?w=300"
  width: number;
  height: number;
  mime_type: string;
  source_url: string;    // direct URL to that size
}

export interface WpMediaSizes {
  // Known common keys:
  thumbnail?: WpMediaSize;
  medium?: WpMediaSize;
  large?: WpMediaSize;
  full?: WpMediaSize;

  // plus any theme/site-defined sizes:
  [custom: string]: WpMediaSize | undefined;
}

export interface WpImageMeta {
  aperture?: string;
  credit?: string;
  camera?: string;
  caption?: string;
  created_timestamp?: string;
  copyright?: string;
  focal_length?: string;
  iso?: string;
  shutter_speed?: string;
  title?: string;
  orientation?: string;
  keywords?: string[];
  // allow extra keys WordPress/Jetpack may add
  [key: string]: unknown;
}

export interface WpMediaDetails {
  width: number;
  height: number;
  file: string;        // e.g. "2025/08/foo.jpg"
  filesize?: number;   // sometimes present
  sizes: WpMediaSizes;
  image_meta?: WpImageMeta;
  // WP can add extra fields; keep flexible:
  [key: string]: unknown;
}

export interface WpMediaLinks {
  self: HrefLink[];
  collection: HrefLink[];
  about: HrefLink[];
  author?: WpEmbeddableLink[];
  replies?: WpEmbeddableLink[];
}

export interface WpMediaItem {
  id: number;
  date: string;                // ISO8601
  slug: string;
  type: "attachment";
  link: string;
  title: WpRendered;
  author: number;
  featured_media: number;      // usually 0 for attachments
  caption: WpRendered;
  alt_text: string;
  media_type: "image" | "file" | string;
  mime_type: string;
  media_details: WpMediaDetails;
  source_url: string;          // direct URL to original
  // Jetpack extras that commonly appear:
  jetpack_shortlink?: string;
  jetpack_sharing_enabled?: boolean;
  jetpack_likes_enabled?: boolean;

  _links: WpMediaLinks;
}

// --- _embedded wrapper for a Page ---

export interface WpPageEmbedded {
  author?: WpUser[];                 // _embedded.author[0]
  "wp:featuredmedia"?: WpMediaItem[]; // _embedded["wp:featuredmedia"][0]
  // Keep this future-proof: other rels may be present
  [rel: string]: unknown;
}

