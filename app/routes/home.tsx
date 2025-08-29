import { useLoaderData } from "react-router";
import type { WpCategoryList } from "~/types/categories";
import { Footer } from "~/components/Footer/Footer";
import { Header } from "~/components/Header/Header";
import type { WpPage, WpPageList } from "~/types/pages";
import { Body } from "~/components/Body/Body";
import { getAllPosts, getCategories } from "~/utils/tools";
import type { WpPostList } from "~/types/posts";

export function meta() {
  return [
    { title: "The College of Arms Foundation" }
  ];
}

const Home = () => {

  const { categories, homePage, posts } = useLoaderData<{
    categories: WpCategoryList
    homePage: WpPage
    posts: WpPostList
  }>()

  return (
    <>
      <Header
        categories={categories}
        posts={posts}
      />
      <Body page={homePage} />
      <Footer
        categories={categories}
        posts={posts}
      />
    </>
  )
}

export async function loader() {
  
  const filteredCategories = await getCategories()

  const pageResponse = await fetch('https://public-api.wordpress.com/wp/v2/sites/collegeofarms.wordpress.com/pages')
  const pages: WpPageList = await pageResponse.json()
  const homePage = pages.sort((a, b) => b.id - a.id)[0]

  const posts = await getAllPosts()

  return { categories: filteredCategories, homePage, posts }
}

export default Home
