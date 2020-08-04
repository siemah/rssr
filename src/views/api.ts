import fetch from 'isomorphic-fetch';

export function fetchPosts ():Promise<any> {
  const endpointURI = `http://localhost:3001/api/posts`;

  return fetch(endpointURI)
    .then((data) => data.json())
    .catch((error) => {
      console.warn(error)
      return null
    });
}