import { useCallback, useRef, useState, type FC, type KeyboardEvent } from 'react';

import { NavLink, useNavigate } from 'react-router';
import styles from './Header.module.css'
import type { WpCategoryList } from '~/types/categories';
import type { WpPostList } from '~/types/posts';


export const Header:FC<{
  categories: WpCategoryList
  posts: WpPostList
  searchQuery?: string
}> = ({
  categories,
  posts,
  searchQuery
}) => {

  const navigate = useNavigate();

  const [ searchVis, setSearchVis ] = useState<boolean>( searchQuery ? true : false )
  const [ searchTerm, setSearchTerm ] = useState<string>( searchQuery ?? "" )
  const [ mobileMenuExpand, setMobileMenuExpand ] = useState<boolean>( false )
  const searchBarRef = useRef<HTMLInputElement>(null)

  const searchClickHandler = useCallback(() => {
    if(searchVis) {
      navigate(`/search/?q=${searchTerm}`)
    } else {
      setSearchVis(true)
      searchBarRef?.current?.focus()
    }
  }, [navigate, searchTerm, searchVis, setSearchVis])

  const submitOnEnter = (e: KeyboardEvent) => {
    if(e.key === 'Enter') searchClickHandler()
  }

  return (
    <>
      <nav className={styles.header}>
        <h1 className={styles.header__title}><NavLink to="/">College of Arms Foundation</NavLink></h1>
        <div className={styles.header__links}>
          {categories.map((category) => (
            <div 
              key={category.slug}
              className={styles.header__linkContainer}
            >
              {category.count ? (
                <>
                  <>{category.name}</>
                  <div 
                    className={styles.header__subContainerPadding}
                  >
                    <div className={styles.header__subContainer}>
                      {posts
                        .filter((post) => post.categories.includes(category.id))
                        .map((post) => (
                          <NavLink 
                            key={post.slug} 
                            to={`/${post.slug}`}
                            className={styles.header__subLink}
                          >
                            {post.title.rendered}
                          </NavLink>
                        ))
                      }
                    </div>
                  </div>
                </>
              ) : (
                <NavLink to={`/${category.slug}`}>{category.name}</NavLink>
              )}
            </div>
          ))}
        </div>
        <div className={styles.mobileMenu} onClick={() => setMobileMenuExpand(!mobileMenuExpand)}>
          <div className={`${styles.mobileMenu__bars} ${mobileMenuExpand ? styles.mobileMenuBar__close1 : ""}`} />
          <div className={`${styles.mobileMenu__bars} ${mobileMenuExpand ? styles.mobileMenuBar__close2 : ""}`} />
          <div className={`${styles.mobileMenu__bars} ${mobileMenuExpand ? styles.mobileMenuBar__close3 : ""}`} />
        </div>
      </nav>
        <div className={styles.subHeader__wrap}>
          <div className={styles.subHeader}>
            <div className={styles.subHeader__left} />
            <div className={styles.subHeader__right}>
              <div 
                className={`${styles.subHeader__search__input} ${searchVis ? styles.subHeader__search__inputExpanded : ""}`}
              >
                <input 
                  className={styles.subHeader__search__inputInner}
                  ref={searchBarRef}
                  type="text"
                  name="q"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={submitOnEnter}
                  placeholder="Search"
                  value={searchTerm}
                />
                <div 
                  className={styles.subHeader__search__collapse}
                  onClick={() => setSearchVis(false)}
                >+</div>
              </div>
              <button 
                className={styles.subHeader__search}
                onClick={searchClickHandler}
              />
            </div>
          </div>
        </div>
      <NavLink to="/"><div className={styles.subHeader__arms} /></NavLink>
      <div className={`${styles.mobileMenuContainer} ${mobileMenuExpand ? styles.mobileMenuContainer__vis : ""}`}>
        {categories.map((category) => (
          <div 
            key={category.slug}
          >
            {category.count ? (
              <>
                <h1>{category.name}</h1>
                {posts
                  .filter((post) => post.categories.includes(category.id))
                  .map((post) => (
                    <NavLink 
                      key={post.slug} 
                      to={`/${post.slug}`}
                    >
                      {post.title.rendered}
                    </NavLink>
                  ))
                }
              </>
            ) : (
              <NavLink
                onClick={() => setMobileMenuExpand(false)}
                to={`/${category.slug}`}
              >
                <h1>{category.name}</h1>
              </NavLink>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
