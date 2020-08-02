import { Router } from 'express';
import React from 'react'
import ReactDOM from 'react-dom/server'
import { StaticRouter, matchPath, RouteProps } from 'react-router-dom'
import serialize from 'serialize-javascript'
import routes from '../../config/routes';
import App from '../../views/App';
import { Helmet } from 'react-helmet';

const htmlPagesRoute = Router();

interface ReactRouterContextType {
  url?: string;
  data?: any;
}

htmlPagesRoute.get('*', (req, res, next) => {
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
    );
    const helmet  = Helmet.renderStatic();

    res.send(`
      <!DOCTYPE html>
      <html ${helmet.htmlAttributes.toString()}>
        <head>
        
          <link href="/main.css" rel="stylesheet">
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}

        </head>
        <body ${helmet.bodyAttributes.toString()}>

          <div id="app">${markup}</div>
          <script type='text/javascript' nonce='${res.locals.nonce}'>window.__INITIAL_DATA__ = ${serialize(data)}</script>
          <script type='text/javascript' nonce='${res.locals.nonce}' src="/bundle.js" defer></script>

        </body>
      </html>
    `)
  }).catch(next)
});

export default htmlPagesRoute;