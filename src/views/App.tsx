import * as React from 'react'
import routes from '../config/routes'
import { Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import NoMatch from './pages/404'
import ColorfulBorder from './components/ColorfulBorder'
import './styles.css'

export default function App() {
  return (
    <React.Fragment>
      <ColorfulBorder />
      <div className='container'>
        <Navbar />

        <Switch>
          {
            routes.map(({ path, exact, fetchInitialData, component: C }: any) => (
              <Route key={path} path={path} exact={exact} render={(props) => (
                <C fetchInitialData={fetchInitialData} {...props} />
              )} />
            ))
          }
          <Route path='*'>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  )
}