import { Router } from 'express';
import Post from '../../models/post'

const postsRoute = Router();

postsRoute.get('/api/posts', async (req: any, res: any) => {
  try {
    const posts = await Post.findAll();
    res.json({ posts })
  } catch (error) {
    res.end()
  }
});

export default postsRoute;