import Home from './Home'
import Grid from './Grid'
import { fetchPopularRepos } from './api'
import {ReactNode} from 'react';

interface RouteType {
  path: string;
  exact?: boolean;
  component: ReactNode;
  fetchInitialData?: (path: string) => Promise<any>;
}

const routes: RouteType[] = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/popular/:id',
    component: Grid,
    fetchInitialData: (path = '') => fetchPopularRepos(path.split('/').pop())
  }
]

export default routes