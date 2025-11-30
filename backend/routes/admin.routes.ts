import { Router } from 'express';
import { getAdminInfo } from '../controllers/admin.controller';

const router = Router();

router.get('/', getAdminInfo);

export default router;