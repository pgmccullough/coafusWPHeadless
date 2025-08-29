import { useLoaderData, type LoaderFunctionArgs, type MetaFunction } from "react-router"
import { Body } from "~/components/Body/Body"
import { Footer } from "~/components/Footer/Footer"
import { Header } from "~/components/Header/Header"
import type { WpCategoryList } from "~/types/categories"
import type { WpPage } from "~/types/pages"
import type { WpPost, WpPostList } from "~/types/posts"
import { getAllPosts, getCategories, getPageBySlug, getPostBySlug } from "~/utils/tools"
import { decode } from "entities"


export const meta: MetaFunction<typeof loader> = ({ matches }) => {
  const match = matches.find((m) => m.id === 'routes/slug')
  const data = match?.loaderData as Awaited<ReturnType<typeof loader>> | undefined
  const title = data?.post?.title.rendered ?? ''

  return [
    { title: `${decode(title)} | The College of Arms Foundation` },
    {
      property: "og:title",
      content: `${decode(title)} | The College of Arms Foundation`,
    },
  ]
}

export const Post = () => {
  const { categories, post, posts } = useLoaderData<{
    categories: WpCategoryList
    post: WpPost | WpPage
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
  let post: WpPage | WpPost = await getPostBySlug(slug)
  if(!post) post = await getPageBySlug(slug)
  const posts = await getAllPosts()

  return { categories: filteredCategories, post, posts }
}

export default Post
