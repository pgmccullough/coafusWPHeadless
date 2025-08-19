export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "OPTIONS";

export interface TargetHints {
  allow?: HttpMethod[];
}

export interface HrefLink {
  href: string;
  targetHints?: TargetHints; // present on some links (e.g., "self")
}

export interface CuriesLink {
  name: string;
  href: string;
  templated: boolean;
}

export interface WpRendered {
  rendered: string;
}
export interface WpContent extends WpRendered {
  protected: boolean;
}
export interface WpExcerpt extends WpRendered {
  protected: boolean;
}
export type WpGuid = WpRendered;
export interface WpEmbeddableLink extends HrefLink {
  embeddable?: boolean;
}
export type WpPostStatus = "publish" | "future" | "draft" | "pending" | "private";
export interface WpPredecessorVersionLink {
  id: number;
  href: string;
}
export interface WpVersionHistoryLink {
  count: number;
  href: string;
}