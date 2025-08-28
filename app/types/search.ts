export interface WpSearchResult {
  id: number
  title: string
  url: string
  type: string
  subtype: string
  _links: {
    self: Array<{
      embeddable?: boolean
      href: string
      targetHints?: {
        allow: string[]
      }
    }>
    about: Array<{
      href: string
    }>
    collection: Array<{
      href: string
    }>
  }
}

export type WpSearchResults = WpSearchResult[]

export type WpSearchSummary = {
  title: string
  link: string,
  excerpt: string
}
