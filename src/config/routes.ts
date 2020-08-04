import { ReactNode } from 'react';
import About from '../views/pages/About';
import Home from '../views/pages/Home';
import { fetchPosts } from '../views/api';

interface RouteType {
  path: string;
  exact?: boolean;
  component: ReactNode;
  fetchInitialData?: (path?: string) => Promise<any>;
}

const routes: RouteType[] = [
  {
    path: '/',
    exact: true,
    component: Home,
    fetchInitialData: fetchPosts
  },
  {
    path: '/about',
    component: About,
  }
]

export default routes