import { useMemo } from 'react';
import { Link, useLoaderData, type LoaderFunctionArgs, type MetaFunction } from 'react-router'
import { Header } from '~/components/Header/Header';
import styles from '~/styles/routes.module.css'
import type { WpCategoryList } from '~/types/categories';
import type { WpPostList } from '~/types/posts';
import type { WpSearchResults, WpSearchSummary } from '~/types/search';
import { getAllPosts, getCategories } from '~/utils/tools';










function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightHTML(html: string, q: string | null, className: string) {
  if (!q || !q.trim()) return html;

  const safeQ = escapeRegExp(q.trim());
  const re = new RegExp(`(${safeQ})`, "gi");

  return html
    .split(/(<[^>]+>)/g)
    .map((segment) => {
      if (segment.startsWith("<")) return segment;
      return segment.replace(re, `<span class="${className}">$1</span>`);
    })
    .join("");
}










export const meta: MetaFunction<typeof loader> = ({ matches }) => {
  const match = matches.find((m) => m.id === 'routes/search')
  const data = match?.loaderData as Awaited<ReturnType<typeof loader>> | undefined
  const q = data?.q ?? ""

  return [
    { title: `"${q}" | Search | The College of Arms Foundation` },
    {
      property: "og:title",
      content: `"${q}" | Search | The College of Arms Foundation`,
    },
  ]
}

export default function Search() {
  const { categories, posts, q, searchResults } = useLoaderData<{
    categories: WpCategoryList;
    posts: WpPostList;
    q: string | null;
    searchResults: WpSearchSummary[];
  }>();

  return (
    <>
      <Header categories={categories} posts={posts} searchQuery={q ?? ""} />
      <main className={styles.content}>
        <>
          Showing {searchResults?.length || 0} results for "{q ?? ""}"
          {searchResults?.map((result) => {
            const excerptHTML = highlightHTML(result.excerpt, q ?? "", styles.matchStyle);
            return (
              <div key={result.link}>
                <Link className={styles.matchH1} to={`/${result.link}`}>
                  <h1 dangerouslySetInnerHTML={{ __html: result.title }} />
                </Link>
                <p
                  className={styles.matchP}
                  dangerouslySetInnerHTML={{ __html: excerptHTML }}
                />
              </div>
            );
          })}
        </>
      </main>
    </>
  );
}



export async function loader({
  request,
}: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')
  const filteredCategories = await getCategories()

  const searchResponse = await fetch(`https://public-api.wordpress.com/wp/v2/sites/collegeofarms.wordpress.com/search?search=${q}`)
  const rawSearchResults: WpSearchResults = await searchResponse.json()
  const searchResults = []
  for(const searchResult of rawSearchResults) {
    const pageResponse = await fetch(`https://public-api.wordpress.com/wp/v2/sites/collegeofarms.wordpress.com/${searchResult.subtype === 'page' ? 'pages' : 'posts'}/${searchResult.id}`)
    const pageData = await pageResponse.json()
    searchResults.push({
      title: pageData.title?.rendered || 'No Title',
      link: pageData.slug,
      excerpt: pageData.excerpt?.rendered || 'No content'
    })
  }



  const posts = await getAllPosts()

  return { categories: filteredCategories, posts, q, searchResults }
}
