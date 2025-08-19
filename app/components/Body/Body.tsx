import type { FC } from "react";
import styles from './Body.module.css'
import type { WpPost } from "~/types/posts";
import type { WpPage } from "~/types/pages";

export const Body:FC<{
  page?: WpPage
  post?: WpPost
}> = ({
  page,
  post
}) => {
  
  const content = page || post

  return (
    content ? (
      <main className={styles.body}>
        <h1>
          <span dangerouslySetInnerHTML={{__html: content?.title?.rendered}} />
        </h1>
        <div 
          className={styles.content} 
          dangerouslySetInnerHTML={{__html: content?.content?.rendered}}
        />
      </main>
    ) : (
      <main className={styles.body} />
    )
  )
}