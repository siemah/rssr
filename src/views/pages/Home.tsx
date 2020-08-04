import React, { useEffect, } from 'react';
import PageLayout from '../libs/PageLayout'
import { fetchPosts } from '../api';

interface DynamicPagePropsType {
  staticContext: {
    url?: string;
    data?: any;
  }
}

interface PostType {
  title: string;
  id: number;
  content: string;
}

declare global {
  interface Window { __INITIAL_DATA__: any; __isBrowser__: boolean }
}

export default function Home({ staticContext, }: DynamicPagePropsType) {
  let data = [];
  let isMounted = true; // <- to avoid memory leak when the component unmounted
  if (__isBrowser__) {
    data = window.__INITIAL_DATA__ ? window.__INITIAL_DATA__.posts : [];
    delete window.__INITIAL_DATA__;
  }
  else {
    data = staticContext.data.posts;
  }
  const [posts, setPosts] = React.useState<PostType[]>(data);

  useEffect(() => {
    if (!posts.length) {
      fetchPosts()
        .then(res => {
          setPosts(res.posts);
        })
        .catch(err => console.log(err));
    }
    return () => {
      isMounted = false;
    }
  }, []);

  return (
    <PageLayout seoMetaData={{
      title: 'Home',
      site: {
        siteUrl: 'https://domain.com',
        title: 'domain.com',
        keywords: []
      }
    }}>
      {
        posts.length
          ? posts.map(({ title, content, id: key }: PostType) => (
            <article className="post__block" key={key}>
              <h2 className="post__title">{title}</h2>
              <p className="post__content">{content}</p>
            </article>
          ))
          : <i className='loading'>🤹‍♂️</i>
      }
    </PageLayout>
  )
}
