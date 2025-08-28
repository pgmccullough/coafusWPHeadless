import type { WpCategoryList } from "~/types/categories"
import type { WpPage } from "~/types/pages";
import type { WpPost, WpPostList } from "~/types/posts";

export const getCategories = async () => {
const ORDER = ["The College", "The Foundation", "About Heraldry"] as const;
const RANK = new Map(ORDER.map((name, i) => [name.toLowerCase(), i]));
  const catResponse = await fetch('https://public-api.wordpress.com/wp/v2/sites/collegeofarms.wordpress.com/categories')
  const categories: WpCategoryList = await catResponse.json()
  return categories
    .filter(c => c.name !== "Uncategorized")
    .sort((a, b) => {
      const ra = RANK.get(a.name.toLowerCase()) ?? Number.POSITIVE_INFINITY;
      const rb = RANK.get(b.name.toLowerCase()) ?? Number.POSITIVE_INFINITY;
      return ra - rb || a.name.localeCompare(b.name);
    });
}

export const getPageBySlug = async (slug: string) => {
  const postResponse = await fetch(`https://public-api.wordpress.com/wp/v2/sites/collegeofarms.wordpress.com/pages?slug=${slug}`)
  const postArray = await postResponse.json()
  const post: WpPage = postArray[0]
  return post
}

export const getPostBySlug = async (slug: string) => {
  const postResponse = await fetch(`https://public-api.wordpress.com/wp/v2/sites/collegeofarms.wordpress.com/posts?slug=${slug}`)
  const postArray = await postResponse.json()
  const post: WpPost = postArray[0]
  return post
}

export const getAllPosts = async () => {
  const postResponse = await fetch('https://public-api.wordpress.com/wp/v2/sites/collegeofarms.wordpress.com/posts')
  const postArray = await postResponse.json()
  const posts: WpPostList = postArray
  return posts
}