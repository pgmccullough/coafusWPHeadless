import type { FC } from 'react'
import { decode } from 'entities'
import styles from './Footer.module.css'
import type { WpCategoryList } from '~/types/categories'
import type { WpPostList } from '~/types/posts'
import { NavLink } from 'react-router'

export const Footer:FC<{
  categories: WpCategoryList
  posts: WpPostList
}> = ({
  categories,
  posts
}) => {
  return (
    <div className={styles.footer}>
      {categories.map((category) => (
        <div key={category.id}>
          {category.count ? (
            <>
              <h1>{category.name}</h1>
              {posts
                .filter((post) => post.categories.includes(category.id))
                .sort((a, b) => a.id - b.id)
                .map((post) => (
                  <li key={post.slug} >
                    <NavLink 
                      to={`/${post.slug}`}
                    >
                      {decode(post.title.rendered)}
                    </NavLink>
                  </li>
                ))
              }
            </>
          ) : (
            <NavLink to={`/${category.slug}`}>
              <h1>{category.name}</h1>
            </NavLink>
          )}
        </div>
      ))}





      {/* {topLvlPages?.map((page:any) => {
        const subPages = pages.filter((subPage:any) => 
          subPage.parentNav && subPage.parentNav.length
            ?subPage.parentNav[0]?.id===page.id
            :""
        );
        return (
          <div key={page.id}>
            {!page.isDummy
              ?<h1>
                <NavLink
                  to={page.slug ?? '/'}
                >
                  {page.title}
                </NavLink>
              </h1>
              :<h1>{page.title}</h1>
            }
            {subPages.length
              ?<div>
                {subPages.map(subPage => 
                  <li key={`${subPage.slug}_footer`}>
                    <NavLink 
                      to={subPage.slug ?? '/'}
                    >
                      {subPage.title}
                    </NavLink>
                  </li>
                )}
              </div>
              :""
            }
          </div>
        )
      })} */}
    </div>  
  )
}
