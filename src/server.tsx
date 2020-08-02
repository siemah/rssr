import express from 'express'
import cors from 'cors'
import React from 'react'
import ReactDOM from 'react-dom/server'
import { StaticRouter, matchPath, RouteProps } from 'react-router-dom'
import serialize from 'serialize-javascript'
import App from './views/App'
import routes from './views/routes'
import Post from './models/post'
import { setupMiddlewares } from './config/server'

const app = express();

setupMiddlewares(app, express);

interface ReactRouterContextType {
  url?: string;
  data?: any;
}
app.get('/api/posts', async (req: any, res: any) => {
  try {
    const posts = await Post.findAll();
    res.json({ posts })
  } catch (error) {
    res.end()
  }
})
app.get('*', (req, res, next) => {
  const activeRoute = routes.find((route) => matchPath(req.url, route as RouteProps)) || null;


  const promise = activeRoute && activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve();
  const context: ReactRouterContextType = {};
  promise.then((data: any) => {
    context.data = data;
    const markup = ReactDOM.renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    )

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
        
          <title>SSR with RRv5</title>
          <link href="/main.css" rel="stylesheet">
        
        </head>
        <body>

          <div id="app">${markup}</div>
          <script type='text/javascript' nonce='${res.locals.nonce}'>window.__INITIAL_DATA__ = ${serialize(data)}</script>
          <script type='text/javascript' nonce='${res.locals.nonce}' src="/bundle.js" defer></script>

        </body>
      </html>
    `)
  }).catch(next)
})

export default app;