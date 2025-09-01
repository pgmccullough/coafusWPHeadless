import { useLoaderData } from "react-router";
import type { WpCategoryList } from "~/types/categories";
import { Footer } from "~/components/Footer/Footer";
import { Header } from "~/components/Header/Header";
import type { WpPage, WpPageList } from "~/types/pages";
import { Body } from "~/components/Body/Body";
import { getAllPosts, getCategories, getImage } from "~/utils/tools";
import type { WpPostList } from "~/types/posts";

export function meta() {
  return [
    { title: "The College of Arms Foundation" }
  ];
}

const Home = () => {

  const { categories, featuredImage, homePage, posts } = useLoaderData<{
    categories: WpCategoryList
    featuredImage: string
    homePage: WpPage
    posts: WpPostList
  }>()

  return (
    <>
      <Header
        categories={categories}
        posts={posts}
      />
      <Body 
        featuredImage={featuredImage}
        page={homePage} 
      />
      <Footer
        categories={categories}
        posts={posts}
      />
    </>
  )
}

export async function loader() {
  
  const filteredCategories = await getCategories()

  const pageResponse = await fetch('https://public-api.wordpress.com/wp/v2/sites/collegeofarms.wordpress.com/pages?_embed')
  const pages: WpPageList = await pageResponse.json()
  const homePage = pages.sort((a, b) => b.id - a.id)[0]

  const posts = await getAllPosts()

  const featuredImage = homePage._embedded['wp:featuredmedia']?.[0]?.media_details.sizes.full?.source_url

  return { categories: filteredCategories, featuredImage, homePage, posts }
}

export default Home
