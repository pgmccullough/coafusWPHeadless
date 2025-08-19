import { useLoaderData, type LoaderFunctionArgs } from "react-router"
import { Body } from "~/components/Body/Body"
import { Footer } from "~/components/Footer/Footer"
import { Header } from "~/components/Header/Header"
import type { WpCategoryList } from "~/types/categories"
import type { WpPost, WpPostList } from "~/types/posts"
import { getAllPosts, getCategories, getPostBySlug } from "~/utils/tools"

export const Post = () => {
  const { categories, post, posts } = useLoaderData<{
    categories: WpCategoryList
    post: WpPost
    posts: WpPostList
  }>()
  return (
    <>
      <Header
        categories={categories}
        posts={posts}
      />
      <Body post={post} />
      <Footer
        categories={categories}
        posts={posts}
      />
    </>
  )
}

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params

  if (!slug) {
    return {
      status: 404,
      message: 'Page not found',
    }
  }

  const filteredCategories = await getCategories()
  const post = await getPostBySlug(slug)
  const posts = await getAllPosts()

  return { categories: filteredCategories, post, posts }
}

export default Post
