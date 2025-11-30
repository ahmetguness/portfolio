import { Router } from 'express';
import { getAllBlogsController, getBlogBySlugController } from '../controllers/blog.controller';

const router = Router();

router.get('/', getAllBlogsController);
router.get('/:slug', getBlogBySlugController);

export default router;
