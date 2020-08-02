import express from 'express'
import { setupMiddlewares } from './config/server'
import postsRoute from './routes/api/posts';
import htmlPagesRoute from './routes/pages/html';

const app = express();

setupMiddlewares(app, express);

app.use(postsRoute);
app.use(htmlPagesRoute);

export default app;