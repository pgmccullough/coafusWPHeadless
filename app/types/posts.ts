import type { CuriesLink, HrefLink, WpContent, WpEmbeddableLink, WpExcerpt, WpGuid, WpPostStatus, WpPredecessorVersionLink, WpRendered, WpVersionHistoryLink } from "./common";

// ---- Extra link shapes specific to posts ----
export interface WpTaxonomyLink {
  taxonomy: string;          // e.g., "category" | "post_tag"
  embeddable?: boolean;
  href: string;
}

export interface WpPostLinks {
  self: HrefLink[];
  collection: HrefLink[];
  about: HrefLink[];
  author: WpEmbeddableLink[];
  replies: WpEmbeddableLink[];
  "version-history": WpVersionHistoryLink[];
  "predecessor-version": WpPredecessorVersionLink[];
  "wp:attachment": HrefLink[];
  "wp:term": WpTaxonomyLink[];
  curies: CuriesLink[];
}

// ---- Jetpack Social Options present in meta ----
export interface WpImageGeneratorSettings {
  template: string;          // e.g., "highway"
  default_image_id: number;  // 0 when none
  font: string;
  enabled: boolean;
}

export interface WpSocialOptions {
  image_generator_settings: WpImageGeneratorSettings;
  version: number;
}

// ---- Meta (posts) ----
export interface WpPostMeta {
  advanced_seo_description: string;
  jetpack_seo_html_title: string;
  jetpack_seo_noindex: boolean;

  _coblocks_attr: string;
  _coblocks_dimensions: string;
  _coblocks_responsive_height: string;
  _coblocks_accordion_ie_support: string;

  jetpack_post_was_ever_published: boolean;
  reader_suggested_tags: string;

  _jetpack_newsletter_access: string;
  _jetpack_dont_email_post_to_subs: boolean;
  _jetpack_newsletter_tier_id: number;
  _jetpack_memberships_contains_paywalled_content: boolean;
  _jetpack_memberships_contains_paid_content: boolean;

  footnotes: string;

  jetpack_publicize_message: string;
  jetpack_publicize_feature_enabled: boolean;
  jetpack_social_post_already_shared: boolean;

  jetpack_social_options: WpSocialOptions;

  // <-- loosen this so object-shaped values are allowed
  [key: string]: unknown;
}

// ---- Post formats (core set) ----
export type WpPostFormat =
  | "standard"
  | "aside"
  | "chat"
  | "gallery"
  | "link"
  | "image"
  | "quote"
  | "status"
  | "video"
  | "audio";

// ---- Post ----
export interface WpPost {
  id: number;

  date: string;            // ISO8601
  date_gmt: string;        // ISO8601
  guid: WpGuid;

  modified: string;        // ISO8601
  modified_gmt: string;    // ISO8601

  slug: string;
  status: WpPostStatus;    // e.g., "publish"
  type: "post";
  link: string;

  title: WpRendered;
  content: WpContent;
  excerpt: WpExcerpt;

  author: number;
  featured_media: number;

  comment_status: "open" | "closed";
  ping_status: "open" | "closed";

  sticky: boolean;
  template: string;
  format: WpPostFormat;

  meta: WpPostMeta;

  categories: number[];
  tags: number[];

  class_list: string[];

  // Jetpack convenience fields (optionalize for portability)
  jetpack_featured_media_url?: string;
  jetpack_shortlink?: string;
  jetpack_sharing_enabled?: boolean;
  jetpack_likes_enabled?: boolean;
  "jetpack-related-posts"?: unknown[];
  jetpack_publicize_connections?: unknown[];

  _links: WpPostLinks;
}

export type WpPostList = WpPost[];
