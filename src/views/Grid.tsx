import * as React from 'react'
import { useParams } from 'react-router-dom'

declare global {
  interface Window { __INITIAL_DATA__: any; }
  interface __isBrowser__ {}
}

export default function Grid ({ fetchInitialData, staticContext }: any) {
  const [repos, setRepos] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return window.__INITIAL_DATA__;
    } else {
      return staticContext.data;
    }
  });

  const [loading, setLoading] = React.useState(
    repos ? false : true
  )

  const fetchNewRepos = React.useRef(
    repos ? false : true
  )

  const { id } = useParams()

  React.useEffect(() => {
    if (fetchNewRepos.current === true) {
      setLoading(true)

      fetchInitialData(id)
        .then((repos: any) => {
          setRepos(repos)
          setLoading(false)
        })
    } else {
      fetchNewRepos.current = true
    }
  }, [id, fetchNewRepos])

  if (loading === true) {
    return <i className='loading'>🤹‍♂️</i>
  }

  return (
    <ul className='grid'>
      {repos.map(({ name, owner, stargazers_count, html_url }: any, i: number) => (
        <li key={name}>
          <h2>#{i+1}</h2>
          <h3><a href={html_url}>{name}</a></h3>
          <p>by <a href={`https://github.com/${owner.login}`}>@{owner.login}</a></p>
          <p>{stargazers_count.toLocaleString()} stars</p>
        </li>
      ))}
    </ul>
  )
}