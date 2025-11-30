import { Router } from 'express';
import { getAllProjectsController, getProjectBySlugController } from '../controllers/project.controller';

const router = Router();

router.get('/', getAllProjectsController);
router.get('/:slug', getProjectBySlugController);

export default router;
